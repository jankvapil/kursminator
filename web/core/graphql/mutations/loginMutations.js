
import '@/core/types'
import { gql } from "@apollo/client"
import { client, sendRequest } from '@/core/graphql/client'

/**
 * @returns {string} token 
 */
export const getToken = async (token) => {
  const mutation = loginMutation(token)
  const res = await sendRequest(mutation)
  localStorage.setItem('userFbLogin', res.userFbLogin)
}

const loginMutation = (token) => gql`
  mutation {
    userFbLogin(accessToken: "${token}")
  }
`