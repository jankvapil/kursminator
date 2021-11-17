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
  sportCourses: courses(where: {type:{contains: "Sport"}}) {
    totalCount
    nodes {
      name
      capacity
      price
      type
      photoUrl
      occupancy
      id
      instructor {
        name
        surname
        photoUrl
        id
      }
      place {
        name
        virtual
        id
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
      occupancy
      id
      instructor {
        name
        surname
        photoUrl
        id
      }
      place {
        name
        id
        virtual
      }
    }
  }
  instructors {
    totalCount
    nodes {
      name 
      surname
      photoUrl
      id
      courses {
        name
        id
      }
    }
  }
}
`