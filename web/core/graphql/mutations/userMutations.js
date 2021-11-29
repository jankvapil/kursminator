
import '@/core/types'
import { gql } from "@apollo/client"
import { client } from '@/core/graphql/client'

/**
 * Update User mutation
 * 
 * @param {User} user
 */
export const updateUserMutation = async (user) => {
  const mutation = gql`
    mutation {
      updateUser(id: ${user.id}, input: {
        credits: ${user.credits}
        email: "${user.email}"
        id: ${user.id}
        name: "${user.name}"
        photoUrl: "${user.photoUrl}"
        roleId: ${user.roleId}
        surname: "${user.surname}"
      }) {
        id
      }
    }
  `
  const data = await client.request(mutation)
  return data
}

/**
 * Book course for current User
 * 
 * @param {number} userId 
 * @param {number} courseId 
 * 
 * @return {number} course reservation Id
 */
export const bookCourseMutation = async (userId, courseId) => {
  const mutation = gql`
    mutation {
      addUserCourseReservation(input: {
        userId: ${userId}
        courseId: ${courseId}
      }) {
        id
      }
    }
  `
  try {
    const data = await client.request(mutation)
    return data 
  } catch (error) {
    return { error: error.response.errors[0].message }
  }
}

/**
 * Cancel reservation for current User
 * 
 * @param {number} userId 
 * @param {number} courseId 
 * 
 * @return {number} course reservation Id
 */
 export const cancelReservationMutation = async (userId, courseId) => {
  const mutation = gql`
    mutation {
      cancelReservation(userId: ${userId}, courseId: ${courseId})
    }
  `
  try {
    const data = await client.request(mutation)
    return data 
  } catch (error) {
    return { error: error.response.errors[0].message }
  }
}