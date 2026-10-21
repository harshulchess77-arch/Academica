import { cn } from '@/lib/utils'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import LogoMark from '@/components/ui/LogoMark'
import NotificationBell from '@/components/ui/NotificationBell'
import LanguageSwitcher from '@/components/ui/LanguageSwitcher'
import ThemeToggle from '@/components/ui/ThemeToggle'
import Avatar from '@/components/ui/Avatar'
import DropdownMenu from '@/components/ui/DropdownMenu'
import { authStore } from '@/store'
import { useTranslation } from 'react-i18next'

interface NavbarProps {
  className?: string
}

export default function Navbar({ className }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const location = useLocation()
  const { profile } = authStore()
  const { t } = useTranslation('common')

  const isAuthPage = location.pathname === '/auth' || location.pathname === '/onboarding'
  const isDashboard = location.pathname.startsWith('/dashboard')
  const isPublic = !isAuthPage && !isDashboard

  const navItems = isPublic
    ? [
        { label: t('home'), href: '/' },
        { label: t('about'), href: '/#about' },
        { label: t('contact'), href: '/#contact' },
      ]
    : []

  const userMenuItems = [
    { label: t('profile'), onClick: () => {} },
    { label: t('settings'), onClick: () => {} },
    { label: t('logout'), onClick: () => authStore.signOut() },
  ]

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-40 bg-white/60 backdrop-blur-xl border-b border-white/40 transition-all',
        isDashboard && 'bg-white/80 dark:bg-slate-glass/80 dark:border-white/10',
        className
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <LogoMark variant="icon" size={32} />
          </Link>

          {/* Desktop Navigation */}
          {navItems.length > 0 && (
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className="text-sm font-medium text-cobalt-900 hover:text-cobalt-600 transition-colors dark:text-text-primary-dark dark:hover:text-cobalt-400"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          )}

          {/* Right side actions */}
          <div className="flex items-center gap-2">
            {profile ? (
              <>
                {isDashboard && <NotificationBell unreadCount={0} onClick={() => {}} />}
                <LanguageSwitcher />
                <ThemeToggle />
                <DropdownMenu
                  trigger={
                    <Avatar
                      src={profile.avatarUrl}
                      name={profile.fullName}
                      size="sm"
                      className="cursor-pointer"
                    />
                  }
                  items={userMenuItems}
                />
              </>
            ) : (
              <>
                <LanguageSwitcher />
                <ThemeToggle />
                {!isAuthPage && (
                  <Link to="/auth">
                    <button className="px-4 py-2 bg-cobalt-600 text-white rounded-lg hover:bg-cobalt-700 transition-colors text-sm font-medium dark:bg-cobalt-500 dark:hover:bg-cobalt-400">
                      {t('signIn')}
                    </button>
                  </Link>
                )}
              </>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-cloud-grey-100 dark:hover:bg-white/10"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5 text-cobalt-900 dark:text-text-primary-dark" />
              ) : (
                <Menu className="w-5 h-5 text-cobalt-900 dark:text-text-primary-dark" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-cloud-grey-200 dark:border-white/10 bg-white/95 backdrop-blur-xl dark:bg-slate-glass/95">
          <div className="px-4 py-4 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-lg text-sm font-medium text-cobalt-900 hover:bg-cloud-grey-100 dark:text-text-primary-dark dark:hover:bg-white/10"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}
