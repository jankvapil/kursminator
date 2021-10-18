import Head from 'next/head'

import Header from './Header'
import Footer from './Footer'

import styles from "../../styles/Content.module.css"


///
/// Content component
///
const Content = (props) => {

    return (
        <>
            <Header />
            <Head>
                <title>Kurzminator</title>
                <link rel="icon" href="/logokursm-light.ico" />
            </Head>
            <main className={styles.test}>
                {props.children}
            </main>
            <Footer />
        </>
    )
}

export default Content