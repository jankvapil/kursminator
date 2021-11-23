
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
