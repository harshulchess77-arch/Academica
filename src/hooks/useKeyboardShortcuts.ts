import { useEffect } from 'react'

export function useKeyboardShortcuts() {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd/Ctrl+K: Command Palette
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        // Open command palette
        console.log('Command palette triggered')
      }

      // Cmd/Ctrl+/: AI Companion
      if ((e.metaKey || e.ctrlKey) && e.key === '/') {
        e.preventDefault()
        // Toggle AI Companion drawer
        console.log('AI Companion toggled')
      }

      // Cmd/Ctrl+J: Journal quick entry
      if ((e.metaKey || e.ctrlKey) && e.key === 'j') {
        e.preventDefault()
        // Open journal quick entry
        console.log('Journal quick entry opened')
      }

      // Esc: Close modal/drawer
      if (e.key === 'Escape') {
        // Close any open modal or drawer
        console.log('Escape pressed - close modal')
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])
}
