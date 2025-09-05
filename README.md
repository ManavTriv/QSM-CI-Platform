# QSM‑CI Thesis Project (Frontend)

A React-based web platform for comparing and evaluating Quantitative Susceptibility Mapping (QSM) algorithms through interactive visualisations, metrics analysis, and community-driven ELO rankings.

> Repo: `ManavTriv/QSM-CI-Platform` · Live: qsm-ci-project.vercel.app

## Features

1. **Hub for QSM-CI**: Centralised platform for Quantitative Susceptibility Mapping algorithm evaluation and comparison
2. **Metric Evaluations**: Comprehensive analysis of algorithm performance across multiple quantitative metrics
3. **Algorithm Overviews**: Detailed information and descriptions for each QSM algorithm
4. **Algorithm Quantitative Comparisons**: Side-by-side Niivue viewers with linked navigation and adjustable window/level controls
5. **Medical Image View**: Interactive 3D medical image viewer with brightness/contrast controls
6. **Algorithm Qualitative Comparisons**: ELO-based pairwise comparison system for community-driven rankings
7. **ELO Rating**: Dynamic ranking system updated through "which is better?" selections
8. **Responsive UI**: Modern, accessible design built with Tailwind CSS

## 🧱 Tech Stack

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
│  │  ├─ NiivueViewer/          # Medical image viewer components
│  │  └─ ResultTable/           # Data table components
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
- **Test files**: Located in `src/hooks/__tests__/` and `src/utils/__tests__/`
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

## Thesis Context

The original frontend supports a thesis project exploring **continuous evaluation of QSM algorithms**. The UI focuses on reproducibility, transparency, and extensibility.

