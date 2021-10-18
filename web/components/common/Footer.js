import { Layout } from 'antd';
import 'antd/dist/antd.css';

///
/// Footer component
///
const Footer = () => {
    const style = {
        backgroundColor: "#001529"
    }

    const color = {
        color: "#ffffff"
    }

    return (
        <>
            <Layout className="layout" >
                <Layout.Footer className="flex justify-around" style={style}>
                    <div>
                        <p>IT</p>
                        <p>Sport</p>
                        <div className="flex items-center mt-20">
                            <div>
                                <img src="/logokursm-light.ico" alt="logo" width="50" height="60" />
                            </div>
                            <p className="text-3xl mb-0 ml-4 font-mono">Kursminator</p>
                        </div>
                    </div>
                    <div style={color} >
                        <p>O nás</p>
                        <p>Lektoři</p>
                        <p>Kontakt</p>
                        <p>Kalendář</p>
                        <div className="flex items-center">
                            <img src="/logotyp.png" alt="logo" width="50" height="60" />
                            <p className="text-3xl mb-0 ml-4 font-mono">Flashbulb</p>
                        </div>
                    </div>
                    <div>
                        <p>Přihlášení</p>
                        <p>Registrace</p>
                    </div>
                    <div>
                        <p>Facebook</p>
                        <p>Instagram</p>
                        <p>Google+</p>
                        <p>Copyright@2021 ITFIT s.r.o</p>
                    </div>
                </Layout.Footer>
            </Layout>
        </>
    )
}

export default Footer