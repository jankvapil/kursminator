import { Card, Image } from 'antd';

///
/// PopularCoursesCard component
///
const PopularCoursesCard = (props) => {

    return (
        <Card bordered={false} style={{ width: 240, background: "#F0F2F5" }}
            cover={<Image
              height={150}
              src={props.photoUrl}
              preview={false}
            />}>
            <p>{props.course}</p>
          </Card>
    )
}

export default PopularCoursesCard