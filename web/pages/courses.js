
import React, { useMemo } from 'react';
import { useEffect } from 'react'
import Content from '../components/common/Content'

import useGlobal from "../core/store"

///
/// Courses search page
///
export default function coursesPage({ data }) {
  const [globalState, globalActions] = useGlobal();

  useEffect(() => {
    console.log(globalState)

    if (data.courses) {
      globalActions.courses.setCourses(data.courses)
    }
  }, [])



  return (
    <Content>
      Courses page
      <button onClick={() => { 
        console.log(globalState)
      }}>global</button>
    </Content>
  )
}

///
/// This gets called on every request
///
export async function getServerSideProps() {
  // Fetch data from external API
  // const res = await fetch(`https://.../data`)
  // const data = await res.json()

  // Pass data to the page via props
  return { props: { 
    data: {
      courses: [
        {
          id: 1,
          name: "test course"
        },
        {
          id: 2,
          name: "test course 2"
        }
      ]
   } } }
}