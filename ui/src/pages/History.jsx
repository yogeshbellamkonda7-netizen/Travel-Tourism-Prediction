import { useEffect, useState } from 'react'

export default function History() {
  const [history, setHistory] = useState([])

  useEffect(() => {
  const loadHistory = () => {
    const saved = JSON.parse(
      localStorage.getItem('predictionHistory') || '[]'
    )

    setHistory(saved)
  }

  loadHistory()

  window.addEventListener(
    'predictionHistoryUpdated',
    loadHistory
  )

  return () => {
    window.removeEventListener(
      'predictionHistoryUpdated',
      loadHistory
    )
  }
}, [])

  const clearHistory = () => {
    localStorage.removeItem('predictionHistory')
    setHistory([])
  }

  return (
    <main className="mx-auto max-w-6xl px-5 py-10 sm:px-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-ink">
            Prediction History
          </h1>

          <p className="mt-1 text-sm text-ink-soft">
            View your previous tourism demand predictions.
          </p>
        </div>

        {history.length > 0 && (
          <button
            onClick={clearHistory}
            className="rounded-full border border-border px-4 py-2 text-sm font-medium text-ink hover:bg-canvas"
          >
            Clear History
          </button>
        )}
      </div>

      {history.length === 0 ? (
        <div className="mt-8 rounded-card border border-border bg-surface p-10 text-center">
          <p className="text-ink-soft">
            No predictions yet.
          </p>
        </div>
      ) : (
        <div className="mt-8 overflow-hidden rounded-card border border-border bg-surface">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-border bg-canvas">
                <tr>
                  <th className="px-5 py-4">Date</th>
                  <th className="px-5 py-4">Destination</th>
                  <th className="px-5 py-4">Country</th>
                  <th className="px-5 py-4">Type</th>
                  <th className="px-5 py-4">Predicted Visitors</th>
                  <th className="px-5 py-4">Demand</th>
                </tr>
              </thead>

              <tbody>
                {history.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b border-border last:border-b-0"
                  >
                    <td className="px-5 py-4 text-ink-soft">
                      {item.date}
                    </td>

                    <td className="px-5 py-4 font-medium text-ink">
                      {item.destination}
                    </td>

                    <td className="px-5 py-4">
                      {item.country}
                    </td>

                    <td className="px-5 py-4">
                      {item.type}
                    </td>

                    <td className="px-5 py-4 font-medium">
                      {Number(item.predictedVisits).toFixed(2)} million
                    </td>

                    <td className="px-5 py-4">
                      <span className="rounded-full border border-border px-3 py-1 text-xs font-medium">
                        {item.demandLevel}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </main>
  )
}