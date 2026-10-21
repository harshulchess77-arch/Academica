import Modal from '@/components/ui/Modal'
import Button from '@/components/ui/Button'
import { onboardingStore } from '@/store'

interface VPNWarningModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function VPNWarningModal({ isOpen, onClose }: VPNWarningModalProps) {
  const { updateField, setStep } = onboardingStore()

  const handleContinue = () => {
    updateField('vpnCheckPassed', true)
    onClose()
    setStep(4)
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="VPN Detected">
      <div className="space-y-4">
        <p className="text-cobalt-900 dark:text-text-primary-dark">
          We detected that you might be using a VPN or proxy. This may affect your learning experience
          and regional content availability.
        </p>
        <p className="text-sm text-cloud-grey-600 dark:text-text-secondary-dark">
          For the best experience, we recommend disabling your VPN. However, you can continue if you prefer.
        </p>
        <div className="flex gap-3">
          <Button variant="ghost" onClick={onClose}>
            Disable VPN & Retry
          </Button>
          <Button onClick={handleContinue}>Continue Anyway</Button>
        </div>
      </div>
    </Modal>
  )
}
