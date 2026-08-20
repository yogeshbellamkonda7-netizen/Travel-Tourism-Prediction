/**
 * api.js
 * ---------------------------------------------------------------
 * Single entry point for talking to the prediction backend.
 *
 * Right now `predictTourismDemand()` resolves with mock data so the
 * UI team can build and demo independently of the ML team.
 *
 * TO CONNECT THE REAL MODEL (Yogesh / Bhargavi):
 *   1. Set VITE_API_BASE_URL in a .env file, e.g.
 *        VITE_API_BASE_URL=http://localhost:8000
 *   2. Delete the mock block below and uncomment the fetch block.
 *   3. Make sure the FastAPI response matches (or update) the
 *      shape documented in `PredictionResponse` below.
 *
 * Do not scatter fetch() calls in components — everything that
 * talks to the backend belongs in this file.
 * ---------------------------------------------------------------
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || ''

/**
 * @typedef {Object} PredictionRequest
 * @property {string} destination
 * @property {number} month            // 1-12
 * @property {string} season
 * @property {number} temperature      // °C
 * @property {number} rainfall         // mm
 * @property {number} humidity         // %
 * @property {number} foodRating       // 1-5
 * @property {number} historicalVisits // last known count for that period
 */

/**
 * @typedef {Object} PredictionResponse
 * @property {number} predictedVisits
 * @property {string} [demandLevel]   // "Low" | "Medium" | "High" — only if the team implements classification
 * @property {string} [insight]       // short natural-language summary
 * @property {string} [model]         // e.g. "XGBoost"
 */

/**
 * Sends the user's input to the model and returns a prediction.
 * @param {PredictionRequest} payload
 * @returns {Promise<PredictionResponse>}
 */
export async function predictTourismDemand(payload) {
  // ---- MOCK IMPLEMENTATION (remove once /predict is live) ----
  await wait(1100)

  if (Math.random() < 0.03) {
    // Occasionally simulate a backend failure so the error state
    // in the UI is actually exercised during development.
    throw new Error('The prediction service is unavailable right now.')
  }

  const seasonalMultiplier = { Winter: 1.15, Summer: 0.95, Monsoon: 0.8, Autumn: 1.05 }
  const base = payload.historicalVisits || 40000
  const foodEffect = 1 + (payload.foodRating - 3) * 0.03
  const rainPenalty = 1 - Math.min(payload.rainfall, 200) / 2000
  const tempFactor = 1 + (30 - Math.abs(payload.temperature - 27)) * 0.002

  const predictedVisits = Math.round(
    base * (seasonalMultiplier[payload.season] || 1) * foodEffect * rainPenalty * tempFactor
  )

  const demandLevel =
    predictedVisits >= 70000 ? 'High' : predictedVisits >= 45000 ? 'Medium' : 'Low'

  const insight =
    demandLevel === 'High'
      ? `Tourism demand for ${payload.destination} is expected to be relatively high during this period.`
      : demandLevel === 'Medium'
        ? `Tourism demand for ${payload.destination} looks moderate and roughly in line with seasonal norms.`
        : `Tourism demand for ${payload.destination} is expected to be lower than peak-season levels.`

  return {
    predictedVisits,
    demandLevel,
    insight,
    model: 'Mock Estimator (dev only)',
  }

  // ---- REAL IMPLEMENTATION (uncomment when the backend is ready) ----
  // const response = await fetch(`${API_BASE_URL}/predict`, {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(payload),
  // })
  //
  // if (!response.ok) {
  //   throw new Error('The prediction service returned an error. Please try again.')
  // }
  //
  // return response.json()
}

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
