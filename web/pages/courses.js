import '@/core/types'
import React, { useState } from 'react'
import { useEffect } from 'react'
import Content from '@/components/common/Content'

import { fetchAllCourses } from '@/core/graphql/queries/coursesQueries'
import { Card } from 'antd'
import { Row, Col } from 'antd'
import { Checkbox } from 'antd'
import { useRouter } from 'next/router'

///
/// Courses search page
///
export default function coursesPage(props) {
  const router = useRouter()
  const [courses, setCourses] = useState([])
  const [filteredCourses, setFilteredCourses] = useState([])
  const [checkedVirtual, setCheckedVirtual] = useState(true)
  const [checkedLive, setCheckedLive] = useState(true)
  useEffect(() => {
    if (props.data.courses) {
      console.log(props.data)
      setCourses(props.data.courses)
      setFilteredCourses(props.data.courses)
    }
  }, [])

  const updateFilter = (e) => {
    // console.log(e)
    // console.log(`Virtual ${checkedVirtual}`)
    // console.log(`Live ${checkedLive}`)
    // console.log(courses)

    // const phrase = 'aasd'

    const filtered = new Set() 

    /// virtual courses
    courses.filter(c =>  
      c.place.virtual === e.virtual
    ).forEach(c => filtered.add(c))

    /// live courses
    courses.filter(c =>  
      c.place.virtual !== e.live
    ).forEach(c => filtered.add(c))

    const filteredArr = Array.from(filtered)

    // console.log(filteredArr)
    setFilteredCourses(filteredArr)

  }

  ////////////// GUI ///////////////

  return (
    <Content>
      <Row>
        <Col span={8} className="outline-black">
          <h2 className="text-xl">Filtr</h2>
          <Checkbox 
            defaultChecked={true}
            checked={checkedVirtual}
            onChange={(e) => { 
              console.log(e.target.checked)
              setCheckedVirtual(e.target.checked)
              updateFilter({
                virtual: e.target.checked,
                live: checkedLive
              }) }}
          >
            Virtuální
          </Checkbox>
          <Checkbox 
            defaultChecked={true}
            checked={checkedLive}
            onChange={(e) => { 
              console.log(e.target.checked)
              setCheckedLive(e.target.checked)
              updateFilter({
                live: e.target.checked,
                virtual: checkedVirtual
              }) }}
          >
            Prezenční
          </Checkbox>
        </Col>
        <Col span={16}>
    
          <ul className="mt-2">
            { filteredCourses.map(c => (
                <li className="m-auto"  key={c.id} style={{ width: 300 }}>
                  <span className="text-3xl">
                    <button onClick={() => router.push(`courseDetail?id=${c.id}`)}> 
                      {c.name}
                    </button>
                  </span>
                  <span>{c.date}</span>
                  <span>{c.evaluation}</span>
                  <span>{c.price}</span>
                  <span>{c.type}</span>
                  <hr></hr>
                </li>
              ))
            }
          </ul>
 
        </Col>
      </Row>
    </Content>
  )
}

///
/// This gets called on every request
///
export const getServerSideProps = async () => {
  const courses = await fetchAllCourses()
  return { props: { data: { ...courses } } }    
}