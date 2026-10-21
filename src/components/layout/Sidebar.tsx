import { cn } from '@/lib/utils'
import { Home, BarChart3, TreeDeciduous, MessageSquare, Mic, AlertTriangle, Wifi, Settings, BookOpen, Timer, Users, Layers, Code, Trophy, LayoutDashboard, Bell, Award, ChevronLeft, ChevronRight } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { uiStore } from '@/store'
import { useTranslation } from 'react-i18next'

interface SidebarProps {
  className?: string
}

interface NavItem {
  label: string
  href: string
  icon: React.ReactNode
}

export default function Sidebar({ className }: SidebarProps) {
  const { sidebarCollapsed, toggleSidebar } = uiStore()
  const location = useLocation()
  const { t } = useTranslation('dashboard')

  const navItems: NavItem[] = [
    { label: t('overview'), href: '/dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
    { label: t('analytics'), href: '/dashboard/analytics', icon: <BarChart3 className="w-5 h-5" /> },
    { label: t('skillTree'), href: '/dashboard/skill-tree', icon: <TreeDeciduous className="w-5 h-5" /> },
    { label: t('aiCompanion'), href: '/dashboard/ai-companion', icon: <MessageSquare className="w-5 h-5" /> },
    { label: t('voicePractice'), href: '/dashboard/voice-practice', icon: <Mic className="w-5 h-5" /> },
    { label: t('gapDiagnostics'), href: '/dashboard/gap-diagnostics', icon: <AlertTriangle className="w-5 h-5" /> },
    { label: t('offlineSync'), href: '/dashboard/offline-sync', icon: <Wifi className="w-5 h-5" /> },
    { label: t('accessibility'), href: '/dashboard/accessibility', icon: <Settings className="w-5 h-5" /> },
    { label: t('journal'), href: '/dashboard/journal', icon: <BookOpen className="w-5 h-5" /> },
    { label: t('focusTimer'), href: '/dashboard/focus-timer', icon: <Timer className="w-5 h-5" /> },
    { label: t('guilds'), href: '/dashboard/guilds', icon: <Users className="w-5 h-5" /> },
    { label: t('flashcards'), href: '/dashboard/flashcards', icon: <Layers className="w-5 h-5" /> },
    { label: t('playground'), href: '/dashboard/playground', icon: <Code className="w-5 h-5" /> },
    { label: t('vault'), href: '/dashboard/vault', icon: <Trophy className="w-5 h-5" /> },
    { label: t('leaderboard'), href: '/dashboard/leaderboard', icon: <Award className="w-5 h-5" /> },
    { label: t('certificates'), href: '/dashboard/certificates', icon: <Bell className="w-5 h-5" /> },
  ]

  return (
    <aside
      className={cn(
        'fixed left-0 top-16 bottom-0 z-30 bg-white border-r border-cloud-grey-200 transition-all duration-300 dark:bg-slate-glass dark:border-white/10',
        sidebarCollapsed ? 'w-16' : 'w-64',
        className
      )}
    >
      {/* Collapse toggle */}
      <button
        onClick={toggleSidebar}
        className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-white border border-cloud-grey-200 rounded-full flex items-center justify-center shadow-sm hover:bg-cloud-grey-50 dark:bg-slate-glass dark:border-white/10 dark:hover:bg-white/10"
      >
        {sidebarCollapsed ? (
          <ChevronRight className="w-4 h-4 text-cobalt-600 dark:text-cobalt-400" />
        ) : (
          <ChevronLeft className="w-4 h-4 text-cobalt-600 dark:text-cobalt-400" />
        )}
      </button>

      {/* Navigation */}
      <nav className="h-full overflow-y-auto py-4">
        <ul className="space-y-1 px-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.href
            return (
              <li key={item.href}>
                <Link
                  to={item.href}
                  className={cn(
                    'flex items-center gap-3 px-3 py-2 rounded-lg transition-colors',
                    isActive
                      ? 'bg-cobalt-100 text-cobalt-900 dark:bg-cobalt-900/30 dark:text-cobalt-300'
                      : 'text-cloud-grey-600 hover:bg-cloud-grey-100 dark:text-text-secondary-dark dark:hover:bg-white/10',
                    sidebarCollapsed && 'justify-center'
                  )}
                  title={sidebarCollapsed ? item.label : undefined}
                >
                  {item.icon}
                  {!sidebarCollapsed && <span className="text-sm font-medium">{item.label}</span>}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
    </aside>
  )
}
