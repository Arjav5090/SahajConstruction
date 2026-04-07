import type { ReactNode } from 'react'
import { useEffect, useState, useSyncExternalStore } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import sahajLogo from '../assets/Sahaj-logo.png'
import RichFooter from './RichFooter'
import { navItems } from '../data/siteContent'

type SiteLayoutProps = {
  children: ReactNode
}

const mainNavItems = navItems.filter((item) => item.href !== '/contact-us')
const contactItem = navItems.find((item) => item.href === '/contact-us')!

/** Approximate hero height (matches HomePage `min-h-[min(92vh,820px)]`) minus offset so bar turns solid near end of hero */
function homeHeroScrollThreshold(): number {
  if (typeof window === 'undefined') return 720
  return Math.round(Math.min(window.innerHeight * 0.92, 820) - 96)
}

function subscribeWindowScroll(onStoreChange: () => void) {
  window.addEventListener('scroll', onStoreChange, { passive: true })
  window.addEventListener('resize', onStoreChange, { passive: true })
  return () => {
    window.removeEventListener('scroll', onStoreChange)
    window.removeEventListener('resize', onStoreChange)
  }
}

function getScrollYSnapshot(): number {
  return typeof window !== 'undefined' ? window.scrollY : 0
}

function getScrollYServerSnapshot(): number {
  return 0
}

function useWindowScrollY(): number {
  return useSyncExternalStore(subscribeWindowScroll, getScrollYSnapshot, getScrollYServerSnapshot)
}

function SiteLayout({ children }: SiteLayoutProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const scrollY = useWindowScrollY()
  const location = useLocation()
  const isHome = location.pathname === '/'

  useEffect(() => {
    window.scrollTo(0, 0)
    queueMicrotask(() => setMenuOpen(false))
  }, [location.pathname])

  const pastHero = scrollY >= homeHeroScrollThreshold()
  const transparent = isHome && !menuOpen && !pastHero

  return (
    <div className="relative flex min-h-screen flex-col bg-white">
      <header
        className={`fixed left-0 right-0 top-0 z-40 w-full transition-[background-color,box-shadow,border-color,backdrop-filter] duration-300 ${
          transparent
            ? 'border-transparent bg-transparent shadow-none backdrop-blur-none'
            : 'border-b border-neutral-200/80 bg-white/95 shadow-[0_4px_24px_rgba(0,0,0,0.04)] backdrop-blur-md'
        }`}
      >
        <div className="relative mx-auto flex w-full max-w-7xl items-center justify-between gap-3 px-4 py-4 sm:px-6 lg:gap-6">
          <Link
            to="/"
            className={`flex min-w-0 flex-1 items-center gap-2 rounded-lg pr-2 outline-none focus-visible:ring-2 sm:gap-3 md:max-w-none md:flex-none md:pr-0 ${
              transparent
                ? 'focus-visible:ring-white/40 focus-visible:ring-offset-0'
                : 'focus-visible:ring-[#0c8894]/35 focus-visible:ring-offset-2'
            }`}
            onClick={() => setMenuOpen(false)}
          >
            <img
              src={sahajLogo}
              alt=""
              decoding="async"
              draggable={false}
              className={`block h-auto max-h-8 w-auto max-w-[120px] shrink-0 object-contain object-left sm:max-h-9 sm:max-w-[160px] md:max-h-10 md:max-w-[180px] lg:max-w-[200px] ${
                transparent ? 'brightness-0 invert' : ''
              }`}
            />
            <span className="min-w-0">
              <span
                className={`block truncate text-[12px] font-bold leading-tight tracking-tight sm:text-[13px] md:text-[14px] lg:text-[15px] ${
                  transparent ? 'text-white' : 'text-[#0a1628]'
                }`}
              >
                Sahaj Construction
              </span>
              <span
                className={`mt-0.5 block text-[9px] font-semibold uppercase tracking-[0.16em] sm:text-[10px] sm:tracking-[0.18em] md:tracking-[0.18em] ${
                  transparent ? 'text-[#2ea2a3]' : 'text-[#0c8894]'
                }`}
              >
                India LLP
              </span>
            </span>
          </Link>

          <nav
            aria-label="Primary"
            className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-4 md:flex lg:gap-7 xl:gap-9"
          >
            {mainNavItems.map((item) => (
              <NavLink
                key={item.label}
                to={item.href}
                end={item.href === '/'}
                className={({ isActive }) =>
                  `whitespace-nowrap text-[10px] font-semibold uppercase tracking-[0.14em] transition-colors lg:text-[11px] ${
                    transparent
                      ? isActive
                        ? 'text-[#2ea2a3]'
                        : 'text-white/90 hover:text-white'
                      : isActive
                        ? 'text-[#0c8894]'
                        : 'text-neutral-600 hover:text-[#0c8894]'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <NavLink
              to={contactItem.href}
              className={({ isActive }) =>
                `group hidden items-center gap-2 rounded-full border py-1.5 pl-4 pr-1.5 text-[10px] font-bold uppercase tracking-[0.14em] shadow-[0_2px_12px_rgba(0,0,0,0.06)] transition hover:shadow-[0_4px_16px_rgba(12,136,148,0.15)] md:flex md:gap-3 md:pl-5 md:text-[11px] ${
                  transparent
                    ? 'border-white/25 bg-white text-[#0a1628] hover:border-white/50'
                    : 'border-neutral-200/90 bg-white text-[#0a1628] hover:border-[#0c8894]/40'
                } ${isActive ? 'ring-2 ring-[#0c8894]/25' : ''}`
              }
            >
              <span className="hidden lg:inline">{contactItem.label}</span>
              <span className="lg:hidden">Contact</span>
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#0c8894] text-white transition group-hover:bg-[#2ea2a3]">
                <ArrowUpRight className="h-4 w-4" strokeWidth={2.25} aria-hidden />
              </span>
            </NavLink>

            <button
              type="button"
              className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full border transition md:hidden ${
                transparent
                  ? 'border-white/35 bg-white/10 text-white hover:border-white/60 hover:bg-white/15'
                  : 'border-neutral-200 bg-white text-[#0a1628] hover:border-[#0c8894] hover:bg-[#0c8894]/5 hover:text-[#0c8894]'
              }`}
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              onClick={() => setMenuOpen((o) => !o)}
            >
              {menuOpen ? <X className="h-5 w-5" strokeWidth={2} /> : <Menu className="h-5 w-5" strokeWidth={2} />}
            </button>
          </div>
        </div>

        <div
          id="mobile-nav"
          className={`border-t border-neutral-200 bg-[#fafafa] md:hidden ${menuOpen ? 'block' : 'hidden'}`}
        >
          <nav aria-label="Primary mobile" className="mx-auto max-w-7xl px-4 py-4 sm:px-6">
            <ul className="flex flex-col gap-1">
              {navItems.map((item) => {
                const isContact = item.href === '/contact-us'
                return (
                  <li key={item.label}>
                    <NavLink
                      to={item.href}
                      end={item.href === '/'}
                      className={({ isActive }) =>
                        `flex items-center justify-between rounded-xl border py-3.5 pl-4 pr-3 text-[13px] font-semibold uppercase tracking-wide transition-colors ${
                          isContact
                            ? isActive
                              ? 'border-[#0c8894] bg-[#0c8894] text-white'
                              : 'border-[#0c8894] bg-[#0c8894] text-white hover:bg-[#2ea2a3]'
                            : isActive
                              ? 'border-[#0c8894]/30 bg-white text-[#0c8894] shadow-sm'
                              : 'border-transparent text-neutral-800 hover:bg-white'
                        }`
                      }
                      onClick={() => setMenuOpen(false)}
                    >
                      {item.label}
                      {isContact ? (
                        <ArrowUpRight className="h-4 w-4 shrink-0 opacity-90" aria-hidden />
                      ) : null}
                    </NavLink>
                  </li>
                )
              })}
            </ul>
          </nav>
        </div>
      </header>

      <main className={`w-full flex-1 pb-0 pt-0 ${isHome ? '' : 'pt-18'}`}>{children}</main>

      <RichFooter />
    </div>
  )
}

export default SiteLayout
