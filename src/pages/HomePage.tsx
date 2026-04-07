import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowUpRight, Building2, Droplets, Landmark, MapPinned } from 'lucide-react'
import FaqContentSection from '../components/FaqContentSection'
import LazyImage from '../components/LazyImage'
import gppIcon from '../assets/hero-section-icons/gpp.png'
import gudcIcon from '../assets/hero-section-icons/gudc.jpg'
import gujaratIcon from '../assets/hero-section-icons/gujarat.png'
import amrutIcon from '../assets/hero-section-icons/amrut.png'
import jjmIcon from '../assets/hero-section-icons/jjm.png'
import kalyanIcon from '../assets/hero-section-icons/kalyan.png'
import karnatakaIcon from '../assets/hero-section-icons/karnataka.png'
import madhyaPradeshIcon from '../assets/hero-section-icons/madhyapradhesh.png'
import maharashtraIcon from '../assets/hero-section-icons/maharashtra.png'
import mjpIcon from '../assets/hero-section-icons/mjp.jpg'

import { sewageTreatmentImages } from '../assets/sewage-treatment-plant/images'
import { stormWaterImages } from '../assets/storm-water/images'
import { waterSupplyImages } from '../assets/water-supply/images'
import Seo from '../components/Seo'
import { companyInfo } from '../data/companyInfo'
import {
  homeAbout,
  homeHero,
  homeWhyBand,
} from '../data/siteMedia'
import {
  homeAboutChecks,
  homeServicesSnapshot,
  homeShowcaseIntro,
  homeStats,
  homeWhatWeDeliverIntro,
  processSteps,
  whyChooseUs,
} from '../data/homeContent'

/** none = default cell; md = slightly larger (e.g. Gujarat); lg = prominent (JJM, GUDC, Maharashtra, MJP) */
const heroPartnerIcons = [
  { src: jjmIcon, alt: 'Jal Jeevan Mission', fit: 'contain', scale: 'lg' as const },
  { src: gppIcon, alt: 'GPP', fit: 'contain', scale: 'none' as const },
  { src: amrutIcon, alt: 'AMRUT', fit: 'contain', scale: 'none' as const },
  { src: kalyanIcon, alt: 'Kalyan', fit: 'cover', scale: 'none' as const },
  { src: gudcIcon, alt: 'GUDC', fit: 'contain', scale: 'lg' as const },
  { src: gujaratIcon, alt: 'Gujarat', fit: 'contain', scale: 'md' as const },
  { src: karnatakaIcon, alt: 'Karnataka', fit: 'contain', scale: 'none' as const },
  { src: madhyaPradeshIcon, alt: 'Madhya Pradesh', fit: 'cover', scale: 'none' as const },
  { src: maharashtraIcon, alt: 'Maharashtra', fit: 'contain', scale: 'lg' as const },
  { src: mjpIcon, alt: 'MJP', fit: 'contain', scale: 'lg' as const },
] as const

function HeroPartnerMarquee() {
  const scaleClass = (scale: (typeof heroPartnerIcons)[number]['scale']) =>
    scale === 'lg'
      ? 'scale-[1.52] sm:scale-[1.68]'
      : scale === 'md'
        ? 'scale-125 sm:scale-140'
        : ''

  return (
    <div
      className="group relative h-14 w-full overflow-hidden sm:h-16 mask-[linear-gradient(to_right,transparent_0,black_48px,black_calc(100%-48px),transparent_100%)] sm:mask-[linear-gradient(to_right,transparent_0,black_80px,black_calc(100%-80px),transparent_100%)] md:mask-[linear-gradient(to_right,transparent_0,black_128px,black_calc(100%-128px),transparent_100%)]"
      aria-label="Partner and client logos"
    >
      {/*
        Single <ul> so there is no flex whitespace/text node between two strips (that breaks -50% loop math).
        gap-16 matches reference `space-x-16` between logos. group-hover:paused pauses the strip.
      */}
      <div className="animate-loop-scroll flex w-max min-w-0 group-hover:[animation-play-state:paused]">
        <ul className="m-0 flex w-max shrink-0 list-none flex-nowrap items-center gap-16 p-0 [&_img]:max-w-none">
          {heroPartnerIcons.map((icon, i) => (
            <li
              key={`marquee-a-${i}`}
              className="flex h-14 w-14 shrink-0 items-center justify-center sm:h-16 sm:w-16"
            >
              <LazyImage
                src={icon.src}
                alt={icon.alt}
                priority
                className={`h-full w-full ${icon.fit === 'cover' ? 'object-cover' : 'object-contain'} ${scaleClass(icon.scale)}`}
              />
            </li>
          ))}
          {heroPartnerIcons.map((icon, i) => (
            <li
              key={`marquee-b-${i}`}
              className="flex h-14 w-14 shrink-0 items-center justify-center sm:h-16 sm:w-16"
              aria-hidden="true"
            >
              <LazyImage
                src={icon.src}
                alt=""
                priority
                className={`h-full w-full ${icon.fit === 'cover' ? 'object-cover' : 'object-contain'} ${scaleClass(icon.scale)}`}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
const briefPanelIcons = [Building2, MapPinned, Landmark, Droplets] as const
const homeKpiPanel = [
  { value: '15+', label: 'Years Experience' },
  { value: '50+', label: 'Projects Completed' },
  { value: '24/7', label: 'Active Site Support' },
  { value: '500+', label: 'Skilled Labour Strength' },
] as const

const capabilityTiles = [
  {
    to: '/our-business#water',
    label: 'Water supply',
    sub: 'WTP · ESR · pipelines',
    img: waterSupplyImages[4],
  },
  {
    to: '/our-business#sewerage',
    label: 'Sewerage & STP',
    sub: 'Networks · treatment',
    img: sewageTreatmentImages[2],
  },
  {
    to: '/our-business#storm',
    label: 'Storm water',
    sub: 'Drainage · culverts',
    img: stormWaterImages[2],
  },
  
] as const

function HomePage() {
  const location = useLocation()
  const pageTitle = 'Sahaj Construction | Government EPC Infrastructure Company in India'
  const pageDescription =
    'Sahaj Construction executes water supply, sewerage, storm water, and treatment infrastructure projects for government bodies across multiple Indian states.'
  const pagePath = '/'

  useEffect(() => {
    if (location.hash !== '#faq') return
    requestAnimationFrame(() => {
      document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  }, [location.pathname, location.hash])

  return (
    <>
      <Seo
        title={pageTitle}
        description={pageDescription}
        path={pagePath}
        structuredData={[
          {
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: companyInfo.shortName,
            legalName: companyInfo.legalName,
            url: 'https://www.sahajconstruction.in',
            logo: 'https://www.sahajconstruction.in/favicon.svg',
            email: companyInfo.email,
            telephone: companyInfo.phoneDisplay,
          },
          {
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: 'Sahaj Construction',
            url: 'https://www.sahajconstruction.in',
            inLanguage: 'en-IN',
          },
          {
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: pageTitle,
            description: pageDescription,
            url: 'https://www.sahajconstruction.in/',
          },
        ]}
      />
      {/* Hero — darker brand teal + grid; photo side kept brighter/clearer */}
      <section className="relative min-h-[min(92vh,820px)] w-full overflow-hidden bg-[#07626c]">
        <div
          className="pointer-events-none absolute inset-0 "
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              'repeating-linear-gradient(90deg, transparent, transparent 148px, rgba(255,255,255,0.09) 148px, rgba(255,255,255,0.09) 149px)',
            backgroundAttachment: 'fixed',
          }}
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.18)_0%,rgba(0,0,0,0.06)_44%,transparent_78%)]"
          aria-hidden
        />

        <div className="relative z-10 mx-auto grid min-h-[min(92vh,820px)] max-w-7xl grid-cols-1 lg:grid-cols-2 lg:grid-rows-1">
          <div className="relative flex flex-col justify-center px-4 pb-12 pt-28 sm:px-6 sm:pb-16 sm:pt-32 lg:order-1 lg:py-24 lg:pl-8 lg:pr-10 xl:pl-10">
            <motion.div
              className="relative z-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            >
              <h1 className="max-w-xl text-3xl font-bold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-[3.25rem] xl:text-6xl">
                Engineering infrastructure.
                <br />
                <span className="text-white/95">Empowering communities.</span>
              </h1>
              <p className="mt-6 max-w-lg text-base leading-relaxed text-white/85 sm:text-lg">
                Sahaj Construction is a Surat-based infrastructure company with 15+ years
                of experience delivering government EPC projects in water supply,
                sewerage, drainage, and treatment works across five states.
              </p>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center">
                <Link
                  to="/our-business"
                  className="group inline-flex items-center justify-between gap-4 rounded-full bg-white py-2 pl-7 pr-2 text-sm font-bold uppercase tracking-wide text-[#0a1628] shadow-lg shadow-black/15 transition hover:bg-white/95 sm:justify-start"
                >
                  <span>Explore what we do</span>
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#0c8894] text-white transition group-hover:bg-[#2ea2a3]">
                    <ArrowUpRight className="h-4 w-4" strokeWidth={2.5} aria-hidden />
                  </span>
                </Link>
                <Link
                  to="/projects-gallery"
                  className="group inline-flex items-center justify-between gap-4 rounded-full border border-white/45 bg-white/10 py-2 pl-7 pr-2 text-sm font-bold uppercase tracking-wide text-white backdrop-blur-sm transition hover:border-white/60 hover:bg-white/15 sm:justify-start"
                >
                  <span>View our work</span>
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-[#0c8894] transition group-hover:bg-white/95">
                    <ArrowUpRight className="h-4 w-4" strokeWidth={2.5} aria-hidden />
                  </span>
                </Link>
              </div>
            </motion.div>
          </div>

          <div className="relative min-h-[240px] w-full lg:order-2 lg:min-h-[min(92vh,820px)]">
            {/* Photo sits under the same stack as the left column: tint + section-style overlays */}
            <LazyImage
              src={homeHero.src}
              alt={homeHero.alt}
              priority
              className="h-full w-full object-cover  [clip-path:polygon(0_8%,100%_0,100%_100%,0_100%)] lg:absolute lg:inset-0 lg:[clip-path:polygon(20%_0,100%_0,100%_100%,0_100%)]"
            />
            {/* Light brand wash — keeps tone match without muddying the photo */}
            <div
              className="pointer-events-none absolute inset-0"
              aria-hidden
            />
            {/* Soft seam blend only (lower opacity so image stays clear) */}
            <div
              className="pointer-events-none absolute inset-0 z-1 bg-[linear-gradient(115deg,rgba(10,111,122,0.55)_0%,rgba(10,111,122,0.12)_20%,transparent_40%)] lg:bg-[linear-gradient(108deg,rgba(10,111,122,0.5)_0%,rgba(10,111,122,0.1)_24%,transparent_46%)]"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute inset-0 z-1"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute inset-0 z-1"
              style={{
                backgroundImage:
                  'repeating-linear-gradient(90deg, transparent, transparent 148px, rgba(255,255,255,0.08) 148px, rgba(255,255,255,0.08) 149px)',
                backgroundAttachment: 'fixed',
              }}
              aria-hidden
            />
            <div
              className="pointer-events-none absolute inset-0 z-1 bg-[linear-gradient(to_top,rgba(0,0,0,0.08)_0%,transparent_55%)]"
              aria-hidden
            />
          </div>
        </div>
      </section>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="relative z-20 mx-auto -mt-14 max-w-5xl px-4"
      >
        <div className="overflow-hidden rounded-lg border border-neutral-200 bg-white px-4 py-4 shadow-[0_12px_40px_rgba(0,0,0,0.08)] sm:px-5 sm:py-5">
          <HeroPartnerMarquee />
        </div>
      </motion.div>

      <div className="mx-auto mt-14 max-w-6xl space-y-24 px-4 py-16 sm:mt-16 sm:py-20">
        <motion.section
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.45 }}
          className="grid items-center gap-12 overflow-hidden border border-neutral-200 bg-white p-6 lg:grid-cols-2 lg:gap-16 lg:p-8"
        >
          <div className="relative">
            <div className="relative overflow-hidden rounded-none shadow-[0_20px_50px_rgba(0,0,0,0.12)] ring-1 ring-black/5">
              <LazyImage
                src={homeAbout.src}
                alt={homeAbout.alt}
                className="aspect-4/5 w-full object-cover sm:aspect-5/6"
              />
              <div
                className="pointer-events-none absolute inset-0 bg-linear-to-t from-[#0c8894]/15 to-transparent"
                aria-hidden
              />
            </div>
            <div className="absolute left-4 top-4 sm:left-6 sm:top-6">
              <div className="rounded-full border border-white/40 bg-[#0a1628]/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-white shadow-lg backdrop-blur-sm">
                Since 2011
              </div>
            </div>
          </div>
          <div>
            <p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.28em] text-[#0c8894]">
              <span className="h-4 w-1 bg-[#0c8894]" aria-hidden />
              Execution legacy
            </p>
            <h2 className="text-3xl font-bold text-[#000000] sm:text-4xl">
              Trusted infrastructure partner since 2011
            </h2>
            <p className="mt-5 font-normal leading-relaxed text-[#494949]">
              Sahaj Construction has been at the forefront of civil infrastructure
              development in India, executing complex government projects for municipal
              corporations, urban development authorities, and state water boards across
              Gujarat, Madhya Pradesh, Maharashtra, Karnataka, and Andhra Pradesh.
            </p>
            <p className="mt-4 font-normal leading-relaxed text-[#494949]">
              From intake structures on rivers to sewage treatment plants serving entire
              cities, we deliver end-to-end solutions with precision, accountability,
              and a commitment to quality.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {homeAboutChecks.map((line) => (
                <div key={line} className="flex gap-3">
                  <span
                    className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-none bg-[#0c8894] text-[10px] font-bold text-white"
                    aria-hidden
                  >
                    ✓
                  </span>
                  <span className="text-sm font-normal leading-snug text-[#494949]">
                    {line}
                  </span>
                </div>
              ))}
            </div>
            <Link
              to="/about-us"
              className="mt-8 inline-flex items-center text-sm font-bold uppercase tracking-wide text-[#0c8894] transition hover:text-[#2ea2a3]"
            >
              Learn more about us →
            </Link>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          aria-label="Operational highlights"
          className="space-y-0"
        >
          <div className="overflow-hidden rounded-none border border-neutral-200 bg-white shadow-[0_8px_30px_rgba(0,0,0,0.06)]">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4">
              {homeKpiPanel.map((item) => (
                <div
                  key={item.label}
                  className="border-b border-neutral-200 px-4 py-4 text-center last:border-b-0 sm:py-5 lg:border-b-0 lg:border-r lg:last:border-r-0"
                >
                  <p className="text-2xl font-bold text-[#0c8894] sm:text-3xl">{item.value}</p>
                  <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#494949]">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Capability mosaic */}
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          aria-label="Core capabilities"
          className="overflow-hidden border border-neutral-200 bg-white p-6 sm:p-8"
        >
          <div className="text-center sm:text-left">
            <p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.28em] text-[#0c8894]">
              <span className="h-4 w-1 bg-[#0c8894]" aria-hidden />
              Business verticals
            </p>
            <h2 className="mt-3 text-3xl font-bold text-[#000000] sm:text-4xl">
              What we build
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm text-[#494949] sm:mx-0">
              Government-scale EPC across water, wastewater, storm drainage, and heavy
              civil delivery. Explore each vertical.
            </p>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {capabilityTiles.map((tile, i) => (
              <motion.div
                key={tile.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
              >
                <Link
                  to={tile.to}
                  className="group relative flex aspect-4/5 overflow-hidden rounded-none bg-neutral-200 shadow-[0_8px_30px_rgba(0,0,0,0.08)] ring-1 ring-black/5 sm:aspect-3/4"
                >
                  <LazyImage
                    src={tile.img.src}
                    alt={tile.img.alt}
                    className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-[#0a1628]/95 via-[#0a1628]/35 to-transparent" />
                  <div className="relative mt-auto flex w-full flex-col p-5 text-white">
                    <span className="text-lg font-bold leading-tight">{tile.label}</span>
                    <span className="mt-1 text-xs font-medium text-white/80">{tile.sub}</span>
                    <span className="mt-4 inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wide text-[#2ea2a3]">
                      View
                      <ArrowUpRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          aria-label="Company highlights"
          className="relative overflow-hidden border border-neutral-200 bg-white"
        >
          <div
            className="absolute inset-x-0 top-0 h-1 bg-linear-to-r from-[#0c8894] via-[#2ea2a3] to-[#0c8894]"
            aria-hidden
          />
          <div className="grid lg:grid-cols-[minmax(0,220px)_1fr]">
            <div className="border-b border-neutral-200 bg-neutral-50/90 px-6 py-8 lg:border-r lg:border-b-0 lg:px-8">
              <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#0c8894]">
                In brief
              </p>
              <p className="mt-3 text-sm font-semibold leading-snug text-[#000000]">
                A few signals before we walk through how we deliver.
              </p>
              <div className="mt-6 hidden h-px w-12 bg-[#0c8894] lg:block" aria-hidden />
            </div>
            <div className="grid divide-y divide-neutral-200 sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4 lg:divide-x">
              {homeStats.map((item, idx) => {
                const Icon = briefPanelIcons[idx % briefPanelIcons.length]
                return (
                  <div
                    key={item.text}
                    className="flex gap-4 px-6 py-6 sm:py-8 lg:flex-col lg:gap-3 lg:px-5"
                  >
                  <span
                    className="flex h-12 w-12 shrink-0 items-center justify-center border border-neutral-200 bg-neutral-50 text-[#0c8894]"
                    aria-hidden
                  >
                    <Icon className="h-5 w-5" strokeWidth={2.2} />
                  </span>
                  <p className="text-sm font-normal leading-relaxed text-[#494949] lg:max-w-56">
                    {item.text}
                  </p>
                  </div>
                )
              })}
            </div>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="overflow-hidden border border-neutral-200 bg-white p-6 sm:p-8"
        >
          <p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.28em] text-[#0c8894]">
            <span className="h-4 w-1 bg-[#0c8894]" aria-hidden />
            Delivery process
          </p>
          <h2 className="mt-3 text-3xl font-bold text-[#000000] sm:text-4xl">
            How we deliver
          </h2>
          <p className="mt-3 max-w-2xl font-normal text-[#494949]">
            A disciplined EPC approach from planning through handover, built for
            government-scale complexity.
          </p>
          <div className="relative mt-14 lg:mt-20">
            <div
              className="pointer-events-none absolute left-[8%] right-[8%] top-[52px] hidden h-0 border-t border-dashed border-neutral-300 lg:block"
              aria-hidden
            />
            <div className="grid gap-10 lg:grid-cols-4 lg:gap-4">
              {processSteps.map((step, i) => (
                <div
                  key={step.step}
                  className={`relative flex flex-col ${i % 2 === 0 ? 'lg:mt-10' : 'lg:mt-0'}`}
                >
                  <span className="pointer-events-none absolute -top-6 left-0 text-5xl font-bold tabular-nums text-neutral-200/90 sm:text-6xl">
                    {step.step}
                  </span>
                  <div className="relative z-10 mt-6 flex flex-1 flex-col rounded-none border border-neutral-200 border-t-4 border-t-[#0c8894] bg-white p-5 shadow-sm">
                    <h3 className="text-base font-semibold text-[#1f1f1f]">
                      {step.title}
                    </h3>
                    <p className="mt-2 flex-1 text-sm font-normal leading-relaxed text-[#494949]">
                      {step.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          aria-label="What we deliver"
          className="overflow-hidden border border-neutral-200 bg-white"
        >
          <div className="grid lg:grid-cols-12">
            <div className="border-b border-neutral-200 bg-white px-6 py-10 sm:px-8 lg:col-span-5 lg:border-r lg:border-b-0 lg:px-10 lg:py-12">
              <p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.28em] text-[#0c8894]">
                <span className="h-4 w-1 bg-[#0c8894]" aria-hidden />
                Service scope
              </p>
              <h2 className="mt-3 text-3xl font-bold leading-tight text-[#000000] sm:text-4xl">
                What we deliver
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-[#494949]">
                {homeWhatWeDeliverIntro}
              </p>
              <div className="mt-8 h-px w-16 bg-[#0c8894]" aria-hidden />
              <Link
                to="/our-business"
                className="mt-8 inline-flex items-center gap-2 border-2 border-[#0c8894] bg-white px-6 py-3 text-xs font-bold uppercase tracking-wide text-[#0c8894] transition hover:bg-[#0c8894] hover:text-white"
              >
                View all services
                <ArrowUpRight className="h-4 w-4" strokeWidth={2} />
              </Link>
            </div>
            <div className="flex flex-col lg:col-span-7">
              {homeServicesSnapshot.map((line, i) => (
                <div
                  key={line}
                  className={`flex flex-1 items-stretch gap-0 border-b border-neutral-200 last:border-b-0 ${
                    i % 2 === 0 ? 'bg-white' : 'bg-neutral-50/80'
                  }`}
                >
                  <div
                    className="flex w-11 shrink-0 items-center justify-center border-r border-neutral-200 bg-[#0c8894]/6 text-xs font-bold tabular-nums text-[#0c8894] sm:w-14"
                    aria-hidden
                  >
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <p className="flex items-center px-4 py-4 text-sm font-normal leading-snug text-[#1f1f1f] sm:px-6 sm:py-5">
                    {line}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          aria-label="Experience and why choose Sahaj"
          className="border border-neutral-200 bg-white"
        >
          <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
            <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(280px,420px)] lg:items-start lg:gap-12 xl:gap-16">
              <div className="min-w-0">
                <p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.28em] text-[#0c8894]">
                  <span className="h-4 w-1 bg-[#0c8894]" aria-hidden />
                  Delivery focus
                </p>
                <h2 className="mt-3 text-3xl font-bold leading-tight tracking-tight text-[#000000] sm:text-4xl">
                  {homeShowcaseIntro.title}
                </h2>
                <p className="mt-5 text-base leading-relaxed text-[#494949] sm:text-[17px]">
                  {homeShowcaseIntro.subtitle}
                </p>
                <p className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
                  <Link
                    to="/projects-gallery"
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0c8894] transition hover:text-[#0a6f78]"
                  >
                    Project portfolio
                    <ArrowUpRight className="h-4 w-4" aria-hidden />
                  </Link>
                  <Link
                    to="/contact-us"
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0c8894] transition hover:text-[#0a6f78]"
                  >
                    Contact
                    <ArrowUpRight className="h-4 w-4" aria-hidden />
                  </Link>
                </p>
              </div>

              <figure className="relative min-w-0 overflow-hidden border border-neutral-200/80 bg-neutral-200 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.12)] lg:translate-y-1">
                <div className="relative aspect-4/5 w-full sm:aspect-3/4 lg:aspect-4/5">
               <LazyImage
                    src={homeWhyBand.src}
                    alt={homeWhyBand.alt}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  <div
                    className="absolute inset-0 bg-linear-to-t from-[#0a1628]/90 via-[#0a1628]/20 to-transparent"
                    aria-hidden
                  />
                  <figcaption className="absolute inset-x-0 bottom-0 px-4 py-4 text-left text-xs font-medium leading-snug text-white/95 sm:px-5 sm:py-5">
                    {homeShowcaseIntro.photoCaption}
                  </figcaption>
                </div>
              </figure>
            </div>

            <div className="mt-16 border-t border-neutral-200 pt-12 sm:mt-20 sm:pt-14">
              <h3 className="max-w-2xl text-xl font-bold leading-snug text-[#000000] sm:text-2xl">
                What we bring to public-sector projects
              </h3>
              <ul className="mt-8 grid gap-6 sm:grid-cols-2 sm:gap-x-10 sm:gap-y-8 lg:grid-cols-3 lg:gap-x-8">
                {whyChooseUs.map((item, wi) => (
                  <motion.li
                    key={item.title}
                    initial={{ opacity: 0, y: 6 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: wi * 0.04 }}
                    className="border-l-2 border-[#0c8894]/35 bg-white/80 pl-5 pr-1 py-1 shadow-sm shadow-black/3"
                  >
                    <p className="text-[13px] font-semibold text-[#000000]">{item.title}</p>
                    <p className="mt-2 text-sm leading-relaxed text-[#494949]">{item.body}</p>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </motion.section>

        <motion.section
          id="faq"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          aria-label="Frequently asked questions"
          className="scroll-mt-24"
        >
          <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
            <div className="overflow-hidden border border-neutral-200 bg-white p-6 shadow-[0_4px_24px_rgba(0,0,0,0.06)] sm:p-8">
              <FaqContentSection />
            </div>
          </div>
        </motion.section>
      </div>
    </>
  )
}

export default HomePage
