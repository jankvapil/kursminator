import Head from 'next/head'

import Header from './Header'
import Footer from './Footer'
import { Layout } from 'antd';


///
/// Content component
///
const Content = (props) => {


    return (
        <div>
            <Head>
                <title>Kurzminator</title>
                <link rel="icon" href="/logokursm-light.ico" />
            </Head>
            
            <Header/>
            <Layout className="w-3/4 m-auto">
            
                <div className={props.className}>
                    { props.children }
                </div>
                
               
            </Layout>
            <Footer />
        </div>
  )
}

export default Content