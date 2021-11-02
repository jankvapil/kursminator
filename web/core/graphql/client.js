import { GraphQLClient } from 'graphql-request'
import { GRAPHQL_API } from '@/core/config'

export const client = new GraphQLClient(GRAPHQL_API, {
  headers: {
    authorization: `Bearer`,
  },
})

///
/// Sends GraphQL request
///
const send = async (query, token) => {
  const client = new GraphQLClient(GRAPHQL_API, {
    headers: {
      authorization: `Bearer ${token}`,
    }
  })
  const res = await client.request(query)
  return res
}

///
/// Sends request from server (without token) or from client (with token)
///
export const sendRequest = async (query) => {
  let token = ''
  try { 
    token = localStorage.getItem('userFbLogin')
    return await send(query, token)
  } catch (error) {
      try {
        return await send(query, token)
      } catch (error) {
        return null
      }
    }
}
