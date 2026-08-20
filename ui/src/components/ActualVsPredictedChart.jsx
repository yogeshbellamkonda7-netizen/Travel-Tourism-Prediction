import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts'
import { GitCompare } from 'lucide-react'
import ChartCard from './ChartCard'
import { chartTooltipStyle, formatCompact } from './chartTheme'

export default function ActualVsPredictedChart({ data }) {
  return (
    <ChartCard
      icon={GitCompare}
      title="Actual vs Predicted Visits"
      subtitle="Model performance on a recent evaluation window"
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
            formatter={(value) => `${value.toLocaleString('en-IN')} visitors`}
          />
          <Legend
            wrapperStyle={{ fontSize: 12, color: '#57678A' }}
            iconType="circle"
            iconSize={8}
          />
          <Line
            type="monotone"
            dataKey="actual"
            name="Actual"
            stroke="#0F1B34"
            strokeWidth={2.5}
            dot={{ r: 3, strokeWidth: 0 }}
          />
          <Line
            type="monotone"
            dataKey="predicted"
            name="Predicted"
            stroke="#0C6E6B"
            strokeWidth={2.5}
            strokeDasharray="5 4"
            dot={{ r: 3, strokeWidth: 0 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartCard>
  )
}
