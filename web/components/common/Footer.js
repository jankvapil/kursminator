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
                    <div className="flex justify-around">
                        <div className="flex flex-col">
                            <Link style={ColorWhite} href="/">IT</Link>
                            <Link  style={ColorWhite}  href="/" className="m-0">Sport</Link>
                            <div className="mt-auto self-end flex items-center">
                                <div>
                                    <img src="/logokursm-light.ico" alt="logo" width="50" height="60" />
                                </div>
                                <Link  style={ColorWhite} href="/" className="text-3xl mb-0 ml-4 font-extrabold">Kursmintor</Link>

                            </div>
                        </div>

                        <div className="flex flex-col">
                          <Link href="/">O nás</Link>
                          <Link href="/" className="m-0">Lektoři</Link>
                              <Link href="/" className="m-0">Kontakt</Link>
                              <Link href="/" className="m-0">Kalendář</Link>
                          <div className="flex items-center mt-4">
                              <img src="/logotyp.png" alt="logo" width="50" height="60" />
                              <Link href="/" className="text-3xl mb-0 ml-4 font-extrabold">Flashbulb</Link>
                        </div>

                        </div>

                        <div className="">
                            <Link href="/" className="m-0">Přihlášení</Link><br />
                            <Link href="/" className="m-0">Registrace</Link>
                        </div>

                        <div className="">
                            <div>
                                <img className="mt-1.5 float-left mr-3" src="/facebook.png" alt="facebook-icon" width="12" height="12" />
                                <Link href="/" className="ml-3 bg-black">Facebook</Link>
                            </div>

                            <div>
                                <img className="mt-1.5 float-left mr-3" src="/instagram.png" alt="instagram-icon" width="12" height="12" />
                                <Link href="/">Instagram</Link>
                            </div>

                            <div>
                                <img className="mt-1.5 float-left mr-3" src="/google+.png" alt="instagram-icon" width="12" height="12" />
                                <Link href="/">Google+</Link>
                            </div>
                        </div>

                    </div>
                    <p className="m-0 p-0 float-right"><span className="pr-0.5">Copyright</span>@2021 ITFIT s.r.o</p>
                </Layout.Footer>
            </Layout>
        </>
    )
}

export default Footer