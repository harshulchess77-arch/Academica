import { useState, useEffect } from 'react'
import Modal from '@/components/ui/Modal'
import Button from '@/components/ui/Button'

const SESSION_TIMEOUT = 30 * 60 * 1000 // 30 minutes
const WARNING_TIMEOUT = 60 * 1000 // 1 minute warning

export default function SessionTimeoutModal() {
  const [showWarning, setShowWarning] = useState(false)
  const [countdown, setCountdown] = useState(60)
  const [activityTimeout, setActivityTimeout] = useState<NodeJS.Timeout>()
  const [warningTimeout, setWarningTimeout] = useState<NodeJS.Timeout>()
  const [countdownInterval, setCountdownInterval] = useState<NodeJS.Timeout>()

  useEffect(() => {
    const resetTimers = () => {
      clearTimeout(activityTimeout)
      clearTimeout(warningTimeout)
      clearInterval(countdownInterval)

      const newActivityTimeout = setTimeout(() => {
        // Session expired - sign out
        window.location.href = '/auth'
      }, SESSION_TIMEOUT)

      const newWarningTimeout = setTimeout(() => {
        setShowWarning(true)
        setCountdown(60)

        const newCountdownInterval = setInterval(() => {
          setCountdown((prev) => {
            if (prev <= 1) {
              clearInterval(newCountdownInterval)
              window.location.href = '/auth'
              return 0
            }
            return prev - 1
          })
        }, 1000)

        setCountdownInterval(newCountdownInterval)
      }, SESSION_TIMEOUT - WARNING_TIMEOUT)

      setActivityTimeout(newActivityTimeout)
      setWarningTimeout(newWarningTimeout)
    }

    // Activity listeners
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart']
    const handleActivity = () => {
      if (showWarning) {
        // User is still here - reset warning
        setShowWarning(false)
      }
      resetTimers()
    }

    events.forEach((event) => window.addEventListener(event, handleActivity))
    resetTimers()

    return () => {
      events.forEach((event) => window.removeEventListener(event, handleActivity))
      clearTimeout(activityTimeout)
      clearTimeout(warningTimeout)
      clearInterval(countdownInterval)
    }
  }, [showWarning])

  const handleStaySignedIn = () => {
    setShowWarning(false)
    // Timers will reset via activity listener
  }

  return (
    <Modal isOpen={showWarning} onClose={() => {}} title="Session Expiring Soon">
      <div className="text-center">
        <p className="text-cobalt-900 dark:text-text-primary-dark mb-4">
          Your session will expire in <span className="font-bold text-cobalt-600 dark:text-cobalt-400">{countdown}</span> seconds due to inactivity.
        </p>
        <Button onClick={handleStaySignedIn} className="w-full">
          I'm still here
        </Button>
      </div>
    </Modal>
  )
}
