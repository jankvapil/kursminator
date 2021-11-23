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

            <Header className="font-sans font-family-Roboto" />
            <main className={`${styles.contentBackground} font-sans font-family-Roboto`}>
                {props.children}
            </main>
            <Footer className="font-sans font-family-Roboto" />
        </div>
    )
}

export default Content