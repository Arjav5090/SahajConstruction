import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { House } from 'lucide-react'
import IsometricHeroArt from '../components/IsometricHeroArt'
import Seo from '../components/Seo'

function NotFoundPage() {
  return (
    <>
      <Seo
        title="404 | Page Not Found | Sahaj Construction"
        description="The page you are looking for could not be found."
        path="/404"
        noindex
      />
      <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 py-20">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="relative"
      >
        <div className="absolute -inset-10 rounded-none bg-[#0c8894]/10 blur-3xl" />
        <div className="relative rounded-none border border-neutral-200 bg-white px-8 py-12 text-center shadow-[0_20px_60px_rgba(0,0,0,0.08)] sm:px-16">
          <div className="mx-auto mb-6 flex max-w-xs justify-center">
            <IsometricHeroArt className="h-32 w-40" />
          </div>
          <p className="text-8xl font-black tabular-nums leading-none text-[#0c8894] sm:text-9xl">
            404
          </p>
          <h1 className="mt-4 text-2xl font-bold text-[#000000] sm:text-3xl">
            Page not found
          </h1>
          <p className="mx-auto mt-3 max-w-md font-normal text-[#494949]">
            The page you are looking for may have been moved or does not exist. Return
            home to explore Sahaj Construction.
          </p>
          <Link
            to="/"
            className="mt-8 inline-flex items-center gap-2 rounded-none bg-[#0c8894] px-8 py-3.5 text-sm font-bold uppercase tracking-wide text-white shadow-lg transition hover:bg-[#2ea2a3]"
          >
            <House className="h-4 w-4" />
            Back to home
          </Link>
        </div>
      </motion.div>
      </div>
    </>
  )
}

export default NotFoundPage
