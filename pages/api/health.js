// SmartICE Health Check API
// Version: 1.0.0 - Health monitoring endpoint for deployment verification

export default function handler(req, res) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET'])
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const healthData = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      version: process.env.npm_package_version || '1.0.0',
      environment: process.env.NODE_ENV || 'development',
      region: process.env.VERCEL_REGION || 'unknown',
      deployment: {
        vercel: !!process.env.VERCEL,
        url: process.env.VERCEL_URL || process.env.NEXT_PUBLIC_APP_URL,
        git_commit: process.env.VERCEL_GIT_COMMIT_SHA?.slice(0, 7) || 'unknown'
      },
      services: {
        nextjs: 'operational',
        i18n: 'operational'
      }
    }

    // Set cache headers for health check
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate')
    res.setHeader('Pragma', 'no-cache')
    res.setHeader('Expires', '0')

    return res.status(200).json(healthData)
  } catch (error) {
    // Log error for debugging, but avoid exposing details
    // eslint-disable-next-line no-console
    console.error('Health check failed:', error)
    return res.status(503).json({
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      error: 'Service temporarily unavailable'
    })
  }
}