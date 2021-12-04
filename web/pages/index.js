import Content from '../components/common/Content'
import { Tabs, Typography, Image, Row, Col, Space, Statistic } from 'antd'
import ProCard from '@/components/common/ProCard'
import Slider from "react-slick"
import {
  CustomerServiceOutlined,
  ClockCircleOutlined,
  TeamOutlined,
  ArrowUpOutlined,
  ArrowLeftOutlined,
  ArrowRightOutlined,
} from '@ant-design/icons'
import { useEffect, useState } from 'react'
import { fetchAllMainPage } from "@/core/graphql/queries/mainPage.Queries"
import PopularInstructorsCard from '../components/common/PopularInstructorsCard'
import PopularCoursesCard from '../components/common/PopularCoursesCard'
import CoursesMainCard from '../components/common/CoursesMainCard'

const { TabPane } = Tabs
const { Title, Paragraph } = Typography

function SamplePrevArrow(props) {
  const { onClick } = props
  return (
    <ArrowLeftOutlined className="absolute top-2/4 -left-7 text-4xl" onClick={onClick} />
  )
}

function SampleNextArrow(props) {
  const { onClick } = props
  return (
    <ArrowRightOutlined className="absolute top-2/4 left-full fs-5 text-4xl" onClick={onClick} />
  )
}

///
/// Home page
///
export default function homePage(props) {
  const [mainPage, setCourses] = useState([])
  const [popularInstrustors, setpopularInstrustors] = useState([])
  const [itCourses, setitCourses] = useState([])
  const [sportCourses, setsportCourses] = useState([])
  const [allCourses, setallCourses] = useState([])
  const [popularCourses, setpopularCourses] = useState([])
  const [totalCourses, setTotalCourses] = useState([])
  const [totalInstructors, setInstructorsCourses] = useState([])
  console.log(itCourses)
  console.log(sportCourses)
  console.log(allCourses)

  useEffect(() => {
    if (props.mainPage) {
      setCourses(props.mainPage)
      setpopularInstrustors(props.mainPage.instructors.nodes.slice(0, 2))

      // TODO correct query
      // setitCourses(props.mainPage.itCourses.nodes)
      // setsportCourses(props.mainPage.sportCourses.nodes)
      // setallCourses(props.mainPage.itCourses.nodes.concat(props.mainPage.sportCourses.nodes, sportCourses))
      // setpopularCourses(props.mainPage.sportCourses.nodes.slice(0, 2).concat(props.mainPage.itCourses.nodes.slice(0, 1)))
      // setTotalCourses(props.mainPage.itCourses.totalCount + props.mainPage.sportCourses.totalCount)
      
      // for small databese
      setitCourses(props.mainPage.courses.nodes.slice(0, 6))
      setsportCourses(props.mainPage.courses.nodes.slice(4, 9))
      setallCourses(props.mainPage.courses.nodes)
      setpopularCourses(props.mainPage.courses.nodes.slice(0, 2).concat(props.mainPage.courses.nodes.slice(0, 1)))
      setTotalCourses(props.mainPage.courses.totalCount * 38)

      setInstructorsCourses(props.mainPage.instructors.totalCount)
    }
  }, [])
  
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    arrows: true,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          arrows: true
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          arrows: true
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          arrows: false
        }
      },
    ]
  }

  function callback(key) {
    console.log(key)
  }

  return (
    <Content >
      <ProCard>
        <Row gutter={16}>
          <Col className="gutter-row" lg={12} md={12} sm={20}>
            <Space direction="vertical" size={0}>
              <Title level={2}>Online vzdělávací kurzy pro všechny.</Title>
              <ul className="hidden sm:block list-disc list-inside pl-8">
                <Space direction="vertical" size={40}>
                  <li >Naučte se pohodlně od profíků to, co potřebujete pro svou práci a osobní rozvoj.</li>
                  <li >Sbírejte body za každou absolvovanou přednášku</li>
                  <li >10% obsazení kurzu je vždy uděleno zdarma</li>
                </Space>
              </ul>
              <Paragraph>Vyberte si z naší široké nabídky témat jako je osobní rozvoj, komunikační dovednosti, manažerské dovednosti nebo rozvíjet své specializovanosti prostřednictvím široké škály odborných kurzů.</Paragraph>
            </Space>
          </Col>
          <Col className="hidden md:block gutter-row" lg={10} md={10} sm={0} offset={2}>
            <Image
              src="/cource-logo.png"
              preview={false}
            />
          </Col>
        </Row>
      </ProCard>

      <ProCard>
        <Tabs onChange={callback} type="card">
          <TabPane className="" tab="Vše" key="1">
            <Slider {...settings} className="ml-0 pl-0 mr-0 md:ml-8 md:pl-5 md:mr-10 xl:ml-8 xl:pl-5 xl:mr-10">
              {allCourses.map((c, i) => (<CoursesMainCard courseName={c.name} price={c.price} photoUrl={c.photoUrl} capacity={c.capacity} instructor={c.instructor} place={c.place} id={c.id} occupancy={c.occupancy} key={i} />))}
            </Slider>
          </TabPane>
          <TabPane tab="IT" key="2">
            <Slider {...settings} className="ml-0 pl-0 mr-0 md:ml-8 md:pl-5 md:mr-10 xl:ml-8 xl:pl-5 xl:mr-10">
              {itCourses.map((c, i) => (<CoursesMainCard courseName={c.name} price={c.price} photoUrl={c.photoUrl} capacity={c.capacity} instructor={c.instructor} place={c.place} id={c.id} occupancy={c.occupancy} key={i} />))}
            </Slider>
          </TabPane>
          <TabPane tab="Sport" key="3">
            <Slider {...settings} className="ml-0 pl-0 mr-0 md:ml-8 md:pl-5 md:mr-10 xl:ml-8 xl:pl-5 xl:mr-10">
              {sportCourses.map((c, i) => (<CoursesMainCard courseName={c.name} price={c.price} photoUrl={c.photoUrl} capacity={c.capacity} instructor={c.instructor} place={c.place} occupancy={c.occupancy} id={c.id} key={i} />))}
            </Slider>
          </TabPane>
        </Tabs>
      </ProCard>

      <ProCard>
        <Title level={2}>Nejoblíbenější kurzy</Title>
        <div className="flex flex-col justify-around md:flex-row">
          {popularCourses.map((c, i) => (<PopularCoursesCard course={c.name} photoUrl={c.photoUrl} id={c.id} key={i} />))}
        </div>
      </ProCard>

      <ProCard>
        <Title level={2}>Nejpopulárnější lektoři</Title>
        <div className="flex flex-col justify-around md:flex-row">
          {popularInstrustors.map((c, i) => (
            <PopularInstructorsCard name={c.name + " " + c.surname} courses={c.courses} photoUrl={c.photoUrl} id={c.id} key={i} />
          ))}
        </div>
      </ProCard>

      <ProCard className="hidden md:block">
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
            <Statistic title={"Více než " + Math.round((totalCourses) / 10) * 10 + " kurzů"} value={totalCourses} prefix={<CustomerServiceOutlined style={{ display: "block", alignItems: "baseline" }} />} />
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
            <Statistic title={"Více než " + Math.round(totalInstructors / 10) * 10 + " lektorů"} value={totalInstructors} prefix={<TeamOutlined style={{ display: "block", alignItems: "baseline" }} />} />
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
