import { RobotFilled, RobotOutlined } from '@ant-design/icons';
import { Layout } from 'antd';
import 'antd/dist/antd.css';
import Link from 'next/link'

///
/// Footer component
///
const Footer = () => {
    const BgColor001529 = {
        backgroundColor: "#001529"
    }

    const ColorWhite = {
        Color: "#ffffff"
    }

    return (
        <>

            <Layout className="layout">
                <Layout.Footer style={BgColor001529}>
                    <div className="lg:flex lg:justify-around hidden">
                        <div className="flex flex-col">
                            <Link href="/"><span className="text-white md:hidden lg:block font-sans font-family-Roboto" style={{fontFamily: RobotOutlined}}>IT</span></Link>
                            <Link href="/" className="m-0"><span className="text-white">Sport</span></Link>
                            <div className="mt-auto self-end flex items-center">
                                <div>
                                    <img src="/logokursm-light.ico" alt="logo" width="50" height="60" />
                                </div>
                                <Link  style={ColorWhite} href="/" ><span className="text-white">Kursmintor</span></Link>

                            </div>
                        </div>

                        <div className="flex flex-col">
                          <Link href="/" md><span className="text-white">O nás</span></Link>
                          <Link href="/" className="m-0"><span className="text-white">Lektoři</span></Link>
                              <Link href="/" className="m-0"><span className="text-white">Kontakt</span></Link>
                              <Link href="/" className="m-0"><span className="text-white">Kalendář</span></Link>
                          <div className="flex items-center mt-4">
                              <img src="/logotyp.png" alt="logo" width="50" height="60" />
                              <Link href="/" className="text-  3xl mb-0 ml-4 font-extrabold"><span className="text-white">Flashbulb</span></Link>
                        </div>

                        </div>

                        <div className="">
                            <Link href="/" className="m-0"><span className="text-white">Přihlášení</span></Link><br />
                            <Link href="/" className="m-0"><span className="text-white">Registrace</span></Link>
                        </div>

                        <div className="">
                            <div>
                                <img className="float-left mr-3"  style={{marginTop: 5}} src="/facebook.png" alt="facebook-icon" width="12" height="12" />
                                <Link href="/" className="ml-3 bg-black"><span className="text-white">Facebook</span></Link>
                            </div>

                            <div>
                                <img className="float-left mr-3" style={{marginTop: 5}} src="/instagram.png" alt="instagram-icon" width="12" height="12" />
                                <Link href="/"><span className="text-white">Instagram</span></Link>
                            </div>

                            <div>
                                <img className="mt-1.5 float-left mr-3" style={{marginTop: 5, fontFamily: RobotFilled}} src="/google+.png" alt="instagram-icon" width="12" height="12" />
                                <Link href="/"><span className="text-white">Google+</span></Link>
                            </div>
                        </div>

                    </div>



                    <div className="flex justify-around lg:hidden">

                                <div className="flex items-center mt-4">
                                    <img src="/logokursm-light.ico" alt="logo" width="50" height="60" />
                                    <Link  style={ColorWhite} href="/" ><span className="text-white">Kursmintor</span></Link>
                                </div>

                            <div className="flex items-center mt-4">
                              <img src="/logotyp.png" alt="logo" width="50" height="60" />
                              <Link href="/" className="text-  3xl mb-0 ml-4 font-extrabold"><span className="text-white">Flashbulb</span></Link>
                            </div>

                    </div>


                    <p className="text-center mt-8 mb-4 lg:p-0 lg:float-right text-white"><span className="pr-0.5">Copyright</span>@2021 ITFIT s.r.o</p>
                </Layout.Footer>
            </Layout>
        </>
    )
}

export default Footer