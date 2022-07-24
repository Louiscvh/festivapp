import { AppProps } from 'next/app';
import Head from 'next/head';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    padding: 0;
    margin: 0;
  }
`
export const globalColors = {
  white: '#000',
  black: '#fff',
  mainGradient: 'linear-gradient(90deg, #FF8A00 0%, #FF3D00 100%)',
}
function CustomApp({ Component, pageProps }: AppProps) {
  return (
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
