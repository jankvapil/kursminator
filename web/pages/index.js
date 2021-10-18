import Content from '../components/common/Content'
import { Layout, Card, Tabs, Typography, Image } from 'antd';

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

      <Layout.Content
        className=""
        style={{
          minHeight: 280,
          padding: "24px",
          backgroundColor: "white"
        }}
      >
        <Title level={2}>Online vzdělávací kurzy pro všechny.</Title>
        <Paragraph>Vyberte si z naší široké nabídky témat jako je osobní rozvoj, komunikační dovednosti, manažerské dovednosti nebo rozvíjet své specializovanosti prostřednictvím široké škály odborných kurzů.</Paragraph>
        <Image
          // width={200}
          src="/cource-logo.png"
          preview={false}
        />
        <ul className="list-disc">
          <li>Naučte se pohodlně od profíků to, co potřebujete pro svou práci a osobní rozvoj.</li>
          <li>Sbírejte body za každou absolvovanou přednášku</li>
          <li>10% obsazení kurzu je vždy uděleno zdarma</li>
        </ul>
      </Layout.Content>

      <Layout.Content >

        <Card title="Online vzdělávací kurzy pro všechny." bordered={false} style={{ MaxWidth: 1171 }}>
          <p>Card content</p>
          <p>Card content</p>
          <p>Card content</p>
        </Card>

        <Tabs onChange={callback} type="card">
          <TabPane tab="Tab 1" key="1">
            Content of Tab Pane 1
          </TabPane>
          <TabPane tab="Tab 2" key="2">
            Content of Tab Pane 2
          </TabPane>
        </Tabs>

        <Card title="Online vzdělávací kurzy pro všechny." bordered={false} style={{ width: 300 }}>
          <p>Card content</p>
        </Card>

        <Card title="Nejoblíbenější kurzy" bordered={false} style={{ width: 300 }}
          cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}>
          <p>Card content</p>
        </Card>

        <Card title="Nejpopulárnější lektoři" bordered={false} style={{ width: 300 }}
          cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}>
          <p>Card content</p>
        </Card>

        <Layout.Content
          className=""
          style={{
            minHeight: 280,
            padding: "24px",
            backgroundColor: "white"
          }}
        >
          Content
        </Layout.Content>

      </Layout.Content>
    </Content>
  )
}
