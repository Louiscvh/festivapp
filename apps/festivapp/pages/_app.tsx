import { AppProps } from 'next/app';
import Head from 'next/head';
import { createGlobalStyle } from 'styled-components';
import type { NextPage } from 'next'
import type { ReactElement, ReactNode } from 'react'

const GlobalStyle = createGlobalStyle`
  body {
    padding: 0;
    margin: 0;
  }

  h1, h2, h3, h4, h5 h6, p, a {
    font-family: 'Poppins', sans-serif;
  }
`

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export const globalColors = {
  white: '#000',
  black: '#fff',
  mainGradient: 'linear-gradient(90deg, #FF8A00 0%, #FF3D00 100%)',
}
function CustomApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page)
  return getLayout(
    <>
      <Head>
        <title>Festivapp</title>
      </Head>
        <GlobalStyle />
        <Component {...pageProps} />
    </>
  );
}

export default CustomApp;
