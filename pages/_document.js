// SmartICE Document Component
// Version: 1.1.0 - Fixed security headers moved to next.config.js, removed problematic meta tags, added highlight.js

import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head>
        {/* Note: X-Frame-Options and CSP frame-ancestors are now set via HTTP headers in next.config.js */}
        {/* Only keeping CSP directives that work in meta tags */}
        <meta httpEquiv="Content-Security-Policy" content="
          default-src 'self';
          script-src 'self' 'unsafe-eval' 'unsafe-inline' https://cdnjs.cloudflare.com;
          style-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com;
          img-src 'self' data: blob: https:;
          font-src 'self' https:;
          connect-src 'self' https:;
          media-src 'self';
          object-src 'none';
          child-src 'none';
          worker-src 'self';
          form-action 'self';
          base-uri 'self';
          manifest-src 'self';
        " />

        {/* Performance optimizations */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="preconnect" href="//cdnjs.cloudflare.com" crossOrigin="anonymous" />

        {/* Syntax highlighting - moved from next/head */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github-dark.min.css"
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />

        {/* PWA meta tags */}
        <meta name="theme-color" content="#2563eb" />
        <meta name="msapplication-TileColor" content="#2563eb" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}