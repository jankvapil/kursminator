import { Layout, Menu, Breadcrumb } from 'antd';
import 'antd/dist/antd.css';


///
/// Header component
///
const Header = () => {
  return (
    <>
      <Layout className="layout">
        <Layout.Header>
          <div className="logo" />
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
            {new Array(15).fill(null).map((_, index) => {
              const key = index + 1;
              return <Menu.Item key={key}>{`nav ${key}`}</Menu.Item>;
            })}
          </Menu>
        </Layout.Header>
      </Layout>
    </>
  )
}

export default Header