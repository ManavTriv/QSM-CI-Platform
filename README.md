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

## Tech Stack

- **Frontend**: React 19 (Vite)
- **Routing**: React Router v7
- **Styling**: Tailwind CSS v4 
- **Imaging**: Niivue for medical-image (NIfTI/QSM) viewing
- **Charts**: Recharts for metric visualisation
- **Testing**: Vitest + Testing Library React + JSDOM
- **Backend (BaaS)**: Parse/Back4App (JS SDK)
- **Hosting**: Vercel
- **CI**: GitHub Actions

## Repo Layout (high-level)

```
root/
├─ src/
│  ├─ components/            # UI building blocks (Niivue viewer, tables, etc.)
│  │  ├─ AlgorithmComparison/    # Side-by-side comparison components
│  │  ├─ ImageSelect/            # Image selection components
│  │  ├─ NiivueViewer/          # Medical image viewer components
│  │  ├─ ResultTable/           # Data table components
│  │  └─ TagFilter/             # Tag filtering components
│  ├─ pages/                 # Route pages (Home, Overview, Images, Compare, etc.)
│  ├─ hooks/                 # Custom React hooks with tests
│  ├─ data/                  # Static data (algorithm info, metric descriptions)
│  ├─ api/                   # Parse client configuration
│  ├─ routes/                # App routing configuration
│  ├─ styles/                # Global styles
│  ├─ test/                  # Test setup and utilities
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
# Development
npm run dev              # Start dev server 
npm run build            # Build for production
npm run preview          # Preview production build

# Code Quality
npm run lint             # Run ESLint
```

### Environment Configuration
Create a `.env` file in the root directory with the following variables:
```env
VITE_PARSE_APP_ID=your_parse_app_id
VITE_PARSE_JS_KEY=your_parse_js_key
```

### Custom Utilities
- **`.font-radio`**: Applies the Radio Canada font family
- **Tailwind CSS**: Custom utility classes for consistent styling

## Testing

### Local Testing
Run tests locally using the following command:

```bash
npm run test
```

### Test Structure
- **Test files**: Located in `src/api/__tests__/`, `src/hooks/__tests__/`, and `src/utils/__tests__/`
- **Test setup**: Configured in `src/test/setup.js`
- **Test runner**: Vitest with JSDOM environment
- **Testing utilities**: React Testing Library for component testing

### GitHub Actions Testing
Tests are configured to run on GitHub Actions with **manual trigger only**:

1. **Navigate to the Actions tab** in the GitHub repository
2. **Select "Run Tests"** workflow
3. **Click "Run workflow"** button
4. **Choose the branch** 
5. **Click "Run workflow"** to trigger the test run

## Development Guide

### Adding New Tag Groups

The platform supports extensible tag groups for categorizing algorithms (e.g., `type::Deep Learning`). To add a new tag group:

#### 1. Configure the New Tag Group

Edit `src/config/tagGroups.js`:

```javascript
export const TAG_GROUPS = [
  {
    id: 'type',
    displayName: 'Type',
    description: 'Algorithm type or category (e.g., Deep Learning, Traditional)',
  },
  // Add your new tag group here
  {
    id: 'complexity',
    displayName: 'Complexity', 
    description: 'Algorithm computational complexity level',
  },
];
```

#### 2. Tag Format

Use the format `groupId::value` in your data:
- `type::Deep Learning`
- `complexity::High`
- `domain::Medical Imaging`

#### 3. Automatic Features

Once configured, the new tag group automatically gets:
- ✅ **Filter dropdown section** with group header
- ✅ **Algorithm page display** showing "GroupName: Value"
- ✅ **NA handling** for algorithms missing the tag group
- ✅ **Consistent styling** across all UI components

#### 4. Example Usage

```javascript
// In your algorithm data
{
  name: "My Algorithm",
  tags: [
    "type::Deep Learning",
    "complexity::High", 
    "domain::Medical",
    "regular-tag"  // ungrouped tags still work
  ]
}
```

The system will automatically:
- Group `type` and `complexity` tags in separate sections
- Show `domain::NA` for algorithms missing domain tags
- Display ungrouped tags in "Other Tags" section

### Adding New Metrics

The platform supports extensible metrics for algorithm evaluation. To add a new metric:

#### 1. Configure the New Metric

Edit `src/config/metrics.js`:

```javascript
export const METRICS = [
  // ... existing metrics
  {
    key: 'NEW_METRIC',
    label: 'New Metric',
    description: 'Detailed description of what this metric measures and how to interpret it.',
    sortable: true,
    lowerIsBetter: true, // or false if higher values are better
    precision: 3, // number of decimal places to display
    unit: 'optional unit' // e.g., 'ms', '%', 'pixels' (optional)
  },
];
```

#### 2. Update Database Schema

Ensure your database/data source includes the new metric:
- Add the metric field to your algorithm data objects
- Use the exact same `key` as defined in the config
- Ensure values are numeric for proper sorting and visualization

#### 3. Automatic Features

Once configured, the new metric automatically gets:
- ✅ **Table column** with proper formatting and sorting
- ✅ **Scatter plot option** for X/Y axis selection
- ✅ **Metric overview page** with description
- ✅ **Consistent formatting** with specified precision
- ✅ **Proper sorting** based on `lowerIsBetter` setting

#### 4. Example Data Structure

```javascript
// In your algorithm data
{
  name: "My Algorithm",
  tags: ["type::Deep Learning"],
  RMSE: 0.045,
  HFEN: 0.123,
  NEW_METRIC: 0.789, // Your new metric value
  // ... other metrics
}
```

#### 5. Configuration Options

- **`key`**: Unique identifier matching your data property
- **`label`**: Display name in UI (can include spaces/symbols)
- **`description`**: Detailed explanation for metric overview pages
- **`sortable`**: Whether users can sort by this metric in tables
- **`lowerIsBetter`**: Affects sorting direction and interpretation
- **`precision`**: Decimal places for display (default: 3)
- **`unit`**: Optional unit suffix (e.g., "ms", "%")

## Thesis Context

The original frontend supports a thesis project exploring **continuous evaluation of QSM algorithms**. The UI focuses on reproducibility, transparency, and extensibility.

