import '@/core/types'
import { gql } from "@apollo/client"

/**
 * @returns {Array<Instructor>} 
 */
export const INSTRUCTOR_BY_ID_QUERY = gql`
  query Instructor($id: Int) {
    instructors(where: {id: {eq: $id}}) {
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
`