export default function ModelInfo() {
  return (
    <main className="mx-auto max-w-6xl px-5 py-10 sm:px-8">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-ink">
          About the ML Model
        </h1>

        <p className="mt-2 text-sm text-ink-soft">
          Details about the machine-learning model used for tourism demand
          prediction.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

        <div className="rounded-card border border-border bg-surface p-6">
          <h2 className="text-lg font-semibold text-ink">
            Models Compared
          </h2>

          <div className="mt-4 space-y-3 text-sm text-ink-soft">
            <div className="rounded-xl border border-border bg-canvas px-4 py-3">
              Linear Regression
            </div>

            <div className="rounded-xl border border-border bg-canvas px-4 py-3">
              Random Forest Regressor
            </div>

            <div className="rounded-xl border border-border bg-canvas px-4 py-3">
              Gradient Boosting Regressor
            </div>
          </div>
        </div>

        <div className="rounded-card border border-border bg-surface p-6">
          <h2 className="text-lg font-semibold text-ink">
            Final Model
          </h2>

          <div className="mt-4 rounded-xl border border-border bg-canvas p-5">
            <p className="text-sm text-ink-faint">
              Selected model
            </p>

            <p className="mt-1 text-xl font-semibold text-ink">
              Gradient Boosting Regressor
            </p>

            <p className="mt-3 text-sm text-ink-soft">
              Used to predict annual tourist visits.
            </p>
          </div>
        </div>

        <div className="rounded-card border border-border bg-surface p-6">
          <h2 className="text-lg font-semibold text-ink">
            Model Details
          </h2>

          <div className="mt-4 space-y-4">
            <Info label="Problem Type" value="Regression" />
            <Info label="Input Features" value="127" />
            <Info label="Target" value="Annual Visitors (M)" />
            <Info label="Number of Estimators" value="100" />
            <Info label="Learning Rate" value="0.1" />
            <Info label="Max Depth" value="3" />
          </div>
        </div>

        <div className="rounded-card border border-border bg-surface p-6">
          <h2 className="text-lg font-semibold text-ink">
            Prediction Flow
          </h2>

          <div className="mt-5 space-y-3 text-sm">
            <Step number="1" text="Select a destination" />
            <Step number="2" text="Load destination details" />
            <Step number="3" text="Create the 127 model features" />
            <Step number="4" text="Run the trained model" />
            <Step number="5" text="Display predicted annual visitors" />
          </div>
        </div>

      </div>
    </main>
  )
}

function Info({ label, value }) {
  return (
    <div className="flex items-center justify-between border-b border-border pb-3">
      <span className="text-sm text-ink-soft">
        {label}
      </span>

      <span className="text-sm font-semibold text-ink">
        {value}
      </span>
    </div>
  )
}

function Step({ number, text }) {
  return (
    <div className="flex items-center gap-3">
      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-accent text-xs font-semibold text-white">
        {number}
      </span>

      <span className="text-ink-soft">
        {text}
      </span>
    </div>
  )
}