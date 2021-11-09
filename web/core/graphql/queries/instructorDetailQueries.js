import '@/core/types'
import { gql } from "@apollo/client"

/**
 * @returns {Array<Instructor>}
 */
export const ALL_INSTRUCTOR_DETAIL_QUERY = gql`
  query Instructor($id: Int) {
    instructors(where: {id: {eq: $id}}) {
      nodes {
        id
        name
        surname
        age
        specialization
        about
        contact
        photoUrl
        courses {
          id
          name
          date
          price
          type
        }
      }
    }
  }
`