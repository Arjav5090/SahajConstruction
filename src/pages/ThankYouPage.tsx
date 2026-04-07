import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { House } from 'lucide-react'
import Seo from '../components/Seo'

function ThankYouPage() {
  return (
    <>
      <Seo
        title="Thank you | Sahaj Construction"
        description="Your submission has been received."
        path="/thank-you"
        noindex
      />
      <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="relative w-full max-w-md"
        >
          <div className="absolute -inset-8 rounded-none bg-[#0c8894]/8 blur-3xl" />
          <div className="relative rounded-none border border-neutral-200 bg-white px-8 py-14 text-center shadow-[0_20px_60px_rgba(0,0,0,0.06)] sm:px-12">
            <p className="text-xl font-semibold leading-snug text-[#1f1f1f] sm:text-2xl">
              Your submission has been received
            </p>
            <Link
              to="/"
              className="mt-10 inline-flex items-center justify-center gap-2 rounded-none bg-[#0c8894] px-8 py-3.5 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-[#2ea2a3]"
            >
              <House className="h-4 w-4" strokeWidth={2.5} aria-hidden />
              Back to Home
            </Link>
          </div>
        </motion.div>
      </div>
    </>
  )
}

export default ThankYouPage
