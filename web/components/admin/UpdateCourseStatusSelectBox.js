import { Button, Input } from 'antd'

const UpdateCourseStatusSelectBox = (props) => {

  return (
    <div>
      {/* {props.id} */}
      <Input />
      <Button onClick={() => console.log(props.user)}>Potvrdit</Button>
    </div>
  )
}

export default UpdateCourseStatusSelectBox