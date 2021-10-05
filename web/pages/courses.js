
import React from 'react'
import { useEffect } from 'react'
import Content from '../components/common/Content'

import useGlobal from "../core/store"

import { useQuery } from "@apollo/client"
import { ALL_COURSES_QUERY } from "@/core/graphql/queries/courses"

///
/// Courses search page
///
export default function coursesPage() {
  const [globalState, globalActions] = useGlobal()
  const { loading, error, data } = useQuery(ALL_COURSES_QUERY)

  useEffect(() => {
    if (data) {
      console.log("Courses loaded!")
      console.log(data)
      globalActions.courses.setCourses(data)
    }
  }, [data])

  if (loading) return "Loading.."
  if (error) return "Error while loading.."
  return (
    <Content>
      <h1>Courses page</h1>
      <button onClick={() => { 
        console.log(globalState)
      }}>show global state</button>
    </Content>
  )
}

// ///
// /// This gets called on every request
// ///
// export async function getServerSideProps() {
//   const courses = await fetchAllCourses()
//   return { props: { data: { ...courses } } }    
// }