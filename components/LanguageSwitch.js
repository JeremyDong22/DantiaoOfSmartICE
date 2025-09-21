// SmartICE Language Switch Component
// Version: 1.0.0 - Language toggle between Chinese and English

import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'

const LanguageSwitch = () => {
  const { i18n } = useTranslation()
  const router = useRouter()

  const toggleLanguage = () => {
    const newLocale = i18n.language === 'zh' ? 'en' : 'zh'
    router.push(router.pathname, router.asPath, { locale: newLocale })
  }

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-dark-bg hover:bg-dark-border transition-colors duration-200"
      title={i18n.language === 'zh' ? 'Switch to English' : '切换到中文'}
    >
      <span className="text-sm font-medium text-dark-text">
        {i18n.language === 'zh' ? '中' : 'EN'}
      </span>
      <svg className="w-4 h-4 text-dark-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
      </svg>
    </button>
  )
}

export default LanguageSwitch