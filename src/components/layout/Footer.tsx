import { cn } from '@/lib/utils'
import { Link } from 'react-router-dom'
import LogoMark from '@/components/ui/LogoMark'
import { useTranslation } from 'react-i18next'

interface FooterProps {
  className?: string
}

export default function Footer({ className }: FooterProps) {
  const { t } = useTranslation('common')

  return (
    <footer className={cn('bg-cobalt-900 text-white py-12', className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <LogoMark variant="mono" size={40} />
            <p className="mt-4 text-sm text-cobalt-200 max-w-md">
              Academica — The Intelligent Design & Educational Hub. AI-powered gamified learning
              ecosystem for K-12 and advanced students worldwide.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">Product</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/#features" className="text-sm text-cobalt-200 hover:text-white transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link to="/#pricing" className="text-sm text-cobalt-200 hover:text-white transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="/#compliance" className="text-sm text-cobalt-200 hover:text-white transition-colors">
                  Compliance
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">Legal</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/legal/privacy" className="text-sm text-cobalt-200 hover:text-white transition-colors">
                  {t('privacy')}
                </Link>
              </li>
              <li>
                <Link to="/legal/terms" className="text-sm text-cobalt-200 hover:text-white transition-colors">
                  {t('terms')}
                </Link>
              </li>
              <li>
                <Link to="/legal/contact" className="text-sm text-cobalt-200 hover:text-white transition-colors">
                  {t('contact')}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-cobalt-800">
          <p className="text-sm text-cobalt-300 text-center">
            © {new Date().getFullYear()} Academica. Founded by Harshul Gupta. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
