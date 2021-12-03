
import '@/core/types'
import { gql } from "@apollo/client"
import { sendRequest } from '@/core/graphql/client'

/**
 * @returns {object} current user 
 */
export const fetchRoles = async () => {
  const res = await sendRequest(ROLES_QUERY)
  if (res) {
    return res.roles.nodes
  }
}

const ROLES_QUERY = gql`
  query {
    roles {
      nodes {
        id
        name
      }
    }
  }
`