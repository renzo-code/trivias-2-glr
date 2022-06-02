import React from 'react'
import App from 'next/app'
import { ApolloProvider } from '@apollo/react-hooks'
import withData from '../graphql/helpers/apollo-client'
import absoluteUrl from 'next-absolute-url';
import { fetchContent, cacheMenu } from "../util/cacheApis"
import '../styles/global.scss'
import '../styles/style.scss'
import '../src/trivias.scss'

class MyApp extends App {
  static async getInitialProps ({ Component, ctx }) {

    const {protocol, host} = absoluteUrl(ctx.req, 'localhost:3000');
    const URL_BASE = `${protocol}//${host}`;
    console.log("URL_BASEURL_BASEURL_BASEURL_BASEURL_BASEURL_BASEURL_BASEURL_BASE", URL_BASE)

    const API = `${URL_BASE}/api-cronos/search?query=spotlight&id=60e333bf43e10912fb48da92`;

    console.log("API", API)
    // if (!cacheMenu.has(['menuAlertaWeb'])) {
    //     const _dataAlertWeb = fetchContent(API).then(resp => resp[0]);
    //     cacheMenu('menuAlertaWeb', _dataAlertWeb);
    // }

    let pageProps = {}
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    pageProps = {
      ...pageProps,
      extraData: {
          menuAlertaWeb: await cacheMenu.get(['menuAlertaWeb']) || {},
      }
    }
    return { pageProps }
  }

  render () {
    const { Component, pageProps, apollo } = this.props
    return (
      <ApolloProvider client={apollo}>
          <Component {...pageProps} />
      </ApolloProvider>
    )
  }
}

export default withData(MyApp)
