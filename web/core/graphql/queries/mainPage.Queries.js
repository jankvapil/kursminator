import '@/core/types'
import { gql } from "@apollo/client"

/**
 * @returns {Array<Course>} 
 */
// export const ALL_MAINPAGE_QUERY = gql`
//   query{
//     instructors {
//       name
//     }
//   }
// `

export const ALL_MAINPAGE_QUERY = gql`
  query{
    sportCourses: courses(where: { type:{contains: "sport"}}) {
      name
      capacity
      price
      instructor {
        name
        surname
      }
      type
    }
      itCousrses: courses(where: { type:{contains: "IT"}}) {
      name
      capacity
      price
      instructor {
        name
        surname
      }
      type
    }
    instructors {
      name
      courses {
        name
      }
    }
  }
`