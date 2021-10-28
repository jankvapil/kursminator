import Content from '../components/common/Content'
import { Card, Tabs, Typography, Image, Row, Col, Space, Statistic, Tag, Progress, Spin } from 'antd';
import ProCard from '@/components/common/ProCard';
import Slider from "react-slick";
import {
  CustomerServiceOutlined,
  ClockCircleOutlined,
  TeamOutlined,
  ArrowUpOutlined,
  ArrowLeftOutlined,
  ArrowRightOutlined,
} from '@ant-design/icons';
import { useEffect } from 'react'
import useGlobal from "@/core/store"
import { useQuery } from '@apollo/client'
import { ALL_MAINPAGE_QUERY } from "@/core/graphql/queries/mainPage.Queries"

const { TabPane } = Tabs;
const { Title, Paragraph } = Typography;

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <ArrowLeftOutlined className="absolute top-2/4 -left-7 text-4xl" onClick={onClick} />
  );
}

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <ArrowRightOutlined className="absolute top-2/4 left-full fs-5 text-4xl" onClick={onClick} /> // font size 30 px
  );
}

///
/// Home page
///
export default function homePage() {
  const [globalState, globalActions] = useGlobal()
  const { loading, error, data } = useQuery(ALL_MAINPAGE_QUERY)

  useEffect(() => {
    if (data?.sportCourse) {
      globalActions.Course.setCourse(data.courses)
    }
  }, [data])

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />
  };

  function callback(key) {
    console.log(key);
    console.log(data)
    console.log(data.sportCourses[0].name);
    console.log(loading)
    console.log(error)
    console.log()
  }

  if (loading) return "Loading.."
  if (error) return "Error while loading.."
  return (
    <Content >
      <Spin tip="Načítání..." spinning={loading}>
        <ProCard>
          <Row gutter={16}>
            <Col className="gutter-row" span={12}>
              <Space direction="vertical" size={24}>
                <Title level={2}>Online vzdělávací kurzy pro všechny.</Title>
                <ul className="list-disc list-inside pl-8">
                  <Space direction="vertical" size={40}>
                    <li>Naučte se pohodlně od profíků to, co potřebujete pro svou práci a osobní rozvoj.</li>
                    <li>Sbírejte body za každou absolvovanou přednášku</li>
                    <li>10% obsazení kurzu je vždy uděleno zdarma</li>
                  </Space>
                </ul>
                <Paragraph>Vyberte si z naší široké nabídky témat jako je osobní rozvoj, komunikační dovednosti, manažerské dovednosti nebo rozvíjet své specializovanosti prostřednictvím široké škály odborných kurzů.</Paragraph>
              </Space>
            </Col>
            <Col className="gutter-row" span={10} offset={2}>
              <Image
                src="/cource-logo.png"
                preview={false}
              />
            </Col>
          </Row>
        </ProCard>
      </Spin>

      <ProCard>
        <Tabs onChange={callback} type="card">
          <TabPane tab="Vše" key="1">
            <Card
              style={{ width: 300 }}
              cover={
                <img
                  alt="example"
                  src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                />
              }
            >
              <div className="flex justify-between">
                <div>
                  <p className="font-bold">name{data.sportCourses[0].name}</p>
                  <p>content</p>
                  <p className="text-gray-400">kurzy</p>
                </div>
                <div class="flex flex-col items-center justify-between">
                  <Tag style={{ borderRadius: "1.5rem", marginRight: "0" }} color="processing">processing</Tag>
                  <Progress type="circle" percent={90} strokeColor={"#52C41A"} width={50} />
                </div>
              </div>
            </Card>
            {/* <Progress type="circle" percent={90} strokeColor={30 < 50 ? "red" : "green"} width={50} />
            <Progress type="circle" percent={90} strokeColor={"#52C41A"} width={50} /> */}
          </TabPane>
          <TabPane tab="IT" key="2">
            {/* {globalState.sportCourses.map(c => (<p>c.name</p>))} */}
          </TabPane>
          <TabPane tab="Sport" key="3">
            <Slider {...settings} className="ml-8 pl-5 mr-10">
              <div>
                <Card bordered={false} style={{ width: 240, background: "#F0F2F5" }}
                  cover={<Image
                    height={150}
                    src="https://picsum.photos/150/300"
                    preview={false}
                  />}>
                  <p>C#</p>
                </Card>
              </div>
              <div>
                <Card bordered={false} style={{ width: 240, background: "#F0F2F5" }}
                  cover={<Image
                    height={150}
                    src="https://picsum.photos/150/300"
                    preview={false}
                  />}>
                  <p>C#</p>
                </Card>
              </div>
              <div>
                <Card bordered={false} style={{ width: 240, background: "#F0F2F5" }}
                  cover={<Image
                    height={150}
                    src="https://picsum.photos/150/300"
                    preview={false}
                  />}>
                  <p>C#</p>
                </Card>
              </div>
              <div>
                <Card bordered={false} style={{ width: 240, background: "#F0F2F5" }}
                  cover={<Image
                    height={150}
                    src="https://picsum.photos/150/300"
                    preview={false}
                  />}>
                  <p>C#</p>
                </Card>
              </div>
              <div>
                <Card bordered={false} style={{ width: 240, background: "#F0F2F5" }}
                  cover={<Image
                    height={150}
                    src="https://picsum.photos/150/300"
                    preview={false}
                  />}>
                  <p>C#</p>
                </Card>
              </div>
              <div>
                <Card bordered={false} style={{ width: 240, background: "#F0F2F5" }}
                  cover={<Image
                    height={150}
                    src="https://picsum.photos/150/300"
                    preview={false}
                  />}>
                  <p>C#</p>
                </Card>
              </div>
            </Slider>
          </TabPane>
        </Tabs>
      </ProCard>

      <ProCard>
        <Title level={2}>Nejoblíbenější kurzy</Title>
        <div className="flex justify-around">
          <Card bordered={false} style={{ width: 240, background: "#F0F2F5" }}
            cover={<Image
              height={150}
              src="https://picsum.photos/150/300"
              preview={false}
            />}>
            <p>C#</p>
          </Card>
          <Card bordered={false} style={{ width: 240, background: "#F0F2F5" }}
            cover={<Image
              height={150}
              src="https://picsum.photos/150"
              preview={false}
            />}>
            <p>C#</p>
          </Card>
        </div>
      </ProCard>

      <ProCard>
        <Title level={2}>Nejpopulárnější lektoři</Title>
        <div className="flex justify-around ">

          <div className="flex " style={{ width: 470, background: "#F0F2F5" }}>
            <Image
              width={237}
              src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
              preview={false}
            />
            <div className="flex-col justify-center pl-12 pt-12">
              <p className="font-bold">name</p>
              <p className="text-gray-400">kurzy</p>
              <p>port</p>
              <p>angular</p>
              <p>sport </p>
            </div>
          </div>
        </div>
      </ProCard>

      <ProCard>
        <Row gutter={16} justify="space-between">
          <Col className="gutter-row" span={5} >
            <Statistic title="Již od roku 2005" value={112893} prefix={<ClockCircleOutlined style={{ display: "block", alignItems: "baseline" }} />} />
            <Statistic
              className="flex items-baseline inline-block align-middle"
              title="trend"
              value={11.28}
              valueStyle={{ color: '#3f8600', fontSize: "12px", paddingLeft: "0.5rem" }}
              prefix={<ArrowUpOutlined style={{ display: "block", alignItems: "baseline" }} />}
              suffix="%"
              style={{ fontSize: "12px" }}
            />
          </Col>
          <Col className="gutter-row" span={5} >
            <Statistic title="Více než 200 kurzů" value={111} prefix={<CustomerServiceOutlined style={{ display: "block", alignItems: "baseline" }} />} />
            <Statistic
              className="flex items-baseline inline-block align-middle"
              title="trend"
              value={11.28}
              valueStyle={{ color: '#3f8600', fontSize: "12px", paddingLeft: "0.5rem" }}
              prefix={<ArrowUpOutlined style={{ display: "block", alignItems: "baseline" }} />}
              suffix="%"
              style={{ fontSize: "12px" }}
            />
          </Col>
          <Col className="gutter-row" span={5} >
            <Statistic title="Více než 50 lektorů" value={58} prefix={<TeamOutlined style={{ display: "block", alignItems: "baseline" }} />} />
            <Statistic
              className="flex items-baseline inline-block align-middle"
              title="trend"
              value={11.28}
              valueStyle={{ color: '#3f8600', fontSize: "12px", paddingLeft: "0.5rem" }}
              prefix={<ArrowUpOutlined style={{ display: "block", alignItems: "baseline" }} />}
              suffix="%"
              style={{ fontSize: "12px" }}
            />
          </Col>
        </Row>
      </ProCard>

    </Content>
  )
}
