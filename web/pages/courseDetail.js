import React, { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import moment from 'moment'
import { useRouter } from 'next/router'
import { Typography, Descriptions, Card, Button, Collapse, Progress, Image, message, Rate, Avatar } from 'antd'
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

import { cancelCourseMutation } from '@/core/graphql/mutations/coursesMutations'

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
    { variables: { id }, pollInterval: 500 })

  if (loading) return null
  if (error) return `Error! ${error}`
  const course = data.courses.nodes[0]
  const occupancyPlace = Math.round(course.occupancy / 100 * course.capacity);

  function CourseInfoCard(props) {
    return (
      <Card
        className={props.className}
        style={{ background: "#F0F2F5" }}
        cover={<Image style={{ height: 225 }} preview={false} className="object-cover" draggable="false" src={course.photoUrl} />}
      >
        <div className="flex flex-col -mt-5">
          <div className="flex flex-row justify-between">
            <div className="flex flex-col">
              <Title level={3}>{course.occupancy > 10 ? course.price : "0"} kreditů</Title>
              <span className="text-gray">Zbyva {course.occupancy < 10 ? ((course.capacity * 0.1 - occupancyPlace) < 0 ? 0 : (Math.round(course.capacity * 0.1))) : 0} míst(o) za tuto cenu!</span>
            </div>
            <div className="flex flex-col mr-5">
              <span className="text-center text-gray mb-2">obsazenost</span>
              <Progress
                type="circle"
                strokeColor={course.occupancy > 80 ? "red" : "#52C41A"}
                trailColor="#E4E4E4"
                width="50"
                strokeLinecap="square"
                status="normal"
                format={() => `${occupancyPlace}/${course.capacity}`}
                percent={course.occupancy}
              />
            </div>
          </div>
          {course.canceled || currentUser && currentUser.roleId != 1 ? "" : <Button className="w-full mt-2" type="primary" onClick={bookCourse}>Rezervovat</Button>}
          {!currentUser || currentUser?.roleId != 2 ? "" : <Button className="w-full mt-2" type="primary" onClick={() => router.push(`manager?editCourse=true&id=${course.id}`)}>Editovat</Button>}
          {course.canceled || !currentUser || currentUser?.roleId != 2 ? "" : <Button className="w-full mt-2" type="primary" onClick={cancelCourse}>Zrušit</Button>}
        </div>
      </Card>
    );
  }

  ///
  /// Creates a reservation of a course
  ///
  const bookCourse = async () => {
    if (!logged) {
      message.info('Pro registraci kurzu se musíte přihlásit')
      router.push({
        pathname: '/reservation',
        query: { courseId: course.id },
      })
      return
    }
    const filtered = currentUser.userCourseReservations.filter(c => c.course.id == course.id)
    if (!filtered.length) {
      const res = await bookCourseMutation(currentUser.id, course.id)
      if (res.addUserCourseReservation) {
        message.success("Registrace kurzu proběhla úspěšně")
        await loadUserInfo()
      } else if (res.error) {
        message.error(res.error)
      } else {
        message.error("Nepodařilo se rezervovat kurz")
      }
    } else {
      message.error('Kurz jste již rezervoval/a!')
    }
  }

  ///
  /// Remove course
  ///
  const cancelCourse = async () => {
    const result = await cancelCourseMutation(course.id)
    if (result.cancelCourse) {
      message.success('Kurz byl zrušen')
    }
  }
  
  ///////////////// GUI ///////////////////

  return (
    <Content>
      <ProCard>
        <div className="flex flex-col md:flex-row w-full justify-between">
          <div className="flex flex-col w-full md:w-2/5">
          <Title level={5}>{course.name}</Title>
            <div className="flex flex-row my-5">
              <div className="hidden lg:block lg:mr-10">
                <Avatar src={course.instructor.photoUrl} size={125} draggable="false" />
              </div>
              <div className="flex flex-col">
                <Text>{course.description}</Text>
                {!currentUser || currentUser?.roleId != 2 ? "" : <Button className="w-1/3 my-2" type="primary" onClick={() => router.push(`manager?newCourse=true&id=${course.id}`)}>Vytvořit podobný</Button>}
              </div>
            </div>
            <CourseInfoCard className="block md:hidden" />
            <Descriptions bordered className="w-full mt-5">
              <Descriptions.Item label="Jméno Lektora" span={3} className="bg-gray-50" ><p className="cursor-pointer mb-0" onClick={() => router.push(`instructorDetail?id=${course.instructor.id}`)}>{course.instructor.name} {course.instructor.surname}</p></Descriptions.Item>
              <Descriptions.Item label="Místo konání" span={3} labelStyle={{ background: "#FFF" }}>{course.place.virtual ? "Online" : course.place.address}</Descriptions.Item>
              <Descriptions.Item label="Obtížnost" span={3} className="bg-gray-50">{CourseDefficultyMapper.toFormat(course.difficulty)}</Descriptions.Item>
              <Descriptions.Item label="Délka trvání" span={3} labelStyle={{ background: "#FFF" }}>{course.duration} minut</Descriptions.Item>
              <Descriptions.Item label="Datum" span={3} className="bg-gray-50">{moment(course.date).format('D.M.YYYY HH:mm')}</Descriptions.Item>
              {course.finished === true ? <Descriptions.Item label="Hodnoceni" span={3} className="bg-gray-50">{<Rate disabled defaultValue={course.evaluation} />}</Descriptions.Item> : ""}
            </Descriptions>
            <Descriptions bordered className="w-full my-8">
              <Descriptions.Item span={3} className="bg-gray-50"><Text className="text-3xl">V tomto kurzu se naučíte</Text></Descriptions.Item>
              {course.skills.map((item, idx, i) =>
                <Descriptions.Item span={3} className={idx % 2 == 0 ? "bg-gray-50" : ""} key={i}>
                  <div className="flex flex-row items-center">
                    <CheckOutlined />
                    <span className="ml-2">{item}</span>
                  </div>
                </Descriptions.Item>)}
            </Descriptions>
          </div>
          <div className="flex flex-col w-full md:w-2/5 space-y-8">
            <CourseInfoCard className="hidden md:block" />
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
