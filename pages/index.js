// SMARTICE Landing Page
// Version: 1.4.0 - Redesigned with full-screen hero section, removed features and platform sections for simplified layout

import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Link from 'next/link'
import Head from 'next/head'

const HomePage = () => {
  const { t } = useTranslation('common')

  return (
    <>
      <Head>
        <title>{t('home.title')} - {t('home.platform.title')}</title>
        <meta name="description" content={t('home.platform.description')} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Full-Screen Hero Section */}
      <section className="hero-fullscreen">
        <div className="hero-content">
          {/* Logo */}
          <div className="hero-logo">
            <div className="w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 bg-primary-600 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl">
              <span className="text-white font-bold text-3xl sm:text-4xl lg:text-5xl">S</span>
            </div>
          </div>

          {/* Title */}
          <h1 className="hero-title">
            {t('home.title')}
          </h1>

          {/* Description */}
          <p className="hero-description">
            {t('home.welcome')}
          </p>

          {/* Tagline */}
          <p className="hero-tagline">
            {t('home.tagline')}
          </p>

          {/* CTA Button */}
          <div className="hero-cta">
            <Link href="/billboard" className="btn-primary btn-large">
              {t('home.getStarted')}
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  }
}

export default HomePage