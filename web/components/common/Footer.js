import { RobotFilled, RobotOutlined } from '@ant-design/icons';
import { Layout } from 'antd';
import 'antd/dist/antd.css';
import Link from 'next/link'
import styles from "../../styles/Content.module.css"

///
/// Footer component
///
const Footer = () => {
    const BgColor001529 = {
        backgroundColor: "#001529"
    }

    return (
        <>

            <Layout className="layout">
                <Layout.Footer style={BgColor001529}>

                    {/* Desktop version */}
                    <div className="lg:flex lg:justify-around hidden">
                        <div className="flex flex-col">
                            <Link href="/"><span className="text-white md:hidden lg:block cursor-pointer" style={{ fontFamily: RobotOutlined }}>IT</span></Link>
                            <Link href="/" className="m-0"><span className="text-white cursor-pointer">Sport</span></Link>
                            <div className="mt-auto self-end flex items-center">
                                <div>
                                    <img src="/logokursm-light.ico" alt="logo" width="50" height="60" />
                                </div>
                                <Link href="/" ><span className="text-white text-3xl mb-0 ml-4 font-extrabold cursor-pointer">Kursmintor</span></Link>
                            </div>
                        </div>

                        <div className="flex flex-col">
                            <Link href="/" md><span className="text-white cursor-pointer">O nás</span></Link>
                            <Link href="/" className="m-0"><span className="text-white cursor-pointer">Lektoři</span></Link>
                            <Link href="/" className="m-0"><span className="text-white cursor-pointer">Kontakt</span></Link>
                            <Link href="/" className="m-0"><span className="text-white cursor-pointer">Kalendář</span></Link>

                            <div className="flex items-center mt-4">
                                <img src="/logotyp-light.png" alt="logo" width="50" height="60" />
                                <Link href="/"><span className="text-white text-3xl mb-0 ml-4 font-extrabold cursor-pointer">Flashbulb</span></Link>
                            </div>
                        </div>

                        <div className="">
                            <Link href="/" className="m-0"><span className="text-white cursor-pointer">Přihlášení</span></Link><br />
                        </div>

                        <div className="">
                            <div>
                                <img className="float-left mr-3" style={{ marginTop: 5 }} src="/facebook.png" alt="facebook-icon" width="12" height="12" />
                                <Link href="/" className="ml-3 bg-black cursor-pointer"><span className="text-white">Facebook</span></Link>
                            </div>

                            <div>
                                <img className="float-left mr-3" style={{ marginTop: 5 }} src="/instagram.png" alt="instagram-icon" width="12" height="12" />
                                <Link href="/"><span className="text-white cursor-pointer">Instagram</span></Link>
                            </div>

                            <div>
                                <img className="mt-1.5 float-left mr-3" style={{ marginTop: 5, fontFamily: RobotFilled }} src="/google+.png" alt="instagram-icon" width="12" height="12" />
                                <Link href="/"><span className="text-white cursor-pointer">Google+</span></Link>
                            </div>
                        </div>
                    </div>

                    {/* Mobile version */}
                    <div className="flex justify-between md:justify-around lg:hidden">
                        <div className="flex items-center mt-4 -ml-5">
                            <img src="/logokursm-light.ico" alt="logo" className="w-8" />
                            <Link href="/" ><span className="text-white text-xl md:text-3xl mb-0 ml-2 font-extrabold">Kursmintor</span></Link>
                        </div>

                        <div className="flex items-center mt-4 ml-10 ">
                            <img src="/logotyp.png" alt="logo" className="w-9" />
                            <Link href="/"><span className="text-white text-xl md:text-3xl mb-0 ml-1 font-extrabold">Flashbulb</span></Link>
                        </div>
                    </div>

                    {/* Copyright */}
                    <p className="text-center mt-2 mb-4 lg:p-0 lg:float-right text-white"><span className="pr-0.5">Copyright</span>@2021 ITFIT s.r.o</p>
                </Layout.Footer>
            </Layout>
        </>
    )
}

export default Footer