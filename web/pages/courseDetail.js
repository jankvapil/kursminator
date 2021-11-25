import React, { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import moment from 'moment'
import { useRouter } from 'next/router'
import { Typography, Descriptions, Card, Button, Collapse, Progress, Image, message } from 'antd'
const { Title, Text } = Typography
const { Panel } = Collapse
import { CheckOutlined } from '@ant-design/icons'

import '@/core/types'
import { ALL_COURSE_DETAIL_QUERY } from "@/core/graphql/queries/courseDetailQueries"
import { getUserInfo } from '@/core/graphql/queries/userQueries'
import { bookCourseMutation } from '@/core/graphql/mutations/userMutations'
import Content from '@/components/common/Content'
import ProCard from '@/components/common/ProCard'
import CourseDefficultyMapper from '@/core/mappers/course-difficulty.mapper'

///
/// Course detail page
///
export default function courseDetailPage() {
  const router = useRouter()
  const [currentUser, setCurrentUser] = useState(null)
  const [logged, setLogged] = useState(false)
  useEffect(() => {
    const isLogged = Boolean(localStorage.getItem("isLogged"))
    if (isLogged) {
      setLogged(true)
      loadUserInfo()
    }
  }, [])

  const loadUserInfo = async () => {
    const res = await getUserInfo()
    if (res) setCurrentUser(res)
  }

  const id = parseInt(router.query.id)
  const { loading, error, data } = useQuery(ALL_COURSE_DETAIL_QUERY, 
    {variables: { id }})
  
  if (loading) return null
  if (error) return `Error! ${error}`
  const course = data.courses.nodes[0]

  ///
  /// Creates a reservation of a course
  ///
  const bookCourse = async () => {
    if (!logged) {
      message.error('Pro registraci kurzu se musítě přihlásit!')
      return
    }
    const filtered = currentUser.userCourseReservations.filter(c => c.id = course.id)
    if (filtered.length > 0) {
      const res = await bookCourseMutation(currentUser.id, filtered[0].id)
      console.log(res)
    } else {
      message.error('Kurz jste již rezervoval/a!')
    }
  }

  ///////////////// GUI ///////////////////

  return (
    <Content>
      <ProCard>
        <div className="flex flex-row w-full justify-between">
          <div className="flex flex-col w-2/5">
            <Title level={5}>{course.name}</Title>
            <Text>{course.description}</Text>
            <Descriptions bordered className="w-full mt-5">
              <Descriptions.Item label="Jméno Lektora" span={3} className="bg-gray-50">{course.instructor.name} {course.instructor.surname}</Descriptions.Item>
              <Descriptions.Item label="Místo konání" span={3} labelStyle={{background: "#FFF"}}>{course.place.virtual ? "Online" : course.place.address}</Descriptions.Item>
              <Descriptions.Item label="Obtížnost" span={3} className="bg-gray-50">{CourseDefficultyMapper.toFormat(course.difficulty)}</Descriptions.Item>
              <Descriptions.Item label="Čas" span={3} labelStyle={{background: "#FFF"}}>{course.duration} hodin</Descriptions.Item>
              <Descriptions.Item label="Datum" span={3} className="bg-gray-50">{moment(course.date).format('D.M.YYYY HH:mm')}</Descriptions.Item>
            </Descriptions>
            <Descriptions bordered className="w-full mt-8">
              <Descriptions.Item span={3} className="bg-gray-50"><Text className="text-3xl">V tomto kurzu se naučíte</Text></Descriptions.Item>
              {course.skills.map((item, idx, i) => 
                <Descriptions.Item span={3} className={idx % 2 == 0 ? "bg-gray-50" : "" } key={i}>
                  <div className="flex flex-row items-center">
                    <CheckOutlined />
                    <span className="ml-2">{item}</span>
                  </div>
                </Descriptions.Item>)}
            </Descriptions>
          </div>
          <div className="flex flex-col w-2/5 space-y-8">
            <Card
              style={{background: "#F0F2F5"}}
              cover={<Image style={{ height: 225 }} preview={false} className="object-cover" draggable="false" src={course.photoUrl} fallback="data:image/pngbase64,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 "/>}
            >
              <div className="flex flex-col -mt-5">
                <div className="flex flex-row justify-between">
                  <div className="flex flex-col">
                    <Title level={3}>{course.price} bodů</Title>
                    <span className="text-gray">Zbyva {course.capacity - course.occupancy} míst za tuto cenu!</span>
                  </div>
                  <div className="flex flex-col mr-5">
                    <span className="text-center text-gray mb-2">obsazenost</span>
                    <Progress 
                      type="circle" 
                      strokeColor="#52C41A" 
                      trailColor="#E4E4E4"
                      width="50" 
                      strokeLinecap="square"
                      status="normal"
                      format={() => `${course.occupancy}/${course.capacity}`}
                      percent={course.occupancy / course.capacity * 100}
                    />
                  </div>
                </div>
                {/* map button to action */}
                <Button className="w-full mt-2" type="primary" onClick={bookCourse}>Rezervovat</Button>
              </div>
            </Card>
            <div className="flex flex-col">
              <Title level={5}>Obsah kurzu</Title>
              <Collapse defaultActiveKey={['0']}>
                {course.content.map((item, idx) =>
                  <Panel header={item.name} key={idx}>
                    <ul className="space-y-4 list-disc ml-5">{item.subchapters.map((sub, i) => <li key={i}>{sub}</li>)}</ul>
                  </Panel>)}
              </Collapse>
            </div>
          </div>
        </div>
      </ProCard>
    </Content>
  )
}
