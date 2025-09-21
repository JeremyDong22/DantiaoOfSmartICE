// API route to serve markdown content
// This avoids build-time file reading issues on Vercel

import fs from 'fs'
import path from 'path'

export default function handler(req, res) {
  const { file } = req.query

  if (!file) {
    return res.status(400).json({ error: 'File parameter required' })
  }

  // Security: only allow specific files
  const allowedFiles = [
    'claude-code-guide-zh.md',
    'claude-code-guide.md'
  ]

  if (!allowedFiles.includes(file)) {
    return res.status(403).json({ error: 'File not allowed' })
  }

  try {
    // Try multiple paths
    const possiblePaths = [
      path.join(process.cwd(), 'content', file),
      path.join(process.cwd(), 'public', 'content', file),
      path.join(process.cwd(), file),
    ]

    let content = null
    let foundPath = null

    for (const tryPath of possiblePaths) {
      if (fs.existsSync(tryPath)) {
        content = fs.readFileSync(tryPath, 'utf8')
        foundPath = tryPath
        break
      }
    }

    if (!content) {
      // Fallback: return embedded content for Chinese version
      if (file === 'claude-code-guide-zh.md') {
        content = `# Claude Code 完整安装指南

欢迎来到 Claude Code 安装指南！

## 内容暂时无法从文件系统加载

请联系管理员解决此问题。

### 临时解决方案

访问 GitHub 仓库查看完整内容：
[https://github.com/JeremyDong22/SoloOfSmartICE](https://github.com/JeremyDong22/SoloOfSmartICE)
`
      } else {
        content = `# Claude Code Installation Guide

Welcome to the Claude Code installation guide!

## Content temporarily unavailable

Please contact the administrator.

### Temporary Solution

Visit the GitHub repository for full content:
[https://github.com/JeremyDong22/SoloOfSmartICE](https://github.com/JeremyDong22/SoloOfSmartICE)
`
      }
    }

    res.status(200).json({
      content,
      path: foundPath,
      debug: {
        cwd: process.cwd(),
        tried: possiblePaths
      }
    })
  } catch (error) {
    res.status(500).json({
      error: error.message,
      stack: error.stack
    })
  }
}