// SmartICE Markdown Post Component
// Version: 1.1.0 - Fixed layout issues: improved spacing, sticky TOC, proper markdown bold rendering, and mobile responsiveness

import React, { useState, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import remarkBreaks from 'remark-breaks'
import rehypeHighlight from 'rehype-highlight'
import rehypeRaw from 'rehype-raw'
import { useTranslation } from 'next-i18next'

const MarkdownPost = ({ content, title, author = 'Jeremy', date = new Date().toLocaleDateString() }) => {
  const { t } = useTranslation('common')
  const [tableOfContents, setTableOfContents] = useState([])
  const [readingTime, setReadingTime] = useState(0)

  // Calculate reading time and generate table of contents
  useEffect(() => {
    if (content) {
      // Calculate reading time (average 200 words per minute)
      const wordCount = content.split(/\s+/).length
      const minutes = Math.ceil(wordCount / 200)
      setReadingTime(minutes)

      // Generate table of contents from headers
      const headers = content.match(/^#{1,6}\s.+$/gm) || []
      const toc = headers.map((header, index) => {
        const level = (header.match(/^#+/) || [''])[0].length
        const text = header.replace(/^#+\s/, '').replace(/\s*\{.*\}$/, '')
        const id = text.toLowerCase().replace(/[^a-z0-9\s]/g, '').replace(/\s+/g, '-')
        return { level, text, id, index }
      })
      setTableOfContents(toc)
    }
  }, [content])

  // Copy to clipboard function
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      // Could add a toast notification here
    })
  }

  // Custom components for ReactMarkdown
  const components = {
    // Custom heading renderer with anchor links
    h1: ({ children, ...props }) => {
      const text = children[0] || ''
      const id = text.toString().toLowerCase().replace(/[^a-z0-9\s]/g, '').replace(/\s+/g, '-')
      return (
        <h1 id={id} className="text-4xl font-bold text-dark-text mb-6 scroll-mt-24" {...props}>
          {children}
        </h1>
      )
    },
    h2: ({ children, ...props }) => {
      const text = children[0] || ''
      const id = text.toString().toLowerCase().replace(/[^a-z0-9\s]/g, '').replace(/\s+/g, '-')
      return (
        <h2 id={id} className="text-3xl font-semibold text-dark-text mt-12 mb-4 scroll-mt-24" {...props}>
          {children}
        </h2>
      )
    },
    h3: ({ children, ...props }) => {
      const text = children[0] || ''
      const id = text.toString().toLowerCase().replace(/[^a-z0-9\s]/g, '').replace(/\s+/g, '-')
      return (
        <h3 id={id} className="text-2xl font-semibold text-dark-text mt-8 mb-3 scroll-mt-24" {...props}>
          {children}
        </h3>
      )
    },
    h4: ({ children, ...props }) => {
      const text = children[0] || ''
      const id = text.toString().toLowerCase().replace(/[^a-z0-9\s]/g, '').replace(/\s+/g, '-')
      return (
        <h4 id={id} className="text-xl font-semibold text-dark-text mt-6 mb-2 scroll-mt-24" {...props}>
          {children}
        </h4>
      )
    },
    // Custom paragraph styling
    p: ({ children, ...props }) => (
      <p className="text-dark-muted leading-relaxed mb-4" {...props}>
        {children}
      </p>
    ),
    // Custom strong/bold styling
    strong: ({ children, ...props }) => (
      <strong className="font-bold text-dark-text" {...props}>
        {children}
      </strong>
    ),
    // Custom emphasis/italic styling
    em: ({ children, ...props }) => (
      <em className="italic text-dark-text" {...props}>
        {children}
      </em>
    ),
    // Custom link styling
    a: ({ href, children, ...props }) => (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-primary-500 hover:text-primary-400 underline decoration-primary-500/30 hover:decoration-primary-400 transition-colors"
        {...props}
      >
        {children}
      </a>
    ),
    // Custom code block with copy button
    pre: ({ children, ...props }) => {
      const codeContent = children?.props?.children || ''
      return (
        <div className="relative group">
          <pre className="bg-dark-bg border border-dark-border rounded-lg p-4 overflow-x-auto mb-4" {...props}>
            {children}
          </pre>
          <button
            onClick={() => copyToClipboard(codeContent)}
            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-dark-surface hover:bg-dark-border text-dark-muted hover:text-dark-text p-2 rounded text-sm"
          >
            {t('post.copyCode')}
          </button>
        </div>
      )
    },
    // Inline code styling
    code: ({ inline, children, ...props }) =>
      inline ? (
        <code className="bg-dark-surface text-primary-400 px-1.5 py-0.5 rounded text-sm" {...props}>
          {children}
        </code>
      ) : (
        <code {...props}>{children}</code>
      ),
    // Custom list styling
    ul: ({ children, ...props }) => (
      <ul className="list-disc list-inside text-dark-muted mb-4 space-y-1" {...props}>
        {children}
      </ul>
    ),
    ol: ({ children, ...props }) => (
      <ol className="list-decimal list-inside text-dark-muted mb-4 space-y-1" {...props}>
        {children}
      </ol>
    ),
    li: ({ children, ...props }) => (
      <li className="ml-4" {...props}>
        {children}
      </li>
    ),
    // Custom blockquote styling
    blockquote: ({ children, ...props }) => (
      <blockquote className="border-l-4 border-primary-500 pl-4 py-2 my-4 bg-dark-surface rounded-r" {...props}>
        {children}
      </blockquote>
    ),
    // Horizontal rule
    hr: ({ ...props }) => (
      <hr className="border-dark-border my-8" {...props} />
    ),
    // Table styling
    table: ({ children, ...props }) => (
      <div className="overflow-x-auto mb-4">
        <table className="min-w-full border border-dark-border rounded-lg" {...props}>
          {children}
        </table>
      </div>
    ),
    th: ({ children, ...props }) => (
      <th className="bg-dark-surface border-b border-dark-border px-4 py-2 text-left text-dark-text font-semibold" {...props}>
        {children}
      </th>
    ),
    td: ({ children, ...props }) => (
      <td className="border-b border-dark-border px-4 py-2 text-dark-muted" {...props}>
        {children}
      </td>
    ),
  }

  const scrollToSection = (id) => {
    const element = document.getElementById(id)
    if (element) {
      // Account for fixed header/nav by adding offset
      const yOffset = -80 // Adjust this value based on your header height
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset
      window.scrollTo({ top: y, behavior: 'smooth' })
    }
  }

  return (
    <div className="w-full">
      {/* Article Header */}
      <header className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-dark-text mb-4">
          {title}
        </h1>
        <div className="flex flex-wrap items-center gap-4 text-dark-muted">
          <span>
            {t('post.author')}: {author}
          </span>
          <span>•</span>
          <span>
            {t('post.date')}: {date}
          </span>
          <span>•</span>
          <span>
            {t('post.readingTime')}: {readingTime} {t('post.minutes')}
          </span>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Table of Contents */}
          {tableOfContents.length > 0 && (
            <aside className="lg:w-72 lg:flex-shrink-0 mb-6 lg:mb-0">
              <div className="lg:sticky lg:top-6 lg:max-h-[calc(100vh-3rem)] lg:overflow-y-auto">
                <div className="bg-dark-surface border border-dark-border rounded-xl p-4 lg:p-6">
                  <h3 className="text-base lg:text-lg font-semibold text-dark-text mb-3 lg:mb-4">
                    {t('post.tableOfContents')}
                  </h3>
                  <nav className="mobile-toc lg:max-h-none overflow-y-auto lg:overflow-y-visible">
                    <ul className="space-y-1.5 lg:space-y-2">
                      {tableOfContents.map((item, index) => (
                        <li key={index}>
                          <button
                            onClick={() => scrollToSection(item.id)}
                            className={`text-left w-full hover:text-primary-500 transition-colors leading-relaxed ${
                              item.level === 1 ? 'font-semibold text-dark-text' : 'text-dark-muted'
                            }`}
                            style={{
                              paddingLeft: `${Math.max(0, (item.level - 1) * 0.75)}rem`,
                              fontSize: item.level === 1 ? '0.85rem' : item.level === 2 ? '0.8rem' : '0.75rem'
                            }}
                          >
                            {item.text}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </nav>
                </div>
              </div>
            </aside>
          )}

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            <article className="prose prose-lg max-w-none">
              <ReactMarkdown
                components={components}
                remarkPlugins={[remarkGfm, remarkBreaks]}
                rehypePlugins={[rehypeHighlight, rehypeRaw]}
              >
                {content}
              </ReactMarkdown>
            </article>
          </main>
        </div>
      </div>
    </div>
  )
}

export default MarkdownPost