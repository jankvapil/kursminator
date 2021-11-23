import '@/core/types'
import { gql } from "@apollo/client"
import { sendRequest } from '@/core/graphql/client'

/**
 * @returns {Array<Instructor>}
 */
export const fetchAllManager = async () => {
  const res = await sendRequest(ALL_MANAGER_QUERY)
  if (res) {
    return { instructors: res?.instructors?.nodes }
  }
}

export const ALL_MANAGER_QUERY = gql`
  query {
    instructors {
      nodes {
        id
        name
        surname
      }
    }
  }
`
