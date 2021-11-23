import { Button, Input, Table } from 'antd'

const UserReservationsTable = (props) => {

  return (
    // <div>
    // <Button onClick={console.log(props.user)}>click</Button>
      <Table
        rowKey="id"
        columns={[
          {
            title: 'ID rezervace',
            dataIndex: 'id',
          },            
          {
            title: 'Stav',
            dataIndex: 'state',
          },
        ]}
        dataSource={props.user.userCourseReservations} 
      />
    // </div>
  )
}

export default UserReservationsTable