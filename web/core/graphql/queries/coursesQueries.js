import '@/core/types'
import { gql } from "@apollo/client"
import { client, sendRequest } from '@/core/graphql/client'


/**
 * @returns {Array<Course>} 
 */
export const fetchAllCourses = async () => {
  const res = await sendRequest(ALL_COURSES_QUERY)
  if (res) {
    return { courses: res?.courses?.nodes }
  }
}

export const ALL_COURSES_QUERY = gql`
  query {
    courses {
      nodes {
        id
        name
        date
        description
        type
        place {
          id
          name
          virtual
        }
        price
        evaluation
        instructor {
          id
          name
          surname
        }
      }
    }
  }
`

export const COURSE_AND_RESERVATION_BY_ID_QUERY = gql`
  query ($id: Int!) {
    courses(where: {id: {eq: $id}}) {
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
    userCourseReservations(where: {courseId: {eq: $id}}) {
      id
    }
  }
`