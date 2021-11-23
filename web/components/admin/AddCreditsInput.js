import { Button, Input } from 'antd'
import { useState } from 'react'
import { updateUserMutation } from '@/core/graphql/mutations/userMutations'
import { useRouter } from 'next/router'

///
/// Add User Credits Input Component
///
const AddCreditsInput = (props) => {
  const router = useRouter()
  const [inputValue, setInputValue] = useState(0)

  const updateUser = async (user) => {
    const res = await updateUserMutation({...user, credits: user.credits + inputValue})
    if (res.updateUser) {
      router.reload()
    }
  }

  const handleOnChange = (e) => {
    const tmp = Number(e.target.value)
    if (!isNaN(tmp)) 
      setInputValue(tmp)
  }

  return (
    <div>
      <Input value={inputValue} onChange={handleOnChange} />
      <Button onClick={() => updateUser(props.user)}>Potvrdit</Button>
    </div>
  )
}

export default AddCreditsInput