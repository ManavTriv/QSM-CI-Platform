# QSM‑CI Platform

A React-based web platform for comparing and evaluating Quantitative Susceptibility Mapping (QSM) algorithms through interactive visualisations, metrics analysis, and community-driven ELO rankings.

> Repo: `ManavTriv/QSM-CI-Platform` · Live: qsm-ci-project.vercel.app

## Table of Contents

- [Features](#features)
- [Tech Stack](#-tech-stack)
- [Repo Layout](#repo-layout-high-level)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Quick Start](#quick-start)
  - [Available Scripts](#available-scripts)
  - [Environment Configuration](#environment-configuration)
  - [Custom Utilities](#custom-utilities)
- [Testing](#testing)
  - [Local Testing](#local-testing)
  - [Test Structure](#test-structure)
- [Development Guide](#development-guide)
  - [Adding New Tag Groups](#adding-new-tag-groups)
  - [Adding New Metrics](#adding-new-metrics)
  - [GitHub Actions Testing](#github-actions-testing)
- [Thesis Context](#thesis-context)

## Features

1. **Hub for QSM-CI**: Centralised platform for Quantitative Susceptibility Mapping algorithm evaluation and comparison
2. **Metric Evaluations**: Comprehensive analysis of algorithm performance across multiple quantitative metrics
3. **Algorithm Overviews**: Detailed information and descriptions for each QSM algorithm
4. **Algorithm Quantitative Comparisons**: Side-by-side Niivue viewers with linked navigation and adjustable window/level controls
5. **Medical Image View**: Interactive 3D medical image viewer with brightness/contrast controls
6. **Algorithm Qualitative Comparisons**: ELO-based pairwise comparison system for community-driven rankings
7. **ELO Rating**: Dynamic ranking system updated through "which is better?" selections
8. **Responsive UI**: Modern, accessible design built with Tailwind CSS
9. **Interative Graphs**: Interative graphs to compare algorithm metrics

## Tech Stack

- **Frontend**: React 19 (Vite)
- **Routing**: React Router v7
- **Styling**: Tailwind CSS v4
- **Imaging**: Niivue for medical-image  viewing
- **Charts**: Recharts for metric visualisation
- **Testing**: Vitest + Testing Library React + JSDOM
- **Backend (BaaS)**: Parse/Back4App (JS SDK)
- **Hosting**: Vercel
- **CI**: GitHub Actions

## Repo Layout (high-level)

```
root/
├─ src/
│  ├─ components/            # UI building blocks
│  │  ├─ AlgorithmComparison/    # Side-by-side comparison
│  │  ├─ ImageSelect/            # Image selection
│  │  ├─ NiivueViewer/          # Medical image viewer
│  │  ├─ ResultTable/           # Data tables
│  │  ├─ ScatterPlot/           # Interactive charts
│  │  └─ TagFilter/             # Tag filtering
│  ├─ pages/                 # Route pages (Home, Overview, Graphs, etc.)
│  ├─ hooks/                 # Custom React hooks
│  ├─ config/                # Configuration (tags, metrics)
│  ├─ api/                   # Parse client setup
│  ├─ routes/                # App routing
│  ├─ styles/                # Global styles
│  ├─ test/                  # Test utilities
│  ├─ utils/                 # Helper functions
│  ├─ App.jsx                # Main app component
│  └─ main.jsx               # Vite entry point
├─ public/                   # Static assets
├─ .github/workflows/        # CI/CD (GitHub Actions)
├─ eslint.config.js
├─ vite.config.js
├─ vitest.config.js
├─ vercel.json
├─ package.json
└─ README.md
```

## Getting Started

### Prerequisites
- **Node.js** (v18 or higher)
- **npm** (comes with Node.js)
- **Git** (for cloning the repository)

### Quick Start
1. **Clone the repository**:
   ```bash
   git clone https://github.com/ManavTriv/QSM-CI-Platform.git
   cd QSM-CI-Platform
   ```

2. **Install dependencies**:
   ```bash
   npm ci
   ```

3. **Set up environment variables**:
   ```bash
   # Copy the example environment file
   cp .env.example .env
   
   # Edit .env with the Parse/Back4App credentials
   # VITE_PARSE_APP_ID=your_parse_app_id
   # VITE_PARSE_JS_KEY=your_parse_js_key
   ```

4. **Start the development server**:
   ```bash
   npm run dev
   ```

5. **Open your browser** to `http://localhost:5173`

### Available Scripts
```bash
npm run dev              # Start dev server 
npm run build            # Build for production
npm run preview          # Preview production build
npm run lint             # Run ESLint
```

### Environment Configuration
Create a `.env` file in the root directory with the following variables:
```env
VITE_PARSE_APP_ID=your_parse_app_id
VITE_PARSE_JS_KEY=your_parse_js_key
```

## Testing

### Local Testing
Run tests locally using the following command:

```bash
npm run test
```

### Test Structure
- **Test files**: Located in `src/api/__tests__/`, `src/hooks/__tests__/`, `src/config/__tests__/`, and `src/utils/__tests__/`
- **Test coverage**: Core hooks, API config, tag/metric configurations, and utilities
- **Test setup**: Configured in `src/test/setup.js`
- **Test runner**: Vitest with JSDOM environment
- **Testing utilities**: React Testing Library for hook testing

### GitHub Actions Testing
Tests are configured to run on GitHub Actions with **manual trigger only**:

1. **Navigate to the Actions tab** in the GitHub repository
2. **Select "Run Tests"** workflow
3. **Click "Run workflow"** button
4. **Choose the branch** 
5. **Click "Run workflow"** to trigger the test run

## Development Guide

### Adding New Tag Groups

Tag groups categorise algorithms using the format `groupId::value` (e.g., `type::Deep Learning`).

#### 1. Configure Tag Group
Edit `src/config/tagGroups.js`:
```javascript
export const TAG_GROUPS = [
  {
    id: 'type',
    displayName: 'Type',
    description: 'Algorithm type or category',
  },
  // Add new tag group
  {
    id: 'complexity',
    displayName: 'Complexity', 
    description: 'Computational complexity level',
  },
];
```

#### 2. Use in Data
```javascript
{
  name: "My Algorithm",
  tags: [
    "type::Deep Learning",
    "complexity::High",
    "regular-tag"  // ungrouped tags are fine as well
  ]
}
```

#### 3. Automatic Updates to
- Filter dropdown sections
- Algorithm page display ("Type: Deep Learning")
- NA handling for missing tags
- Consistent UI styling

### Adding New Metrics

Add new metrics for algorithm evaluation and visualization.

#### 1. Configure Metric
Edit `src/config/metrics.js`:
```javascript
export const METRICS = [
  // ... existing metrics
  {
    key: 'NEW_METRIC',
    label: 'New Metric',
    description: 'What this metric measures',
    sortable: true,
    lowerIsBetter: true, // or false
    precision: 3, // decimal places
    unit: 'ms' // optional
  },
];
```

#### 2. Update Data
Add the metric to your algorithm data:
```javascript
{
  name: "My Algorithm",
  tags: ["type::Deep Learning"],
  RMSE: 0.045,
  NEW_METRIC: 0.789, // Your new metric
  // ... other metrics
}
```

#### 3. Automatic Updates to
- Table column with formatting/sorting
- Scatter plot X/Y axis option
- Metric overview page
- Consistent precision display

## Thesis Context

The original frontend supports a thesis project exploring **continuous evaluation of QSM algorithms**. The UI focuses on reproducibility, transparency, and extensibility.

