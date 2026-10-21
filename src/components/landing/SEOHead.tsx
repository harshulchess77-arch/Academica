import { Helmet } from 'react-helmet-async'

interface SEOHeadProps {
  title?: string
  description?: string
  ogImage?: string
  canonicalUrl?: string
}

export default function SEOHead({
  title = 'Academica — The Intelligent Design & Educational Hub',
  description = 'AI-powered gamified learning ecosystem for K-12 and advanced students worldwide. Enterprise-grade security, strict COPPA/GDPR compliance, and a liquid glass UI.',
  ogImage = '/og-image.png',
  canonicalUrl = window.location.href,
}: SEOHeadProps) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalUrl} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* Canonical */}
      <link rel="canonical" href={canonicalUrl} />
    </Helmet>
  )
}
