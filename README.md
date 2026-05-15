# The Calf Nerd

Calf health tools for calf raisers — calculators, protocols, and resources built from real barn experience.

## Calculator App

Three-tab React calculator covering milk replacer mixing, whole milk formulation, and colostrum quality assessment.

### Run locally

```bash
npm install
npm run dev
```

### Build for deployment

```bash
npm run build
```

Output goes to `dist/` — deploy to Vercel, Netlify, or any static host.

### Deploy to Vercel (one-click)

1. Push this repo to GitHub
2. Import the repo at vercel.com
3. Framework preset: **Vite**
4. Deploy — done

## Project structure

```
src/
  CalfNerdCalculator.tsx   Main calculator component (3 tabs)
  App.tsx                  Root component
  main.tsx                 React entry point
landing.html               Marketing landing page
SKILL *.md                 Knowledge base — protocol docs and math engine rules
```

## Calculator tabs

| Tab | What it does |
|---|---|
| Milk Replacer | Batch mixing, powder per calf, cost tracking, 5-step mixing instructions |
| Whole Milk | Extension and balancing modes, optional fat/protein component breakdown |
| Colostrum | Brix → IgG via Crystal Creek chart, body weight-based feeding targets |

## Contact

thecalfnerd@gmail.com
