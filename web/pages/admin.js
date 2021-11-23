import '@/core/types'
import React, { useState } from 'react'
import { useEffect } from 'react'
import Content from '@/components/common/Content'

import { fetchAllUsers } from '@/core/graphql/queries/userQueries'
import AddCreditsInput from '@/components/admin/AddCreditsInput'
import UserReservationsTable from '@/components/admin/UserReservationsTable'
import { Table, Popover, Button } from 'antd'
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
      <section className="mt-10 mr-4">
        <header>
          <h1>Administrace</h1>
        </header>
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
              title: 'Připsat kredity',
              dataIndex: 'id',
              render: id =>       
                <Popover placement="top" title="Počet kreditů" 
                  content={(<AddCreditsInput user={users.filter(u => u.id == id)[0]}/>)} 
                  trigger="click"
                >
                  <Button>Připsat</Button>
                </Popover>
            },
            {
              title: 'Kurzy',
              dataIndex: 'id',
              render: id => 
                <Popover placement="top" title="Rezervace" 
                  content={(<UserReservationsTable user={users.filter(u => u.id == id)[0]}/>)} 
                  trigger="click"
                >
                  <Button>Rezervace</Button>
                </Popover>
            },
          ]}
          dataSource={users}
        />
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