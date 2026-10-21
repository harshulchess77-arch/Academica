import { cn } from '@/lib/utils'
import { Bell } from 'lucide-react'
import { HTMLAttributes } from 'react'

interface NotificationBellProps extends HTMLAttributes<HTMLButtonElement> {
  unreadCount: number
  onClick: () => void
}

export default function NotificationBell({ unreadCount, onClick, className, ...props }: NotificationBellProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'relative p-2 rounded-lg hover:bg-cloud-grey-100 transition-colors dark:hover:bg-white/10',
        className
      )}
      {...props}
    >
      <Bell className="w-5 h-5 text-cobalt-600 dark:text-text-secondary-dark" />
      {unreadCount > 0 && (
        <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
          {unreadCount > 9 ? '9+' : unreadCount}
        </span>
      )}
    </button>
  )
}
