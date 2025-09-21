// SmartICE App Component
// Version: 1.0.0 - Main app wrapper with i18n and global styles

import { appWithTranslation } from 'next-i18next'
import Layout from '../components/Layout'
import '../styles/globals.css'

function SmartICEApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

export default appWithTranslation(SmartICEApp)