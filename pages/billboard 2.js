// SmartICE Billboard Page
// Version: 1.0.0 - Content board for announcements and posts

import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Head from 'next/head'

const BillboardPage = () => {
  const { t } = useTranslation('common')

  // Placeholder content - this will be dynamically managed later
  const posts = [
    // Add sample content for demonstration
  ]

  return (
    <>
      <Head>
        <title>{t('billboard.title')} - SmartICE</title>
        <meta name="description" content={t('billboard.subtitle')} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-dark-text mb-4">
              {t('billboard.title')}
            </h1>
            <p className="text-xl text-dark-muted">
              {t('billboard.subtitle')}
            </p>
          </div>

          {/* Content Area */}
          <div className="space-y-8">
            {posts.length > 0 ? (
              posts.map((post, index) => (
                <article key={index} className="card">
                  <h2 className="text-2xl font-semibold text-dark-text mb-3">
                    {post.title}
                  </h2>
                  <p className="text-dark-muted mb-4">
                    {post.content}
                  </p>
                  <div className="text-sm text-dark-muted">
                    {t('billboard.lastUpdated')}: {post.date}
                  </div>
                </article>
              ))
            ) : (
              /* Empty State */
              <div className="card text-center py-16">
                <div className="text-primary-500 mb-4">
                  <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-dark-text mb-2">
                  {t('billboard.noContent')}
                </h3>
                <p className="text-dark-muted">
                  内容即将上线，敬请期待...
                </p>
              </div>
            )}
          </div>

          {/* Action Section */}
          <div className="mt-16 text-center">
            <div className="card inline-block">
              <h3 className="text-lg font-semibold text-dark-text mb-2">
                准备添加内容？
              </h3>
              <p className="text-dark-muted mb-4">
                此页面将用于展示重要通知、学习资源和团队动态。
              </p>
              <button className="btn-primary" disabled>
                即将开放
              </button>
            </div>
          </div>
        </div>
      </div>
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

export default BillboardPage