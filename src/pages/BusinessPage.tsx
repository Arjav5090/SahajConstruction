import { motion } from 'framer-motion'
import { Droplets, GitBranch, Waves } from 'lucide-react'
import LazyImage from '../components/LazyImage'
import PageHero from '../components/PageHero'
import PageShell from '../components/PageShell'
import Seo from '../components/Seo'
import { overheadTankImages } from '../assets/overhead-tanks/images'
import { sewageTreatmentImages } from '../assets/sewage-treatment-plant/images'
import { stormWaterImages } from '../assets/storm-water/images'
import { waterSupplyImages } from '../assets/water-supply/images'
import {
  businessBentoMedia,
  pageHeroImages,
} from '../data/siteMedia'
import {
  businessIntro,
  sewerageSection,
  stormWaterSection,
  waterSupplySection,
} from '../data/businessPageContent'

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="mt-3 space-y-2">
      {items.map((line) => (
        <li
          key={line}
          className="flex gap-2 text-sm font-normal leading-relaxed text-[#494949]"
        >
          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-none bg-[#0c8894]" />
          <span>{line}</span>
        </li>
      ))}
    </ul>
  )
}

const bento = [
  {
    id: 'water' as const,
    title: 'Water supply',
    desc: 'Intake to distribution, WTP, sumps, ESR, pumping & pipelines.',
    icon: Droplets,
    to: '#water',
    media: businessBentoMedia.water,
  },
  {
    id: 'sewerage' as const,
    title: 'Sewerage & drainage',
    desc: 'STP, UGD networks, house connections & lift stations.',
    icon: GitBranch,
    to: '#sewerage',
    media: businessBentoMedia.sewerage,
  },
  {
    id: 'storm' as const,
    title: 'Storm water',
    desc: 'Urban drainage systems aligned with rainfall & master plans.',
    icon: Waves,
    to: '#storm',
    media: businessBentoMedia.storm,
  },
]

function PhotoRow({ images }: { images: readonly { src: string; alt: string }[] }) {
  return (
    <div className="mt-8 grid gap-3 sm:grid-cols-3">
      {images.map((im) => (
        <div
          key={im.src}
          className="relative aspect-16/10 overflow-hidden rounded-none bg-neutral-200 ring-1 ring-black/5"
        >
          <LazyImage
            src={im.src}
            alt={im.alt}
            className="h-full w-full object-cover transition duration-500 hover:scale-[1.03]"
          />
        </div>
      ))}
    </div>
  )
}

function BusinessPage() {
  return (
    <>
      <Seo
        title="Our Business | Water Supply, Sewerage, STP & Storm Water EPC Services"
        description="Explore Sahaj Construction's core services: water supply infrastructure, sewerage and treatment systems, and storm water drainage solutions for public-sector projects."
        path="/our-business"
      />
      <PageHero
        title="Services We Provide"
        subtitle="EPC"
        imageUrl={pageHeroImages.business.src}
        imageAlt={pageHeroImages.business.alt}
        breadcrumbs={[
          { label: 'Home', to: '/' },
          { label: 'Our Business', to: '/our-business' },
        ]}
      />
      <PageShell wide>
        <header className="max-w-3xl border-l-[3px] border-[#0c8894] pl-5 sm:pl-7">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#0c8894]">
            {businessIntro.eyebrow}
          </p>
          <p className="mt-3 text-xl font-normal leading-snug tracking-tight text-[#1a1a1a] sm:text-2xl sm:leading-tight">
            <span className="font-semibold text-[#0c8894]">Sahaj Construction</span>{' '}
            {businessIntro.lead}
          </p>
          <p className="mt-5 text-[0.9375rem] leading-relaxed text-[#5c5c5c] sm:text-base">
            {businessIntro.supporting}
          </p>
        </header>

        <div className="mt-14 grid gap-4 sm:grid-cols-3">
          {bento.map((card, i) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <a
                href={card.to}
                className="group relative flex h-full min-h-[280px] flex-col overflow-hidden rounded-none border border-neutral-200 bg-neutral-900 shadow-sm ring-1 ring-black/5 transition hover:shadow-[0_16px_48px_rgba(12,136,148,0.18)]"
              >
                <LazyImage
                  src={card.media.src}
                  alt={card.media.alt}
                  className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-t from-[#0a1628]/95 via-[#0a1628]/45 to-[#0c8894]/15" />
                <div className="relative z-10 flex h-full flex-col p-6 text-white">
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-none bg-white/15 text-white backdrop-blur-sm transition group-hover:bg-[#0c8894]">
                    <card.icon className="h-6 w-6" strokeWidth={2} />
                  </div>
                  <h3 className="text-lg font-bold">{card.title}</h3>
                  <p className="mt-2 flex-1 text-sm font-normal text-white/85">
                    {card.desc}
                  </p>
                  <span className="mt-4 text-sm font-bold text-[#2ea2a3]">
                    Explore section ↓
                  </span>
                </div>
              </a>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 space-y-20">
          <section id="water" className="scroll-mt-28">
            <div className="grid gap-10 lg:grid-cols-[1fr_1.15fr] lg:items-start">
              <div>
                <h2 className="mb-3 flex items-center gap-2 text-2xl font-bold text-[#000000]">
                  <Droplets className="h-7 w-7 text-[#0c8894]" />
                  {waterSupplySection.title}
                </h2>
                <p className="font-normal text-[#494949]">{waterSupplySection.intro}</p>
                <BulletList items={waterSupplySection.bullets} />
                <h3 className="mt-6 text-lg font-semibold text-[#1f1f1f]">
                  {waterSupplySection.pipelineHeading}
                </h3>
                <BulletList items={waterSupplySection.pipelineBullets} />
              </div>
              <div className="space-y-4">
              <div className="relative overflow-hidden rounded-none bg-neutral-200 shadow-lg ring-1 ring-black/5">
                  <LazyImage
                    src={waterSupplyImages[3].src}
                    alt={waterSupplyImages[3].alt}
                    className="aspect-4/3 w-full object-cover sm:aspect-16/10"
                  />
                </div>
                <PhotoRow
                  images={[waterSupplyImages[0], overheadTankImages[0], overheadTankImages[2]]}
                />
              </div>
            </div>
          </section>

          <section id="sewerage" className="scroll-mt-28">
            <div className="grid gap-10 lg:grid-cols-[1.15fr_1fr] lg:items-start">
              <div className="order-2 space-y-4 lg:order-1">
                <div className="relative overflow-hidden rounded-none bg-neutral-200 shadow-lg ring-1 ring-black/5">
                  <LazyImage
                    src={sewageTreatmentImages[0].src}
                    alt={sewageTreatmentImages[0].alt}
                    className="aspect-4/3 w-full object-cover sm:aspect-16/10"
                  />
                </div>
                <PhotoRow
                  images={[sewageTreatmentImages[2], sewageTreatmentImages[4], sewageTreatmentImages[3]]}
                />
              </div>
              <div className="order-1 lg:order-2">
                <h2 className="mb-3 flex items-center gap-2 text-2xl font-bold text-[#000000]">
                  <GitBranch className="h-7 w-7 text-[#0c8894]" />
                  {sewerageSection.title}
                </h2>
                <p className="font-normal text-[#494949]">{sewerageSection.intro}</p>
                <BulletList items={sewerageSection.bullets} />
                <h3 className="mt-6 text-lg font-semibold text-[#1f1f1f]">
                  {sewerageSection.pipelineHeading}
                </h3>
                <BulletList items={sewerageSection.pipelineBullets} />
              </div>
            </div>
          </section>

          <section id="storm" className="scroll-mt-28">
            <div className="grid gap-10 lg:grid-cols-[1fr_1.15fr] lg:items-stretch">
              <div className="flex flex-col gap-8 lg:h-full lg:justify-between lg:gap-10">
                <div>
                  <h2 className="mb-3 flex items-center gap-2 text-2xl font-bold text-[#000000]">
                    <Waves className="h-7 w-7 text-[#0c8894]" />
                    {stormWaterSection.title}
                  </h2>
                  <p className="font-normal text-[#494949]">{stormWaterSection.intro}</p>
                  <BulletList items={stormWaterSection.bullets} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[#1f1f1f] lg:mt-0">
                    {stormWaterSection.pipelineHeading}
                  </h3>
                  <BulletList items={stormWaterSection.pipelineBullets} />
                </div>
              </div>
              <div className="flex flex-col gap-4">
              <div className="relative overflow-hidden rounded-none bg-neutral-200 shadow-lg ring-1 ring-black/5">
                  <LazyImage
                    src={stormWaterImages[1].src}
                    alt={stormWaterImages[1].alt}
                    className="aspect-4/3 w-full object-cover sm:aspect-16/10"
                  />
                </div>
                <PhotoRow images={[stormWaterImages[0], stormWaterImages[2], stormWaterImages[3]]} />
              </div>
            </div>
          </section>
        </div>
      </PageShell>
    </>
  )
}

export default BusinessPage
