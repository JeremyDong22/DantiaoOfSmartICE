# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview
SmartICE Internal Learning Platform - A bilingual (Chinese/English) Next.js application for internal documentation and knowledge sharing.

## Development Commands

### Start Development Server
```bash
npm run dev
```
Access at: http://localhost:3000

### Build for Production
```bash
npm run build
npm start
```

### Linting
```bash
npm run lint
```

## Architecture

### Core Technologies
- **Next.js 14.0.0** - React framework with app routing
- **Tailwind CSS** - Styling framework
- **next-i18next** - Internationalization (Chinese default, English supported)
- **React Markdown** - For rendering markdown content with syntax highlighting

### Project Structure
- `pages/` - Next.js page components using file-based routing
- `components/` - Reusable React components
  - `MarkdownPost.js` - Advanced markdown renderer with TOC, syntax highlighting, and copy-to-clipboard
  - `Layout.js` - Main layout wrapper with navigation and footer
  - `LanguageSwitch.js` - Language toggle component
- `public/locales/` - i18n translation files (zh/en)
- `styles/globals.css` - Global Tailwind CSS styles with custom dark theme

### Key Components

#### MarkdownPost Component
Custom markdown renderer with:
- Automatic table of contents generation with smooth scrolling
- Syntax highlighting for code blocks
- Copy-to-clipboard functionality
- Reading time calculation
- Active section tracking
- Responsive design with mobile/desktop TOC variants

#### Internationalization
- Default locale: Chinese (zh)
- Supported locales: Chinese (zh), English (en)
- Translation files in `public/locales/{locale}/common.json`
- Language switching via `LanguageSwitch` component

### Configuration Files
- `next.config.js` - Next.js configuration with performance optimizations and security headers
- `next-i18next.config.js` - i18n configuration
- `tailwind.config.js` - Tailwind CSS customization
- `.eslintrc.json` - ESLint rules configuration

## Development Guidelines

### Adding New Pages
1. Create new `.js` file in `pages/` directory
2. Import required translations using `serverSideTranslations`
3. Follow existing page structure for consistency

### Working with Markdown Content
- Use the `MarkdownPost` component for all markdown rendering
- Headers automatically generate TOC entries
- Code blocks support syntax highlighting via highlight.js

### Styling
- Use Tailwind CSS classes for styling
- Dark theme color variables defined in `globals.css`
- Custom scrollbar styles applied globally

### Performance Considerations
- Images optimized with Next.js Image component
- CSS optimization enabled in production
- Security headers configured for production deployment

## Claude Code Subagents

### Blog Writer Subagent
Located in `.claude/agents/blog-writer.md`, this specialized subagent maintains consistency with the established Claude Code Guide format and style:

**Key Features:**
- Follows exact formatting patterns from existing documentation
- Bilingual content creation (Chinese/English)
- Professional yet approachable tone
- Consistent emoji usage and header structures
- Technical accuracy with practical examples
- Built-in quality checklists and format verification

**Usage:**
- Automatically invoked for technical documentation and blog post creation
- Maintains consistency with the Claude Code Guide style
- Ensures proper markdown formatting and structure
- Includes version tracking and comprehensive troubleshooting sections

**Tools Access:** Read, Write, Glob, Grep, MultiEdit
**Model:** Sonnet

### Subagent Management
- Project-level subagents stored in `.claude/agents/`
- Version controlled and shared across team
- See `.claude/agents/README.md` for detailed documentation
- Examples and usage patterns in `.claude/agents/usage-examples.md`