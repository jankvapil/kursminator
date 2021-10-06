
import Content from '../components/common/Content'
import { Calendar } from 'antd'

///
/// Calendar page
///
export default function calendarPage() {
  
  const onPanelChange = (value, mode) => {
    console.log(value.format('YYYY-MM-DD'), mode);
  }

  return (
    <Content>
      Calendar page
      <Calendar onPanelChange={onPanelChange} />
    </Content>
  )
}
