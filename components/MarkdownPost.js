// SmartICE Markdown Post Component
// Version: 1.8.1 - Improved inline code visibility by changing text color from cyan-400 to cyan-300

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react'
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
  const [activeSection, setActiveSection] = useState('')
  const [hoveredItem, setHoveredItem] = useState(null)
  const observerRef = useRef(null)
  const timeoutRef = useRef(null)
  const headingIdMap = useRef(new Map())

  // Generate ID from text that works with both English and Chinese
  const generateId = (text) => {
    // Ensure we have a string
    const cleanText = String(text || '')
      .toLowerCase()
      .trim()
      // Remove emoji and special characters but keep Chinese characters
      .replace(/[^\w\u4e00-\u9fff\s-]/g, '')
      // Replace spaces with hyphens
      .replace(/\s+/g, '-')
      // Remove multiple consecutive hyphens
      .replace(/-+/g, '-')
      // Remove leading/trailing hyphens
      .replace(/^-|-$/g, '')

    // If empty after cleaning, generate a fallback ID
    return cleanText || `section-${Date.now()}`
  }

  // Helper function to extract plain text from React children
  const extractTextFromChildren = (children) => {
    if (typeof children === 'string') {
      return children
    }
    if (Array.isArray(children)) {
      return children.map(child => extractTextFromChildren(child)).join('')
    }
    if (children?.props?.children) {
      return extractTextFromChildren(children.props.children)
    }
    return ''
  }

  // Setup intersection observer for active section tracking
  const setupIntersectionObserver = useCallback(() => {
    if (observerRef.current) {
      observerRef.current.disconnect()
    }

    const observer = new IntersectionObserver(
      (entries) => {
        // Clear any pending timeout
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current)
        }

        // Set a small delay to avoid rapid switching
        timeoutRef.current = setTimeout(() => {
          // Find the entry that's most visible
          let mostVisibleEntry = null
          let maxRatio = 0

          entries.forEach((entry) => {
            if (entry.isIntersecting && entry.intersectionRatio > maxRatio) {
              maxRatio = entry.intersectionRatio
              mostVisibleEntry = entry
            }
          })

          if (mostVisibleEntry) {
            setActiveSection(mostVisibleEntry.target.id)
          }
        }, 100)
      },
      {
        rootMargin: '-160px 0px -70% 0px',
        threshold: [0, 0.1, 0.3, 0.7, 1.0]
      }
    )

    observerRef.current = observer

    // Observe all heading elements
    tableOfContents.forEach((item) => {
      const element = document.getElementById(item.id)
      if (element) {
        observer.observe(element)
      }
    })
  }, [tableOfContents])

  // Calculate reading time and generate table of contents
  useEffect(() => {
    if (content) {
      // Calculate reading time (average 200 words per minute)
      const wordCount = content.split(/\s+/).length
      const minutes = Math.ceil(wordCount / 200)
      setReadingTime(minutes)

      // Clear the heading ID map for fresh generation
      headingIdMap.current.clear()

      // Generate table of contents from headers
      const headers = content.match(/^#{1,6}\s.+$/gm) || []
      const seenIds = new Set()
      const toc = headers.map((header, index) => {
        const level = (header.match(/^#+/) || [''])[0].length
        const text = header.replace(/^#+\s/, '').replace(/\s*\{.*\}$/, '')
        let id = generateId(text)

        // Ensure unique IDs
        let counter = 1
        let originalId = id
        while (seenIds.has(id)) {
          id = `${originalId}-${counter}`
          counter++
        }
        seenIds.add(id)

        // Store the mapping for use in heading components
        headingIdMap.current.set(text, id)

        return { level, text, id, index }
      })
      setTableOfContents(toc)
    }
  }, [content])

  // Setup intersection observer when TOC is ready
  useEffect(() => {
    if (tableOfContents.length > 0) {
      // Small delay to ensure DOM is ready
      const timer = setTimeout(() => {
        setupIntersectionObserver()
      }, 500)

      return () => {
        clearTimeout(timer)
        if (observerRef.current) {
          observerRef.current.disconnect()
        }
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current)
        }
      }
    }
  }, [setupIntersectionObserver])

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
      const text = extractTextFromChildren(children)
      // Use the pre-generated ID from the map, or generate a new one
      const id = headingIdMap.current.get(text) || generateId(text)
      return (
        <h1 id={id} className="text-4xl font-bold text-dark-text mb-6 scroll-mt-32" {...props}>
          {children}
        </h1>
      )
    },
    h2: ({ children, ...props }) => {
      const text = extractTextFromChildren(children)
      // Use the pre-generated ID from the map, or generate a new one
      const id = headingIdMap.current.get(text) || generateId(text)
      return (
        <h2 id={id} className="text-3xl font-semibold text-dark-text mt-12 mb-4 scroll-mt-32" {...props}>
          {children}
        </h2>
      )
    },
    h3: ({ children, ...props }) => {
      const text = extractTextFromChildren(children)
      // Use the pre-generated ID from the map, or generate a new one
      const id = headingIdMap.current.get(text) || generateId(text)
      return (
        <h3 id={id} className="text-2xl font-semibold text-dark-text mt-8 mb-3 scroll-mt-32" {...props}>
          {children}
        </h3>
      )
    },
    h4: ({ children, ...props }) => {
      const text = extractTextFromChildren(children)
      // Use the pre-generated ID from the map, or generate a new one
      const id = headingIdMap.current.get(text) || generateId(text)
      return (
        <h4 id={id} className="text-xl font-semibold text-dark-text mt-6 mb-2 scroll-mt-32" {...props}>
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
        <code className="bg-dark-surface/50 text-cyan-300 font-medium px-1.5 py-0.5 rounded text-sm border border-dark-border/50" {...props}>
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
    console.log('Scrolling to section:', id) // Debug log
    const element = document.getElementById(id)
    console.log('Element found:', element) // Debug log

    if (element) {
      // Account for fixed header/nav and provide better spacing
      const yOffset = -120 // Increased offset for better spacing from top navigation
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset

      // Smooth scroll with better easing
      window.scrollTo({
        top: y,
        behavior: 'smooth'
      })

      // Update active section immediately for better UX
      setActiveSection(id)

      // Add a small visual feedback with improved animation
      element.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
      element.style.transform = 'scale(1.01)'
      element.style.background = 'rgba(59, 130, 246, 0.08)'
      element.style.borderRadius = '0.5rem'

      setTimeout(() => {
        element.style.transform = 'scale(1)'
        element.style.background = 'transparent'
        element.style.borderRadius = '0'
      }, 800)
    } else {
      console.error('Element not found with id:', id) // Debug error
    }
  }

  // Get hierarchy-specific styling
  const getHierarchyStyles = (level, isActive, isHovered) => {
    const baseStyles = {
      transition: 'all 0.2s ease',
      borderRadius: '0.375rem',
      padding: '0.5rem 0.75rem',
      margin: '0.125rem 0',
      cursor: 'pointer',
      display: 'block',
      width: '100%',
      textAlign: 'left',
      border: 'none',
      background: 'transparent',
    }

    const levelStyles = {
      1: {
        fontSize: '1rem',
        fontWeight: '700',
        color: isActive ? '#3b82f6' : '#e5e7eb',
        paddingLeft: '0.75rem',
        borderLeft: isActive ? '3px solid #3b82f6' : '3px solid transparent',
      },
      2: {
        fontSize: '0.9rem',
        fontWeight: '600',
        color: isActive ? '#3b82f6' : '#d1d5db',
        paddingLeft: '1.5rem',
        borderLeft: isActive ? '2px solid #3b82f6' : '2px solid transparent',
      },
      3: {
        fontSize: '0.8rem',
        fontWeight: '500',
        color: isActive ? '#3b82f6' : '#9ca3af',
        paddingLeft: '2.25rem',
        borderLeft: isActive ? '1px solid #3b82f6' : '1px solid transparent',
      },
      4: {
        fontSize: '0.75rem',
        fontWeight: '400',
        color: isActive ? '#3b82f6' : '#6b7280',
        paddingLeft: '3rem',
        opacity: isActive ? 1 : 0.8,
      }
    }

    const hoverStyles = isHovered ? {
      background: 'rgba(59, 130, 246, 0.1)',
      color: '#60a5fa',
      transform: 'translateX(4px)',
    } : {}

    return {
      ...baseStyles,
      ...levelStyles[level] || levelStyles[4],
      ...hoverStyles
    }
  }

  return (
    <div className="w-full">
      {/* Article Header */}
      <header className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="max-w-4xl">
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
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:gap-12 gap-6">
          {/* Table of Contents */}
          {tableOfContents.length > 0 && (
            <aside className="lg:w-72 lg:flex-shrink-0 mb-6 lg:mb-0">
              {/* Mobile TOC - Collapsible */}
              <div className="lg:hidden bg-dark-surface border border-dark-border rounded-xl p-4 mb-6">
                <h3 className="text-base font-semibold text-dark-text mb-3">
                  {t('post.tableOfContents')}
                </h3>
                <nav className="mobile-toc">
                  <ul className="space-y-0.5">
                    {tableOfContents.map((item, index) => {
                      const isActive = activeSection === item.id
                      const isHovered = hoveredItem === index

                      return (
                        <li key={index}>
                          <button
                            onClick={() => scrollToSection(item.id)}
                            onMouseEnter={() => setHoveredItem(index)}
                            onMouseLeave={() => setHoveredItem(null)}
                            className="leading-relaxed"
                            style={getHierarchyStyles(item.level, isActive, isHovered)}
                            aria-current={isActive ? 'location' : undefined}
                          >
                            {item.text}
                          </button>
                        </li>
                      )
                    })}
                  </ul>
                </nav>
              </div>

              {/* Desktop TOC - Fixed and Scrollable with Gradient Border */}
              <div className="hidden lg:block toc-desktop-container">
                <div className="toc-gradient-border shadow-xl h-full overflow-hidden">
                  <div className="p-5 h-full flex flex-col">
                    <h3 className="text-base font-semibold text-dark-text mb-3 pb-2 border-b border-dark-border flex-shrink-0">
                      {t('post.tableOfContents')}
                    </h3>
                    <nav className="overflow-y-auto overflow-x-hidden flex-1 pr-2 custom-scrollbar">
                      <ul className="space-y-0.5">
                        {tableOfContents.map((item, index) => {
                          const isActive = activeSection === item.id
                          const isHovered = hoveredItem === index

                          return (
                            <li key={index}>
                              <button
                                onClick={() => scrollToSection(item.id)}
                                onMouseEnter={() => setHoveredItem(index)}
                                onMouseLeave={() => setHoveredItem(null)}
                                className={`leading-relaxed toc-item w-full text-left ${isActive ? 'active' : ''}`}
                                style={getHierarchyStyles(item.level, isActive, isHovered)}
                                aria-current={isActive ? 'location' : undefined}
                              >
                                {item.text}
                              </button>
                            </li>
                          )
                        })}
                      </ul>
                    </nav>
                  </div>
                </div>
              </div>
            </aside>
          )}

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            <article className="prose prose-lg max-w-4xl">
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