import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import withApollo from 'next-with-apollo'
import { setContext } from 'apollo-link-context'
import { createHttpLink } from 'apollo-link-http'
import fetch from 'isomorphic-unfetch'

const link = createHttpLink({
  fetch, // Switches between unfetch & node-fetch for client & server.
  uri: 'https://qacronosapi2.glr.pe/graphql/trivia'
})

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      token_id: 'c5c56J7f2e07H46h3F1a8h9hJg3cfb06a2g53DAC43',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }
  }
})

export default withApollo(
  ({ initialState }) =>
    new ApolloClient({
      ssrMode: typeof window === 'undefined',
      link: authLink.concat(link),
      cache: new InMemoryCache().restore(initialState || {})
    })
)
