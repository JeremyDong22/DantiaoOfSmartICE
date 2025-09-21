// API route to serve markdown content
// Version: 1.1.0 - Enhanced with verbose logging for Vercel debugging

import fs from 'fs'
import path from 'path'

export default function handler(req, res) {
  console.log('=== API CONTENT HANDLER START ===')
  console.log('Request URL:', req.url)
  console.log('Query params:', req.query)
  console.log('process.cwd():', process.cwd())
  console.log('__dirname would be:', __dirname || 'undefined')
  console.log('Vercel env:', process.env.VERCEL)

  const { file } = req.query

  if (!file) {
    console.log('ERROR: No file parameter provided')
    return res.status(400).json({ error: 'File parameter required' })
  }

  // Security: only allow specific files
  const allowedFiles = [
    'claude-code-guide-zh.md',
    'claude-code-guide.md'
  ]

  if (!allowedFiles.includes(file)) {
    console.log('ERROR: File not in allowed list:', file)
    return res.status(403).json({ error: 'File not allowed' })
  }

  console.log('Attempting to read file:', file)

  try {
    const baseDir = process.cwd()

    // List root directory contents for debugging
    console.log('\n=== ROOT DIRECTORY LISTING (API) ===')
    try {
      const rootItems = fs.readdirSync(baseDir)
      console.log('Root items:', rootItems.filter(item => !item.startsWith('.')))
    } catch (e) {
      console.error('Failed to list root:', e.message)
    }

    // Check content directory
    const contentDir = path.join(baseDir, 'content')
    console.log('\n=== CONTENT DIRECTORY CHECK (API) ===')
    console.log('Content path:', contentDir)
    console.log('Content exists:', fs.existsSync(contentDir))

    if (fs.existsSync(contentDir)) {
      try {
        const contentItems = fs.readdirSync(contentDir)
        console.log('Content items:', contentItems)
      } catch (e) {
        console.error('Failed to list content dir:', e.message)
      }
    }

    // Try multiple paths
    const possiblePaths = [
      path.join(baseDir, 'content', file),
      path.join(baseDir, file),
      path.join(baseDir, 'public', 'content', file),
      path.join(baseDir, 'public', file),
    ]

    console.log('\n=== TRYING PATHS (API) ===')
    let content = null
    let foundPath = null

    for (const tryPath of possiblePaths) {
      console.log(`Checking: ${tryPath}`)
      console.log(`Exists: ${fs.existsSync(tryPath)}`)

      if (fs.existsSync(tryPath)) {
        console.log('✅ Found file at:', tryPath)
        const stats = fs.statSync(tryPath)
        console.log(`File size: ${stats.size} bytes`)

        content = fs.readFileSync(tryPath, 'utf8')
        console.log(`Read ${content.length} characters`)
        foundPath = tryPath
        break
      }
    }

    if (!content) {
      console.log('❌ File not found in any location')
      console.log('Returning fallback content')

      // Fallback: return embedded content
      if (file === 'claude-code-guide-zh.md') {
        content = `# Claude Code 完整安装指南

欢迎来到 Claude Code 安装指南！

## 内容暂时无法从文件系统加载

调试信息：
- 工作目录: ${process.cwd()}
- 请求文件: ${file}
- Vercel环境: ${process.env.VERCEL || 'false'}

### 临时解决方案

访问 GitHub 仓库查看完整内容：
[https://github.com/JeremyDong22/SoloOfSmartICE](https://github.com/JeremyDong22/SoloOfSmartICE)
`
      } else {
        content = `# Claude Code Installation Guide

Welcome to the Claude Code installation guide!

## Content temporarily unavailable

Debug info:
- Working directory: ${process.cwd()}
- Requested file: ${file}
- Vercel environment: ${process.env.VERCEL || 'false'}

### Temporary Solution

Visit the GitHub repository for full content:
[https://github.com/JeremyDong22/SoloOfSmartICE](https://github.com/JeremyDong22/SoloOfSmartICE)
`
      }
    }

    console.log('=== API CONTENT HANDLER END ===\n')

    res.status(200).json({
      content,
      path: foundPath,
      debug: {
        cwd: process.cwd(),
        tried: possiblePaths,
        vercel: process.env.VERCEL,
        nodeEnv: process.env.NODE_ENV
      }
    })
  } catch (error) {
    console.error('=== API ERROR ===')
    console.error('Error:', error.message)
    console.error('Stack:', error.stack)

    res.status(500).json({
      error: error.message,
      stack: error.stack,
      debug: {
        cwd: process.cwd(),
        file: file
      }
    })
  }
}