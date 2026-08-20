import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
} from 'recharts'
import { Sparkles } from 'lucide-react'
import ChartCard from './ChartCard'
import { chartTooltipStyle } from './chartTheme'

export default function FeatureImportanceChart({ data }) {
  const sorted = [...data].sort((a, b) => a.importance - b.importance)
  const maxImportance = Math.max(...sorted.map((d) => d.importance))

  return (
    <ChartCard
      icon={Sparkles}
      title="What Influences Tourism Demand?"
      subtitle="Relative importance of each factor to the model"
    >
      <ResponsiveContainer width="100%" height={260}>
        <BarChart
          data={sorted}
          layout="vertical"
          margin={{ top: 4, right: 20, left: 0, bottom: 0 }}
        >
          <CartesianGrid horizontal={false} stroke="#E3E9F2" />
          <XAxis
            type="number"
            domain={[0, 'dataMax']}
            tickFormatter={(v) => `${Math.round(v * 100)}%`}
            tick={{ fontSize: 11, fill: '#8996B3' }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            type="category"
            dataKey="feature"
            width={120}
            tick={{ fontSize: 12, fill: '#57678A' }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            contentStyle={chartTooltipStyle}
            formatter={(value) => `${(value * 100).toFixed(0)}% relative importance`}
          />
          <Bar dataKey="importance" radius={[0, 6, 6, 0]} barSize={16}>
            {sorted.map((entry) => (
              <Cell
                key={entry.feature}
                fill={entry.importance === maxImportance ? '#0C6E6B' : '#0C6E6B66'}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  )
}
