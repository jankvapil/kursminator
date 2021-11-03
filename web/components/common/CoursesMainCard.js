import { Card, Tag, Progress, Space } from 'antd';

///
/// CoursesMainCard component
///
const CoursesMainCard = (props) => {
    // TODO
    // console.log(props.instructor)
    // console.log(props.place)

    return (
        <div>
            <Card
                style={{ width: 240 }}
                cover={
                    <img
                        alt="example"
                        src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                    />
                }
            >
                <div className="flex justify-between">
                    <div>
                        <p className="font-bold">{props.courseName}</p>
                        <p className="text-gray-400">Jmeno Lektora</p>
                        <p>{props.price + " Bodů"}</p>
                    </div>
                    <div className="flex flex-col items-center justify-between">
                        <Space direction="vertical" align="center" size={12}>
                            <Progress type="circle" percent={90} strokeColor={"#52C41A"} width={50} />
                            <Tag style={{ borderRadius: "1.5rem", marginRight: "0" }} color="processing">processing</Tag>
                        </Space>
                    </div>
                </div>
            </Card>
            {/* <Progress type="circle" percent={90} strokeColor={30 < 50 ? "red" : "green"} width={50} />
            <Progress type="circle" percent={90} strokeColor={"#52C41A"} width={50} /> */}
        </div>
    )
}

export default CoursesMainCard