import { gql } from "@apollo/client"

// import client from "core/graphql/client"

// export const fetchAllCourses = async () => {
//   console.log(client)
//   const { data } = await client.query({
//     query: ALL_COURSES_QUERY,
//   })
//   return data
// }

export const ALL_COURSES_QUERY = gql`
  query {
    courses {
      id
      name
      date
      price
      evaluation
    }
  }
`