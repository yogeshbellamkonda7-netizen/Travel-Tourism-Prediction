import { useEffect, useMemo, useState } from 'react'
import { fetchDestinations, predictTourismDemand } from '../services/api'

export default function Compare() {
  const [destinations, setDestinations] = useState([])
  const [firstIndex, setFirstIndex] = useState('')
  const [secondIndex, setSecondIndex] = useState('')
  const [results, setResults] = useState({ first: null, second: null })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function load() {
      try {
        const data = await fetchDestinations()
        setDestinations(data)
      } catch (err) {
        setError(err.message)
      }
    }

    load()
  }, [])

  const first = useMemo(
    () => firstIndex === '' ? null : destinations[Number(firstIndex)],
    [firstIndex, destinations]
  )

  const second = useMemo(
    () => secondIndex === '' ? null : destinations[Number(secondIndex)],
    [secondIndex, destinations]
  )

  const buildPayload = (item) => ({
    destination: item['Destination Name'],
    country: item['Country'],
    continent: item['Continent'],
    type: item['Type'],
    travelExpense: Number(item['Avg_Travel_Expense_USD_per_day']),
    bestSeason: item['Best Season'],
    temperature: Number(item['Avg_Temperature_C']),
    rating: Number(item['Avg Rating']),
    unescoSite: item['UNESCO Site'],
  })

  const handleCompare = async () => {
    if (!first || !second) {
      setError('Please select two destinations.')
      return
    }

    setLoading(true)
    setError(null)

    try {
      const [firstResult, secondResult] = await Promise.all([
        predictTourismDemand(buildPayload(first)),
        predictTourismDemand(buildPayload(second)),
      ])

      setResults({
        first: firstResult,
        second: secondResult,
      })
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
  setResults({ first: null, second: null })

  if (first && second) {
    handleCompare()
  }
}, [firstIndex, secondIndex])

  const DetailRow = ({ label, a, b }) => (
    <div className="grid grid-cols-3 border-b border-border">
      <div className="px-4 py-3 text-sm font-medium text-ink-soft">
        {label}
      </div>
      <div className="px-4 py-3 text-sm text-ink">
        {a}
      </div>
      <div className="px-4 py-3 text-sm text-ink">
        {b}
      </div>
    </div>
  )

  return (
    <main className="mx-auto max-w-6xl px-5 py-10 sm:px-8">
      <h1 className="text-2xl font-semibold text-ink">
        Compare Destinations
      </h1>

      <p className="mt-1 text-sm text-ink-soft">
        Compare two destinations using the real tourism dataset and model.
      </p>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <select
          value={firstIndex}
          onChange={(e) => setFirstIndex(e.target.value)}
          className="rounded-xl border border-border bg-canvas px-4 py-3 text-sm"
        >
          <option value="">Select Destination A</option>
          {destinations.map((item, index) => (
            <option key={index} value={index}>
              {item['Destination Name']} — {item['Country']} — {item['Type']}
            </option>
          ))}
        </select>

        <select
          value={secondIndex}
          onChange={(e) => setSecondIndex(e.target.value)}
          className="rounded-xl border border-border bg-canvas px-4 py-3 text-sm"
        >
          <option value="">Select Destination B</option>
          {destinations.map((item, index) => (
            <option key={index} value={index}>
              {item['Destination Name']} — {item['Country']} — {item['Type']}
            </option>
          ))}
        </select>
      </div>

      {error && (
        <p className="mt-4 text-sm text-signal-high">
          {error}
        </p>
      )}

      {first && second && (
        <div className="mt-8 overflow-hidden rounded-card border border-border bg-surface">
          <div className="grid grid-cols-3 bg-canvas">
            <div className="px-4 py-4 font-semibold text-ink">Feature</div>
            <div className="px-4 py-4 font-semibold text-ink">
              {first['Destination Name']}
            </div>
            <div className="px-4 py-4 font-semibold text-ink">
              {second['Destination Name']}
            </div>
          </div>

          <DetailRow
            label="Country"
            a={first['Country']}
            b={second['Country']}
          />

          <DetailRow
            label="Continent"
            a={first['Continent']}
            b={second['Continent']}
          />

          <DetailRow
            label="Type"
            a={first['Type']}
            b={second['Type']}
          />

          <DetailRow
            label="Travel Expense"
            a={`$${first['Avg_Travel_Expense_USD_per_day']}/day`}
            b={`$${second['Avg_Travel_Expense_USD_per_day']}/day`}
          />

          <DetailRow
            label="Best Season"
            a={first['Best Season']}
            b={second['Best Season']}
          />

          <DetailRow
            label="Temperature"
            a={`${first['Avg_Temperature_C']} °C`}
            b={`${second['Avg_Temperature_C']} °C`}
          />

          <DetailRow
            label="Rating"
            a={`${first['Avg Rating']} / 5`}
            b={`${second['Avg Rating']} / 5`}
          />

          <DetailRow
            label="UNESCO Site"
            a={first['UNESCO Site']}
            b={second['UNESCO Site']}
          />

          {results.first && results.second && (
            <>
              <DetailRow
                label="Predicted Visitors"
                a={`${Number(results.first.predictedVisits).toFixed(2)} million`}
                b={`${Number(results.second.predictedVisits).toFixed(2)} million`}
              />

              <DetailRow
                label="Demand Level"
                a={results.first.demandLevel}
                b={results.second.demandLevel}
              />
            </>
          )}
        </div>
      )}
    </main>
  )
}