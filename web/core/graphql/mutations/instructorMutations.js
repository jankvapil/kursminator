import '@/core/types'
import { gql } from "@apollo/client"
import { client } from '@/core/graphql/client'

/**
 * Add course mutation
 * 
 * @param {Instructor} instructor
 */
 export const addInstructorMutation = async (instructor) => {
    const mutation = gql`
      mutation {
        addInstructor(input:{
            name: "${instructor.name}"
            surname: "${instructor.surname}"
            age: ${instructor.age}
            specialization: "${instructor.specialization}"
            about: "${instructor.about}"
            contact: "${instructor.contact}"
            photoUrl: "${instructor.photoUrl}"
        }){
            id
        }
      }`
  
    const data = await client.request(mutation)
    return data
  }