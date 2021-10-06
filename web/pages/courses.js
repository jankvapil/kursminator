import '@/core/types'
import React from 'react'
import { useEffect } from 'react'
import Content from '@/components/common/Content'

import useGlobal from "@/core/store"

import { ALL_COURSES_QUERY } from "@/core/graphql/queries/coursesQueries"
import { addPlaceMutation } from '@/core/graphql/mutations/placesMutations'

import { useQuery } from '@apollo/client'


import { Card } from 'antd'

///
/// Courses search page
///
export default function coursesPage() {
  const [globalState, globalActions] = useGlobal()
  const { loading, error, data } = useQuery(ALL_COURSES_QUERY)

  useEffect(() => {
    if (data?.courses) {
      globalActions.courses.setCourses(data.courses)
    }
  }, [data])


  ///
  /// OnClick handler
  ///
  const addPlaceOnClick = async () => {
    const res = await addPlaceMutation({ 
      name: "mtest_name",
      virtual: false,
      url: "mtest_url",
      address: "mtest_address",
      city: "mtest_city"
    })
    // console.log(res)
  }

  ////////////// GUI ///////////////

  if (loading) return "Loading.."
  if (error) return "Error while loading.."
  return (
    <Content>
      <h1>Courses page</h1>
      <button onClick={() => { 
        console.log(globalState)
      }}>show global state</button>
      <button onClick={addPlaceOnClick}>Add place test</button>
      {
        globalState.courses.map(c => (
          <Card title={c.name} bordered={false} style={{ width: 300 }}>
            <p>{c.date}</p>
            <p>{c.evaluation}</p>
            <p>{c.price}</p>
          </Card>
        ))
      }
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