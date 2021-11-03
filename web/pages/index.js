import Content from '../components/common/Content'
import { Tabs, Typography, Image, Row, Col, Space, Statistic, Spin } from 'antd';
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
import { useEffect, useState } from 'react'
import { ALL_MAINPAGE_QUERY } from "@/core/graphql/queries/mainPage.Queries"
import { fetchAllMainPage } from "@/core/graphql/queries/mainPage.Queries"
import PopularInstructorsCard from '../components/common/PopularInstructorsCard'
import PopularCoursesCard from '../components/common/PopularCoursesCard'
import CoursesMainCard from '../components/common/CoursesMainCard'

const { TabPane } = Tabs;
const { Title, Paragraph } = Typography;

function SamplePrevArrow(props) {
  const { onClick } = props;
  return (
    <ArrowLeftOutlined className="absolute top-2/4 -left-7 text-4xl" onClick={onClick} />
  );
}

function SampleNextArrow(props) {
  const { onClick } = props;
  return (
    <ArrowRightOutlined className="absolute top-2/4 left-full fs-5 text-4xl" onClick={onClick} />
  );
}

///
/// Home page
///
export default function homePage(props) {
  const [mainPage, setCourses] = useState([])

  useEffect(() => {
    if (props.mainPage) {
      setCourses(props.mainPage)
    }
  }, [])

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
  }

  const popularInstrustors = props.mainPage.instructors.nodes.slice(0, 2);
  const itCourses = props.mainPage.itCourses.nodes
  const sportCourses = props.mainPage.sportCourses.nodes
  const allCourses = itCourses.concat(sportCourses, "sportCourses")
  console.log(allCourses, "allCourses")
  const popularCourses = sportCourses.slice(0, 2).concat(itCourses.slice(0, 2))

  return (
    <Content >
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

      <ProCard>
        <Tabs onChange={callback} type="card">
          <TabPane tab="Vše" key="1">
            <Slider {...settings} className="ml-8 pl-5 mr-10">
              {allCourses.map(c => (<CoursesMainCard courseName={c.name} price={c.price} photoUrl={c.photoUrl} capacity={c.capacity} instructor={c.instructor} place={c.place} />))}
            </Slider>
          </TabPane>
          <TabPane tab="IT" key="2">
            <Slider {...settings} className="ml-8 pl-5 mr-10">
              {itCourses.map(c => (<CoursesMainCard about={c.name} />))}
            </Slider>
          </TabPane>
          <TabPane tab="Sport" key="3">
            <Slider {...settings} className="ml-8 pl-5 mr-10">
              {sportCourses.map(c => (<CoursesMainCard about={c.name} />))}
            </Slider>
          </TabPane>
        </Tabs>
      </ProCard>

      <ProCard>
        <Title level={2}>Nejoblíbenější kurzy</Title>
        <div className="flex justify-around">
          {popularCourses.map(c => (<PopularCoursesCard course={c.name} photoUrl={c.photoUrl} />))}
        </div>
      </ProCard>

      <ProCard>
        <Title level={2}>Nejpopulárnější lektoři</Title>
        <div className="flex justify-around ">
          {popularInstrustors.map(i => (
            <PopularInstructorsCard name={i.name + " " + i.surname} courses={i.courses} photoUrl={i.photoUrl} />
          ))}
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
            <Statistic title={"Více než " + Math.round((props.mainPage.itCourses.totalCount + props.mainPage.sportCourses.totalCount) / 10) * 10 + " kurzů"} value={props.mainPage.itCourses.totalCount + props.mainPage.sportCourses.totalCount} prefix={<CustomerServiceOutlined style={{ display: "block", alignItems: "baseline" }} />} />
            <Statistic
              className="flex items-baseline inline-block align-middle"
              title="trend"
              value={20.58}
              valueStyle={{ color: '#3f8600', fontSize: "12px", paddingLeft: "0.5rem" }}
              prefix={<ArrowUpOutlined style={{ display: "block", alignItems: "baseline" }} />}
              suffix="%"
              style={{ fontSize: "12px" }}
            />
          </Col>
          <Col className="gutter-row" span={5} >
            <Statistic title={"Více než " + Math.round(props.mainPage.instructors.totalCount / 10) * 10 + " lektorů"} value={props.mainPage.instructors.totalCount} prefix={<TeamOutlined style={{ display: "block", alignItems: "baseline" }} />} />
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

///
/// This gets called on every request
///

export const getServerSideProps = async () => {
  const mainPage = await fetchAllMainPage()
  return { props: { ...mainPage } }
}
