import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import SEOHead from '@/components/landing/SEOHead'

export default function TermsOfService() {
  return (
    <>
      <SEOHead title="Terms of Service - Academica" />
      <Navbar />
      <main className="pt-20 pb-12">
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-cobalt-900 mb-6 dark:text-text-primary-dark">Terms of Service</h1>
          <div className="prose prose-cobalt dark:prose-invert">
            <p className="text-cloud-grey-600 dark:text-text-secondary-dark">Last updated: January 1, 2025</p>
            <p>
              By using Academica, you agree to these terms of service. Please read them carefully.
            </p>
            <h2 className="text-xl font-bold text-cobalt-900 mt-6 dark:text-text-primary-dark">Acceptance of Terms</h2>
            <p>
              By accessing or using Academica, you agree to be bound by these Terms of Service and all applicable laws and regulations.
            </p>
            <h2 className="text-xl font-bold text-cobalt-900 mt-6 dark:text-text-primary-dark">User Accounts</h2>
            <p>
              You are responsible for maintaining the confidentiality of your account and password. You agree to accept responsibility for all activities that occur under your account.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
