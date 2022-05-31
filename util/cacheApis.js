import moize from 'moize'
import fetch from 'node-fetch'

export const memoized = moize(item => {
  return item
}, {
  maxAge: 1000 * 60 * 5
})

export const cacheMenu = moize(async (item, callback) => await callback, {
  isPromise: true,
  maxAge: 1000 * 60 * 60,
  transformArgs: item => {
      return item[0];
  },
  onCacheAdd: function (cache) {
      // console.log('cached!', cache);
  }
});

export const maxAgeMemoized = age => age || 1000 * 60

export const memoized2 = moize(item => {
  return item
}, {
  maxAge: maxAgeMemoized
})

export const fetchContent = async (url) => {
  try {
    const response = await fetch(url)
    if (response?.status !== 200) { throw Error(`url incorrect: ${url}!!`) }
    return await response.json()
  } catch (error) {
    console.log('error', error)
  }
}
