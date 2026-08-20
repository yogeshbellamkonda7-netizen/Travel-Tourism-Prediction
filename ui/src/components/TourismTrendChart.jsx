import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts'
import { TrendingUp } from 'lucide-react'
import ChartCard from './ChartCard'
import { chartTooltipStyle, formatCompact } from './chartTheme'

export default function TourismTrendChart({ data }) {
  return (
    <ChartCard
      icon={TrendingUp}
      title="Historical Tourism Trend"
      subtitle="Monthly tourist visits over the past year"
    >
      <ResponsiveContainer width="100%" height={260}>
        <LineChart data={data} margin={{ top: 8, right: 12, left: -12, bottom: 0 }}>
          <CartesianGrid vertical={false} stroke="#E3E9F2" />
          <XAxis
            dataKey="month"
            tick={{ fontSize: 12, fill: '#8996B3' }}
            axisLine={{ stroke: '#E3E9F2' }}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 12, fill: '#8996B3' }}
            axisLine={false}
            tickLine={false}
            tickFormatter={formatCompact}
            width={46}
          />
          <Tooltip
            contentStyle={chartTooltipStyle}
            formatter={(value) => [`${value.toLocaleString('en-IN')} visitors`, 'Visits']}
          />
          <Line
            type="monotone"
            dataKey="visits"
            stroke="#0C6E6B"
            strokeWidth={2.5}
            dot={{ r: 3, fill: '#0C6E6B', strokeWidth: 0 }}
            activeDot={{ r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartCard>
  )
}
