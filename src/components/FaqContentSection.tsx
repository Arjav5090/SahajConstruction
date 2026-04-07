import { motion } from 'framer-motion'
import { constructionEquipmentImages } from '../assets/construction-equipment/images'
import { faqItems } from '../data/faqContent'
import FaqAccordion from './FaqAccordion'
import LazyImage from './LazyImage'

const faqSideVisual = constructionEquipmentImages[5]

/** Same grid as the FAQ page: copy + image left, accordion right. */
function FaqContentSection() {
  return (
    <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
      <motion.div
        initial={{ opacity: 0, x: -16 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45 }}
        className="relative"
      >
        <p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.28em] text-[#0c8894]">
          <span className="h-4 w-1 bg-[#0c8894]" />
          FAQ
        </p>
        <h2 className="mt-3 text-3xl font-bold text-[#000000] sm:text-4xl">
          Answers for government & partner enquiries
        </h2>
        <p className="mt-4 font-normal leading-relaxed text-[#494949]">
          Quick clarity on how we work, where we operate, and what to expect when you engage Sahaj
          Construction for EPC infrastructure projects.
        </p>
        <div className="relative mt-8 overflow-hidden rounded-none bg-neutral-200 shadow-[0_20px_50px_rgba(0,0,0,0.1)] ring-1 ring-black/5">
          <LazyImage
            src={faqSideVisual.src}
            alt={faqSideVisual.alt}
            className="aspect-4/5 w-full object-cover sm:aspect-auto sm:h-[420px]"
          />
          <div className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-none border-2 border-dashed border-[#2ea2a3]/40" />
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: 16 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45 }}
      >
        <FaqAccordion items={faqItems} />
      </motion.div>
    </div>
  )
}

export default FaqContentSection
