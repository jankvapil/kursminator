import '@/core/types'
import { gql } from "@apollo/client"

/**
 * @returns {Object<Courses>} 
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