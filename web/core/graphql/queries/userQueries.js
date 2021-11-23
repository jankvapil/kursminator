
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


/**
 * @returns {array} all users 
 */
 export const fetchAllUsers = async () => {
  const res = await sendRequest(ALL_USERS)
  if (res) {
    return { users: res.users.nodes }
  }
}

const ALL_USERS = gql`
  query {
    users {
      nodes {
        id
        name
        surname
        email
        credits
        userCourseReservations {
          id
          course {
            id
            name
          }
          state
        }
      }
    }
  }
`