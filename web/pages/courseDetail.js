import React from 'react'
import { useQuery } from '@apollo/client'
import moment from 'moment'
import { useRouter } from 'next/router'
import { Typography, Descriptions, Card, Button, Collapse, Progress, Image } from 'antd'
const { Title, Text } = Typography;
const { Panel } = Collapse;
import { CheckOutlined } from '@ant-design/icons';

import '@/core/types'
import { COURSE_AND_RESERVATION_BY_ID_QUERY } from "@/core/graphql/queries/coursesQueries"
import Content from '../components/common/Content'
import CourseDefficultyMapper from '@/core/mappers/course-difficulty.mapper'

///
/// Course detail page
///
export default function courseDetailPage() {
  const router = useRouter()
  const id = parseInt(router.query.id)
  const { loading, error, data } = useQuery(COURSE_AND_RESERVATION_BY_ID_QUERY, 
    {variables: { id }})
  
  if (loading) return null;
  if (error) return `Error! ${error}`;
  const course = data.courses[0];
  const courseReservationCount = data.userCourseReservations.length
  return (
    <Content>
      <div className="flex flex-row text-left w-full px-36 py-12 justify-between">
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
            {course.skills.map((item, idx) => 
              <Descriptions.Item span={3} className={idx % 2 == 0 ? "bg-gray-50" : "" }>
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
            cover={<Image style={{ height: 225 }} preview={false} className="object-cover" draggable="false" src={course.photoUrl} fallback="data:image/png;base64,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 "/>}
          >
            <div className="flex flex-col -mt-5">
              <div className="flex flex-row justify-between">
                <div className="flex flex-col">
                  <Title level={3}>{course.price} bodů</Title>
                  <span className="text-gray">Zbyva {course.capacity - courseReservationCount} míst za tuto cenu!</span>
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
                    format={() => `${courseReservationCount}/${course.capacity}`}
                    percent={courseReservationCount / course.capacity * 100}
                  />
                </div>
              </div>
              {/* map button to action */}
              <Button className="w-full mt-2" type="primary">Koupit</Button>
            </div>
          </Card>
          <div className="flex flex-col">
            <Title level={5}>Obsah kurzu</Title>
            <Collapse defaultActiveKey={['0']}>
              {course.content.map((item, idx) =>
                <Panel header={item.name} key={idx}>
                  <ul className="space-y-4 list-disc ml-5">{item.subchapters.map((sub) => <li>{sub}</li>)}</ul>
                </Panel>)}
            </Collapse>
          </div>
        </div>
      </div>
    </Content>
  )
}
