import '@/core/types'
import { gql } from "@apollo/client"

/**
 * @returns {Array<Course>} 
 */
export const ALL_COURSE_DETAIL_QUERY = gql`
  query ($id: Int!) {
    roles {
      nodes {
        id
        name
      }
    }
    courses(where: {id: {eq: $id}}) {
      nodes {
        id
        name
        date
        price
        evaluation
        finished
        capacity
        type
        description
        duration
        difficulty
        photoUrl
        canceled
        occupancy
        skills
        content {
          name
          subchapters
        }
        instructor {
          id
          name
          surname,
          photoUrl
        }
        place {
          id
          name
          virtual
          url
          address
          city
        } 
      }
    }
  }
`