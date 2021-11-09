import '@/core/types'
import { gql } from "@apollo/client"

/**
 * @returns {Array<Course>} 
 */
export const ALL_COURSE_DETAIL_QUERY = gql`
  query ($id: Int!) {
    courses(where: {id: {eq: $id}}) {
      nodes {
        id
        name
        date
        price
        evaluation
        capacity
        type
        description
        duration
        difficulty
        photoUrl
        occupancy
        skills
        content {
          name
          subchapters
        }
        instructor {
          id
          name
          surname
        }
        place {
          id
          name
          virtual
          address
        } 
      }
    }
  }
`