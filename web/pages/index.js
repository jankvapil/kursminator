import Content from '../components/common/Content'
import { Card, Tabs, Typography, Image, Row, Col, Space, Statistic } from 'antd';
import ProCard from '@/components/common/ProCard';
import {
  CustomerServiceOutlined,
  ClockCircleOutlined,
  TeamOutlined,
  ArrowUpOutlined,
} from '@ant-design/icons';

const { TabPane } = Tabs;
const { Title, Paragraph } = Typography;

import styles from "../styles/index.module.css"

///
/// Home page
///
export default function homePage() {

  function callback(key) {
    console.log(key);
  }

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
            Content of Tab Pane 1
          </TabPane>
          <TabPane tab="IT" key="2">
            Content of Tab Pane 2
          </TabPane>
          <TabPane tab="Sport" key="2">
            Hello
          </TabPane>
        </Tabs>
      </ProCard>

      <ProCard>
        <Title level={2}>Nejoblíbenější kurzy</Title>
        <Card title="Nejoblíbenější kurzy" bordered={false} style={{ width: 300 }}
          cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}>
          <p>Card content</p>
        </Card>
      </ProCard>

      <ProCard>
        <Title level={2}>Nejpopulárnější lektoři</Title>
        <Card title="Nejpopulárnější lektoři" bordered={false} style={{ width: 300 }}
          cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}>
          <p>Card content</p>
        </Card>
      </ProCard>

      <ProCard>
        <Row gutter={16}>
          <Col className="gutter-row" span={8} >
          <Statistic title="Active Users" value={112893} />
            <ClockCircleOutlined />
            <Statistic
            title="Active"
            value={11.28}
            precision={2}
            valueStyle={{ color: '#3f8600' }}
            prefix={<ArrowUpOutlined />}
            suffix="%"
          />
          </Col>
          <Col className="gutter-row" span={8} >
            <CustomerServiceOutlined />
          </Col>
          <Col className="gutter-row" span={8} >
            <TeamOutlined />
          </Col>
        </Row>
      </ProCard>

    </Content>
  )
}
