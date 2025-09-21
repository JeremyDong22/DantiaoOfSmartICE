// SMARTICE Landing Page
// Version: 1.1.0 - Main homepage with company introduction and features, updated branding

import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Link from 'next/link'
import Head from 'next/head'

const HomePage = () => {
  const { t } = useTranslation('common')

  const features = [
    {
      title: t('home.features.learning'),
      description: t('home.features.learningDesc'),
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      )
    },
    {
      title: t('home.features.sharing'),
      description: t('home.features.sharingDesc'),
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
        </svg>
      )
    },
    {
      title: t('home.features.collaboration'),
      description: t('home.features.collaborationDesc'),
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    }
  ]

  return (
    <>
      <Head>
        <title>{t('home.title')} - {t('home.description')}</title>
        <meta name="description" content={t('home.intro')} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-dark-bg to-dark-surface">
        <div className="max-w-4xl mx-auto text-center">
          {/* Logo */}
          <div className="mb-8">
            <div className="w-20 h-20 bg-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <span className="text-white font-bold text-2xl">S</span>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-5xl md:text-6xl font-bold text-dark-text mb-4">
            {t('home.title')}
          </h1>

          {/* Subtitle */}
          <h2 className="text-2xl md:text-3xl font-medium text-primary-500 mb-6">
            {t('home.subtitle')}
          </h2>

          {/* Description */}
          <p className="text-xl text-dark-muted mb-12 max-w-2xl mx-auto">
            {t('home.welcome')}
          </p>

          {/* CTA Button */}
          <Link href="/billboard" className="btn-primary inline-block">
            {t('home.getStarted')}
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-3xl font-bold text-center text-dark-text mb-16">
            {t('home.features.title')}
          </h3>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="card text-center group hover:border-primary-500">
                <div className="text-primary-500 mb-4 flex justify-center group-hover:scale-110 transition-transform duration-200">
                  {feature.icon}
                </div>
                <h4 className="text-xl font-semibold text-dark-text mb-3">
                  {feature.title}
                </h4>
                <p className="text-dark-muted">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-dark-surface">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl font-bold text-dark-text mb-8">
            {t('home.description')}
          </h3>
          <p className="text-lg text-dark-muted mb-12 max-w-2xl mx-auto">
            {t('home.intro')}
          </p>
          <Link href="/billboard" className="btn-secondary">
            {t('nav.billboard')}
          </Link>
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