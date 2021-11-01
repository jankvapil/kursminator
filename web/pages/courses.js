import '@/core/types'
import React, { useState } from 'react'
import { useEffect } from 'react'
import Content from '@/components/common/Content'

import { fetchAllCourses } from '@/core/graphql/queries/coursesQueries'

import { Row, Col, Slider, Checkbox, Input } from 'antd'
import { useRouter } from 'next/router'

///
/// Courses search page
///
export default function coursesPage(props) {
  const MAX_PRICE = 1500
  const router = useRouter()
  const [courses, setCourses] = useState([])
  const [filteredCourses, setFilteredCourses] = useState([])
  const [checkedVirtual, setCheckedVirtual] = useState(true)
  const [checkedLive, setCheckedLive] = useState(true)
  const [sliderPrice, setSliderPrice] = useState(MAX_PRICE)
  const [inputPhrase, setInputPhrase] = useState("")
  useEffect(() => {
    if (props.data.courses) {
      setCourses(props.data.courses)
      setFilteredCourses(props.data.courses)
    }
  }, [])

  ///
  /// Live displayed courses update
  ///
  const updateFilter = (e) => {
    const filtered = new Set() 

    /// virtual courses
    const virtual = courses.filter(c =>  
      (c.place.virtual && e.virtual) &&
      c.price <= e.price
    )
    virtual.forEach(c => filtered.add(c))

    /// live courses
    const live = courses.filter(c => 
      (!c.place.virtual && e.live) &&
      c.price <= e.price
    )
    live.forEach(c => filtered.add(c))

    const filteredArr = Array.from(filtered)
    const filteredCoursesByPhrase = filteredArr.filter(c => c.name.match(e.phrase))

    setFilteredCourses(filteredCoursesByPhrase)
  }

  ////////////// GUI ///////////////

  return (
    <Content>
      <Row className="min-h-screen">
        <Col span={6} className="my-12 pl-12">
          <div className="mb-8">
            <h2 className="text-xl">Filtrování kurzů</h2>
            <Input 
              placeholder="Hledat kurz..." 
              onChange={(e) => {
                setInputPhrase(e.target.value) 
                updateFilter({
                  phrase: e.target.value,                 
                  virtual: checkedVirtual,
                  price: sliderPrice,
                  live: checkedLive
                })}
              }/>
          </div>
          
          <div className="mb-8">
            <h3>Typ kurzu</h3>
            <Checkbox 
              defaultChecked={true}
              checked={checkedVirtual}
              onChange={(e) => { 
                console.log(e.target.checked)
                setCheckedVirtual(e.target.checked)
                updateFilter({
                  virtual: e.target.checked,
                  live: checkedLive,
                  price: sliderPrice,
                  phrase: inputPhrase
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
                  virtual: checkedVirtual,
                  price: sliderPrice,
                  phrase: inputPhrase
                }) }}
            >
              Prezenční
            </Checkbox>
          </div>

          <h3>Cena v bodech</h3>
          <span>0</span>
          <span className="float-right">{MAX_PRICE}</span>
          <Slider 
            className="mx-20" 
            defaultValue={MAX_PRICE} 
            max={MAX_PRICE} 
            onAfterChange={(e) => {
              setSliderPrice(e)
              updateFilter({
                live: checkedLive,
                virtual: checkedVirtual,
                price: e,
                phrase: inputPhrase
              })
            }} 
          />
        </Col>
        <Col span={18}>
          <ul className="my-10">
            { filteredCourses.map(c => (
                <li className="m-auto flex w-9/12 my-4 bg-gray-200" key={c.id} >
                  <div className="flex-none ">
                    <img className="cursor-pointer" onClick={() => router.push(`courseDetail?id=${c.id}`)} src="https://via.placeholder.com/200" width={200}></img>
                  </div>
                  <div className="flex-auto block w-full mx-4">
                    <div className="float-right my-2">
                      <span className="text-xl">{c.price}kr.</span>
                    </div>
                    <div className="my-2">
                      <span >
                        <button className="text-3xl" onClick={() => router.push(`courseDetail?id=${c.id}`)}> 
                          {c.name}
                        </button>
                      </span>
                    </div>
                  
                    <span className="block w-full">{c.description}</span>
                    <span className="block w-full">{c.date.substring(0,10)}</span>
                    <span className="block w-full">{Math.round(c.evaluation)}/5</span>
                    <span className="block w-full">{c.type}</span>
                  </div>
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