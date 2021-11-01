
import '@/core/types'
import { gql } from "@apollo/client"
import { client, sendRequest } from '@/core/graphql/client'

/**
 * @returns {string} token 
 */
export const getToken = async (token) => {
  const mutation = loginMutation(token)
  const res = await sendRequest(mutation)
  console.log(res)

  localStorage.setItem('userFbLogin', res.userFbLogin)
  if (res) {
    return res.userFbLogin
  }
}

const loginMutation = (token) => gql`
  mutation {
    userFbLogin(accessToken: "${token}")
  }
`