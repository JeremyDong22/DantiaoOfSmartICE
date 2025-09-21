// SmartICE Billboard Page
// Version: 2.2.0 - Fixed Chinese UI elements to use proper i18n translation keys

import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Head from 'next/head'
import Link from 'next/link'

const BillboardPage = () => {
  const { t } = useTranslation('common')

  // Posts data - will be expanded with more content later
  const posts = [
    {
      id: 'claude-code-guide',
      title: t('post.claudeCodeGuide.title'),
      summary: t('post.claudeCodeGuide.summary'),
      author: 'Jeremy',
      date: new Date('2025-09-22').toLocaleDateString(),
      readingTime: 15,
      category: t('category.guide'),
      tags: ['Claude Code', 'AI', 'Installation', 'Tutorial'],
      url: '/posts/claude-code-guide',
      featured: true
    }
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
                <article key={post.id || index} className="card group hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
                  {/* Post Header */}
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                    <div className="flex-1">
                      {post.featured && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-500/20 text-primary-400 mb-2">
                          <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                          </svg>
                          {t('billboard.featured')}
                        </span>
                      )}
                      <Link href={post.url}>
                        <h2 className="text-2xl font-semibold text-dark-text mb-3 group-hover:text-primary-500 transition-colors cursor-pointer">
                          {post.title}
                        </h2>
                      </Link>
                      <p className="text-dark-muted mb-4 leading-relaxed">
                        {post.summary}
                      </p>
                    </div>
                    <div className="text-sm text-dark-muted shrink-0">
                      <div className="flex items-center gap-2 mb-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        {post.author}
                      </div>
                      <div className="flex items-center gap-2 mb-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {post.date}
                      </div>
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {post.readingTime} {t('post.minutes')}
                      </div>
                    </div>
                  </div>

                  {/* Tags */}
                  {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-dark-bg text-dark-muted"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Post Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-dark-border">
                    <div className="flex items-center gap-2 text-sm text-dark-muted">
                      <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-primary-500/10 text-primary-400">
                        {post.category}
                      </span>
                    </div>
                    <Link href={post.url}>
                      <button className="btn-primary flex items-center gap-2 group">
                        {t('post.viewPost')}
                        <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </Link>
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
                  {t('billboard.comingSoonMessage')}
                </p>
              </div>
            )}
          </div>

          {/* Action Section */}
          <div className="mt-16 text-center">
            <div className="card inline-block">
              <h3 className="text-lg font-semibold text-dark-text mb-2">
                {t('billboard.moreContentSoon')}
              </h3>
              <p className="text-dark-muted mb-4">
                {t('billboard.comingContentDescription')}
              </p>
              <div className="flex gap-2 justify-center">
                <Link href="/" className="btn-secondary">
                  {t('billboard.backToHome')}
                </Link>
                <button className="btn-primary" disabled>
                  {t('billboard.subscribeUpdates')}
                </button>
              </div>
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