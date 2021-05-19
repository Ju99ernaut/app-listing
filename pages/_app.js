import Head from 'next/head'
import Layout from '../layouts/Layout'
import '../styles/globals.css'

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
        />
        <meta name="keywords" content="Keywords" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta name="description" content="Webapp for rally community project listings" />
        <link rel="apple-touch-icon" href="/logo192.png" />
        <title>Rally Commnity | App Listings</title>

        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#317EFB" />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  )
}
