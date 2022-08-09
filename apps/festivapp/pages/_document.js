//Components
import Document, { Html, Head, Main, NextScript } from 'next/document';

//Style
import { ServerStyleSheet } from 'styled-components';

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;
    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }
  render() {
    return (
      <Html lang={'fr-FR'}>
        <Head>
          {this.props.styleTags}
          <link rel="manifest" href="/manifest.json" />
          <meta name="theme-color" content="#000000" />
          <meta name="apple-mobile-web-app-status-bar-style" content="black" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-title" content="Festivapp" />
          
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="author" content="Festivapp" />
          <meta name="robots" content="index, follow" />
          <meta name="googlebot" content="index, follow" />
          <meta name="revisit-after" content="1 days" />
          <meta name="language" content="fr" />
          <meta name="document-class" content="Published" />

          <link rel="icon" type="image/png" href="/icon-192x192.png" />
          <link rel="canonical" href="https://www.festivapp.me" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
          <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500&display=swap" rel="stylesheet" />   
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
              page_path: window.location.pathname,
            });
          `,
            }}
          />
          <script async type="module" src="https://cookieconsent.popupsmart.com/js/CookieConsent.js" ></script>
          <script async type="text/javascript" src="https://cookieconsent.popupsmart.com/js/App.js"></script>
          <script
            dangerouslySetInnerHTML={{
              __html: `
              popupsmartCookieConsentPopup({
                  "siteName" : "Festivapp" ,
                  "notice_banner_type": "simple-dialog",
                  "consent_type": "gdpr",
                  "palette": "light",
                  "language": "French",
                  "privacy_policy_url" : "https://www.festivapp.me/policy" ,
                  "preferencesId" : "#" ,
                  "companyLogoURL" : "https://d2r80wdbkwti6l.cloudfront.net/H987YYFemVoo0tM1R8a1cowAuCZBbDno.jpg"
              });
              `,
            }}
          />
          <noscript>Cookie Consent by <a href="https://popupsmart.com/" rel="nofollow noopener">Popupsmart Website</a></noscript>
   
          </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
