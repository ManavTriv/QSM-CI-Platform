# QSM-CI Thesis Project

A React-based web platform for comparing and evaluating Quantitative Susceptibility Mapping (QSM) algorithms through interactive visualizations, metrics analysis, and community-driven ELO rankings.

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm

### Local Environment Setup
1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Configure your Parse/Back4App credentials in `.env`:
   ```
   VITE_PARSE_APP_ID=your_parse_app_id
   VITE_PARSE_JS_KEY=your_parse_js_key
   ```

### Installation & Development
```bash
# Install dependencies
npm ci

# Start development server
npm run dev

# Run linter
npm run lint

# Build for production
npm run build
```

## Styling with Tailwind CSS v4

This project uses **Tailwind CSS v4** with a CSS-first approach. Key styling notes:

- **Custom Font**: The project uses Radio Canada font via the `.font-radio` utility class defined in `src/styles/index.css`
- **Theme Variables**: Custom CSS variables are defined in the `@theme` block
- **CSS-First**: Unlike v3, Tailwind v4 prioritizes CSS custom properties and utilities defined in CSS files
- **No Config File**: Tailwind v4 doesn't require a `tailwind.config.js` file for basic usage

### Custom Utilities
- `.font-radio`: Applies the Radio Canada font family

## Architecture

- **Frontend**: React 19 with Vite
- **Routing**: React Router v7
- **Backend**: Parse/Back4App for data storage and cloud functions
- **Styling**: Tailwind CSS v4
- **3D Visualization**: Niivue for medical image viewing
- **Charts**: Recharts for data visualization

## Features

- **Overview**: Tabular view of algorithms with sortable metrics
- **Images**: Interactive 3D medical image viewer with brightness/contrast controls
- **Compare**: ELO-based algorithm comparison system
- **Metrics**: Detailed metric visualizations and descriptions
- **Algorithm Details**: Individual algorithm information and descriptions

