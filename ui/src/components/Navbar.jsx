import { Compass } from 'lucide-react'

const NAV_LINKS = [
  { label: 'Prediction', href: '#prediction' },
  { label: 'History', href: '#history' },
  { label: 'Compare', href: '#compare' },
  { label: 'About', href: '#about' },
]

export default function Navbar() {
  return (
    <header className="sticky top-0 z-20 border-b border-border bg-canvas/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">

        <a href="#top" className="flex items-center gap-3">
          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent text-white shadow-lg">
            <Compass size={24} strokeWidth={2.4} />
          </span>

          <span className="flex flex-col leading-none">
            <span className="font-display text-[20px] font-bold tracking-tight text-ink">
              TourSight AI
            </span>

            <span className="text-[12px] font-medium tracking-wide text-ink-faint">
              Tourism Demand Prediction
            </span>
          </span>
        </a>

        <nav className="hidden items-center gap-7 sm:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-ink-soft transition-colors hover:text-accent"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a
          href="#prediction"
          className="rounded-full bg-ink px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-accent-dark sm:hidden"
        >
          Predict
        </a>

      </div>
    </header>
  )
}