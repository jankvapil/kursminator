import { GraphQLClient } from 'graphql-request'
import { GRAPHQL_API } from '@/core/config'

export const client = new GraphQLClient(GRAPHQL_API, {
  headers: {
    authorization: 'Bearer MY_TOKEN',
  },
})

  
