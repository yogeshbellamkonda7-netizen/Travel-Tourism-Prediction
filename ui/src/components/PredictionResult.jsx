import { Users, AlertTriangle, MapPinned, Loader2 } from 'lucide-react'

const DEMAND_STYLES = {
  High: 'bg-signal-high/10 text-signal-high border-signal-high/25',
  Medium: 'bg-accent/10 text-accent border-accent/25',
  Low: 'bg-ink-soft/10 text-ink-soft border-ink-soft/25',
}

export default function PredictionResult({ status, result, error }) {
  return (
    <div className="flex h-full flex-col rounded-card border border-border bg-surface p-6 shadow-soft sm:p-7">
      <h3 className="font-display text-lg font-semibold text-ink">Prediction Result</h3>

      <div className="mt-5 flex flex-1 flex-col items-center justify-center text-center">
        {status === 'idle' && (
          <div className="flex flex-col items-center gap-3 py-8 text-ink-faint">
            <MapPinned size={30} strokeWidth={1.5} />
            <p className="max-w-[220px] text-sm">
              Your prediction will appear here.
            </p>
          </div>
        )}

        {status === 'loading' && (
          <div className="flex flex-col items-center gap-3 py-8">
            <Loader2 size={28} className="animate-spin text-accent" />
            <p className="text-sm font-medium text-ink-soft">
              Analyzing tourism patterns...
            </p>
          </div>
        )}

        {status === 'error' && (
          <div className="flex flex-col items-center gap-3 py-8 text-signal-high">
            <AlertTriangle size={28} strokeWidth={1.75} />
            <p className="max-w-[240px] text-sm font-medium">
              {error || 'Something went wrong while generating the prediction.'}
            </p>
            <p className="text-xs text-ink-faint">Please adjust your inputs and try again.</p>
          </div>
        )}

        {status === 'success' && result && (
          <div className="flex w-full flex-col items-center gap-4 py-2 animate-fadeUp">
            <span className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-ink-faint">
              <Users size={13} />
              Predicted Tourist Visits
            </span>

            <span className="num-display text-5xl font-semibold text-ink sm:text-6xl">
              {result.predictedVisits.toLocaleString('en-IN')}
            </span>
            <span className="-mt-2 text-xs text-ink-faint">Million visitors</span>

            {result.demandLevel && (
              <span
                className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${DEMAND_STYLES[result.demandLevel] || DEMAND_STYLES.Medium}`}
              >
                Demand Level: {result.demandLevel.toUpperCase()}
              </span>
            )}

            {result.insight && (
              <p className="mt-1 max-w-[280px] text-sm leading-relaxed text-ink-soft">
                {result.insight}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
