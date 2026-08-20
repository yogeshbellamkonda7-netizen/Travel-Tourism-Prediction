import { useState } from 'react'
import Hero from '../components/Hero'
import PredictionForm from '../components/PredictionForm'
import PredictionResult from '../components/PredictionResult'
import { predictTourismDemand } from '../services/api'
import History from './History'
import Compare from './Compare'
import ModelInfo from './ModelInfo'

export default function Dashboard() {
  const [status, setStatus] = useState('idle')
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)

  const handlePredict = async (payload) => {
    setStatus('loading')
    setError(null)

    try {
      const response = await predictTourismDemand(payload)

setResult(response)
setStatus('success')

const historyItem = {
  id: Date.now(),
  date: new Date().toLocaleString(),
  destination: payload.destination,
  country: payload.country,
  type: payload.type,
  predictedVisits: response.predictedVisits,
  demandLevel: response.demandLevel,
}

const oldHistory = JSON.parse(
  localStorage.getItem('predictionHistory') || '[]'
)

localStorage.setItem(
  'predictionHistory',
  JSON.stringify([historyItem, ...oldHistory])
)
  window.dispatchEvent(new Event('predictionHistoryUpdated'))
    } catch (err) {
      setError(err.message)
      setStatus('error')
    }
  }

  return (
    <main>
      <Hero />

      <section
        id="prediction"
        className="mx-auto max-w-6xl px-5 py-6 sm:px-8"
      >
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <PredictionForm
              onSubmit={handlePredict}
              isLoading={status === 'loading'}
            />
          </div>

          <div className="lg:col-span-2">
            <PredictionResult
              status={status}
              result={result}
              error={error}
            />
          </div>
        </div>
      </section>
            <section
        id="history"
        className="mx-auto max-w-6xl px-5 py-6 sm:px-8"
      >
        <History />
      </section>
      <section
  id="compare"
  className="mx-auto max-w-6xl px-5 py-6 sm:px-8"
>
  <Compare />
</section>
<section
  id="about"
  className="mx-auto max-w-6xl px-5 py-6 sm:px-8"
>
  <ModelInfo />
</section>
    </main>
  )
}