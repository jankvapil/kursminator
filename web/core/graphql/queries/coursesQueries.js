import '@/core/types'
import { gql } from "@apollo/client"
import { client, sendRequest } from '@/core/graphql/client'


/**
 * @returns {Array<Course>} 
 */
export const fetchAllCourses = async () => {
  const res = await sendRequest(ALL_COURSES_QUERY)
  if (res) {
    return { courses: res?.courses?.nodes }
  }
}

export const ALL_COURSES_QUERY = gql`
  query {
    courses {
      nodes {
        id
        name
        date
        type
        place {
          id
          name
          virtual
        }
        price
        evaluation
        instructor {
          id
          name
          surname
        }
      }
    }
  }
`