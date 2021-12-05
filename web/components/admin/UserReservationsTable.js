
import { Button, message, Table } from 'antd'
import { approveReservationMutation } from '@/core/graphql/mutations/adminMutations'
import router from 'next/router'

///
/// UserReservationsTable component
///
const UserReservationsTable = (props) => {

  ///
  /// Approves course reservation for selected user
  ///
  const approveReservation = async (courseId, userId) => {
    const res = await approveReservationMutation(courseId, userId)
    if (res?.aproveReservation) {
      message.success(`Rezervace ID ${res.aproveReservation} byla potvrzena`)
      router.reload()
    }
  }

  return (
    <Table
      rowKey="id"
      columns={[
        {
          title: 'ID rezervace',
          dataIndex: 'id',
        },
        {
          title: 'Název kurzu',
          dataIndex: 'id',
          render: id => {
            const reservation = props.user.userCourseReservations.filter(r => r.id == id)[0]
            return (<span>{reservation.course.name}</span>)
          }
        },                        
        {
          title: 'Stav',
          dataIndex: 'state',
        },
        {
          title: 'Potvrdit',
          dataIndex: 'id',
          render: id => {
            const reservation = props.user.userCourseReservations.filter(r => r.id == id)[0]
            
            if (reservation.state == "WAITING") return (
              <Button onClick={() => approveReservation(reservation.course.id, props.user.id)}>Potvrdit</Button>
            )
          }
        },
      ]}
      dataSource={props.user.userCourseReservations} 
    />
  )
}

export default UserReservationsTable