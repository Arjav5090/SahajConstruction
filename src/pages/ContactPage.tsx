import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PageHero from '../components/PageHero'
import PageShell from '../components/PageShell'
import Seo from '../components/Seo'
import { companyInfo, googleMapsShareUrl, mapsEmbedQuery } from '../data/companyInfo'
import { pageHeroImages } from '../data/siteMedia'
import { isContactEmailJsConfigured, sendContactViaEmailJs } from '../lib/emailjsContact'

const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(mapsEmbedQuery)}&output=embed`

function ContactPage() {
  const navigate = useNavigate()
  const [status, setStatus] = useState<'idle' | 'sending' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setErrorMessage('')
    const form = e.currentTarget
    const fd = new FormData(form)
    const name = String(fd.get('name') || '').trim()
    const organization = String(fd.get('organization') || '').trim()
    const email = String(fd.get('email') || '').trim()
    const phone = String(fd.get('phone') || '').trim()
    const subject = String(fd.get('subject') || '').trim()
    const message = String(fd.get('message') || '').trim()

    if (!email) {
      setStatus('error')
      setErrorMessage('Please enter your email address.')
      return
    }

    if (!isContactEmailJsConfigured()) {
      setStatus('error')
      setErrorMessage(
        'Email sending is not configured. Add VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_PUBLIC_KEY, and VITE_EMAILJS_TEMPLATE_ID to your .env file (see .env.example).',
      )
      return
    }

    setStatus('sending')
    const result = await sendContactViaEmailJs({
      name,
      organization,
      email,
      phone,
      subject,
      message,
    })

    if (result.ok) {
      form.reset()
      navigate('/thank-you')
    } else {
      setStatus('error')
      setErrorMessage(result.detail || 'Could not send. Please try again or call us.')
    }
  }

  return (
    <>
      <Seo
        title="Contact Sahaj Construction | Surat Office"
        description="Contact Sahaj Construction for government EPC infrastructure enquiries, project discussions, and career communication. Reach our Surat office by phone or email."
        path="/contact-us"
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'ContactPage',
          name: 'Contact Sahaj Construction',
          url: 'https://www.sahajconstruction.in/contact-us',
          mainEntity: {
            '@type': 'Organization',
            name: companyInfo.shortName,
            email: companyInfo.email,
            telephone: companyInfo.phoneDisplay,
          },
        }}
      />
      <PageHero
        title="Contact Sahaj Construction"
        subtitle="Reach us"
        imageUrl={pageHeroImages.contact.src}
        imageAlt={pageHeroImages.contact.alt}
        breadcrumbs={[
          { label: 'Home', to: '/' },
          { label: 'Contact', to: '/contact-us' },
        ]}
      />
      <PageShell>
        <p className="font-normal leading-relaxed text-[#494949]">
          We welcome enquiries from government departments, municipal corporations,
          project management consultants, and prospective employees.
        </p>

        <div className="mt-10 grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="text-lg font-semibold text-[#1f1f1f]">Registered office</h2>
            <p className="mt-3 text-base font-semibold text-[#1f1f1f]">{companyInfo.legalName}</p>
            <p className="mt-1 font-normal leading-relaxed text-[#494949]">
              {companyInfo.registeredOfficeLines.map((line) => (
                <span key={line}>
                  {line}
                  <br />
                </span>
              ))}
            </p>
            <ul className="mt-6 space-y-2 text-sm font-normal text-[#494949]">
              <li>
                <span className="font-semibold text-[#1f1f1f]">Phone:</span>{' '}
                <a
                  href={`tel:${companyInfo.phoneTel}`}
                  className="text-[#0c8894] underline hover:text-[#2ea2a3]"
                >
                  {companyInfo.phoneDisplay}
                </a>
              </li>
              <li>
                <span className="font-semibold text-[#1f1f1f]">Email:</span>{' '}
                <a
                  href={`mailto:${companyInfo.email}`}
                  className="text-[#0c8894] underline hover:text-[#2ea2a3]"
                >
                  {companyInfo.email}
                </a>
              </li>
              <li>
                <span className="font-semibold text-[#1f1f1f]">Working hours:</span>{' '}
                {companyInfo.workingHours}
              </li>
            </ul>

            <div className="mt-8">
              <p className="text-sm font-semibold text-[#1f1f1f]">{companyInfo.legalName}</p>
              <p className="mt-1 text-xs font-normal text-[#494949]">Location on Google Maps</p>
              <div className="mt-2 overflow-hidden rounded-none border border-neutral-200">
                <iframe
                  title={`Map: ${companyInfo.legalName}`}
                  src={mapSrc}
                  className="h-64 w-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
              <a
                href={googleMapsShareUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-block text-sm font-semibold text-[#0c8894] underline hover:text-[#2ea2a3]"
              >
                Open in Google Maps
              </a>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-[#1f1f1f]">Send enquiry</h2>
            <p className="mt-2 text-sm font-normal text-[#494949]">
              Submit the form to contact us.
             
            </p>

            <form className="mt-4 space-y-3" onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Name"
                autoComplete="name"
                className="w-full rounded-none border border-neutral-200 px-4 py-3 text-sm outline-none transition focus:border-[#0c8894]"
              />
              <input
                type="text"
                name="organization"
                placeholder="Organization"
                autoComplete="organization"
                className="w-full rounded-none border border-neutral-200 px-4 py-3 text-sm outline-none transition focus:border-[#0c8894]"
              />
              <input
                type="email"
                name="email"
                required
                placeholder="Email *"
                autoComplete="email"
                className="w-full rounded-none border border-neutral-200 px-4 py-3 text-sm outline-none transition focus:border-[#0c8894]"
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone"
                autoComplete="tel"
                className="w-full rounded-none border border-neutral-200 px-4 py-3 text-sm outline-none transition focus:border-[#0c8894]"
              />
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                className="w-full rounded-none border border-neutral-200 px-4 py-3 text-sm outline-none transition focus:border-[#0c8894]"
              />
              <textarea
                name="message"
                placeholder="Message"
                rows={5}
                className="w-full rounded-none border border-neutral-200 px-4 py-3 text-sm outline-none transition focus:border-[#0c8894]"
              />
              {status === 'error' && errorMessage ? (
                <p className="text-sm text-red-700" role="alert">
                  {errorMessage}
                </p>
              ) : null}
              <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full rounded-none bg-[#0c8894] py-3 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-[#2ea2a3] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:px-8"
              >
                {status === 'sending' ? 'Sending…' : 'Send enquiry'}
              </button>
            </form>
          </div>
        </div>
      </PageShell>
    </>
  )
}

export default ContactPage
