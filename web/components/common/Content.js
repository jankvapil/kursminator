import Head from 'next/head'

import Header from './Header'
import Footer from './Footer'


///
/// Content component
///
const Content = (props) => {


    return (
        <>
            <Header/>
            <div className="flex flex-col items-center justify-center min-h-screen py-2">
                <Head>
                    <title>Kurzminator</title>
                    <link rel="icon" href="/logokursm-light.ico" />
                </Head>
                <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
                    { props.children }
                </main>
            </div>
            <Footer />
        </>
  )
}

export default Content