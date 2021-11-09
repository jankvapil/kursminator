
import React from 'react'
import { useQuery } from '@apollo/client'
import moment from 'moment'
import { useRouter } from 'next/router'
import { Avatar, Typography, Table, Descriptions } from 'antd'
const { Title } = Typography;

import '@/core/types'
import { ALL_INSTRUCTOR_DETAIL_QUERY } from "@/core/graphql/queries/instructorDetailQueries"
import Content from '../components/common/Content'
import ProCard from '@/components/common/ProCard'

const coursesData = [];
const coursesColumns = [
  {
    title: 'Název',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Datum',
    dataIndex: 'date',
    key: 'date',
  },
  {
    title: 'Cena',
    dataIndex: 'price',
    key: 'price',
  },
  {
    title: 'Typ',
    dataIndex: 'type',
    key: 'type',
  },
];

///
/// Instructor detail page
///
export default function instructorDetailPage() {
  const router = useRouter()
  const id = parseInt(router.query.id)
  const { loading, error, data } = useQuery(ALL_INSTRUCTOR_DETAIL_QUERY, 
    {variables: { id }})

  if (loading) return null;
  if (error) return `Error! ${error}`;
  const instructor = data.instructors.nodes[0];
  instructor.courses.forEach(course => (
    coursesData.push({
      'name': course.name,
      'date': moment(course.date).format('D.M.YYYY'),
      'price': course.price,
      'type': course.type
    })
  ))
  return (
    <Content>
      <ProCard>
        <div className="flex flex-col w-full">
          <Title level={3}>{instructor.name} {instructor.surname}</Title>
          <div className="flex flex-row w-full justify-between">
            <div className="mx-12 mt-4">
              <Avatar src={instructor.photoUrl} size={250} draggable="false" />
            </div>
            <div className="w-1/3">
              <Descriptions bordered>
                <Descriptions.Item label="Věk" span={3}>{instructor.age} let</Descriptions.Item>
                <Descriptions.Item label="Specializace" span={3}>{instructor.specialization}</Descriptions.Item>
                <Descriptions.Item label="Řika o sobě" span={3}>{instructor.about}</Descriptions.Item>
                <Descriptions.Item label="Kontakt" span={3}>{instructor.contact}</Descriptions.Item>
              </Descriptions>
            </div>
          </div>
          <div className="w-full pt-16">
            <Table dataSource={coursesData} columns={coursesColumns} />
          </div>``
        </div>
      </ProCard>
    </Content>
  )
}
