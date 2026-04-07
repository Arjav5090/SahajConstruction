import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Banknote, Briefcase, Calendar, MapPin } from 'lucide-react'
import PageHero from '../components/PageHero'
import PageShell from '../components/PageShell'
import Seo from '../components/Seo'
import { companyInfo } from '../data/companyInfo'
import { pageHeroImages } from '../data/siteMedia'
import { rolesWeHire, whyJoin } from '../data/careersPageContent'
import { jobListings } from '../data/jobListings'

const applicationSteps = [
  'Review the open roles below and note the position title that fits your profile.',
  'Prepare an updated résumé (PDF preferred) and a short cover letter describing your experience and interest.',
  `Email us at ${companyInfo.email}. Use a subject line like "Application: [role title]" or "Application: General" if you are not applying for a specific listing.`,
  'In the email body, include your full name, phone number, current city, and expected availability.',
  'Attach your résumé and send from an email address you check regularly. We reply only to shortlisted candidates.',
]

function CareersPage() {
  const howToRef = useRef<HTMLDivElement>(null)
  const [selectedRole, setSelectedRole] = useState<string | null>(null)

  useEffect(() => {
    if (window.location.hash === '#careers-how-to-apply') {
      howToRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [])

  function scrollToHowToApply(roleTitle: string) {
    setSelectedRole(roleTitle)
    howToRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    window.setTimeout(() => howToRef.current?.focus(), 400)
  }

  function mailtoForRole(title: string) {
    const subject = `Application: ${title}`
    const body = [
      'Dear Sahaj Construction team,',
      '',
      `I would like to apply for: ${title}`,
      '',
      'Name:',
      'Phone:',
      'City:',
      '',
      'Brief summary:',
      '',
      '(Attach your résumé as PDF before sending.)',
    ].join('\n')
    return `mailto:${companyInfo.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }

  return (
    <>
      <Seo
        title="Careers | Join Sahaj Construction"
        description="Explore career opportunities at Sahaj Construction and apply for open roles in infrastructure engineering, site operations, project management, and support functions."
        path="/careers"
      />
      <PageHero
        title="Careers"
        subtitle="Join us"
        imageUrl={pageHeroImages.careers.src}
        imageAlt={pageHeroImages.careers.alt}
        breadcrumbs={[
          { label: 'Home', to: '/' },
          { label: 'Careers', to: '/careers' },
        ]}
      />
      <PageShell wide>
        <div className="overflow-hidden border border-neutral-200 bg-white">
          <div className="grid gap-0 lg:grid-cols-[1.25fr_0.75fr]">
            <div className="px-6 py-8 sm:px-8 sm:py-10">
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#0c8894]">
                Careers at Sahaj
              </p>
              <h2 className="mt-3 text-2xl font-bold leading-tight text-[#000000] sm:text-3xl">
                Build infrastructure. Build your career.
              </h2>
              <p className="mt-4 max-w-2xl font-normal leading-relaxed text-[#494949]">
                At Sahaj Construction, our people are the foundation of everything we
                build. We are always looking for driven, skilled professionals who want
                to work on meaningful government infrastructure projects that serve real
                communities.
              </p>
            </div>
            <div className="border-t border-neutral-200 bg-[#0c8894]/6 px-6 py-8 sm:px-8 lg:border-t-0 lg:border-l">
              <p className="text-xs font-bold uppercase tracking-wide text-[#0c8894]">
                What you can expect
              </p>
              <ul className="mt-4 space-y-2 text-sm text-[#494949]">
                <li>• Real responsibility on high-impact public projects</li>
                <li>• Site and office roles with long-term growth potential</li>
                <li>• A team culture focused on quality, safety, and ownership</li>
              </ul>
            </div>
          </div>
        </div>

        <section className="mt-14">
          <h2 className="text-2xl font-bold text-[#000000] sm:text-3xl">Open roles</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {jobListings.map((job, i) => (
              <motion.article
                key={job.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                whileHover={{ y: -3 }}
                className="flex flex-col rounded-none border border-neutral-200 bg-white p-6 shadow-sm transition hover:shadow-[0_14px_40px_rgba(12,136,148,0.12)]"
              >
                <div className="flex items-start gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-none bg-neutral-100">
                    <Briefcase className="h-6 w-6 text-[#0c8894]" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-lg font-bold text-[#000000]">{job.title}</h3>
                      <span className="rounded-none border border-[#0c8894] px-2 py-0.5 text-[10px] font-bold uppercase text-[#0c8894]">
                        {job.type}
                      </span>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-4 text-xs font-normal text-[#494949]">
                      <span className="inline-flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5 text-[#0c8894]" />
                        {job.location}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5 text-[#0c8894]" />
                        {job.deadline}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Banknote className="h-3.5 w-3.5 text-[#0c8894]" />
                        {job.salary}
                      </span>
                    </div>
                    <p className="mt-3 text-sm font-normal leading-relaxed text-[#494949]">
                      {job.excerpt}
                    </p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => scrollToHowToApply(job.title)}
                        className="inline-flex rounded-none border border-[#0c8894] bg-white px-5 py-2.5 text-xs font-bold uppercase tracking-wide text-[#0c8894] transition hover:bg-[#0c8894]/5"
                      >
                        How to apply
                      </button>
                      <a
                        href={mailtoForRole(job.title)}
                        className="inline-flex rounded-none bg-[#0c8894] px-5 py-2.5 text-xs font-bold uppercase tracking-wide text-white transition hover:bg-[#2ea2a3]"
                      >
                        Email us
                      </a>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="mt-16 grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-bold text-[#000000]">Why join Sahaj Construction</h2>
            <ul className="mt-4 space-y-2">
              {whyJoin.map((line) => (
                <li
                  key={line}
                  className="flex gap-2 text-sm font-normal text-[#494949]"
                >
                  <span className="text-[#0c8894]">✓</span>
                  {line}
                </li>
              ))}
            </ul>
            <h3 className="mt-8 text-lg font-bold text-[#000000]">Roles we hire for</h3>
            <ul className="mt-2 space-y-1 text-sm text-[#494949]">
              {rolesWeHire.map((r) => (
                <li key={r}>• {r}</li>
              ))}
            </ul>
          </div>

          <motion.div
            ref={howToRef}
            id="careers-how-to-apply"
            tabIndex={-1}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="scroll-mt-24 rounded-none border border-neutral-200 bg-neutral-50 p-6 outline-none focus-visible:ring-2 focus-visible:ring-[#0c8894] focus-visible:ring-offset-2 sm:p-8"
          >
            <p className="text-xs font-bold uppercase tracking-wide text-[#0c8894]">
              Application process
            </p>
            <h3 className="mt-2 text-2xl font-bold text-[#000000]">How to apply</h3>
            <p className="mt-2 text-sm font-normal text-[#494949]">
              We accept applications by email only. Follow the steps below, then write to{' '}
              <a className="text-[#0c8894] underline" href={`mailto:${companyInfo.email}`}>
                {companyInfo.email}
              </a>
              .
            </p>
            {selectedRole ? (
              <p className="mt-3 text-sm font-semibold text-[#1f1f1f]">
                Selected role: {selectedRole}
              </p>
            ) : null}
            <ol className="mt-6 list-decimal space-y-3 pl-5 text-sm font-normal leading-relaxed text-[#494949]">
              {applicationSteps.map((step, idx) => (
                <li key={idx}>{step}</li>
              ))}
            </ol>
            <a
              href={`mailto:${companyInfo.email}?subject=${encodeURIComponent('Careers enquiry')}`}
              className="mt-8 inline-flex rounded-none bg-[#0c8894] px-8 py-3 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-[#2ea2a3]"
            >
              Write to us
            </a>
          </motion.div>
        </section>
      </PageShell>
    </>
  )
}

export default CareersPage
