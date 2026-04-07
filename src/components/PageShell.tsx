import type { ReactNode } from 'react'

type PageShellProps = {
  title?: string
  children: ReactNode
  /** Wider card for dense layouts */
  wide?: boolean
}

function PageShell({ title, children, wide }: PageShellProps) {
  return (
    <div
      className={`mx-auto px-4 pb-16 pt-8 ${wide ? 'max-w-7xl' : 'max-w-6xl'}`}
    >
      <section className="rounded-none border border-neutral-200 bg-white p-8 shadow-[0_4px_24px_rgba(0,0,0,0.06)] sm:p-10">
        {title ? (
          <h1 className="mb-5 text-3xl font-bold text-[#000000] sm:text-5xl">{title}</h1>
        ) : null}
        {children}
      </section>
    </div>
  )
}

export default PageShell
