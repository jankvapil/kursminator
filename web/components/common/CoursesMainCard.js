import { Card, Tag, Progress, Space } from 'antd';
import { useRouter } from 'next/router'

///
/// CoursesMainCard component
///
const CoursesMainCard = (props) => {
    const router = useRouter()

    const photoUrl = props.photoUrl != undefined ? props.photoUrl : "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
    const instructorName = props.instructor != undefined ? props.instructor.name + " " + props.instructor.surname : "Jmeno lektora"

    return (
        <div>
            <Card
                style={{ width: 240 }}
                cover={
                    <img
                        className="cursor-pointer"
                        alt="example"
                        src={photoUrl}
                        onClick={() => router.push(`courseDetail?id=${props.id}`)}
                    />
                }
            >
                <div className="flex justify-between">
                    <div>
                        <p className="font-bold cursor-pointer" onClick={() => router.push(`courseDetail?id=${props.id}`)} >{props.courseName}</p>
                        <p className="text-gray-400 cursor-pointer" onClick={() => router.push(`instructorDetail?id=${props.instructor.id}`)}>{instructorName}</p>
                        <p>{props.occupancy > 10 ? props.price : "0" + " Kreditů"}</p>
                    </div>
                    <div className="flex flex-col items-center justify-between">
                        <Space direction="vertical" align="center" size={12}>
                            <Progress type="circle" percent={props.occupancy} strokeColor={props.occupancy > 80 ? "red" : "#52C41A"} width={50} />
                            <Tag style={{ borderRadius: "1.5rem", marginRight: "0" }} color="processing">{props.place?.virtual == true ? "Online" : "Prezenčně"}</Tag>
                        </Space>
                    </div>
                </div>
            </Card>
        </div>
    )
}

export default CoursesMainCard