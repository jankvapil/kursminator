
import '@/core/types'
import { gql } from "@apollo/client"
import { client, sendRequest } from '@/core/graphql/client'

/**
 * @returns {object} current user 
 */
export const getUserInfo = async () => {
  const res = await sendRequest(CURRENT_USER)
  if (res) {
    return res.currentUsers
  }
}

const CURRENT_USER = gql`
  query {
    currentUsers {
      id
      name
      surname
      photoUrl
      role {
        id
        name
      }
      email
      credits
      userCourseFavourites {
        course {
          id
          name
        }
      }
      userCourseReservations {
        course {
          id
          name
        }
      }
    }
  }
`