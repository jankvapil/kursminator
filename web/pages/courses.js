
import React from 'react'
import { useEffect } from 'react'
import Content from '@/components/common/Content'

import useGlobal from "@/core/store"

import { ALL_COURSES_QUERY } from "@/core/graphql/queries/coursesQueries"
import { addPlaceMutation } from '@/core/graphql/mutations/placesMutations'

import { useQuery } from '@apollo/client'

///
/// Courses search page
///
export default function coursesPage() {
  const [globalState, globalActions] = useGlobal()
  const { loading, error, data } = useQuery(ALL_COURSES_QUERY)
  // const [addPlace, { mdata, mloading, merror }] = useMutation(ADD_PLACE)


  useEffect(() => {
    if (data) {
      console.log("Courses loaded!")
      console.log(data)
      globalActions.courses.setCourses(data)
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
    console.log(res)
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