import { useEffect, useState } from 'react'
import {
  MapPin,
  Star,
  AlertCircle,
  Loader2,
  Sparkles,
} from 'lucide-react'
import {
  fetchDestinations,
  predictTourismDemand,
} from '../services/api'

export default function PredictionForm({ onSubmit, isLoading }) {
  const [destinations, setDestinations] = useState([])
  const [selectedIndex, setSelectedIndex] = useState('')
  const [selectedDestination, setSelectedDestination] = useState(null)

  const [loadingDestinations, setLoadingDestinations] = useState(true)
  const [loadError, setLoadError] = useState(null)
  const [predictError, setPredictError] = useState(null)

  useEffect(() => {
    async function loadDestinations() {
      try {
        setLoadingDestinations(true)
        const data = await fetchDestinations()
        setDestinations(data)
        setLoadError(null)
      } catch (error) {
        setLoadError(error.message)
      } finally {
        setLoadingDestinations(false)
      }
    }

    loadDestinations()
  }, [])

  const handleDestinationChange = (event) => {
    const index = event.target.value

    setSelectedIndex(index)
    setPredictError(null)

    if (index === '') {
      setSelectedDestination(null)
      return
    }

    setSelectedDestination(destinations[Number(index)])
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!selectedDestination) {
      setPredictError('Please select a destination.')
      return
    }

    setPredictError(null)

    const payload = {
      destination: selectedDestination['Destination Name'],
      country: selectedDestination['Country'],
      continent: selectedDestination['Continent'],
      type: selectedDestination['Type'],
      travelExpense: Number(
        selectedDestination['Avg_Travel_Expense_USD_per_day']
      ),
      bestSeason: selectedDestination['Best Season'],
      temperature: Number(
        selectedDestination['Avg_Temperature_C']
      ),
      rating: Number(selectedDestination['Avg Rating']),
      unescoSite: selectedDestination['UNESCO Site'],
    }

    await onSubmit(payload)
  }

  return (
    <div className="rounded-card border border-border bg-surface p-6 shadow-soft sm:p-7">
      <h2 className="font-display text-lg font-semibold text-ink">
        Tourism Demand Prediction
      </h2>

      <p className="mt-1 text-sm text-ink-soft">
        Select a destination to view its details and generate a forecast.
      </p>

      <div className="mt-6">
        <label
          htmlFor="destination"
          className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-ink"
        >
          <MapPin size={14} className="text-accent" />
          Destination
          <span className="text-signal-high">*</span>
        </label>

        <select
          id="destination"
          value={selectedIndex}
          onChange={handleDestinationChange}
          disabled={loadingDestinations || isLoading}
          className="w-full appearance-none rounded-xl border border-border bg-canvas px-3.5 py-2.5 text-sm text-ink outline-none focus:border-accent"
        >
          <option value="">
            {loadingDestinations
              ? 'Loading destinations...'
              : 'Select a destination'}
          </option>

          {destinations.map((item, index) => (
            <option key={index} value={index}>
              {item['Destination Name']} — {item['Country']} — {item['Type']}
            </option>
          ))}
        </select>
      </div>

      {loadError && (
        <p className="mt-3 flex items-center gap-1 text-sm text-signal-high">
          <AlertCircle size={14} />
          {loadError}
        </p>
      )}

      {selectedDestination && (
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">

          <Detail
            label="Country"
            value={selectedDestination['Country']}
          />

          <Detail
            label="Continent"
            value={selectedDestination['Continent']}
          />

          <Detail
            label="Destination Type"
            value={selectedDestination['Type']}
          />

          <Detail
            label="Travel Expense"
            value={`$${selectedDestination['Avg_Travel_Expense_USD_per_day']} / day`}
          />

          <Detail
            label="Best Season"
            value={selectedDestination['Best Season']}
          />

          <Detail
            label="Avg. Temperature"
            value={`${selectedDestination['Avg_Temperature_C']} °C`}
          />

          <Detail
            label="Average Rating"
            value={
              <span className="flex items-center gap-2">
                <Star
                  size={16}
                  className="fill-accent text-accent"
                />
                {selectedDestination['Avg Rating']} / 5
              </span>
            }
          />

          <Detail
            label="UNESCO Site"
            value={selectedDestination['UNESCO Site']}
          />
        </div>
      )}

      {predictError && (
        <p className="mt-4 flex items-center gap-1 text-sm text-signal-high">
          <AlertCircle size={14} />
          {predictError}
        </p>
      )}

      <button
        type="button"
        onClick={handleSubmit}
        disabled={!selectedDestination || isLoading}
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-medium text-white shadow-soft transition-colors hover:bg-accent-dark disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isLoading ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            Analyzing tourism patterns...
          </>
        ) : (
          <>
            <Sparkles size={16} />
            Predict Tourism Demand
          </>
        )}
      </button>
    </div>
  )
}

function Detail({ label, value }) {
  return (
    <div className="rounded-xl border border-border bg-canvas px-4 py-3">
      <div className="text-xs font-medium text-ink-faint">
        {label}
      </div>

      <div className="mt-1 text-sm font-medium text-ink">
        {value}
      </div>
    </div>
  )
}