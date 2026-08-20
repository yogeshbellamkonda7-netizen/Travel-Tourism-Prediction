import { useMemo, useState } from 'react'
import { Gauge, TrendingUp, Sparkles as SparklesIcon } from 'lucide-react'
import Hero from '../components/Hero'
import PredictionForm from '../components/PredictionForm'
import PredictionResult from '../components/PredictionResult'
import InsightCard from '../components/InsightCard'
import TourismTrendChart from '../components/TourismTrendChart'
import ActualVsPredictedChart from '../components/ActualVsPredictedChart'
import FeatureImportanceChart from '../components/FeatureImportanceChart'
import { predictTourismDemand } from '../services/api'
import {
  MOCK_HISTORICAL_TREND,
  MOCK_ACTUAL_VS_PREDICTED,
  MOCK_FEATURE_IMPORTANCE,
} from '../services/mockData'

export default function Dashboard() {
  const [status, setStatus] = useState('idle') // idle | loading | success | error
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)

  const handlePredict = async (payload) => {
    setStatus('loading')
    setError(null)
    try {
      const response = await predictTourismDemand(payload)
      setResult(response)
      setStatus('success')
    } catch (err) {
      setError(err.message)
      setStatus('error')
    }
  }

  // Derived, non-fabricated insights — computed from whatever
  // trend/feature data is currently available, not hardcoded copy.
  const trendDirection = useMemo(() => {
    const first = MOCK_HISTORICAL_TREND[0].visits
    const last = MOCK_HISTORICAL_TREND[MOCK_HISTORICAL_TREND.length - 1].visits
    return last >= first ? 'Increasing' : 'Decreasing'
  }, [])

  const topFeature = useMemo(() => {
    return [...MOCK_FEATURE_IMPORTANCE].sort((a, b) => b.importance - a.importance)[0]
  }, [])

  return (
    <main>
      <Hero />

      <section id="prediction" className="mx-auto max-w-6xl px-5 py-6 sm:px-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <PredictionForm onSubmit={handlePredict} isLoading={status === 'loading'} />
          </div>
          <div className="lg:col-span-2">
            <PredictionResult status={status} result={result} error={error} />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-6 sm:px-8">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-ink-faint">
          Key Insights
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <InsightCard
            icon={Gauge}
            label="Expected Demand"
            value={result ? result.demandLevel : 'Run a prediction'}
            tone={result ? 'accent' : 'neutral'}
          />
          <InsightCard
            icon={TrendingUp}
            label="Historical Trend"
            value={trendDirection}
          />
          <InsightCard
            icon={SparklesIcon}
            label="Strongest Influencing Factor"
            value={topFeature.feature}
          />
        </div>
      </section>

      <section id="analytics" className="mx-auto max-w-6xl px-5 py-6 sm:px-8">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-ink-faint">
          Analytics
        </h2>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <TourismTrendChart data={MOCK_HISTORICAL_TREND} />
          <ActualVsPredictedChart data={MOCK_ACTUAL_VS_PREDICTED} />
          <div className="lg:col-span-2">
            <FeatureImportanceChart data={MOCK_FEATURE_IMPORTANCE} />
          </div>
        </div>
      </section>
    </main>
  )
}
