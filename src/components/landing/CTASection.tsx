import { cn } from '@/lib/utils'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import Button from '@/components/ui/Button'

interface CTASectionProps {
  className?: string
}

export default function CTASection({ className }: CTASectionProps) {
  return (
    <section className={cn('py-20 bg-gradient-to-r from-cobalt-600 to-amethyst-600 dark:from-cobalt-500 dark:to-amethyst-500', className)}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
          Ready to Transform Your Learning?
        </h2>
        <p className="text-xl text-white/90 mb-8">
          Join thousands of students who are achieving their goals with Academica's AI-powered platform.
        </p>
        <Link to="/auth">
          <Button size="lg" className="bg-white text-cobalt-600 hover:bg-cloud-grey-100">
            Start Your Free Journey
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </Link>
      </div>
    </section>
  )
}
