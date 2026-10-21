import Hero from '@/components/landing/Hero'
import FeatureGrid from '@/components/landing/FeatureGrid'
import ComplianceBadges from '@/components/landing/ComplianceBadges'
import Testimonials from '@/components/landing/Testimonials'
import PricingPreview from '@/components/landing/PricingPreview'
import CTASection from '@/components/landing/CTASection'
import SEOHead from '@/components/landing/SEOHead'
import Footer from '@/components/layout/Footer'

export default function Landing() {
  return (
    <>
      <SEOHead />
      <main>
        <Hero />
        <FeatureGrid />
        <ComplianceBadges />
        <Testimonials />
        <PricingPreview />
        <CTASection />
      </main>
      <Footer />
    </>
  )
}
