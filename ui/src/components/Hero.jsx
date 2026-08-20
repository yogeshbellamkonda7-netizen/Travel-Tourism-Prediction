import { SlidersHorizontal, Sparkles, TrendingUp, LineChart } from 'lucide-react'

const FLOW_STEPS = [
  { icon: SlidersHorizontal, label: 'Enter factors' },
  { icon: Sparkles, label: 'Model analyzes' },
  { icon: TrendingUp, label: 'Predicts demand' },
  { icon: LineChart, label: 'Explore insights' },
]

export default function Hero() {
  return (
    <section id="top" className="mx-auto max-w-6xl px-5 pt-14 pb-10 sm:px-8 sm:pt-20">
      <div className="max-w-2xl animate-fadeUp">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-ink-soft">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          College ML Project · Team of 4
        </span>

        <h1 className="mt-5 font-display text-[2.15rem] font-semibold leading-[1.15] tracking-tight text-ink sm:text-5xl">
          Predict tourism demand with AI
        </h1>

        <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-ink-soft sm:text-base">
          Forecast future tourist visits using historical tourism trends,
          climate, seasonality, and destination-related factors.
        </p>

        <a
          href="#prediction"
          className="mt-7 inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-white shadow-soft transition-colors hover:bg-accent-dark"
        >
          Start Prediction
        </a>
      </div>

      {/* Signature element: the input → model → prediction → insight
          flow, styled like a flight path — a dotted route with
          waypoints, echoing the tourism subject matter. */}
      <div className="mt-12 overflow-x-auto">
        <div className="relative flex min-w-[560px] items-center justify-between gap-2 sm:min-w-0">
          <svg
            className="pointer-events-none absolute left-0 right-0 top-6 h-px w-full"
            preserveAspectRatio="none"
            viewBox="0 0 100 1"
          >
            <line
              x1="6" y1="0.5" x2="94" y2="0.5"
              stroke="#C7D2E3"
              strokeWidth="1.5"
              strokeDasharray="1 4"
              strokeLinecap="round"
              className="animate-dashFlow"
              vectorEffect="non-scaling-stroke"
            />
          </svg>

          {FLOW_STEPS.map((step, i) => {
            const Icon = step.icon
            return (
              <div key={step.label} className="relative z-10 flex flex-1 flex-col items-center gap-2.5">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-border bg-surface text-accent shadow-soft">
                  <Icon size={18} strokeWidth={2} />
                </div>
                <span className="text-center text-[12px] font-medium text-ink-soft">
                  {i + 1}. {step.label}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
