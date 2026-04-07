import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Banknote, Briefcase, Calendar, MapPin, Upload } from 'lucide-react'
import PageHero from '../components/PageHero'
import PageShell from '../components/PageShell'
import Seo from '../components/Seo'
import { companyInfo } from '../data/companyInfo'
import { pageHeroImages } from '../data/siteMedia'
import { rolesWeHire, whyJoin } from '../data/careersPageContent'
import { jobListings } from '../data/jobListings'
import { isCareersFormConfigured, submitCareersApplicationForm } from '../lib/inboxFormSubmit'

function CareersPage() {
  const navigate = useNavigate()
  const applySectionRef = useRef<HTMLDivElement>(null)
  const cvInputRef = useRef<HTMLInputElement>(null)
  const [cvFile, setCvFile] = useState<File | null>(null)
  const [positionValue, setPositionValue] = useState('')
  const [status, setStatus] = useState<'idle' | 'sending' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    if (window.location.hash === '#careers-apply') {
      applySectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [])

  function goToApplicationForm(jobTitle: string) {
    setPositionValue(jobTitle)
    applySectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    window.setTimeout(() => applySectionRef.current?.focus(), 400)
  }

  async function handleApplySubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setErrorMessage('')
    const form = e.currentTarget
    const fd = new FormData(form)
    const firstName = String(fd.get('firstName') || '').trim()
    const lastName = String(fd.get('lastName') || '').trim()
    const phone = String(fd.get('phone') || '').trim()
    const city = String(fd.get('city') || '').trim()
    const email = String(fd.get('email') || '').trim()
    const position = String(fd.get('position') || '').trim()
    const expectedSalary = String(fd.get('expectedSalary') || '').trim()
    const coverLetter = String(fd.get('coverLetter') || '').trim()
    const resume = cvInputRef.current?.files?.[0] ?? null

    if (!email) {
      setStatus('error')
      setErrorMessage('Please enter your email address.')
      return
    }

    const fullName = [firstName, lastName].filter(Boolean).join(' ') || '—'
    const message = [
      'Careers application — Sahaj Construction',
      '',
      `Name: ${fullName}`,
      `Email: ${email}`,
      `Phone: ${phone || '—'}`,
      `City: ${city || '—'}`,
      `Position: ${position || '—'}`,
      `Expected salary: ${expectedSalary || '—'}`,
      '',
      'Cover letter / message:',
      coverLetter || '(None)',
    ].join('\n')

    if (!isCareersFormConfigured()) {
      if (resume) {
        setStatus('error')
        setErrorMessage(
          `Résumé upload needs the inbox API (run the backend with SMTP in backend/.env), or email your CV to ${companyInfo.email}.`,
        )
        return
      }
      const subject = `Careers application — ${position || 'General'}`
      window.location.href = `mailto:${companyInfo.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`
      return
    }

    setStatus('sending')
    const result = await submitCareersApplicationForm(form)
    if (result.ok) {
      setCvFile(null)
      setPositionValue('')
      if (cvInputRef.current) cvInputRef.current.value = ''
      form.reset()
      navigate('/thank-you')
    } else {
      setStatus('error')
      setErrorMessage(
        result.detail || 'Could not send. Ensure the API server is running and SMTP is set in backend/.env.',
      )
    }
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
                    <button
                      type="button"
                      onClick={() => goToApplicationForm(job.title)}
                      className="mt-5 inline-flex rounded-none bg-[#0c8894] px-5 py-2.5 text-xs font-bold uppercase tracking-wide text-white transition hover:bg-[#2ea2a3]"
                    >
                      Apply now
                    </button>
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
            ref={applySectionRef}
            id="careers-apply"
            tabIndex={-1}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="scroll-mt-24 rounded-none border border-neutral-200 bg-neutral-50 p-6 outline-none focus-visible:ring-2 focus-visible:ring-[#0c8894] focus-visible:ring-offset-2 sm:p-8"
          >
            <p className="text-xs font-bold uppercase tracking-wide text-[#0c8894]">
              Apply now
            </p>
            <h3 className="mt-2 text-2xl font-bold text-[#000000]">Submit your profile</h3>
            <p className="mt-2 text-sm font-normal text-[#494949]">
              Share your details. We review all applications and contact shortlisted
              candidates. Applications are sent to{' '}
              <a className="text-[#0c8894] underline" href={`mailto:${companyInfo.email}`}>
                {companyInfo.email}
              </a>
              .
            </p>
            <form className="mt-6 grid gap-3 sm:grid-cols-2" onSubmit={handleApplySubmit}>
              <div className="col-span-2 hidden" aria-hidden>
                <input type="hidden" name="form_type" value="careers" />
                <input type="hidden" name="inbox_email" value={companyInfo.email} />
              </div>
              <input
                name="firstName"
                placeholder="First name"
                autoComplete="given-name"
                className="rounded-none border border-neutral-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#0c8894]"
              />
              <input
                name="lastName"
                placeholder="Last name"
                autoComplete="family-name"
                className="rounded-none border border-neutral-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#0c8894]"
              />
              <input
                name="phone"
                type="tel"
                placeholder="Phone"
                autoComplete="tel"
                className="rounded-none border border-neutral-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#0c8894]"
              />
              <input
                name="city"
                placeholder="City"
                autoComplete="address-level2"
                className="rounded-none border border-neutral-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#0c8894]"
              />
              <input
                name="email"
                type="email"
                required
                placeholder="Email *"
                autoComplete="email"
                className="rounded-none border border-neutral-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#0c8894] sm:col-span-2"
              />
              <select
                name="position"
                value={positionValue}
                onChange={(e) => setPositionValue(e.target.value)}
                className="rounded-none border border-neutral-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#0c8894] sm:col-span-2"
              >
                <option value="" disabled>
                  Position of interest
                </option>
                {jobListings.map((j) => (
                  <option key={j.id} value={j.title}>
                    {j.title}
                  </option>
                ))}
              </select>
              <input
                name="expectedSalary"
                placeholder="Expected salary (optional)"
                className="rounded-none border border-neutral-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#0c8894] sm:col-span-2"
              />
              <div className="sm:col-span-2">
                <span className="text-sm font-semibold text-[#1f1f1f]">Résumé</span>
                <input
                  ref={cvInputRef}
                  type="file"
                  name="resume"
                  className="sr-only"
                  accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                  onChange={(ev) => setCvFile(ev.target.files?.[0] ?? null)}
                />
                <div className="mt-2 flex flex-col gap-2 sm:flex-row sm:items-stretch">
                  <button
                    type="button"
                    onClick={() => cvInputRef.current?.click()}
                    className="inline-flex shrink-0 items-center justify-center gap-2 border-2 border-[#0c8894] bg-white px-5 py-3 text-xs font-bold uppercase tracking-wide text-[#0c8894] shadow-sm transition hover:bg-[#0c8894] hover:text-white"
                  >
                    <Upload className="h-4 w-4 shrink-0" strokeWidth={2.5} aria-hidden />
                    Choose file
                  </button>
                  <div className="flex min-h-[46px] min-w-0 flex-1 items-center border border-neutral-200 bg-white px-3 py-2">
                    <span
                      className={`truncate text-sm ${cvFile ? 'font-medium text-[#1f1f1f]' : 'text-neutral-500'}`}
                      title={cvFile?.name}
                    >
                      {cvFile ? cvFile.name : 'PDF or Word · max 5 MB'}
                    </span>
                  </div>
                </div>
              </div>
              <textarea
                name="coverLetter"
                placeholder="Cover letter / message"
                rows={4}
                className="rounded-none border border-neutral-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#0c8894] sm:col-span-2"
              />
              {status === 'error' && errorMessage ? (
                <p className="text-sm text-red-700 sm:col-span-2" role="alert">
                  {errorMessage}
                </p>
              ) : null}
              <button
                type="submit"
                disabled={status === 'sending'}
                className="rounded-none bg-[#0c8894] px-8 py-3 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-[#2ea2a3] disabled:cursor-not-allowed disabled:opacity-60 sm:col-span-2"
              >
                {status === 'sending' ? 'Sending…' : 'Submit now'}
              </button>
            </form>
          </motion.div>
        </section>
      </PageShell>
    </>
  )
}

export default CareersPage
