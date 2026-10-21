import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import SEOHead from '@/components/landing/SEOHead'

export default function PrivacyPolicy() {
  return (
    <>
      <SEOHead title="Privacy Policy - Academica" />
      <Navbar />
      <main className="pt-20 pb-12">
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-cobalt-900 mb-6 dark:text-text-primary-dark">Privacy Policy</h1>
          <div className="prose prose-cobalt dark:prose-invert">
            <p className="text-cloud-grey-600 dark:text-text-secondary-dark">Last updated: January 1, 2025</p>
            <p>
              Academica is committed to protecting your privacy. This policy explains how we collect, use, and protect your information.
            </p>
            <h2 className="text-xl font-bold text-cobalt-900 mt-6 dark:text-text-primary-dark">COPPA Compliance</h2>
            <p>
              We comply with the Children's Online Privacy Protection Act (COPPA). For users under 13, we require parental consent before collecting personal information.
            </p>
            <h2 className="text-xl font-bold text-cobalt-900 mt-6 dark:text-text-primary-dark">GDPR Compliance</h2>
            <p>
              We comply with the General Data Protection Regulation (GDPR). Users in the EU have the right to access, rectify, erase, restrict processing, data portability, and object to processing of their personal data.
            </p>
            <h2 className="text-xl font-bold text-cobalt-900 mt-6 dark:text-text-primary-dark">Data Collection</h2>
            <p>
              We collect information necessary to provide our services, including account information, learning progress, and usage analytics. We do not sell your data to third parties.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
