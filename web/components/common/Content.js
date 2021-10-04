import Head from 'next/head'

import Header from './Header'
import Footer from './Footer'

///
/// Content component
///
const Content = (props) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>Kurzminator</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        { props.children }
      </main>
      <Footer />
    </div>
  )
}

export default Content