import { Compass } from 'lucide-react'

const TEAM = [
  { name: 'Yogesh', role: 'Data Collection & Deployment' },
  { name: 'Navya Sri', role: 'Data Preprocessing' },
  { name: 'Bhargavi', role: 'ML Models' },
  { name: 'Sarayu', role: 'UI / Frontend' },
]

export default function Footer() {
  return (
    <footer id="about" className="mt-16 border-t border-border bg-surface">
      <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8">
        <div className="flex items-center gap-2">
          <Compass size={16} className="text-accent" />
          <span className="font-display text-sm font-semibold text-ink">TourSight AI</span>
        </div>
        <p className="mt-2 max-w-lg text-sm leading-relaxed text-ink-soft">
          A tourism demand forecasting project built for our ML internship.
Predictions are generated using our trained machine-learning model
and real tourism dataset.
        </p>

        <div className="mt-6 flex flex-wrap gap-x-8 gap-y-3">
          {TEAM.map((member) => (
            <div key={member.name} className="text-xs">
              <p className="font-medium text-ink">{member.name}</p>
              <p className="text-ink-faint">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </footer>
  )
}
