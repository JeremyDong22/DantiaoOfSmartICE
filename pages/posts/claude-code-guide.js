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

const ClaudeCodeGuidePage = ({ markdownContent, fallbackMode }) => {
  const { t, i18n } = useTranslation('common')
  const [mounted, setMounted] = useState(false)
  const [content, setContent] = useState(markdownContent)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setMounted(true)

    // If in fallback mode, try to fetch from API
    if (fallbackMode && mounted) {
      setLoading(true)
      const fileName = i18n.language === 'zh' ? 'claude-code-guide-zh.md' : 'claude-code-guide.md'
      fetch(`/api/content?file=${fileName}`)
        .then(res => res.json())
        .then(data => {
          if (data.content) {
            setContent(data.content)
          }
        })
        .catch(err => console.error('Failed to fetch content from API:', err))
        .finally(() => setLoading(false))
    }
  }, [mounted, fallbackMode, i18n.language])

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
        {loading ? (
          <div className="text-center py-20">
            <p className="text-dark-muted">加载中...</p>
          </div>
        ) : (
          <MarkdownPost
            content={content}
            title={t('post.claudeCodeGuide.title')}
            author="Jeremy"
            date={new Date('2025-09-22').toLocaleDateString()}
          />
        )}

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
  // ULTRA VERBOSE LOGGING FOR VERCEL DEBUGGING
  console.log('=== VERCEL BUILD DEBUG START ===')
  console.log('Build Time:', new Date().toISOString())
  console.log('process.cwd():', process.cwd())
  console.log('__dirname would be:', __dirname || 'undefined')
  console.log('process.env.PWD:', process.env.PWD)
  console.log('process.env.VERCEL:', process.env.VERCEL)
  console.log('process.env.VERCEL_ENV:', process.env.VERCEL_ENV)
  console.log('process.env.VERCEL_URL:', process.env.VERCEL_URL)
  console.log('process.env.NODE_ENV:', process.env.NODE_ENV)
  console.log('Locale requested:', locale)

  try {
    // Choose file based on locale
    const fileName = locale === 'zh' ? 'claude-code-guide-zh.md' : 'claude-code-guide.md'
    console.log('Target file:', fileName)

    // CRITICAL: Use process.cwd() for Vercel compatibility
    const baseDir = process.cwd()
    console.log('Base directory:', baseDir)

    // List ALL files and directories at root level
    console.log('\n=== ROOT DIRECTORY STRUCTURE ===')
    try {
      const rootItems = fs.readdirSync(baseDir)
      console.log('Root items count:', rootItems.length)
      rootItems.forEach((item, index) => {
        const itemPath = path.join(baseDir, item)
        try {
          const stats = fs.statSync(itemPath)
          console.log(`[${index}] ${item} (${stats.isDirectory() ? 'DIR' : 'FILE'}, ${stats.size} bytes)`)
        } catch (e) {
          console.log(`[${index}] ${item} (ERROR: ${e.message})`)
        }
      })
    } catch (e) {
      console.error('Failed to list root directory:', e.message)
    }

    // Check for content directory
    console.log('\n=== CONTENT DIRECTORY CHECK ===')
    const contentDir = path.join(baseDir, 'content')
    console.log('Content dir path:', contentDir)
    console.log('Content dir exists:', fs.existsSync(contentDir))

    if (fs.existsSync(contentDir)) {
      try {
        const contentItems = fs.readdirSync(contentDir)
        console.log('Content items count:', contentItems.length)
        contentItems.forEach((item, index) => {
          const itemPath = path.join(contentDir, item)
          try {
            const stats = fs.statSync(itemPath)
            console.log(`[${index}] ${item} (${stats.isDirectory() ? 'DIR' : 'FILE'}, ${stats.size} bytes)`)
          } catch (e) {
            console.log(`[${index}] ${item} (ERROR: ${e.message})`)
          }
        })
      } catch (e) {
        console.error('Failed to list content directory:', e.message)
      }
    }

    // Check for markdown files at root
    console.log('\n=== MARKDOWN FILES AT ROOT ===')
    const rootMdPath = path.join(baseDir, fileName)
    console.log('Root MD path:', rootMdPath)
    console.log('Root MD exists:', fs.existsSync(rootMdPath))

    // Build list of paths to try
    const pathsToTry = [
      { path: path.join(baseDir, 'content', fileName), label: 'content/' + fileName },
      { path: path.join(baseDir, fileName), label: 'root/' + fileName },
      { path: path.join(baseDir, 'public', 'content', fileName), label: 'public/content/' + fileName },
      { path: path.join(baseDir, 'public', fileName), label: 'public/' + fileName },
    ]

    console.log('\n=== ATTEMPTING TO READ FILE ===')
    let markdownContent = null
    let successPath = null

    for (const attempt of pathsToTry) {
      console.log(`\nTrying: ${attempt.label}`)
      console.log(`Full path: ${attempt.path}`)

      try {
        if (fs.existsSync(attempt.path)) {
          console.log('✅ File exists!')
          const stats = fs.statSync(attempt.path)
          console.log(`File size: ${stats.size} bytes`)
          console.log(`File modified: ${stats.mtime}`)

          markdownContent = fs.readFileSync(attempt.path, 'utf8')
          console.log(`✅ Successfully read ${markdownContent.length} characters`)
          console.log(`First 100 chars: ${markdownContent.substring(0, 100)}...`)
          successPath = attempt.path
          break
        } else {
          console.log('❌ File does not exist at this path')
        }
      } catch (readError) {
        console.error(`❌ Error reading file: ${readError.message}`)
        console.error(`Error code: ${readError.code}`)
      }
    }

    if (!markdownContent) {
      console.log('\n=== FAILED TO FIND MARKDOWN FILE ===')
      console.log('None of the paths worked!')

      // One more desperate attempt - check if files are in weird places
      console.log('\n=== DESPERATE SEARCH FOR .md FILES ===')
      function findMarkdownFiles(dir, depth = 0, maxDepth = 3) {
        if (depth > maxDepth) return []
        let mdFiles = []
        try {
          const items = fs.readdirSync(dir)
          for (const item of items) {
            if (item.startsWith('.') || item === 'node_modules') continue
            const fullPath = path.join(dir, item)
            try {
              const stats = fs.statSync(fullPath)
              if (stats.isFile() && item.endsWith('.md')) {
                mdFiles.push(fullPath)
              } else if (stats.isDirectory()) {
                mdFiles = mdFiles.concat(findMarkdownFiles(fullPath, depth + 1, maxDepth))
              }
            } catch (e) {
              // Skip inaccessible items
            }
          }
        } catch (e) {
          // Skip inaccessible directories
        }
        return mdFiles
      }

      const allMdFiles = findMarkdownFiles(baseDir)
      console.log('Found .md files:', allMdFiles)

      throw new Error(`Could not find ${fileName} in any expected location. Searched: ${pathsToTry.map(p => p.label).join(', ')}`)
    }

    console.log('\n=== SUCCESS ===')
    console.log('File loaded from:', successPath)
    console.log('Content length:', markdownContent.length)
    console.log('=== VERCEL BUILD DEBUG END ===\n')

    return {
      props: {
        ...(await serverSideTranslations(locale, ['common'])),
        markdownContent,
        fallbackMode: false,
      },
    }
  } catch (error) {
    console.error('\n=== CRITICAL ERROR ===')
    console.error('Error name:', error.name)
    console.error('Error message:', error.message)
    console.error('Error stack:', error.stack)
    console.error('=== END CRITICAL ERROR ===\n')

    // Fallback content with detailed error info
    const errorMessage = locale === 'zh'
      ? `# 错误：无法加载内容

## 调试信息
- 工作目录: ${process.cwd()}
- 错误类型: ${error.name}
- 错误信息: ${error.message}
- Vercel环境: ${process.env.VERCEL || 'false'}
- Node环境: ${process.env.NODE_ENV}

## 临时解决方案
内容将通过 API 加载...`
      : `# Error: Could not load content

## Debug Info
- Working Directory: ${process.cwd()}
- Error Type: ${error.name}
- Error Message: ${error.message}
- Vercel Environment: ${process.env.VERCEL || 'false'}
- Node Environment: ${process.env.NODE_ENV}

## Fallback
Content will be loaded via API...`

    return {
      props: {
        ...(await serverSideTranslations(locale, ['common'])),
        markdownContent: errorMessage,
        fallbackMode: true,
      },
    }
  }
}

export default ClaudeCodeGuidePage