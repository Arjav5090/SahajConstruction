import { AnimatePresence, motion } from 'framer-motion'
import { Minus, Plus } from 'lucide-react'
import { useState } from 'react'

export type FaqEntry = { q: string; a: string }

function FaqAccordion({ items }: { items: FaqEntry[] }) {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <div className="divide-y divide-neutral-200 rounded-none border border-neutral-200 bg-white">
      {items.map((item, i) => {
        const isOpen = open === i
        return (
          <div key={`faq-${i}`}>
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              className="flex w-full items-start justify-between gap-4 px-5 py-4 text-left transition hover:bg-neutral-50"
            >
              <span className="text-base font-semibold text-[#1f1f1f]">{item.q}</span>
              <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-none bg-[#0c8894]/10 text-[#0c8894]">
                {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen ? (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.28 }}
                  className="overflow-hidden"
                >
                  <p className="px-5 pb-4 text-sm font-normal leading-relaxed text-[#494949]">
                    {item.a}
                  </p>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}

export default FaqAccordion
