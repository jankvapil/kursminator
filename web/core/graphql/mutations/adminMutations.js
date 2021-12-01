import '@/core/types'
import { gql } from "@apollo/client"
import { client } from '@/core/graphql/client'

/**
 * Check courses mutation
 * 
 * @returns {number} number oh checked courses 
 */
export const checkCoursesMutation = async () => {
  const mutation = gql`
    mutation {
      checkCourses
    }`

  const data = await client.request(mutation)
  return data
}