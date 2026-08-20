export const chartTooltipStyle = {
  borderRadius: 12,
  border: '1px solid #E3E9F2',
  boxShadow: '0 8px 24px -12px rgba(15, 27, 52, 0.18)',
  fontSize: 12,
  fontFamily: 'Inter, ui-sans-serif, sans-serif',
  padding: '8px 12px',
}

export function formatCompact(value) {
  if (value >= 1000) return `${(value / 1000).toFixed(0)}k`
  return value
}
