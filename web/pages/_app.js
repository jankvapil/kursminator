import { GRAPHQL_API } from '@/core/config'
import 'tailwindcss/tailwind.css'

import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client"

const client = new ApolloClient({
  uri: GRAPHQL_API,
  cache: new InMemoryCache(),
}) 

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  )
}

export default MyApp
