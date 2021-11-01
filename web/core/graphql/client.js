import { GraphQLClient } from 'graphql-request'
import { GRAPHQL_API } from '@/core/config'

export const client = new GraphQLClient(GRAPHQL_API, {
  headers: {
    authorization: 'Bearer MY_TOKEN',
  },
})

export const sendRequest = async (query) => {
  try {
    const res = await client.request(query)
    return res
  } catch (error) {
    console.error(error)
    return null
  }
}
