import { Link } from 'react-router-dom'
import { MapPin } from 'lucide-react'
import sahajLogo from '../assets/Sahaj-logo.png'
import { footerStripImages } from '../assets/footer/images'
import LazyImage from './LazyImage'
import { companyInfo } from '../data/companyInfo'
import { footerColumns } from '../data/footerContent'

function RichFooter() {
  return (
    <footer className="mt-auto border-t border-neutral-200 bg-white">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="overflow-hidden rounded-none border border-neutral-200/80 bg-neutral-100">
          <div className="grid grid-cols-2 gap-px bg-neutral-200 sm:grid-cols-3 lg:grid-cols-6">
            {footerStripImages.map(({ src, alt }) => (
              <div
                key={src}
                className="h-12 overflow-hidden bg-neutral-200 sm:h-14 lg:h-24"
              >
                <LazyImage
                  src={src}
                  alt={alt}
                  brandLoader={false}
                  className="h-full w-full object-cover transition duration-700 hover:scale-105"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link to="/" className="inline-flex items-center gap-2">
              <img
                src={sahajLogo}
                alt=""
                className="h-12 w-auto max-w-[200px] rounded-lg object-contain"
              />
              <div className='flex flex-col'>
              <span className="text-lg font-bold text-[#000000]">
                Sahaj Construction
              </span>
              <span className="mt-0.5 hidden text-[10px] font-semibold uppercase tracking-[0.18em] text-[#0c8894] sm:block">
                India LLP
              </span>
              </div>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-[#494949]">
              Government-focused EPC for water and sanitation infrastructure, quality,
              compliance, and delivery you can rely on.
            </p>
            <div className="mt-4 flex items-start gap-2 text-sm text-[#494949]">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#0c8894]" />
              <span>
                {companyInfo.registeredOfficeLines[0]}, {companyInfo.registeredOfficeLines[1]}
              </span>
            </div>
          </div>
          {footerColumns.map((col) => (
            <div key={col.heading}>
              <p className="border-b-2 border-[#0c8894] pb-2 text-sm font-bold uppercase tracking-wide text-[#000000]">
                {col.heading}
              </p>
              <ul className="mt-4 space-y-2">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      to={l.to}
                      className="text-sm font-normal text-[#494949] transition hover:text-[#0c8894]"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="mt-10 border-t border-neutral-200 pt-6 text-center text-xs text-[#494949]">
          © {new Date().getFullYear()} {companyInfo.legalName}. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

export default RichFooter
