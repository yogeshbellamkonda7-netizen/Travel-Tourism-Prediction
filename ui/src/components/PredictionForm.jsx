import { useState } from 'react'
import {
  MapPin, CalendarDays, Sun, Thermometer, CloudRain, Droplets,
  UtensilsCrossed, History, Star, AlertCircle, Loader2, Sparkles,
} from 'lucide-react'
import { DESTINATIONS, SEASONS, MONTHS } from '../services/mockData'

/**
 * FORM FIELDS
 * -----------------------------------------------------------------
 * This array is the single source of truth for the prediction form.
 * When the ML team (Bhargavi) finalizes the real feature list, add,
 * remove, or edit entries here — the form, validation, and payload
 * building all follow automatically. No other file needs to change.
 *
 * Supported `type` values: "select" | "number" | "slider" | "rating"
 * -----------------------------------------------------------------
 */
const FORM_FIELDS = [
  {
    name: 'destination',
    label: 'Destination',
    type: 'select',
    icon: MapPin,
    options: DESTINATIONS,
    required: true,
    placeholder: 'Select a destination',
  },
  {
    name: 'month',
    label: 'Month',
    type: 'select',
    icon: CalendarDays,
    options: MONTHS,
    required: true,
    placeholder: 'Select a month',
  },
  {
    name: 'season',
    label: 'Season',
    type: 'select',
    icon: Sun,
    options: SEASONS,
    required: true,
    placeholder: 'Select a season',
  },
  {
    name: 'temperature',
    label: 'Avg. Temperature',
    type: 'number',
    icon: Thermometer,
    unit: '°C',
    min: -10,
    max: 50,
    required: true,
    placeholder: 'e.g. 31',
  },
  {
    name: 'rainfall',
    label: 'Rainfall',
    type: 'number',
    icon: CloudRain,
    unit: 'mm',
    min: 0,
    max: 1000,
    required: true,
    placeholder: 'e.g. 45',
  },
  {
    name: 'humidity',
    label: 'Humidity',
    type: 'slider',
    icon: Droplets,
    unit: '%',
    min: 0,
    max: 100,
    required: true,
    defaultValue: 60,
  },
  {
    name: 'foodRating',
    label: 'Food Rating',
    type: 'rating',
    icon: UtensilsCrossed,
    min: 1,
    max: 5,
    required: true,
    defaultValue: 0,
  },
  {
    name: 'historicalVisits',
    label: 'Historical Tourist Visits',
    type: 'number',
    icon: History,
    unit: 'visitors',
    min: 0,
    required: true,
    placeholder: 'e.g. 52000',
  },
]

function buildInitialState() {
  const state = {}
  FORM_FIELDS.forEach((f) => {
    state[f.name] = f.defaultValue ?? ''
  })
  return state
}

function validate(values) {
  const errors = {}
  FORM_FIELDS.forEach((field) => {
    const raw = values[field.name]

    if (field.required && (raw === '' || raw === null || raw === undefined)) {
      errors[field.name] = 'This field is required.'
      return
    }

    if (field.type === 'number' || field.type === 'slider' || field.type === 'rating') {
      const num = Number(raw)
      if (Number.isNaN(num)) {
        errors[field.name] = 'Enter a valid number.'
        return
      }
      if (num < 0) {
        errors[field.name] = 'Value cannot be negative.'
        return
      }
      if (field.min !== undefined && num < field.min) {
        errors[field.name] = `Must be at least ${field.min}${field.unit ? ` ${field.unit}` : ''}.`
        return
      }
      if (field.max !== undefined && num > field.max) {
        errors[field.name] = `Must be no more than ${field.max}${field.unit ? ` ${field.unit}` : ''}.`
        return
      }
    }
  })
  return errors
}

export default function PredictionForm({ onSubmit, isLoading }) {
  const [values, setValues] = useState(buildInitialState)
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})

  const setField = (name, value) => {
    setValues((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }))
  }

  const handleBlur = (name) => setTouched((prev) => ({ ...prev, [name]: true }))

  const handleSubmit = (e) => {
    e.preventDefault()
    const validationErrors = validate(values)
    setErrors(validationErrors)
    setTouched(
      FORM_FIELDS.reduce((acc, f) => ({ ...acc, [f.name]: true }), {})
    )
    if (Object.keys(validationErrors).length > 0) return

    onSubmit({
      destination: values.destination,
      month: MONTHS.indexOf(values.month) + 1,
      season: values.season,
      temperature: Number(values.temperature),
      rainfall: Number(values.rainfall),
      humidity: Number(values.humidity),
      foodRating: Number(values.foodRating),
      historicalVisits: Number(values.historicalVisits),
    })
  }

  return (
    <div className="rounded-card border border-border bg-surface p-6 shadow-soft sm:p-7">
      <h2 className="font-display text-lg font-semibold text-ink">
        Tourism Demand Prediction
      </h2>
      <p className="mt-1 text-sm text-ink-soft">
        Enter the destination and relevant factors to generate a forecast.
      </p>

      <form onSubmit={handleSubmit} noValidate className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
        {FORM_FIELDS.map((field) => (
          <FieldRenderer
            key={field.name}
            field={field}
            value={values[field.name]}
            error={touched[field.name] ? errors[field.name] : undefined}
            onChange={(v) => setField(field.name, v)}
            onBlur={() => handleBlur(field.name)}
          />
        ))}

        <div className="sm:col-span-2">
          <button
            type="submit"
            disabled={isLoading}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-medium text-white shadow-soft transition-colors hover:bg-accent-dark disabled:cursor-not-allowed disabled:opacity-70"
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
      </form>
    </div>
  )
}

function FieldRenderer({ field, value, error, onChange, onBlur }) {
  const Icon = field.icon
  const inputId = `field-${field.name}`

  return (
    <div className={field.type === 'rating' ? '' : ''}>
      <label htmlFor={inputId} className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-ink">
        <Icon size={14} className="text-accent" strokeWidth={2.2} />
        {field.label}
        {field.required && <span className="text-signal-high">*</span>}
      </label>

      {field.type === 'select' && (
        <select
          id={inputId}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          className={selectClasses(error)}
        >
          <option value="" disabled>
            {field.placeholder}
          </option>
          {field.options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      )}

      {field.type === 'number' && (
        <div className="relative">
          <input
            id={inputId}
            type="number"
            inputMode="decimal"
            value={value}
            placeholder={field.placeholder}
            onChange={(e) => onChange(e.target.value)}
            onBlur={onBlur}
            className={inputClasses(error)}
          />
          {field.unit && (
            <span className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-ink-faint">
              {field.unit}
            </span>
          )}
        </div>
      )}

      {field.type === 'slider' && (
        <div>
          <input
            id={inputId}
            type="range"
            min={field.min}
            max={field.max}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onBlur={onBlur}
            className="mt-2.5 h-1.5 w-full cursor-pointer appearance-none rounded-full bg-border accent-accent"
          />
          <div className="mt-1 flex justify-between text-xs text-ink-faint">
            <span>{field.min}{field.unit}</span>
            <span className="font-mono text-ink-soft">{value}{field.unit}</span>
            <span>{field.max}{field.unit}</span>
          </div>
        </div>
      )}

      {field.type === 'rating' && (
        <div className="flex items-center gap-1 rounded-xl border border-border bg-canvas px-3 py-2.5">
          {Array.from({ length: field.max }).map((_, i) => {
            const starValue = i + 1
            const filled = Number(value) >= starValue
            return (
              <button
                key={starValue}
                type="button"
                onClick={() => onChange(starValue)}
                onBlur={onBlur}
                aria-label={`${starValue} out of ${field.max} stars`}
                className="p-0.5"
              >
                <Star
                  size={18}
                  className={filled ? 'fill-accent text-accent' : 'text-border'}
                  strokeWidth={1.5}
                />
              </button>
            )
          })}
          <span className="ml-2 text-xs text-ink-faint">
            {Number(value) > 0 ? `${value} / ${field.max}` : 'Not rated'}
          </span>
        </div>
      )}

      {error && (
        <p className="mt-1.5 flex items-center gap-1 text-xs font-medium text-signal-high">
          <AlertCircle size={12} />
          {error}
        </p>
      )}
    </div>
  )
}

function inputClasses(error) {
  return [
    'w-full rounded-xl border bg-canvas px-3.5 py-2.5 text-sm text-ink outline-none transition-colors',
    'placeholder:text-ink-faint focus:border-accent',
    error ? 'border-signal-high' : 'border-border',
  ].join(' ')
}

function selectClasses(error) {
  return [
    'w-full appearance-none rounded-xl border bg-canvas px-3.5 py-2.5 text-sm text-ink outline-none transition-colors',
    'focus:border-accent',
    error ? 'border-signal-high' : 'border-border',
  ].join(' ')
}
