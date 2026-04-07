import { ChevronRight } from 'lucide-react'
import { fallbackHeroImage } from '../data/siteMedia'
import LazyImage from './LazyImage'

export type BreadcrumbItem = {
  label: string
  to?: string
}

type PageHeroProps = {
  title: string
  breadcrumbs: BreadcrumbItem[]
  imageUrl?: string
  imageAlt?: string
  subtitle?: string
}

function PageHero({
  title,
  breadcrumbs,
  imageUrl = fallbackHeroImage.src,
  imageAlt = fallbackHeroImage.alt,
  subtitle,
}: PageHeroProps) {
  return (
    <section className="relative min-h-[200px] overflow-hidden">
      <LazyImage
        src={imageUrl}
        alt={imageAlt}
        priority
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div
        className="absolute inset-0 bg-linear-to-br from-[#0a1628]/92 via-[#0c8894]/55 to-[#0f172a]/90"
        aria-hidden
      />
      <div className="relative z-10 mx-auto max-w-6xl px-4 py-16 text-center sm:py-20">
        {subtitle ? (
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.25em] text-[#2ea2a3]">
            {subtitle}
          </p>
        ) : null}
        <h1 className="text-4xl font-bold tracking-tight text-white drop-shadow-sm sm:text-5xl">
          {title}
        </h1>
        <nav
          aria-label="Breadcrumb"
          className="mt-4 flex items-center justify-center gap-1 text-sm text-white/90"
        >
          {breadcrumbs.map((crumb, i) => (
            <span key={`${crumb.label}-${i}`} className="flex items-center gap-1">
              {i > 0 ? (
                <ChevronRight className="h-4 w-4 text-[#2ea2a3]" aria-hidden />
              ) : null}
              <span
                className={
                  crumb.to
                    ? 'text-white/90'
                    : 'font-semibold text-[#2ea2a3]'
                }
              >
                {crumb.label}
              </span>
            </span>
          ))}
        </nav>
      </div>
    </section>
  )
}

export default PageHero
