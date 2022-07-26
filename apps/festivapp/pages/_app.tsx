import { AppProps } from 'next/app';
import Head from 'next/head';
import { createGlobalStyle } from 'styled-components';
import type { NextPage } from 'next'
import type { ReactElement, ReactNode } from 'react'

export const globalColors = {
  white: '#fff',
  black: '#000',
  mainGradient: 'linear-gradient(90deg, #FF8A00 0%, #FF3D00 100%)',
  lightGrey: '#F1F1F1',
}

export const globalTransitions = {
  main: "cubic-bezier(.73,.01,0,1),-webkit-transform 1.2s cubic-bezier(.73,.01,0,1)"
}

const GlobalStyle = createGlobalStyle`
  body {
    padding: 0;
    margin: 0;
    background-color: ${globalColors.lightGrey};
  }

  h1, h2, h3, h4, h5 h6, p, a, button {
    font-family: 'Poppins', sans-serif;
  }

  a {
    text-decoration: none;
  }

  ul {
    margin-block-start: 0em;
    margin-block-end: 0em;
    padding-inline-start: 0px;
  }
`

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
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
