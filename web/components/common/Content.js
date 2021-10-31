import Head from 'next/head'

import Header from './Header'
import Footer from './Footer'
import { Layout } from 'antd';


///
/// Content component
///
const Content = (props) => {


    return (
        <>
            <Header/>
            <Head>
                <title>Kurzminator</title>
                <link rel="icon" href="/logokursm-light.ico" />
            </Head>
            <Layout className="w-3/4 m-auto">
                <div className={props.className}>
                    { props.children }
                </div>
            </Layout>
            <Footer />
        </>
  )
}

export default Content