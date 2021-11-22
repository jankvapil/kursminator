import Content from '../components/common/Content'
import { Calendar, Badge, List, ConfigProvider, Divider } from 'antd'
import "moment/locale/cs";
import locate from "antd/lib/locale/cs_CZ";
import '@/core/types'
import React, { useEffect, useState } from 'react'

import { gql } from 'graphql-request'
import { client } from '@/core/graphql/client'
import ProCard from '@/components/common/ProCard';
import { useRouter } from 'next/router'


function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      function handleResize() {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }

      window.addEventListener("resize", handleResize);

      handleResize();

      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);
  return windowSize;
}

function getListData(value, courses) {
  let listData = []
  let datum = value.toDate()
  for (let i = 0; i < courses.length; i++) {
    if (getDateTime(courses[i].date) === getDateTime(datum)) {
      listData.push({ type: 'success', content: courses[i].name })
    }
  }

  return listData || [];
}

// vrati casovy rozsah kurzu
function getStringRangeTime(dateString, duration) {
  let date = new Date(dateString)
  let h = date.getHours()
  let m = ('0' + date.getMinutes()).slice(-2);
  let result = duration / 60
  let hh = (parseInt(result) + h) % 24
  let mm = duration - (parseInt(result) * 60)
  mm = ('0' + mm).slice(-2)
  return h + ':' + m + ' - ' + hh + ':' + mm
}

// vrati datum (pro porovnani s ostatnimi daty)
function getDateTime(dateString) {
  let date = new Date(dateString)
  return new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime()
}

///
/// Calendar page
///
export default function calendarPage() {
  const sizeWindow = useWindowSize();
  const router = useRouter()

  function renderListMetaLink(name, id, link) {
    return <p className="cursor-pointer" onClick={() => router.push(`${link}id=${id}`)}>{name}</p>
    // return <p className="cursor-pointer" onClick={() => router.push(`courseDetail?id=${id}`)}>{name}</p>
  }

  // naplni kalendar
  function dateCellRender(value, courses) {
    const listData = getListData(value, courses);
    return (
      <ul className="events">
        {listData.map(item => (
          <li key={item.content}>
            <Badge status={item.type} text={sizeWindow.width < 640 ? "" : item.content} />
          </li>
        ))}
      </ul>
    );
  }

  const [coursesData, setCoursesData] = useState([]) // vsechny kurzy
  const [courses, setCourses] = useState([]) // aktulni kurzy (vyfiltrovane podle zvoleneho dnu v kalendari)
  const [selectedDate, setSelectedDate] = useState(new Date()) // zvolene datum v kalendari

  useEffect(() => {
    //setSelectedDate(new Date("2019/02/02"))
    loadCourses()
  }, [])

  const loadCourses = async () => {
    const query = gql`  
        query {
          courses {
          totalCount
            nodes {
              id
              name
              date
              price
              evaluation
              duration
              description
              instructor {
                id
                name
                surname
              }
            }
          }
        }`

    try {
      let dat = await client.request(query)
      console.log(dat.courses.nodes)
      setCoursesData(dat.courses.nodes)
    }
    catch (error) {
      console.log(error)
      return 'Error: ' + error;
    }
  }

  // nastane pri vyberu roku nebo měsíce
  const onPanelChange = (value, mode) => {
    console.log(value.format('YYYY-MM-DD'), mode);
  }

  // nastane pri kliknuti do kalendare
  function onSelect(date) {
    var tmp = date.toDate()
    setSelectedDate(tmp)

    // filtrace dat podle zvoleneho dnu
    let filtered = coursesData.filter(c =>
      getDateTime(c.date) == getDateTime(tmp)
    )

    // ve zvoleny den se naplni aktualni kurzy
    setCourses(filtered)
  }

  return (
    <Content>
      <ProCard>
        <div className="flex flex-col gap-x-4 sm:flex-row">
          <ConfigProvider locale={locate}>
            <Calendar
              dateCellRender={(e) => dateCellRender(e, coursesData)}
              className="w-full sm:w-5/6"
              fullscreen={sizeWindow.width > 640 ? true : false}
              onPanelChange={onPanelChange}
              onSelect={onSelect}
            />
            <div className="block sm:hidden">
              <Divider >Detail dne</Divider>
            </div>
            <List
              className="w-full sm:w-1/6 pl-5"
              header={<p className="font-bold">{selectedDate.getDate()}.{selectedDate.getMonth() + 1}.{selectedDate.getFullYear()}</p>}
              dataSource={courses}
              renderItem={item => (
                <List.Item>
                  <List.Item.Meta
                    title={getStringRangeTime(item.date, item.duration)}
                    description={item.duration + ' min'}
                  />
                  <List.Item.Meta
                    title={renderListMetaLink(item.name, item.id, "courseDetail?")}
                    description={renderListMetaLink(item.instructor.name, item.instructor.id, "instructorDetail?")}
                  />
                </List.Item>
              )}
            />
          </ConfigProvider>
        </div>
      </ProCard>
    </Content>
  )
}
