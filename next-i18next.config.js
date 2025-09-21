// SmartICE i18n Configuration
// Version: 1.0.0 - Initial internationalization setup for Chinese and English

module.exports = {
  i18n: {
    defaultLocale: 'zh',
    locales: ['zh', 'en'],
    localeDetection: false, // Disable automatic locale detection for simpler UX
  },
  fallbackLng: {
    default: ['zh'],
  },
  debug: false,
  reloadOnPrerender: process.env.NODE_ENV === 'development',
}