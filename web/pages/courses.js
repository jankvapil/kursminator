import '@/core/types'
import React, { useState } from 'react'
import { useEffect } from 'react'
import Content from '@/components/common/Content'

import { fetchAllCourses } from '@/core/graphql/queries/coursesQueries'

import { Row, Col, Slider, Checkbox, Input, Progress, Divider, Radio } from 'antd'
import { useRouter } from 'next/router'
import ProCard from '@/components/common/ProCard'
import moment from 'moment';
import styles from "../styles/Content.module.css"

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
      <ProCard>
        <Row className="min-h-screen">
          <Col className="w-full block sm:hidden">
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
                  })
                }
                } />
            </div>
          </Col>
          <Col lg={6} md={24} sm={24} className="hidden lg:block">
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
                  })
                }
                } />
            </div>

            <div className="mb-8">
              <h3><Divider>Typ kurzu</Divider></h3>
              <div className="flex justify-between mx-6">
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
                    })
                  }}
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
                    })
                  }}
                >
                  Prezenční
                </Checkbox>
              </div>
            </div>

            <h3><Divider>Cena v bodech</Divider></h3>
            <div className="mx-6">
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
            </div>

            <h3><Divider>Obsazenost</Divider></h3>
            <div className="flex flex-col mx-6">
              <Radio>Malá</Radio>
              <Radio>Střední</Radio>
              <Radio>Velká</Radio>
            </div>

            <div className="flex flex-row justify-between lg:flex-col">
              <div className="w-5/12 lg:w-full">
                <h3><Divider>Obtížnost</Divider></h3>
                <div className="flex flex-col mx-6">
                  <Checkbox
                    className="my-1"
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
                      })
                    }}
                  >
                    Expert
                  </Checkbox>
                  <br />

                  <Checkbox
                    className="my-1"
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
                      })
                    }}
                  >
                    Pokročilý
                  </Checkbox>
                  <br />

                  <Checkbox
                    className="my-1"
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
                      })
                    }}
                  >
                    Začátečník
                  </Checkbox>
                </div>
              </div>
              <div className="w-5/12 lg:w-full">
                <h3><Divider>Délka kurzu</Divider></h3>
                <div className="flex flex-col justify-between mx-6">
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
                      })
                    }}
                  >
                    0 - 3 hodiny
                  </Checkbox>
                  <br />

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
                      })
                    }}
                  >
                    3 - 6 hodin
                  </Checkbox>
                  <br />

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
                      })
                    }}
                  >
                    16 - 17 hodin
                  </Checkbox>
                  <br />

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
                      })
                    }}
                  >
                    17+ hodin
                  </Checkbox>
                </div>
              </div>
            </div>
          </Col>

          <Col lg={18} md={24} sm={24}>
            <ul className="">
              {filteredCourses.map(c => (
                <li className={`${styles.itemBackgroundColor} m-auto flex w-full lg:w-9/12 my-4`} key={c.id} >
                  <div className="flex-none ">
                    <img className="cursor-pointer w-28 sm:w-48" onClick={() => router.push(`courseDetail?id=${c.id}`)} src={c.photoUrl} ></img>
                  </div>

                  <div className="ml-3 md:ml-9 mt-1 md:mt-4">
                    <span>
                      <button className="text-xl font-bold text-left" onClick={() => router.push(`courseDetail?id=${c.id}`)}>
                        {c.name}
                      </button>
                    </span>
                    <p className="my-2 md:mt-0 hidden md:block">{c.description}</p>
                    <p className="my-2 text-gray-400 md:mt-0">{c.instructor.name} {c.instructor.surname}</p>
                    <p className="my-2 text-gray-400 md:mt-0">{c.type}</p>
                    <p className="my-2 text-gray-400 md:mt-0 hidden sm:block">Online | pokročilý | {c.duration} minut</p>
                    <p className="my-2 text-gray-400 md:mt-0">{moment(String(c.date)).format('D.M.YYYY hh:mm')}</p>
                  </div>

                  <div className="ml-auto flex flex-col justify-between items-center my-4 mr-1">
                    <span className="text-xl text-gray-400">{c.price}kr.</span>
                    <div className="flex flex-col items-center">
                      <p className="m-0 text-gray-400">obsazenost</p>
                      <Progress
                        strokeColor={c.occupancy > 80 ? "red" : "#52C41A"}
                        trailColor="#d9d9d9"
                        type="circle"
                        percent={(c.occupancy / c.capacity) * 100}
                        width={60}
                        format={() => `${c.occupancy}/${c.capacity}`}
                      />
                    </div>
                  </div>
                </li>
              ))
              }
            </ul>
          </Col>
        </Row>
      </ProCard>
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