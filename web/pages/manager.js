import React from 'react'
import { useQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import { Tabs, Typography, Avatar } from 'antd'
const { TabPane } = Tabs;
import { FileAddOutlined, UserAddOutlined, UserOutlined, TeamOutlined } from '@ant-design/icons'

import '@/core/types'
import Content from '../components/common/Content'
import ProCard from '@/components/common/ProCard'
import CreateCourse from '@/components/manager/CreateCourse'
import { fetchAllManager } from '@/core/graphql/queries/managerQueries'
import EditCourse from '@/components/manager/EditCourse';
import CreateInstructor from '@/components/manager/CreateInstructor'
import { ALL_COURSE_DETAIL_QUERY } from "@/core/graphql/queries/courseDetailQueries"

///
/// Manager create course page
///
export default function managerPage(props) {
    const router = useRouter()
    const newCourseTab = router.query.newCourse
    const editCourseTab = router.query.editCourse
    let course = {}
    if (editCourseTab) {
      const id = parseInt(router.query.id)
      const { loading, error, data } = useQuery(ALL_COURSE_DETAIL_QUERY, 
        {variables: { id }})
      if (loading) return null;
      if (error) return `Error! ${error}`;
      course = data.courses.nodes[0]
    }
    return (
      <Content>
        <ProCard>
          <Tabs tabPosition="left" defaultActiveKey={newCourseTab || editCourseTab ? "newCourse" : "profil"}>
            <TabPane disabled
              tab={
                <div className="items-center mb-5 w-56 cursor-default">
                  <Typography.Title level={5}>Rene Novak</Typography.Title>
                  <Avatar src="" size={70} draggable="false" />
                </div>
              }
            >
            </TabPane>
            <TabPane key="profil"
              tab={
                <span>
                  <UserOutlined />
                  Profil
                </span>
              }
            >
            </TabPane>
            <TabPane key="users"
              tab={
                <span>
                  <TeamOutlined />
                  Uživatelé
                </span>
              }
            ></TabPane>
            <TabPane key="newCourse"
              tab={
                <span>
                  <FileAddOutlined />
                  Nový kurz
                </span>
              }
            >
              {editCourseTab
                ? <EditCourse course={course} instructors={props.data.instructors} courseId="366"></EditCourse>
                : <CreateCourse instructors={props.data.instructors}></CreateCourse>
              }
            </TabPane>
            <TabPane key="newInstructor"
              tab={
                <span>
                  <UserAddOutlined />
                  Nový lektor
                </span>
              }
            >
              <CreateInstructor></CreateInstructor>
            </TabPane>
          </Tabs>
        </ProCard>
      </Content>
    )
  }

  ///
/// This gets called on every request
///
export const getServerSideProps = async () => {
  const res = await fetchAllManager()
  return { props: { data: { instructors: res.instructors } } }
}