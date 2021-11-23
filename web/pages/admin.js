import '@/core/types'
import React, { useState } from 'react'
import { useEffect } from 'react'
import Content from '@/components/common/Content'

import { fetchAllUsers } from '@/core/graphql/queries/userQueries'

import { Table } from 'antd'
import { useRouter } from 'next/router'


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
      <h1>Administrace</h1>
      {/* <ul>
        {users.map(user => (<li>{user.name}</li>))}
      </ul> */}
      <section className="mt-10 mr-4">
        <Table
          rowKey="id"
          columns={[
            {
              title: 'Jméno',
              dataIndex: 'name',
            },            
            {
              title: 'Příjmení',
              dataIndex: 'surname',
            },
            {
              title: 'Kredity',
              dataIndex: 'credits',
            },
            {
              title: 'Přidat',
              dataIndex: 'id',
              render: id => <button onClick={() => console.log(`${id}`)}>Připsat kredity</button>,
            },
            {
              title: 'Kurzy',
              dataIndex: 'id',
              render: id => <button onClick={() => console.log(`${id}`)}>Upravit stav kurzů</button>,
            },
          ]}
          dataSource={users} />
      </section>
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