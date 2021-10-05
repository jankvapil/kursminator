
import React from 'react'
import { useEffect } from 'react'
import Content from '../components/common/Content'

import useGlobal from "../core/store"
import { gql } from "@apollo/client"
import client from "../core/graphql/client"

///
/// Courses search page
///
export default function coursesPage({ data }) {
  const [globalState, globalActions] = useGlobal()


  useEffect(() => {
    console.log(data)
    // console.log(globalState)

    if (data?.courses) {
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
  // if (client) {
  
  //   console.log(client)

  //   clien
    const { data } = await client.query({
      query: gql`
        query {
          courses {
            id
            name
            date
            price
            evaluation      
          }
        }
      `,
    });

    // Pass data to the page via props
    return { props: { data } }    
  // } 
  // return { props: { data: []}}
}