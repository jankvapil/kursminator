import { Layout, Button, Input } from 'antd';
import { CalendarTwoTone } from '@ant-design/icons';
import 'antd/dist/antd.css';


///
/// Header component
///
const Header = () => {
    return (
        <>
            <Layout className="layout">
                <Layout.Header className="flex justify-around items-center">
                    <div className="flex items-center mt-1">
                        <div>
                            <img src="/logokursm-light.ico" alt="logo" width="50" height="60" />
                        </div>
                        <p className="text-3xl text-white mb-0 ml-4 font-mono">Kursminator</p>
                    </div>
                    <Button type="link">Kurzy</Button>
                    <div className="w-1/2">
                        <Input placeholder="Hledaný kurz..." />
                    </div>
                    <div className="flex items-center">
                        <CalendarTwoTone twoToneColor="#fff" />
                        <p className="text-white m-0 ml-2">Kontakt</p>
                    </div>
                    <div className="flex items-center">
                        <CalendarTwoTone twoToneColor="#fff" />
                        <p className="text-white m-0 ml-2">Kalendář</p>
                    </div>
                    <div>
                        <Button className="mr-5" type="primary">Přihlášení</Button>
                        <Button>Registrace</Button>
                    </div>
                </Layout.Header>
            </Layout>
        </>
    )
}

export default Header