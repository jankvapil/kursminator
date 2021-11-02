import Head from 'next/head'

import Header from './Header'
import Footer from './Footer'

import styles from "../../styles/Content.module.css"


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
            <main className={styles.test}>
                {props.children}
            </main>
            <Footer />
        </div>
  )
}

export default Content