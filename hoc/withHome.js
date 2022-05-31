/* eslint-disable */
import React from 'react'
import { QUERY_CONTENT_GET } from 'graphql/querys/contentGet.query'
import { QUERY_CONTENT_SHOW } from 'graphql/querys/contentShow.query'
import { useMutation } from '@apollo/client'
import { SEND_RESPONSE_DATA } from 'graphql/mutation'

const WithHome = (Component, res) => {
  return class extends React.Component {
    static async getInitialProps ({apolloClient}) {
      const dataGet = await apolloClient.query({
        query: QUERY_CONTENT_GET
      }).then(res => res.data)

      const dataShow = await apolloClient.query({
        query: QUERY_CONTENT_SHOW
      }).then(res => res.data)

      // const [sendMutation] = await useMutation(sendMutation, { variables: {  }})

      .catch((error) => console.log('error', error))
      return {
        dataGet: dataGet || {},
        dataShow: dataShow || {}
      }
    }
    render() {
      return <Component {...this.props}/>
    }
  }
}

export default WithHome
