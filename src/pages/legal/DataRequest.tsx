import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import SEOHead from '@/components/landing/SEOHead'
import ProtectedRoute from '@/components/layout/ProtectedRoute'
import Button from '@/components/ui/Button'
import { Download, Trash2 } from 'lucide-react'

export default function DataRequest() {
  return (
    <ProtectedRoute>
      <SEOHead title="Data Request - Academica" />
      <Navbar />
      <main className="pt-20 pb-12">
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-cobalt-900 mb-6 dark:text-text-primary-dark">Data Request</h1>
          <div className="space-y-6">
            <div className="p-6 bg-white rounded-xl border border-cloud-grey-200 dark:bg-slate-glass dark:border-white/10">
              <h2 className="text-xl font-bold text-cobalt-900 mb-4 dark:text-text-primary-dark">Export My Data</h2>
              <p className="text-cloud-grey-600 mb-4 dark:text-text-secondary-dark">
                Download a copy of all your personal data, including profile information, learning progress, and account settings.
              </p>
              <Button className="gap-2">
                <Download className="w-4 h-4" />
                Export Data
              </Button>
            </div>

            <div className="p-6 bg-white rounded-xl border border-red-200 dark:bg-slate-glass dark:border-red-800">
              <h2 className="text-xl font-bold text-red-900 mb-4 dark:text-red-300">Delete My Account</h2>
              <p className="text-cloud-grey-600 mb-4 dark:text-text-secondary-dark">
                Permanently delete your account and all associated data. This action cannot be undone.
              </p>
              <Button variant="danger" className="gap-2">
                <Trash2 className="w-4 h-4" />
                Delete Account
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </ProtectedRoute>
  )
}
