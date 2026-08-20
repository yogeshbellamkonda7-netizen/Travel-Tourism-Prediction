# TourSight AI — Tourism Demand Prediction (Frontend)

A single-page dashboard for the "Tourism Demand Prediction using Machine
Learning" internship project. Built with React, Vite, Tailwind CSS,
Recharts, and Lucide icons.

## Getting started

```bash
npm install
npm run dev
```

The app runs at `http://localhost:5173`.

## What's mock vs. real right now

Everything on this dashboard currently runs on **mock data** so the UI
could be built independently of the ML/data pipeline:

- `src/services/mockData.js` — dummy historical trend, actual-vs-predicted,
  and feature-importance values.
- `src/services/api.js` — `predictTourismDemand()` currently fakes a
  prediction locally instead of calling a backend.

## Connecting the real model

1. Ask Bhargavi / Yogesh for the FastAPI base URL and confirm the final
   `/predict` request/response shape.
2. Create a `.env` file in this folder:
   ```
   VITE_API_BASE_URL=http://localhost:8000
   ```
3. In `src/services/api.js`, delete the mock block inside
   `predictTourismDemand()` and uncomment the real `fetch(...)` block
   right below it.
4. If the final feature list differs from the example fields
   (destination, month, season, temperature, rainfall, humidity,
   food rating, historical visits), update the `FORM_FIELDS` array in
   `src/components/PredictionForm.jsx` — the form, validation, and
   payload building all follow that config automatically.
5. Once real chart data is available, swap the imports in
   `src/pages/Dashboard.jsx` from `mockData.js` to your real data
   source (API response, JSON file, etc.) — the chart components
   themselves don't need to change.
6. Remove the "Demand Level" badge and "Key Insights" card logic if
   the team decides not to implement demand classification — see the
   comments in `src/services/api.js` and `src/pages/Dashboard.jsx`.

## Project structure

```
src/
├── components/
│   ├── Navbar.jsx
│   ├── Hero.jsx
│   ├── PredictionForm.jsx
│   ├── PredictionResult.jsx
│   ├── InsightCard.jsx
│   ├── ChartCard.jsx
│   ├── chartTheme.js
│   ├── TourismTrendChart.jsx
│   ├── ActualVsPredictedChart.jsx
│   ├── FeatureImportanceChart.jsx
│   └── Footer.jsx
├── pages/
│   └── Dashboard.jsx
├── services/
│   ├── api.js          # single place that talks to the backend
│   └── mockData.js      # temporary placeholder data — replace later
├── App.jsx
├── main.jsx
└── index.css
```

## Design notes

- Palette: off-white canvas, deep navy text, single teal accent
  (`#0C6E6B`). A muted amber is used *only* as a functional signal
  for the "High" demand badge — not decoratively.
- Type: Space Grotesk (headings), Inter (body), JetBrains Mono
  (numbers/data).
- The dashboard is a single page (`Dashboard.jsx`) with anchor-linked
  sections (Prediction / Analytics / About) rather than separate
  routes, per the "keep it minimal" brief.
