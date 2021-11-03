import Content from '../components/common/Content'
import { Calendar, Badge, List, ConfigProvider } from 'antd'
import "moment/locale/cs";
import locate from "antd/lib/locale/cs_CZ";
import '@/core/types'
import React, { useEffect, useState } from 'react'

import { gql } from 'graphql-request'
import { client } from '@/core/graphql/client'
import ProCard from '@/components/common/ProCard';

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

// naplni kalendar
function dateCellRender(value, courses) {
  const listData = getListData(value, courses);
  return (
    <ul className="events">
      {listData.map(item => (
        <li key={item.content}>
          <Badge status={item.type} text={item.content} />
        </li>
      ))}
    </ul>
  );
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
        <div className="flex">
          <ConfigProvider locale={locate}>
            <Calendar
              dateCellRender={(e) => dateCellRender(e, coursesData)}
              className="w-5/6"
              onPanelChange={onPanelChange}
              onSelect={onSelect}
            />
            <List
              className="w-1/6"
              header={<p className="font-bold">{selectedDate.getDate()}.{selectedDate.getMonth() + 1}.{selectedDate.getFullYear()}</p>}
              dataSource={courses}
              renderItem={item => (
                <List.Item>
                  <List.Item.Meta
                    title={getStringRangeTime(item.date, item.duration)}
                    description={item.duration + ' min'}
                  />
                  <List.Item.Meta
                    title={item.name}
                    description={item.instructor.name}
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