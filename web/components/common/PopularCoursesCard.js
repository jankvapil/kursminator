import { Card, Image } from 'antd';
import { useRouter } from 'next/router'

///
/// PopularCoursesCard component
///
const PopularCoursesCard = (props) => {
  const router = useRouter()

  return (
    <div className="mb-6">
      <Card bordered={false} style={{ width: 240, background: "#F0F2F5" }}
        cover={<Image
          className="cursor-pointer"
          onClick={() => router.push(`courseDetail?id=${props.id}`)}
          height={150}
          src={props.photoUrl}
          preview={false}
        />}>
        <p className="cursor-pointer" onClick={() => router.push(`courseDetail?id=${props.id}`)}>{props.course}</p>
      </Card>
    </div>
  )
}

export default PopularCoursesCard