import '@/core/types'
import { gql } from "@apollo/client"
import { sendRequest } from '@/core/graphql/client'

/**
 * @returns {Array<Courses>} 
 */

 export const fetchAllMainPage = async () => {
  const res = await sendRequest(ALL_MAINPAGE_QUERY)
  if (res) {
    return { mainPage: res }
  }
}

export const ALL_MAINPAGE_QUERY = gql`
  query{
    sportCourses: courses(where: {type:{contains: "sport"}}) {
      totalCount
      nodes {
        name
        capacity
        price
        type
        photoUrl
        instructor {
          name
          surname
          photoUrl
        }
        place {
          name
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
        photoUrl
        instructor {
          name
          surname
          photoUrl
        }
        place {
          name
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