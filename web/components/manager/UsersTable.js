
import { Table, Popover, Button, Typography } from 'antd'
const { Title } = Typography  
import AddCreditsInput from '@/components/admin/AddCreditsInput'
import UserReservationsTable from '@/components/admin/UserReservationsTable'

///
/// UsersTable component
///
const UsersTable = ({ users }) => {

  return (
    <section className="mt-10 mr-4">
      <header  className="mt-10 mb-5 border-b w-full text-center">
        <Title level={3}>Uživatelé</Title>
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
  )
}
  
export default UsersTable