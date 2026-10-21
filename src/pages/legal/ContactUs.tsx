import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import SEOHead from '@/components/landing/SEOHead'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'

export default function ContactUs() {
  return (
    <>
      <SEOHead title="Contact Us - Academica" />
      <Navbar />
      <main className="pt-20 pb-12">
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-cobalt-900 mb-6 dark:text-text-primary-dark">Contact Us</h1>
          <div className="p-6 bg-white rounded-xl border border-cloud-grey-200 dark:bg-slate-glass dark:border-white/10">
            <form className="space-y-4">
              <Input label="Name" placeholder="Your name" />
              <Input type="email" label="Email" placeholder="you@example.com" />
              <Input label="Subject" placeholder="How can we help?" />
              <div>
                <label className="block text-sm font-medium text-cobalt-900 mb-1 dark:text-text-primary-dark">Message</label>
                <textarea
                  className="w-full px-4 py-2 rounded-lg border border-cloud-grey-300 bg-white text-cobalt-900 placeholder:text-cloud-grey-400 focus:outline-none focus:ring-2 focus:ring-cobalt-500 focus:border-transparent dark:bg-slate-glass dark:border-white/20 dark:text-text-primary-dark"
                  rows={5}
                  placeholder="Your message..."
                />
              </div>
              <Button type="submit" className="w-full">Send Message</Button>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
