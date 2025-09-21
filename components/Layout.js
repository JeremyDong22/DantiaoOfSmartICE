// SmartICE Layout Component
// Version: 1.3.0 - Restored normal scrolling for all pages except landing page

import Navigation from './Navigation'
import Footer from './Footer'
import { useRouter } from 'next/router'

const Layout = ({ children }) => {
  const router = useRouter()
  const isLandingPage = router.pathname === '/'

  return (
    <div className={`dark ${isLandingPage ? 'h-screen overflow-hidden' : 'min-h-screen'} flex flex-col`}>
      {/* Navigation */}
      <Navigation />

      {/* Main Content */}
      <main className={`flex-1 ${isLandingPage ? 'flex flex-col overflow-hidden' : ''}`}>
        {children}
      </main>

      {/* Footer - only show if not landing page */}
      {!isLandingPage && <Footer />}
    </div>
  )
}

export default Layout