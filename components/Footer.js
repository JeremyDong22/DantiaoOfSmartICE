// SMARTICE Footer Component
// Version: 1.1.0 - Simple footer with company information, updated branding and year

import { useTranslation } from 'next-i18next'

const Footer = () => {
  const { t } = useTranslation('common')

  return (
    <footer className="bg-dark-surface border-t border-dark-border mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Company Info */}
          <div className="flex items-center space-x-4 mb-4 md:mb-0">
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">S</span>
            </div>
            <div>
              <div className="text-dark-text font-semibold">{t('footer.company')}</div>
              <div className="text-dark-muted text-sm">{t('footer.website')}</div>
            </div>
          </div>

          {/* Copyright */}
          <div className="text-dark-muted text-sm text-center md:text-right">
            <p>© 2025 {t('footer.company')}. {t('footer.allRightsReserved')}</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer