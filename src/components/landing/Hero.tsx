import { cn } from '@/lib/utils'
import { ArrowRight, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import Button from '@/components/ui/Button'
import LogoMark from '@/components/ui/LogoMark'
import { OrbitingSubjectsRing } from './OrbitingSubjectsRing'

interface HeroProps {
  className?: string
}

export default function Hero({ className }: HeroProps) {
  return (
    <section className={cn('relative overflow-hidden bg-canvas dark:bg-cobalt-ink', className)}>
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-cobalt-50 via-white to-amethyst-50 dark:from-cobalt-900/20 dark:via-cobalt-ink dark:to-amethyst-900/20" />

      {/* Particles overlay */}
      <div className="absolute inset-0 opacity-30">
        <img src="/hero-particles.svg" alt="" className="w-full h-full object-cover" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            {/* Logo */}
            <div className="flex justify-center lg:justify-start mb-8">
              <LogoMark variant="horizontal" />
            </div>

            {/* Headline */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-cobalt-900 mb-6 tracking-tight dark:text-text-primary-dark">
              The Intelligent Design
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cobalt-600 to-amethyst-600 dark:from-cobalt-400 dark:to-amethyst-400">
                & Educational Hub
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-xl md:text-2xl text-cloud-grey-600 max-w-3xl mx-auto lg:mx-0 mb-8 dark:text-text-secondary-dark">
              AI-powered gamified learning ecosystem for K-12 and advanced students worldwide.
              Enterprise-grade security, strict COPPA/GDPR compliance, and a liquid glass UI.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center">
              <Link to="/auth">
                <Button size="lg" className="group">
                  Get Started Free
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/#features">
                <Button size="lg" variant="ghost">
                  <Sparkles className="mr-2 w-5 h-5" />
                  Explore Features
                </Button>
              </Link>
            </div>

            {/* Trust badges */}
            <div className="mt-12 flex flex-wrap justify-center lg:justify-start gap-6 text-sm text-cloud-grey-500 dark:text-text-secondary-dark">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-teal-500" />
                COPPA Compliant
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-teal-500" />
                GDPR Ready
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-teal-500" />
                Enterprise Security
              </div>
            </div>
          </div>

          {/* Right Visual - Orbiting Subjects */}
          <div className="flex justify-center lg:justify-end">
            <OrbitingSubjectsRing />
          </div>
        </div>
      </div>
    </section>
  )
}
