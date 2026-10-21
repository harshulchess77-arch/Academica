import { cn } from '@/lib/utils'
import { Quote } from 'lucide-react'
import Avatar from '@/components/ui/Avatar'

interface TestimonialsProps {
  className?: string
}

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'High School Student',
    avatar: null,
    content: 'Academica transformed how I study. The AI tutor helps me understand concepts instead of just memorizing answers.',
  },
  {
    name: 'Michael Rodriguez',
    role: 'Teacher',
    avatar: null,
    content: 'The classroom tools and analytics help me track student progress like never before. My students love the gamification.',
  },
  {
    name: 'Emma Thompson',
    role: 'Parent',
    avatar: null,
    content: 'As a parent, I appreciate the privacy controls and the ability to see my child\'s progress without invading their privacy.',
  },
]

export default function Testimonials({ className }: TestimonialsProps) {
  return (
    <section className={cn('py-20 bg-white dark:bg-slate-glass', className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-cobalt-900 mb-4 dark:text-text-primary-dark">
            Loved by Students, Teachers & Parents
          </h2>
          <p className="text-lg text-cloud-grey-600 max-w-2xl mx-auto dark:text-text-secondary-dark">
            Join thousands of learners who are achieving their goals with Academica.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="p-6 rounded-2xl bg-cobalt-50 border border-cloud-grey-200 dark:bg-cobalt-900/20 dark:border-white/10"
            >
              <Quote className="w-8 h-8 text-cobalt-300 mb-4 dark:text-cobalt-600" />
              <p className="text-cobalt-900 mb-6 dark:text-text-primary-dark">{testimonial.content}</p>
              <div className="flex items-center gap-3">
                <Avatar src={testimonial.avatar} name={testimonial.name} size="md" />
                <div>
                  <p className="font-semibold text-cobalt-900 dark:text-text-primary-dark">{testimonial.name}</p>
                  <p className="text-sm text-cloud-grey-600 dark:text-text-secondary-dark">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
