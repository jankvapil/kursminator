import { Layout, Button, Input } from 'antd'
import { CalendarTwoTone } from '@ant-design/icons'
import Link from 'next/link'

///
/// Header component
///
const Header = () => {
  return (
    <Layout className="layout">
        <Layout.Header className="flex justify-around items-center">
            <div className="flex items-center mt-1 cursor-pointer">
              <Link href="/">
                <img src="/logokursm-light.ico" alt="logo" width="50" height="60" />
              </Link>
              <Link href="/">
                <span className="text-3xl text-white mb-0 ml-4 font-mono">Kursminator</span>
              </Link>
            </div>
            <Button type="link"><Link href="/courses">Kurzy</Link></Button>
            <div className="w-1/2">
                <Input placeholder="Hledaný kurz..." />
            </div>
            <div className="flex items-center">
                <CalendarTwoTone twoToneColor="#fff" />
                <span className="text-white m-0 ml-2"><Link href="/">Kontakt</Link></span>
            </div>
            <div className="flex items-center">
                <CalendarTwoTone twoToneColor="#fff" />
                <span className="text-white m-0 ml-2"><Link href="/calendar">Kalendář</Link></span>
            </div>
            <div>
                <Button className="mr-5" type="primary">
                  <Link href="/login">Přihlášení</Link></Button>
                <Button>Registrace</Button>
            </div>
        </Layout.Header>
    </Layout>
  )
}

export default Header