import { motion } from 'framer-motion'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight, Check, Layers, ShieldCheck, UserPlus, Users } from 'lucide-react'
import LazyImage from '../components/LazyImage'
import PageHero from '../components/PageHero'
import PageShell from '../components/PageShell'
import Seo from '../components/Seo'
import { constructionEquipmentImages } from '../assets/construction-equipment/images'
import { pageHeroImages } from '../data/siteMedia'
import { aboutLeadershipAndTeam, aboutWhyChooseUs } from '../data/aboutPageContent'

const aboutSideVisual = constructionEquipmentImages[4]
const leadershipSectionImage = constructionEquipmentImages[5]

const leadershipDisciplineIcons = [Users, Layers, ShieldCheck, UserPlus] as const

const tabCopy = {
  mission: {
    title: 'Our Mission',
    body: (
      <>
        <p>
          Our mission is to deliver high-quality, value-added EPC services in the
          infrastructure sector by upholding absolute professionalism, ensuring timely
          execution, and building trustworthy, long-term relationships with our clients
          and government partners.
        </p>
        <p className="mt-4">
          We are committed to environmental sustainability and social responsibility,
          contributing to the nation&apos;s infrastructural development while adhering to
          the highest industry standards.
        </p>
      </>
    ),
  },
  vision: {
    title: 'Our Vision',
    body: (
      <>
        <p>
          Our vision is to establish Sahaj Construction as a leading name in India&apos;s
          civil infrastructure sector, known for quality, reliability, and the
          capability to handle complex, large-scale projects across geographies.
        </p>
        <p className="mt-4">
          We aim to grow by adopting the latest technologies, drawing from international
          best practices, and continuously building the expertise of our team.
        </p>
      </>
    ),
  },
  values: {
    title: 'Our Values',
    body: (
      <ul className="space-y-3">
        {[
          'Integrity in every contract and site decision',
          'Accountability to timelines and quality benchmarks',
          'Respect for safety, environment, and communities we serve',
        ].map((line) => (
          <li key={line} className="flex gap-2 text-[#494949]">
            <Check className="mt-0.5 h-5 w-5 shrink-0 text-[#0c8894]" />
            {line}
          </li>
        ))}
      </ul>
    ),
  },
}

type TabKey = keyof typeof tabCopy

function AboutPage() {
  const [tab, setTab] = useState<TabKey>('mission')

  return (
    <>
      <Seo
        title="About Sahaj Construction | Infrastructure EPC Expertise Since 2011"
        description="Learn about Sahaj Construction's mission, vision, leadership and team, and EPC expertise in public infrastructure across water, sewerage, and civil engineering."
        path="/about-us"
      />
      <PageHero
        title="About Us"
        subtitle="Company"
        imageUrl={pageHeroImages.about.src}
        imageAlt={pageHeroImages.about.alt}
        breadcrumbs={[
          { label: 'Home', to: '/' },
          { label: 'About Us', to: '/about-us' },
        ]}
      />
      <PageShell wide>
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <p className="text-sm font-bold uppercase tracking-wide text-[#0c8894]">
              About our company
            </p>
            <h2 className="text-3xl font-bold text-[#000000] sm:text-4xl">
              Reliable execution for public infrastructure
            </h2>
            <div className="space-y-4 font-normal leading-relaxed text-[#494949]">
              <p>
                Established over 15 years ago and headquartered in Surat, Gujarat,
                Sahaj Construction is a reputed infrastructure company specializing in
                government EPC projects in the water and sanitation sector.
              </p>
              <p>
                We have built our reputation project by project, earning the trust of
                government departments, municipal corporations, and urban local bodies
                through consistent quality, timely delivery, and professional integrity.
              </p>
            </div>
            <div className="flex flex-wrap gap-2 border-b border-neutral-200">
              {(['mission', 'vision', 'values'] as TabKey[]).map((key) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setTab(key)}
                  className={`relative px-4 py-3 text-sm font-semibold capitalize transition ${
                    tab === key ? 'text-[#0c8894]' : 'text-[#494949] hover:text-[#000000]'
                  }`}
                >
                  {tabCopy[key].title}
                  {tab === key ? (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 rounded-none bg-[#0c8894]" />
                  ) : null}
                </button>
              ))}
            </div>
            <div className="min-h-[200px] text-sm font-normal leading-relaxed text-[#494949]">
              {tabCopy[tab].body}
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
            className="relative"
          >
            <div className="overflow-hidden rounded-none bg-neutral-200 shadow-xl ring-1 ring-black/5">
              <LazyImage
                src={aboutSideVisual.src}
                alt={aboutSideVisual.alt}
                className="aspect-4/5 w-full object-cover"
              />
            </div>
           
          </motion.div>
        </div>

        <motion.section
          className="mt-14 border border-neutral-200 bg-white p-5 sm:mt-20 sm:p-8 lg:p-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.45 }}
          aria-labelledby="about-leadership-heading"
        >
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#0c8894]">
            {aboutLeadershipAndTeam.eyebrow}
          </p>
          <h2
            id="about-leadership-heading"
            className="mt-2 text-2xl font-bold text-[#000000] sm:text-3xl"
          >
            {aboutLeadershipAndTeam.title}
          </h2>
          <p className="mt-4 max-w-3xl font-normal leading-relaxed text-[#494949]">
            {aboutLeadershipAndTeam.intro}
          </p>

          <div className="mt-8 grid gap-8 lg:mt-10 lg:grid-cols-[minmax(0,1fr)_minmax(280px,420px)] lg:items-start lg:gap-12">
            <div className="space-y-4 font-normal leading-relaxed text-[#494949]">
              {aboutLeadershipAndTeam.leadershipParagraphs.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
              <p className="border-t border-neutral-200 pt-6 text-sm font-semibold text-[#1f1f1f]">
                Our team
              </p>
              <p className="text-sm leading-relaxed">{aboutLeadershipAndTeam.teamIntro}</p>
              <Link
                to="/careers"
                className="inline-flex items-center gap-1.5 text-sm font-bold uppercase tracking-wide text-[#0c8894] transition hover:text-[#2ea2a3]"
              >
                View careers
                <ArrowUpRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>
            <div className="relative overflow-hidden rounded-none border border-neutral-200 bg-neutral-200 shadow-sm ring-1 ring-black/5">
              <LazyImage
                src={leadershipSectionImage.src}
                alt={leadershipSectionImage.alt}
                className="aspect-4/3 w-full object-cover"
              />
            </div>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {aboutLeadershipAndTeam.disciplines.map((item, i) => {
              const Icon = leadershipDisciplineIcons[i]
              return (
                <motion.article
                  key={item.title}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="border border-neutral-200 bg-white p-5 shadow-sm"
                >
                  <div className="mb-3 inline-flex h-10 w-10 items-center justify-center bg-[#0c8894]/10 text-[#0c8894]">
                    <Icon className="h-5 w-5" strokeWidth={2} aria-hidden />
                  </div>
                  <h3 className="text-base font-semibold text-[#1f1f1f]">{item.title}</h3>
                  <p className="mt-2 text-sm font-normal leading-relaxed text-[#494949]">
                    {item.body}
                  </p>
                </motion.article>
              )
            })}
          </div>
        </motion.section>

        <section className="mt-20">
          <h2 className="text-center text-3xl font-bold text-[#000000] sm:text-4xl">
            What sets us apart
          </h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {aboutWhyChooseUs.map((item, i) => (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ y: -4 }}
                className="group rounded-none border border-neutral-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-[0_12px_40px_rgba(12,136,148,0.12)]"
              >
                <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-none bg-[#0c8894]/10 text-[#0c8894] transition group-hover:bg-[#0c8894] group-hover:text-white">
                  <span className="text-sm font-bold">{i + 1}</span>
                </div>
                <h3 className="text-base font-semibold text-[#1f1f1f]">{item.title}</h3>
                <p className="mt-2 text-sm font-normal leading-relaxed text-[#494949]">
                  {item.body}
                </p>
              </motion.article>
            ))}
          </div>
        </section>
      </PageShell>
    </>
  )
}

export default AboutPage
