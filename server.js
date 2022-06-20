const EventEmitter = require('events')

require('dotenv').config()

const express = require('express')
const path = require('path')
const next = require('next')
const dev = process.env.NODE_ENV !== 'production'
const LRUCache = require('lru-cache')
const app = next({ dev })
const handle = app.getRequestHandler()
const port = parseInt(process.env.PORT, 10) || 3000
const endPoint = 'https://qacronosapi2.glr.pe/graphql/trivia'
const tokenGraphql = 'c5c56J7f2e07H46h3F1a8h9hJg3cfb06a2g53DAC43'

const ssrCacheServer = new LRUCache({
  maxSize: 100 * 1024 * 1024,
  length: function (n, key) {
    return n.length
  },
  maxAge: 1000 * 60 * 360 // 6 horas
})

const fetchQuery = async (strQuery) => {
  try {
    const response = await fetch(endPoint, {
      method: 'post',
      body: JSON.stringify({
        query: strQuery
      }),
      headers: {
        'Content-Type': 'application/json',
        'token_id': tokenGraphql
      }
    })
    const json = await response.json()
    if (response?.status !== 200) { throw Error(`query incorrect: ${strQuery}!!`) }
    return json
  } catch (error) {
    console.log('error', error)
  }
}

app.prepare().then(() => {
  const server = express()

  const staticPath = path.join(__dirname, '/public/static')

  server.use('/static', express.static(staticPath, {
    maxAge: '1y',
    immutable: true
  }))

  server.get('/favicon.ico', (req, res) => {
    res.sendFile(`${staticPath}/favicon.ico`)
  })

  server.get('/_next/*', (req, res) => handle(req, res))

  server.get('/api-cronos/*', async (req, res) => {
    res.setHeader('Content-Type', 'application/json')

    let datos = {}
    let dataNew = []
    let key

    const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl
    const currentURL = new URL(fullUrl)

    const search_params = currentURL.searchParams

    if (req.url) {
      if (search_params.has('key')) {
        key = search_params.get('key')
        res.setHeader('x-cache', 'MISS')

        if (ssrCacheServer.has(key)) {
          ssrCacheServer.del(key)
          //   console.log('si borro cache de esta key >>>', key)
        }
      }

      if (search_params.has('query')) {
        const typeQuery = search_params.get('query')
        if (((typeQuery === 'menu') && search_params.has('id')) || typeQuery === 'sitemap-articles' || (typeQuery === 'spotlight' && search_params.has('id'))) {
          const getID = search_params.get('id');
          const queryMenu = `
          query menu {
            menu( site_id: "perucheck", _id: "${getID}", status: 1 ) {
              links {
                path
                title
              }
            }
          }
        `
          const queryValidateSitemapArticles = `
          query articles {
            articles(site_id: "perucheck", limit: 1000, page: 1, order_field: "_id", order_sort: "desc", status: 1) {
              total
              data {
                created_at
              }
            }
          }
        `
          const querySpotlight = `query spotlight {
            spotlight( site_id: "perucheck", _id: "${getID}", status: 1 ) {
              data
            }
          }`
          if (getID) {
            key = `perucheck-${typeQuery}-${getID}`
          } else {
            key = `perucheck-${typeQuery}-perucheck`
          }

          if (ssrCacheServer.has(key)) {
            // console.log('>>>> SI TIENE CACHEEE : ',ssrCacheServer.get(key));
            // console.log('SI TIENE CACHE - KEY ======== ',key);
            res.setHeader('x-cache', 'HIT')
            dataNew = ssrCacheServer.get(key)
          } else {
            if (typeQuery === 'menu') {
              datos = await fetchQuery(queryMenu)
              dataNew.push(datos)
              res.setHeader('x-cache', 'MISS')
              ssrCacheServer.set(key, dataNew)
              // console.log('>>>>> queryMenu : ',queryMenu);
            }
             else if (typeQuery === 'sitemap-articles') {
              datos = await fetchQuery(queryValidateSitemapArticles)
              if (datos && Object.keys(datos) && Object.keys(datos).length) {
                if (datos.data && Object.keys(datos.data) && Object.keys(datos.data).length) {
                  const { data } = datos
                  if (data.articles && data.articles.data && Object.keys(data.articles.data) &&
                    Object.keys(data.articles.data).length) {
                    const { articles: { data: datos } = {} } = data
                    // eslint-disable-next-line array-callback-return
                    datos.map(d => {
                      if (d.created_at && d.created_at.length > 0) {
                        const formateDate = d.created_at.slice(0, d.created_at.length - 9)
                        const filterDate = dataNew.some(e => e === formateDate)
                        if (!filterDate) {
                          dataNew.push(formateDate)
                        }
                      }
                    })
                  }
                }
              }

              res.setHeader('x-cache', 'MISS')
              ssrCacheServer.set(key, dataNew, 1000 * 60 * 720)
            } else if (typeQuery === 'spotlight') {
              datos = await fetchQuery(querySpotlight)
              dataNew.push(datos)
              res.setHeader('x-cache', 'MISS')
              ssrCacheServer.set(key, dataNew)
            }
          }
        } else if (typeQuery === 'articles' && search_params.has('limit') && search_params.has('page')) {
          const limitQuery = search_params.get('limit')
          const pageQuery = search_params.get('page')
          // let categorySlugQuery = search_params.get('category_slug');
          let categorySlugQuery

          if (search_params.has('category_slug') && search_params.get('category_slug').length > 0) {
            categorySlugQuery = `/${search_params.get('category_slug')}`

            key = `verMas-${typeQuery}-${search_params.get('category_slug')}-limit${limitQuery}-page${pageQuery}`
          } else {
            categorySlugQuery = ''
            key = `verMas-${typeQuery}-limit${limitQuery}-page${pageQuery}`
          }

          const queryArticles = `
          query articles {
            articles (site_id: "perucheck", page: ${pageQuery}, limit: ${limitQuery}, order_field: "update_date", order_sort: "desc", status: 1, category_slug: "${categorySlugQuery}") {
              total
              per_page
              last_page
              data {
                title
                type
                date
                updated_at
                created_at
                update_date
                slug
                data {
                  teaser
                  authors {
                    fullname
                  }
                  categories {
                    name
                    type
                    slug
                    primary
                  }
                  multimedia {
                    type
                    path
                    data {
                      type_video
                      title
                      source
                      image_path
                      embed
                      credits
                    }
                  }
                }
              }
            }
          }
        `
          if (ssrCacheServer.has(key)) {
            res.setHeader('x-cache', 'HIT')
            dataNew = ssrCacheServer.get(key)
            // console.log('>>>> SI TIENE CACHE !!!!!!!');
          } else if (typeQuery === 'articles') {
            // console.log('=== query : ', queryArticles);
            datos = await fetchQuery(queryArticles)
            dataNew.push(datos)
            res.setHeader('x-cache', 'MISS')
            ssrCacheServer.set(key, dataNew, 1000 * 60 * 120) // 2 horas
            // console.log('======= NO TIENE CACHE, SE LE AGREGA POR PRIMERA VEZ !!!!!!!');
          }
        }
      }
    }
    res.send(JSON.stringify(dataNew))
  })

  server.get('*', (req, res) => handle(req, res))

  server.listen(port, (err) => {
    if (err) throw err
    console.log(`listening on port ${port} - trivias`)
  })
  class MyEmitter extends EventEmitter {}
  const myEmitter = new MyEmitter()
  myEmitter.setMaxListeners(11)
  for (let i = 0; i < 11; i++) {
    myEmitter.on('event', _ => console.log(i))
  }
  myEmitter.emit('event')

  require('events').EventEmitter.defaultMaxListeners = Infinity
  // require('events').EventEmitter.defaultMaxListeners = 30
}).catch((err) => {
  console.log('err', err)
  process.exit(1)
})
