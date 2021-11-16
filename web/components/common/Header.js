import { Layout, Button, Input, Image } from 'antd'
import { MailOutlined, CalendarOutlined, MenuOutlined, ReadOutlined, SearchOutlined } from '@ant-design/icons'
import Link from 'next/link'

///
/// Header component
///
const Header = () => {
  return (
    <Layout className="layout">
      <Layout.Header className="flex justify-between sm:justify-around items-center" style={{ paddingLeft: 10, paddingRight: 10 }}>
        <div className="flex md:hidden text-2xl">
          <MenuOutlined style={{ color: "#fff" }} />
        </div>
        <div className="flex items-center mt-1 cursor-pointer">
          <Link href="/">
            <Image src="/logokursm-light.ico" alt="logo" preview={false} height="40px" />
          </Link>
          <Link href="/">
            <span className="text-3xl text-white mb-0 ml-4 font-mono font-black">Kursminator</span>
          </Link>
        </div>
        <div className="hidden sm:flex sm:items-center sm:block">
          <ReadOutlined style={{ color: "#fff" }} />
          <span className="text-white m-0 ml-2" ><Link href="/courses">Kurzy</Link></span>
        </div>
        <div className="hidden md:block w-1/4 lg:w-5/12">
          <Input placeholder="Hledaný kurz..." />
        </div>
        <div className="hidden sm:flex items-center">
          <MailOutlined style={{ color: "#fff" }} />
          <span className="text-white m-0 ml-2 mr-2"><Link href="/contact">Kontakt</Link></span>
          <CalendarOutlined style={{ color: "#fff" }} />
          <span className="text-white m-0 ml-2 mr-2"><Link href="/calendar">Kalendář</Link></span>
          <Button className="mr-5" type="primary">
            <Link href="/login">Přihlášení</Link>
          </Button>
        </div>
        <div className="flex md:hidden text-2xl">
          <SearchOutlined style={{ color: "#fff" }} />
        </div>
      </Layout.Header>
    </Layout>
  )
}

export default Header