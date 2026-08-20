export default function InsightCard({ icon: Icon, label, value, tone = 'neutral' }) {
  const toneClasses = {
    neutral: 'text-ink',
    accent: 'text-accent',
    warm: 'text-signal-high',
  }

  return (
    <div className="flex items-center gap-3 rounded-card border border-border bg-surface px-5 py-4 shadow-soft">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent-soft text-accent">
        <Icon size={16} strokeWidth={2.1} />
      </span>
      <div className="min-w-0">
        <p className="text-xs text-ink-faint">{label}</p>
        <p className={`truncate font-display text-[15px] font-semibold ${toneClasses[tone]}`}>
          {value}
        </p>
      </div>
    </div>
  )
}
