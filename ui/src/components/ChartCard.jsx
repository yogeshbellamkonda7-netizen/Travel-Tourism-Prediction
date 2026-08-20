export default function ChartCard({ icon: Icon, title, subtitle, children }) {
  return (
    <div className="rounded-card border border-border bg-surface p-6 shadow-soft">
      <div className="flex items-start gap-2.5">
        {Icon && (
          <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-accent-soft text-accent">
            <Icon size={14} strokeWidth={2.2} />
          </span>
        )}
        <div>
          <h3 className="font-display text-[15px] font-semibold text-ink">{title}</h3>
          {subtitle && <p className="mt-0.5 text-xs text-ink-faint">{subtitle}</p>}
        </div>
      </div>
      <div className="mt-4">{children}</div>
    </div>
  )
}
