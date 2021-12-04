
import { message, Select } from 'antd'
const { Option } = Select
import { updateUserMutation } from '@/core/graphql/mutations/userMutations'
import router from 'next/router'

///
/// ChangeRoleForm Component
///
const ChangeRoleForm = (props) => {

  ///
  /// Handles change role event
  ///
  const handleChange = async (e) => {
    const res = await updateUserMutation({
      ...props.user, roleId: e
    })
    if (res?.updateUser?.id) {
      const newRole = props.roles.filter(r => r.id == e)[0]
      localStorage.setItem('roleId', newRole.id)
      message.success(`Uživateli ${props.user.name} ${props.user.surname} se změnila role na ${newRole.name}`)
      router.reload()
    } else {
      message.error("Nepodařilo se změnit roli")
    }
  }

  return (
    <Select defaultValue={props.user.roleId} style={{ width: 120 }} onChange={handleChange}>
    { props.roles.map(role => 
      <Option key={role.id} value={role.id}>
        {role.name}
      </Option>)
    }
    </Select>
  )
}

export default ChangeRoleForm