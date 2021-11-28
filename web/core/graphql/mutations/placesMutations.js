
import '@/core/types'
import { gql } from 'graphql-request'
import { client } from '@/core/graphql/client'

/**
 * Add place mutation
 * 
 * @param {Place} place
 */
export const addPlaceMutation = async (place) => {
  const mutation = gql`
    mutation {
      addPlace (input: {
        name: "${place.name}",
        virtual: ${place.virtual},
        url: "${place.url}"
        address: "${place.address}",
        city: "${place.city}"
      }) {
        id
      }
    }`
  
  const data = await client.request(mutation)
  return data
}

/**
 * Add place mutation
 * 
 * @param {Place} place
 */
 export const updatePlaceMutation = async (place) => {
  const mutation = gql`
    mutation {
      updatePlace (id: ${place.id}, input: {
        id: ${place.id},
        name: "${place.name}",
        virtual: ${place.virtual},
        url: "${place.url}"
        address: "${place.address}",
        city: "${place.city}"
      }) {
        id
      }
    }`
  
  const data = await client.request(mutation)
  return data
}