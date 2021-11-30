import '@/core/types'
import React, { useState } from 'react'
import { useEffect } from 'react'
import Content from '@/components/common/Content'

import { fetchAllUsers } from '@/core/graphql/queries/userQueries'
import AddCreditsInput from '@/components/admin/AddCreditsInput'
import UserReservationsTable from '@/components/admin/UserReservationsTable'
import { Table, Popover, Button } from 'antd'
import { useRouter } from 'next/router'
import UsersTable from '@/components/manager/UsersTable'


///
/// Courses search page
///
export default function coursesPage(props) {
  const router = useRouter()
  const [users, setUsers] = useState([])

  useEffect(() => {
    console.log(props)
    if (props.data.users) {
      setUsers(props.data.users)
    }
  }, [])



  ////////////// GUI ///////////////

  return (
    <Content>
      <UsersTable users={users}/>
    </Content>
  )
}

///
/// This gets called on every request
///
export const getServerSideProps = async () => {
  const users = await fetchAllUsers()
  return { props: { data: { ...users } } }
}