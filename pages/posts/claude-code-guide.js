// SmartICE Claude Code Guide Post Page
// Version: 1.2.0 - Added bilingual support for Chinese and English content

import { useState, useEffect } from 'react'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Head from 'next/head'
import Link from 'next/link'
import MarkdownPost from '../../components/MarkdownPost'
import fs from 'fs'
import path from 'path'

const ClaudeCodeGuidePage = ({ markdownContent }) => {
  const { t } = useTranslation('common')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <>
      <Head>
        <title>{t('post.claudeCodeGuide.title')} - SmartICE</title>
        <meta name="description" content={t('post.claudeCodeGuide.description')} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="author" content="Jeremy" />
        <meta name="keywords" content="Claude Code, AI, Installation, Guide, SmartICE" />

        {/* Highlight.js CSS now loaded in _document.js for better performance */}
      </Head>

      <div className="min-h-screen py-4 sm:py-8">
        {/* Navigation Bar */}
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
          <div className="flex items-center justify-between">
            <Link href="/billboard" className="btn-secondary flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              {t('post.backToBillboard')}
            </Link>

            <div className="flex items-center gap-4">
              {/* Share button */}
              <button
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: t('post.claudeCodeGuide.title'),
                      url: window.location.href,
                    })
                  } else {
                    navigator.clipboard.writeText(window.location.href)
                  }
                }}
                className="btn-secondary flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                </svg>
                <span className="hidden sm:inline">{t('post.share')}</span>
              </button>

              {/* Print button */}
              <button
                onClick={() => window.print()}
                className="btn-secondary flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                </svg>
                <span className="hidden sm:inline">{t('post.print')}</span>
              </button>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <MarkdownPost
          content={markdownContent}
          title={t('post.claudeCodeGuide.title')}
          author="Jeremy"
          date={new Date('2025-09-22').toLocaleDateString()}
        />

        {/* Bottom Navigation */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 pt-8 border-t border-dark-border">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <Link href="/billboard" className="btn-secondary flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              {t('post.backToBillboard')}
            </Link>

            <div className="text-center">
              <p className="text-dark-muted text-sm">
                {t('post.publishedBy')} Jeremy • {t('post.lastUpdated')}: {new Date('2025-09-22').toLocaleDateString()}
              </p>
            </div>

          </div>
        </div>

        {/* Scroll to top button */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 right-8 btn-primary rounded-full p-3 shadow-lg"
          title={t('post.scrollToTop')}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      </div>

      {/* Print styles */}
      <style jsx>{`
        @media print {
          nav, .fixed, button, aside {
            display: none !important;
          }
          .card {
            border: 1px solid #ccc !important;
            background: white !important;
          }
          body {
            background: white !important;
            color: black !important;
          }
          main {
            margin-left: 0 !important;
          }
        }
      `}</style>
    </>
  )
}

export async function getStaticProps({ locale }) {
  try {
    // Choose the appropriate markdown file based on locale
    let fileName = 'claude-code-guide.md' // Default to English
    if (locale === 'zh') {
      fileName = 'claude-code-guide-zh.md'
    }

    // Detailed logging for debugging
    console.log('=== Markdown Loading Debug Info ===')
    console.log('Current Working Directory:', process.cwd())
    console.log('Node Environment:', process.env.NODE_ENV)
    console.log('Vercel Environment:', process.env.VERCEL)
    console.log('Locale:', locale)
    console.log('Trying to load file:', fileName)

    // Try multiple possible paths
    const possiblePaths = [
      path.join(process.cwd(), 'content', fileName),
      path.join(process.cwd(), 'public', 'content', fileName),
      path.join(process.cwd(), fileName),
    ]

    console.log('Trying paths:', possiblePaths)

    let filePath = null
    let markdownContent = null

    for (const tryPath of possiblePaths) {
      console.log(`Checking path: ${tryPath}`)
      if (fs.existsSync(tryPath)) {
        console.log(`✅ Found file at: ${tryPath}`)
        filePath = tryPath
        markdownContent = fs.readFileSync(tryPath, 'utf8')
        break
      } else {
        console.log(`❌ Not found at: ${tryPath}`)
      }
    }

    if (!filePath || !markdownContent) {
      // List what files ARE available for debugging
      console.log('File not found! Listing available directories:')
      const rootFiles = fs.readdirSync(process.cwd())
      console.log('Root directory files:', rootFiles.filter(f => !f.startsWith('.')))

      throw new Error(`File not found in any of the expected locations: ${possiblePaths.join(', ')}`)
    }
    console.log('Successfully loaded markdown, length:', markdownContent.length)
    console.log('=== End Debug Info ===')

    return {
      props: {
        ...(await serverSideTranslations(locale, ['common'])),
        markdownContent,
      },
    }
  } catch (error) {
    // Detailed error logging
    console.error('=== ERROR Loading Markdown ===')
    console.error('Error type:', error.name)
    console.error('Error message:', error.message)
    console.error('Error code:', error.code)
    console.error('Error path:', error.path)
    console.error('Full error:', error)
    console.error('=== End Error Info ===')

    // Provide detailed error message
    const errorMessage = locale === 'zh'
      ? `# 错误\n\n无法加载 Claude Code 指南内容。\n\n## 错误详情：\n- 错误类型: ${error.name}\n- 错误信息: ${error.message}\n- 错误代码: ${error.code || 'N/A'}\n- 文件路径: ${error.path || 'N/A'}`
      : `# Error\n\nCould not load the Claude Code guide content.\n\n## Error Details:\n- Error Type: ${error.name}\n- Error Message: ${error.message}\n- Error Code: ${error.code || 'N/A'}\n- File Path: ${error.path || 'N/A'}`

    return {
      props: {
        ...(await serverSideTranslations(locale, ['common'])),
        markdownContent: errorMessage,
      },
    }
  }
}

export default ClaudeCodeGuidePage