import '@/core/types'
import { gql } from "@apollo/client"
import { client, sendRequest } from '@/core/graphql/client'

/**
 * @returns {Array<Courses>} 
 */

 export const fetchAllMainPage = async () => {
   console.log("neco")
  const res = await sendRequest(ALL_COURSES_QUERY)
  if (res) {
    console.log(res, "query");
    return { courses: res?.courses }
  }
}

export const ALL_MAINPAGE_QUERY = gql`
  query{
    sportCourse: courses(where: {type:{contains: "sport"}}) {
      totalCount
      nodes {
        name
        capacity
        price
        type
        instructor {
          name
          surname
          photoUrl
        }
      }
    }
    itCourses: courses(where: {type:{contains: "IT"}}) {
      totalCount
      nodes {
        name
        capacity
        price
        type
        instructor {
          name
          surname
          photoUrl
        }
      }
    }
    instructors {
      totalCount
      nodes {
        name 
        surname
        photoUrl
        courses {
          name
        }
      }
    }
  }
`