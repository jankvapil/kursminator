import '@/core/types'
import { gql } from "@apollo/client"

/**
 * @returns {Array<Course>} 
 */
export const ALL_COURSES_QUERY = gql`
  query {
    courses {
      id
      name
      date
      price
      evaluation
      instructor {
        id
        name
        surname
      }
    }
  }
`