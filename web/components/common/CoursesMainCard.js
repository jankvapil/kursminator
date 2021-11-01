import { Card, Tag, Progress, Space } from 'antd';

///
/// CoursesMainCard component
///
const CoursesMainCard = (props) => {

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
                        {/* TODO */}
                        {/* <p className="font-bold">name{data.sportCourses[0].name}</p> */}
                        <p>{props.about}</p>
                        <p className="text-gray-400">kurzy</p>
                    </div>
                    <div className="flex flex-col items-center justify-between">
                        <Space direction="vertical" align="center" size={12}>
                            <Tag style={{ borderRadius: "1.5rem", marginRight: "0" }} color="processing">processing</Tag>
                            <Progress type="circle" percent={90} strokeColor={"#52C41A"} width={50} />
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