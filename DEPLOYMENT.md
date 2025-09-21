# SmartICE Vercel Deployment Guide
**Version: 1.0.0** - Complete deployment instructions and verification steps

## 🚀 Quick Deployment

### Prerequisites
- [Vercel CLI](https://vercel.com/cli) installed globally: `npm i -g vercel`
- Git repository connected to GitHub/GitLab/Bitbucket
- Node.js 18+ and npm installed locally

### Automated Deployment (Recommended)

1. **Connect to Vercel**
   ```bash
   # Login to Vercel
   vercel login

   # Deploy from project root
   cd /path/to/smartice-project
   vercel
   ```

2. **Follow the prompts:**
   - Set up and deploy? `Y`
   - Which scope? Select your account/team
   - Link to existing project? `N` (for first deployment)
   - Project name: `smartice-internal-website`
   - Directory: `./` (current directory)

3. **Production deployment:**
   ```bash
   vercel --prod
   ```

## 🔧 Manual Configuration

### Environment Variables Setup

1. **Copy environment template:**
   ```bash
   cp .env.example .env.local
   ```

2. **Configure required variables:**
   ```bash
   # Edit .env.local with your values
   NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app
   NODE_ENV=production
   ```

3. **Add to Vercel dashboard:**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Select your project
   - Go to Settings > Environment Variables
   - Add each variable from `.env.example`

### Custom Domain Setup

1. **Add custom domain in Vercel:**
   - Project Settings > Domains
   - Add your domain (e.g., `smartice.com`)

2. **Configure DNS:**
   - Add CNAME record: `www` → `cname.vercel-dns.com`
   - Add A record: `@` → `76.76.19.61`

## 📊 Performance Optimizations Applied

### Build Optimizations
- ✅ **SWC Minification**: Faster builds with better compression
- ✅ **CSS Optimization**: Automatic critical CSS extraction
- ✅ **Image Optimization**: Next.js automatic image optimization
- ✅ **Static Generation**: Pre-rendered pages for better performance

### Caching Strategy
- **Static Assets**: 1 year cache (`/_next/static/*`)
- **Images**: 24 hours cache (`/images/*`)
- **API Routes**: No cache (dynamic content)
- **HTML Pages**: Revalidate on each request

### Security Headers
- **X-Content-Type-Options**: Prevents MIME type sniffing
- **X-Frame-Options**: Prevents clickjacking attacks
- **X-XSS-Protection**: Enables XSS filtering
- **Referrer-Policy**: Controls referrer information
- **Permissions-Policy**: Restricts browser features

### Edge Configuration
- **Region**: Primary deployment in `iad1` (US East)
- **Function Timeout**: 10 seconds for API routes
- **Clean URLs**: Automatic `.html` extension removal
- **Trailing Slash**: Disabled for consistency

## 🔍 Post-Deployment Verification

### Automated Health Checks

1. **Health endpoint verification:**
   ```bash
   curl https://your-domain.vercel.app/health
   ```

   Expected response:
   ```json
   {
     "status": "healthy",
     "timestamp": "2024-xx-xxT00:00:00.000Z",
     "version": "1.0.0",
     "environment": "production",
     "services": {
       "nextjs": "operational",
       "i18n": "operational"
     }
   }
   ```

### Manual Testing Checklist

- [ ] **Homepage loads correctly**: Visit main URL
- [ ] **Navigation works**: Test all menu items
- [ ] **Internationalization**: Test language switching (if enabled)
- [ ] **Mobile responsiveness**: Test on mobile devices
- [ ] **Performance**: Check Lighthouse scores
- [ ] **Console errors**: No JavaScript errors in browser console

### Performance Testing

1. **Lighthouse audit:**
   ```bash
   npx lighthouse https://your-domain.vercel.app --output=html
   ```

2. **Core Web Vitals check:**
   - First Contentful Paint (FCP): < 1.8s
   - Largest Contentful Paint (LCP): < 2.5s
   - Cumulative Layout Shift (CLS): < 0.1

## 🛠️ Troubleshooting

### Common Issues

**Build Failures:**
```bash
# Clear cache and reinstall
rm -rf .next node_modules package-lock.json
npm install
npm run build
```

**Environment Variables Not Working:**
- Verify variables are added in Vercel dashboard
- Check variable names match exactly (case-sensitive)
- Redeploy after adding new variables

**404 Errors:**
- Check `vercel.json` rewrites configuration
- Verify file paths in pages directory
- Ensure trailing slash configuration

**Performance Issues:**
- Enable Vercel Analytics in dashboard
- Check bundle analyzer: `npm run build && npx @next/bundle-analyzer`
- Optimize images and reduce bundle size

### Monitoring & Alerts

**Vercel Dashboard Monitoring:**
- Functions: Monitor API route performance
- Analytics: Track user behavior and performance
- Deployments: View build logs and deployment history

**External Monitoring Setup:**
```bash
# Add to your monitoring service
curl -f https://your-domain.vercel.app/health || exit 1
```

## 🔄 Continuous Deployment

### GitHub Integration

1. **Automatic deployments:**
   - Push to `main` branch triggers production deployment
   - Pull requests create preview deployments
   - Configure branch protection rules

2. **Preview deployments:**
   - Each PR gets unique preview URL
   - Perfect for testing before merge
   - Automatic cleanup after PR closure

### Deployment Commands

```bash
# Development preview
vercel

# Production deployment
vercel --prod

# Deploy specific branch
vercel --prod --target production

# Rollback to previous deployment
vercel rollback [deployment-url]
```

## 🔒 Security Best Practices

### Environment Security
- Never commit `.env` files to version control
- Use Vercel environment variables for secrets
- Rotate API keys regularly
- Use different keys for production and development

### Content Security
- All security headers configured in `vercel.json`
- Regular dependency updates via `npm audit`
- Monitor for security vulnerabilities

## 📞 Support & Resources

- **Vercel Documentation**: https://vercel.com/docs
- **Next.js Documentation**: https://nextjs.org/docs
- **Vercel Support**: https://vercel.com/support
- **Status Page**: https://status.vercel.com

---

**Last Updated**: September 2024
**Maintainer**: SmartICE Development Team