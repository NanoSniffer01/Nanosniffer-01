# SAT-SA (Supervisory Analytics Tool for SOC Assessment)

## Project Overview
The Supervisory Analytics Tool for SOC Assessment (SAT-SA) is a comprehensive frontend prototype designed for the NCIIPC supervisory assessment of Critical Sector Entities (CSEs). It leverages SOC alert and case-management data to provide supervisors with analytical insights, helping them identify operational weaknesses, negative-space indicators, and execution gaps.

## Features
- **Dashboard:** High-level summary of all CSEs, risk distribution, findings trends, and actionable metrics.
- **CSE Entities Management:** Detailed assessment view per entity including investigation rates, escalation stats, and benchmarking.
- **Supervisory Findings & Explainability:** Drill-down views to understand why analytical signals were flagged, with clear evidence and confidence scores.
- **Execution Gaps & Negative Space:** Advanced detection of situations where evidence is missing or controls fail operationally despite documented policies.
- **Peer Benchmarking:** Sector-wide comparison of metrics.
- **Data Ingestion (Mocked):** UI flow for handling incoming assessment dataset uploads.
- **Responsive & Dark Mode Support:** Full support for desktop and tablet with adaptive layout and persistent theme preferences.

## Technology Stack
- React 18
- TypeScript (Strict mode)
- Vite
- Tailwind CSS
- React Router DOM
- Recharts (for Data Analytics)
- Lucide React (Icons)
- date-fns
- Axios (configured for future backend integration)

## Folder Structure
```
src/
├── assets/           # Static assets (images, global CSS)
├── components/       # Reusable UI components
│   ├── layout/       # App layout, Sidebar, Header
│   ├── common/       # Cards, Badges, Modals
│   ├── charts/       # Reusable Recharts wrappers
│   └── ...           # Domain specific components (Dashboard, Findings, etc.)
├── config/           # Application configuration (env vars)
├── data/             # Static mock data sets (Entities, Findings, Alerts, Cases)
├── layouts/          # Page wrappers
├── pages/            # Routable application pages
├── services/         # API clients (Axios configuration)
├── types/            # TypeScript interfaces
├── utils/            # Helper functions and formatters
├── App.tsx           # Router configuration
└── main.tsx          # Application entry point
```

## Local Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```

### 3. Production Build
```bash
npm run build
```

## Backend Configuration
The application is pre-configured to point to a future backend in `src/config/env.ts`:
```typescript
export const API_BASE_URL = "http://localhost:5000/api";
```
An Axios client is already set up in `src/services/api/client.ts`. To integrate the real backend, create specific API service methods using this client and replace the mock data imports in the pages.

## Mock Data
All mock data is located in `src/data/`. It simulates realistic assessment datasets without exposing any sensitive information. Included domains are:
- `entities.ts`
- `findings.ts`
- `alerts.ts`
- `cases.ts`
- `dashboard.ts`
- `auditLogs.ts`

## Deployment
The compiled frontend is purely static and runs entirely in the browser. It is fully capable of running in an air-gapped environment.
1. Run `npm run build`.
2. The generated `dist/` directory can be served via Nginx, Apache, or any static file server within the NCIIPC-controlled environment. No external CDNs or APIs are required.
