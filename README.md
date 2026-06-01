# Houston Medical Analytics - Comprehensive Documentation

**Version**: 1.0.0  
**Last Updated**: June 1, 2026  
**Status**: Prototype/Demo  
**Maturity**: Medium Complexity  

---

## Table of Contents

1. [Quick Reference](#quick-reference)
2. [Executive Summary](#executive-summary)
3. [Project Identity](#project-identity)
4. [Architecture Overview](#architecture-overview)
5. [Technology Stack](#technology-stack)
6. [Directory Structure](#directory-structure)
7. [Module Decomposition](#module-decomposition)
8. [Data Flow & State Management](#data-flow--state-management)
9. [Knowledge Graph](#knowledge-graph)
10. [Development Guide](#development-guide)
11. [API Documentation](#api-documentation)
12. [Testing Strategy](#testing-strategy)
13. [Deployment Guide](#deployment-guide)
14. [Known Issues & Technical Debt](#known-issues--technical-debt)
15. [Troubleshooting Guide](#troubleshooting-guide)
16. [Roadmap & Next Steps](#roadmap--next-steps)
17. [Contributing Guidelines](#contributing-guidelines)
18. [Glossary & References](#glossary--references)
19. [Appendix: Quick Reference Cards](#appendix-quick-reference-cards)

---

## Quick Reference

| Aspect | Details |
|--------|---------|
| **Project Name** | Houston Medical Analytics |
| **Primary Purpose** | Hospital comparison and directory for Houston-area medical facilities |
| **Primary Tech Stack** | React 19 + TypeScript + Vite + shadcn/ui |
| **Entry Point** | `app/src/main.tsx` → `app/src/App.tsx` |
| **Data Source** | Static hardcoded data in `app/src/data/hospitals.ts` |
| **State Management** | React useState + useLocalStorage (prop drilling) |
| **Testing Coverage** | 0% (no automated tests) |
| **Production Ready** | No (prototype/demo) |
| **Active Version** | `/app/` directory |
| **Enhanced Version** | `/workspace-d7cd9435-24b3-4a5a-b5be-e8c8e1633c4a (1)/` (Next.js + AI) |

---

## Executive Summary

Houston Medical Analytics is a hospital comparison and directory application designed for Houston-area medical facilities. The system provides rankings, amenities, technology, services, and luxury features data with filtering, search, comparison, and analytics visualization capabilities.

### Key Characteristics

- **Architecture**: Monolithic SPA with component-based architecture
- **Data Model**: Static hospital dataset (6 hospitals in primary, 8 in workspace)
- **UI Framework**: shadcn/ui built on Radix UI primitives
- **Styling**: Tailwind CSS with custom theme
- **Animations**: Framer Motion for smooth transitions
- **Charts**: Recharts for data visualization + custom SVG radar chart
- **State**: React hooks with localStorage persistence

### Project Versions

This repository contains **three distinct implementations**:

1. **Primary App** (`/app/`) - React 19 + Vite SPA (active development)
2. **Workspace** (`/workspace-d7cd9435-24b3-4a5a-b5be-e8c8e1633c4a (1)/`) - Next.js 16 + AI integration (enhanced)
3. **OKComputer** (`/OKComputer_Comprehensive_Feature_Optimization_Strategy_v1/`) - Pre-built static site
4. **Standalone Files** - Earlier iterations at root level

**⚠️ Important**: The canonical source of truth is currently unclear. See [Architecture Overview](#architecture-overview) for details.

### Current State

- **Maturity**: Prototype/Demo phase
- **Testing**: No automated tests (0% coverage)
- **Documentation**: This document is the comprehensive source
- **Deployment**: No production deployment configured
- **Monitoring**: No logging/observability infrastructure
- **Authentication**: Not implemented
- **Data Updates**: Requires code deployment (hardcoded data)

---

## Project Identity

### What This Project Does

Houston Medical Analytics enables users to:
- Browse Houston-area hospitals with detailed metrics
- Filter hospitals by specialty, grade, tags, and amenities
- Compare hospitals side-by-side with radar chart visualization
- View analytics dashboards with score distributions
- Export hospital data as CSV or JSON
- Access data provenance and source information

### Who It Serves

**Primary Users**:
- Patients seeking hospital information for medical decisions
- Medical professionals comparing facility capabilities
- Researchers analyzing hospital metrics
- Healthcare administrators benchmarking facilities

**Secondary Users**:
- Medical students learning about hospital systems
- Insurance professionals evaluating network facilities
- Healthcare journalists researching hospital rankings

### Problem It Solves

**Before**: Hospital information scattered across multiple websites (U.S. News, hospital websites, Healthgrades) with no unified comparison interface.

**After**: Single application with:
- Unified hospital dataset with consistent metrics
- Interactive comparison tools
- Visual analytics
- Export capabilities
- Mobile-responsive design

### How It Works

**Data Flow**:
1. Hospital data loaded from `hospitals.ts` (static JSON-like structure)
2. User applies filters (search, tags, specialties, grades)
3. Application filters and sorts hospital array in memory
4. Results rendered in selected view (Directory, Compare, Analytics, Sources)
5. User interactions update state via callbacks
6. State persisted to localStorage for session continuity

**Technical Flow**:
```
User Input → Component Event → Callback → State Update → 
useMemo Recomputation → Prop Propagation → Re-render
```

---

## Architecture Overview

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     Houston Medical Analytics                │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐ │
│  │   Primary    │    │   Workspace   │    │  Standalone  │ │
│  │     App      │    │   (Next.js)   │    │  Iterations  │ │
│  │  (React+Vite)│    │  + AI + DB   │    │              │ │
│  └──────────────┘    └──────────────┘    └──────────────┘ │
│         │                   │                   │          │
│         └───────────────────┴───────────────────┘          │
│                             │                              │
│                    Shared Hospital Data                     │
│                    (6 vs 8 hospitals)                      │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### Primary App Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         Primary App                           │
│                      (React + Vite)                           │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────────────────────────────────────────────────┐   │
│  │                   Entry Points                        │   │
│  │  index.html → main.tsx → App.tsx                    │   │
│  └──────────────────────────────────────────────────────┘   │
│                              │                               │
│                              ▼                               │
│  ┌──────────────────────────────────────────────────────┐   │
│  │                   App.tsx                              │   │
│  │  - State Management (useState + useLocalStorage)     │   │
│  │  - View Routing (activeView state)                   │   │
│  │  - Filtering Logic (filteredHospitals useMemo)        │   │
│  │  - Export Functions (CSV/JSON)                       │   │
│  └──────────────────────────────────────────────────────┘   │
│                              │                               │
│              ┌───────────────┼───────────────┐               │
│              ▼               ▼               ▼               │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │  Directory   │  │  Comparison  │  │   Analytics  │     │
│  │    View      │  │    View      │  │    View      │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
│         │                  │                  │              │
│         ▼                  ▼                  ▼              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │ HospitalCard │  │  RadarChart  │  │  Recharts    │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐   │
│  │                   Data Layer                          │   │
│  │  hospitals.ts (types, constants, dataset)           │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐   │
│  │                   Custom Hooks                        │   │
│  │  useLocalStorage, useDebounce, useAnimatedNumber     │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐   │
│  │                   UI Components                       │   │
│  │  shadcn/ui (53 Radix UI primitives)                 │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### Component Hierarchy

```
App
├── Ticker
├── QuickScenarios
├── DirectoryView
│   ├── HospitalCard (×N)
│   │   ├── ScoreBar (×5)
│   │   ├── RingScore (×5)
│   │   └── AmenitySection (×5)
│   └── FilterSidebar
├── ComparisonView
│   ├── RadarChart
│   ├── RingScore (×N)
│   └── ComparisonCard (×N)
├── AnalyticsView
│   ├── BarChart (Recharts)
│   ├── RadarChart (Recharts)
│   └── ScatterChart (Recharts)
└── SourcesView
```

### Data Architecture

```
Hospital Interface
├── Identity
│   ├── id: number
│   ├── name: string
│   ├── shortName: string
│   └── grade: string (S, A+, A)
├── Rankings
│   ├── txRank: string
│   ├── nationalStatus: string
│   └── overallScore: number (0-100)
├── Metrics
│   ├── careScore: number (0-100)
│   ├── techScore: number (0-100)
│   ├── amenityScore: number (0-100)
│   └── luxuryScore: number (0-100)
├── Facilities
│   ├── location: string
│   ├── coordinates: {lat, lng}
│   ├── founded: number
│   ├── beds: number
│   └── campuses: number
├── Categorization
│   ├── tags: string[]
│   └── specialties: string[]
├── Details
│   ├── heroTag: string
│   ├── image: string (URL)
│   ├── amenities: AmenityGroups
│   └── highlights: Highlight[]
└── Contact
    ├── source: string
    ├── website: string
    └── phone: string
```

### State Architecture

```
App State (Root Component)
├── View State
│   ├── activeView: ViewKey (directory | compare | analytics | sources)
│   └── expandedId: number | null
├── Filter State
│   ├── searchQuery: string
│   ├── selectedTags: string[]
│   ├── selectedSpecialties: string[]
│   └── selectedGrades: string[]
├── Sort State
│   ├── sortBy: MetricKey
│   └── sortDir: "asc" | "desc"
├── Comparison State
│   └── compareIds: number[]
└── Computed State
    ├── debouncedSearch: string (useDebounce)
    ├── filteredHospitals: Hospital[] (useMemo)
    └── comparedHospitals: Hospital[] (useMemo)
```

---

## Technology Stack

### Core Technologies

| Technology | Version | Purpose | Rationale |
|------------|---------|---------|-----------|
| **React** | 19.2.0 | UI Framework | Latest stable version with concurrent features |
| **TypeScript** | 5.9.3 | Type Safety | Prevents runtime errors, improves developer experience |
| **Vite** | 7.2.4 | Build Tool | Fast HMR, optimized builds, modern dev experience |
| **Node.js** | 20.x | Runtime | LTS version, broad ecosystem support |

### UI Framework

| Technology | Version | Purpose | Rationale |
|------------|---------|---------|-----------|
| **shadcn/ui** | Latest | Component Library | Accessible, customizable, built on Radix UI |
| **Radix UI** | Multiple | Headless Primitives | Unstyled, accessible components |
| **Tailwind CSS** | 3.4.19 | Styling | Utility-first, consistent design system |
| **Framer Motion** | 12.40.0 | Animations | Declarative animations, smooth transitions |
| **Lucide React** | 0.562.0 | Icons | Consistent icon set, tree-shakeable |

### Data Visualization

| Technology | Version | Purpose | Rationale |
|------------|---------|---------|-----------|
| **Recharts** | 2.15.4 | Charts | React-friendly, composable chart library |
| **Custom SVG** | N/A | Radar Chart | Custom styling control, mix-blend-mode effects |

### State & Forms

| Technology | Version | Purpose | Rationale |
|------------|---------|---------|-----------|
| **React Hook Form** | 7.70.0 | Form Management | Minimal re-renders, performant |
| **Zod** | 4.3.5 | Validation | TypeScript-first, runtime validation |
| **useLocalStorage** | Custom | Persistence | Session continuity across reloads |

### Routing

| Technology | Version | Purpose | Rationale |
|------------|---------|---------|-----------|
| **React Router** | 7.6.1 | Client Routing | Standard React routing (primary app) |
| **Next.js App Router** | 16.1.1 | Full-stack Routing | Server components, API routes (workspace) |

### Workspace-Specific

| Technology | Version | Purpose | Rationale |
|------------|---------|---------|-----------|
| **Next.js** | 16.1.1 | Full-stack Framework | API routes, server components |
| **Prisma** | 6.11.1 | ORM | Type-safe database access |
| **Bun** | Latest | Runtime | Fast JavaScript runtime |
| **z-ai-web-dev-sdk** | 0.0.18 | AI Integration | LLM-powered recommendations |
| **SQLite** | Latest | Database | Lightweight, embedded database |

### Development Tools

| Technology | Version | Purpose | Rationale |
|------------|---------|---------|-----------|
| **ESLint** | 9.39.1 | Linting | Code quality, consistency |
| **TypeScript ESLint** | 8.46.4 | Type-aware Linting | Catch type errors |
| **PostCSS** | 8.5.6 | CSS Processing | Tailwind CSS integration |
| **Autoprefixer** | 10.4.23 | CSS Compatibility | Cross-browser support |

---

## Directory Structure

### Root Structure

```
/home/donovan/Projects/random/hostpital/
├── app/                                    # Primary React + Vite application
│   ├── src/
│   │   ├── components/                    # UI components (64 items)
│   │   │   ├── ui/                       # shadcn/ui primitives (53 items)
│   │   │   ├── DirectoryView.tsx         # Directory with filters
│   │   │   ├── ComparisonView.tsx        # Side-by-side comparison
│   │   │   ├── AnalyticsView.tsx         # Data visualization
│   │   │   ├── SourcesView.tsx           # Data provenance
│   │   │   ├── HospitalCard.tsx          # Individual hospital card
│   │   │   ├── Ticker.tsx                # Scrolling marquee
│   │   │   ├── QuickScenarios.tsx        # Preset filters
│   │   │   ├── RadarChart.tsx            # Custom SVG radar chart
│   │   │   ├── RingScore.tsx             # Circular progress ring
│   │   │   ├── ScoreBar.tsx              # Horizontal progress bar
│   │   │   └── AmenitySection.tsx        # Amenity details
│   │   ├── data/
│   │   │   └── hospitals.ts              # Hospital dataset + types
│   │   ├── hooks/
│   │   │   ├── useLocalStorage.ts        # Persistent state hook
│   │   │   ├── useDebounce.ts            # Debounced value hook
│   │   │   ├── useAnimatedNumber.ts      # Animated counter hook
│   │   │   └── use-mobile.ts             # Mobile detection hook
│   │   ├── lib/
│   │   │   └── utils.ts                  # Utility functions (cn)
│   │   ├── pages/
│   │   │   └── Home.tsx                  # Home page component
│   │   ├── App.tsx                       # Root application component
│   │   ├── App.css                       # App-specific styles
│   │   ├── index.css                     # Global styles
│   │   └── main.tsx                      # Entry point
│   ├── index.html                        # HTML entry
│   ├── package.json                      # Dependencies & scripts
│   ├── vite.config.ts                    # Vite configuration
│   ├── tailwind.config.js                # Tailwind configuration
│   ├── tsconfig.json                     # TypeScript configuration
│   ├── tsconfig.app.json                 # App TypeScript config
│   ├── tsconfig.node.json                # Node TypeScript config
│   ├── components.json                   # shadcn/ui configuration
│   ├── eslint.config.js                  # ESLint configuration
│   ├── postcss.config.js                 # PostCSS configuration
│   ├── README.md                         # React template README
│   └── info.md                           # Setup information
│
├── workspace-d7cd9435-24b3-4a5a-b5be-e8c8e1633c4a (1)/  # Next.js enhanced version
│   ├── src/
│   │   ├── app/
│   │   │   ├── api/
│   │   │   │   ├── recommend/            # AI recommendation API
│   │   │   │   │   └── route.ts
│   │   │   │   └── search/               # Web search API
│   │   │   │       └── route.ts
│   │   │   ├── page.tsx                  # Main page (1034 lines)
│   │   │   ├── layout.tsx                # Root layout
│   │   │   └── globals.css               # Global styles
│   │   ├── components/                    # UI components (48 items)
│   │   ├── hooks/                        # Custom hooks (2 items)
│   │   └── lib/
│   │       ├── hospital-data.ts          # Hospital dataset (8 hospitals)
│   │       ├── db.ts                     # Prisma client
│   │       └── utils.ts                  # Utility functions
│   ├── prisma/
│   │   └── schema.prisma                 # Database schema
│   ├── package.json                      # Dependencies & scripts
│   ├── next.config.ts                    # Next.js configuration
│   ├── tailwind.config.ts                # Tailwind configuration
│   ├── tsconfig.json                     # TypeScript configuration
│   ├── components.json                   # shadcn/ui configuration
│   ├── eslint.config.mjs                 # ESLint configuration
│   ├── postcss.config.mjs                # PostCSS configuration
│   ├── Caddyfile                         # Reverse proxy config
│   ├── .env                              # Environment variables
│   └── worklog.md                        # Development log
│
├── OKComputer_Comprehensive_Feature_Optimization_Strategy_v1/  # Static build
│   ├── assets/                           # Bundled assets
│   └── index.html                        # Static HTML entry
│
├── HoustonHospitalsApp.tsx               # Standalone iteration v1
├── houston-hospitals-v3-enhanced.tsx    # Standalone iteration v2
├── houston_medical_analytics.tsx         # Standalone iteration v3
│
└── README.md                             # This comprehensive document
```

### File Descriptions

#### Primary App (`/app/`)

| File/Directory | Lines | Purpose |
|----------------|-------|---------|
| `src/App.tsx` | 474 | Root component, state management, view routing |
| `src/main.tsx` | 14 | Entry point, React bootstrap |
| `src/data/hospitals.ts` | 514 | Hospital dataset, types, constants |
| `src/components/DirectoryView.tsx` | 238 | Directory with sidebar filters |
| `src/components/ComparisonView.tsx` | 261 | Side-by-side comparison |
| `src/components/AnalyticsView.tsx` | 294 | Data visualization dashboard |
| `src/components/HospitalCard.tsx` | 269 | Individual hospital display |
| `src/components/ui/` | 53 files | shadcn/ui component library |
| `src/hooks/` | 4 files | Custom React hooks |
| `package.json` | 82 | Dependencies and scripts |

#### Workspace (`/workspace-d7cd9435-24b3-4a5a-b5be-e8c8e1633c4a (1)/`)

| File/Directory | Lines | Purpose |
|----------------|-------|---------|
| `src/app/page.tsx` | 1034 | Main Next.js page with all logic |
| `src/lib/hospital-data.ts` | 679 | Hospital dataset (8 hospitals) |
| `src/app/api/recommend/route.ts` | 155 | AI recommendation API |
| `src/app/api/search/route.ts` | 21 | Web search API |
| `prisma/schema.prisma` | 32 | Database schema (generic) |
| `worklog.md` | 38 | Development history |

---

## Module Decomposition

### Core Modules

#### 1. App Module (`app/src/App.tsx`)

**Responsibility**: Central application controller managing all state, view routing, filtering logic, and data export.

**Public Interface**:
```typescript
export default function App(): JSX.Element
```

**State Management**:
```typescript
// View State
const [activeView, setActiveView] = useLocalStorage<ViewKey>("hma-view", "directory")
const [expandedId, setExpandedId] = useState<number | null>(null)

// Filter State
const [searchQuery, setSearchQuery] = useState("")
const [sortBy, setSortBy] = useLocalStorage<MetricKey>("hma-sort", "overallScore")
const [sortDir, setSortDir] = useLocalStorage<"asc" | "desc">("hma-sort-dir", "desc")
const [selectedTags, setSelectedTags] = useLocalStorage<string[]>("hma-tags", [])
const [selectedSpecialties, setSelectedSpecialties] = useLocalStorage<string[]>("hma-specialties", [])
const [selectedGrades, setSelectedGrades] = useLocalStorage<string[]>("hma-grades", [])

// Comparison State
const [compareIds, setCompareIds] = useLocalStorage<number[]>("hma-compare", [])
```

**Computed State**:
```typescript
// Debounced search (200ms delay)
const debouncedSearch = useDebounce(searchQuery, 200)

// Filtered and sorted hospitals
const filteredHospitals = useMemo(() => {
  // Search across: name, shortName, tags, specialties, amenities, highlights
  // Filter by: tags, specialties, grades
  // Sort by: metric in direction
}, [debouncedSearch, selectedTags, selectedSpecialties, selectedGrades, sortBy, sortDir])

// Hospitals selected for comparison
const comparedHospitals = useMemo(
  () => hospitals.filter((h) => compareIds.includes(h.id)),
  [compareIds]
)
```

**Dependencies**:
- Internal: `@/data/hospitals`, `@/hooks/*`, `@/components/*`
- External: `framer-motion`, `lucide-react`, `sonner`

**Critical Path**: If this component fails, the entire application is non-functional.

**Example Usage**:
```typescript
// Toggle hospital for comparison
const toggleCompare = useCallback(
  (id: number) => {
    setCompareIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    )
  },
  [setCompareIds]
)

// Apply quick scenario filter
const handleScenario = useCallback(
  (scenarioId: string) => {
    if (scenarioId === "reset") {
      clearFilters()
      toast.success("All filters reset")
      return
    }
    const scenario = QUICK_SCENARIOS.find((s) => s.id === scenarioId)
    if (!scenario) return
    setSelectedTags([...scenario.tags])
    setActiveView("directory")
    toast.success(`Applied: ${scenario.label}`)
  },
  [clearFilters, setSelectedTags, setActiveView]
)
```

---

#### 2. Data Module (`app/src/data/hospitals.ts`)

**Responsibility**: Central data repository for hospital information, type definitions, and application constants.

**Public Interface**:
```typescript
// Type Definitions
export interface Highlight { icon: string; label: string; desc: string }
export interface AmenityGroups { 
  rooms: string[]; technology: string[]; facilities: string[]; 
  services: string[]; luxury: string[] 
}
export interface Hospital { /* 44 properties */ }

// Data Export
export const hospitals: Hospital[] // 6 hospitals

// Constants
export const METRICS = [...] as const
export type MetricKey = (typeof METRICS)[number]["key"]
export const ALL_TAGS: string[]
export const SPECIALTIES: string[]
export const GRADES = ["S", "A+", "A"] as const
export const VIEW_TABS = [...] as const
export type ViewKey = (typeof VIEW_TABS)[number]["id"]
export const QUICK_SCENARIOS = [...] as const
```

**Hospital Data Structure**:
```typescript
{
  id: 1,
  name: "Houston Methodist Hospital",
  shortName: "Methodist",
  grade: "S",
  txRank: "#1 Texas · 14x Honor Roll",
  nationalStatus: "National Honor Roll · Top 20 USA",
  color: "#C8960C",
  glow: "rgba(200, 150, 12, 0.4)",
  location: "6565 Fannin St, Texas Medical Center",
  coordinates: { lat: 29.7076, lng: -95.4018 },
  founded: 1919,
  beds: 926,
  campuses: 9,
  overallScore: 99,
  heroTag: "HONOR ROLL · TOP 20 IN USA",
  image: "https://images.unsplash.com/...",
  amenityScore: 98,
  techScore: 99,
  luxuryScore: 92,
  careScore: 99,
  tags: ["Honor Roll", "AI Smart Rooms", "Robotics", ...],
  specialties: ["Cardiology", "Neurology", "Oncology", ...],
  amenities: { rooms: [...], technology: [...], ... },
  highlights: [{ icon: "🤖", label: "da Vinci 5", desc: "..." }],
  source: "U.S. News 2025-2026 | ...",
  website: "https://www.houstonmethodist.org",
  phone: "(713) 790-3311"
}
```

**Dependencies**: None (pure data module)

**Critical Path**: If this file has errors, no component can render hospital data.

**Data Integrity**: 
- Scores are synthetic composites for demonstration
- Sources are narrative strings, not live URLs
- See SourcesView for data integrity notice

---

#### 3. DirectoryView Component (`app/src/components/DirectoryView.tsx`)

**Responsibility**: Hospital directory with sidebar filters, search, sorting, and hospital card grid.

**Public Interface**:
```typescript
interface DirectoryViewProps {
  hospitals: Hospital[]
  expandedId: number | null
  compareIds: number[]
  searchQuery: string
  sortBy: MetricKey
  sortDir: "asc" | "desc"
  selectedTags: string[]
  selectedSpecialties: string[]
  selectedGrades: string[]
  onSearchChange: (q: string) => void
  onSortChange: (key: MetricKey) => void
  onSortDirToggle: () => void
  onTagToggle: (tag: string) => void
  onSpecialtyToggle: (spec: string) => void
  onGradeToggle: (grade: string) => void
  onClearFilters: () => void
  onToggleExpand: (id: number) => void
  onToggleCompare: (id: number) => void
}

export function DirectoryView(props: DirectoryViewProps): JSX.Element
```

**Layout**:
```
┌─────────────────────────────────────────────────────┐
│  DirectoryView                                      │
├─────────────────────────────────────────────────────┤
│  ┌──────────────┐  ┌──────────────────────────┐   │
│  │   Sidebar    │  │   Hospital Grid           │   │
│  │              │  │                           │   │
│  │  Search      │  │  ┌──────┐ ┌──────┐       │   │
│  │  Sort        │  │  │ Card │ │ Card │       │   │
│  │  Tags        │  │  └──────┘ └──────┘       │   │
│  │  Specialties │  │  ┌──────┐ ┌──────┐       │   │
│  │  Grades      │  │  │ Card │ │ Card │       │   │
│  │  Reset       │  │  └──────┘ └──────┘       │   │
│  └──────────────┘  └──────────────────────────┘   │
└─────────────────────────────────────────────────────┘
```

**Dependencies**:
- Internal: `@/data/hospitals`, `./HospitalCard`
- External: `framer-motion`, `lucide-react`

**Example Usage**:
```typescript
<DirectoryView
  hospitals={filteredHospitals}
  expandedId={expandedId}
  compareIds={compareIds}
  searchQuery={searchQuery}
  sortBy={sortBy}
  sortDir={sortDir}
  selectedTags={selectedTags}
  selectedSpecialties={selectedSpecialties}
  selectedGrades={selectedGrades}
  onSearchChange={setSearchQuery}
  onSortChange={setSortBy}
  onSortDirToggle={() => setSortDir(d => d === "desc" ? "asc" : "desc")}
  onTagToggle={toggleTag}
  onSpecialtyToggle={toggleSpecialty}
  onGradeToggle={toggleGrade}
  onClearFilters={clearFilters}
  onToggleExpand={toggleExpand}
  onToggleCompare={toggleCompare}
/>
```

---

#### 4. ComparisonView Component (`app/src/components/ComparisonView.tsx`)

**Responsibility**: Side-by-side hospital comparison with radar chart visualization and summary statistics.

**Public Interface**:
```typescript
interface ComparisonViewProps {
  hospitals: Hospital[]
  onRemoveCompare: (id: number) => void
}

export function ComparisonView(props: ComparisonViewProps): JSX.Element
```

**Layout**:
```
┌─────────────────────────────────────────────────────┐
│  ComparisonView                                     │
├─────────────────────────────────────────────────────┤
│  ┌──────────────────────────────────────────────┐   │
│  │  Summary Stats (4 cards)                    │   │
│  │  Facilities Compared | Avg Score | ...     │   │
│  └──────────────────────────────────────────────┘   │
│                                                      │
│  ┌──────────────┐  ┌──────────────────────────┐   │
│  │  Radar Chart │  │  Comparison Cards        │   │
│  │              │  │                           │   │
│  │  SVG Polygon │  │  ┌──────┐ ┌──────┐       │   │
│  │  Visualization│  │  │ Card │ │ Card │       │   │
│  │              │  │  └──────┘ └──────┘       │   │
│  └──────────────┘  └──────────────────────────┘   │
└─────────────────────────────────────────────────────┘
```

**Dependencies**:
- Internal: `@/data/hospitals`, `./RadarChart`, `./RingScore`
- External: `framer-motion`, `lucide-react`

**Minimum Requirements**: Requires at least 2 hospitals for comparison.

---

#### 5. AnalyticsView Component (`app/src/components/AnalyticsView.tsx`)

**Responsibility**: Data visualization dashboard with bar charts, radar charts, and scatter plots for hospital metrics.

**Public Interface**:
```typescript
interface AnalyticsViewProps {
  hospitals: Hospital[]
}

export function AnalyticsView(props: AnalyticsViewProps): JSX.Element
```

**Charts Provided**:
1. **Bar Chart**: Hospital scores by metric (Overall, Care, Tech, Amenity, Luxury)
2. **Radar Chart**: Multivariate comparison across metrics
3. **Scatter Chart**: Tech Score vs Care Score with Overall Score as bubble size

**Dependencies**:
- Internal: `@/data/hospitals`, `@/hooks/useAnimatedNumber`
- External: `recharts`, `framer-motion`, `lucide-react`

**Example Data Transformation**:
```typescript
// Bar chart data
const barData = hospitals.map((h) => ({
  name: h.shortName,
  Overall: h.overallScore,
  Care: h.careScore,
  Tech: h.techScore,
  Amenity: h.amenityScore,
  Luxury: h.luxuryScore,
  color: h.color,
}))

// Radar chart data
const radarData = METRICS.map((m) => ({
  metric: m.label.replace(" Score", ""),
  fullMark: 100,
  ...hospitals.reduce((acc, h) => ({
    ...acc,
    [h.shortName]: h[m.key as keyof Hospital]
  }), {})
}))
```

---

#### 6. HospitalCard Component (`app/src/components/HospitalCard.tsx`)

**Responsibility**: Individual hospital display with expandable details, score visualization, and amenity tabs.

**Public Interface**:
```typescript
interface HospitalCardProps {
  hospital: Hospital
  isExpanded: boolean
  isCompared: boolean
  onToggleExpand: () => void
  onToggleCompare: () => void
}

export function HospitalCard(props: HospitalCardProps): JSX.Element
```

**Local State**:
```typescript
const [detailsTab, setDetailsTab] = useState<DetailTab>("rooms")
// DetailTab = "rooms" | "technology" | "facilities" | "services" | "luxury"
```

**Visual Structure**:
```
┌─────────────────────────────────────────────────────┐
│  HospitalCard                                       │
│  ┌──────────────────────────────────────────────┐   │
│  │  Image Header (hospital photo)               │   │
│  │  Grade Badge | Hero Tag                      │   │
│  └──────────────────────────────────────────────┘   │
│  ┌──────────────────────────────────────────────┐   │
│  │  Hospital Name | Short Name                 │   │
│  │  Location | Beds | Campuses | Founded       │   │
│  └──────────────────────────────────────────────┘   │
│  ┌──────────────────────────────────────────────┐   │
│  │  Score Rings (5 metrics)                     │   │
│  │  Overall | Care | Tech | Amenity | Luxury   │   │
│  └──────────────────────────────────────────────┘   │
│  ┌──────────────────────────────────────────────┐   │
│  │  Expand/Collapse Button                      │   │
│  │  Compare Button                              │   │
│  └──────────────────────────────────────────────┘   │
│  [EXPANDED STATE]                               │
│  ┌──────────────────────────────────────────────┐   │
│  │  Amenity Tabs (5 tabs)                       │   │
│  │  [Rooms] [Technology] [Facilities] ...      │   │
│  └──────────────────────────────────────────────┘   │
│  ┌──────────────────────────────────────────────┐   │
│  │  Amenity Items (bulleted list)              │   │
│  │  • Item 1                                   │   │
│  │  • Item 2                                   │   │
│  └──────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────┘
```

**Dependencies**:
- Internal: `@/data/hospitals`, `./ScoreBar`, `./RingScore`, `./AmenitySection`
- External: `framer-motion`, `lucide-react`

---

### Custom Hooks

#### useLocalStorage (`app/src/hooks/useLocalStorage.ts`)

**Purpose**: Persistent state with localStorage synchronization.

**Signature**:
```typescript
function useLocalStorage<T>(
  key: string, 
  initialValue: T
): [T, (value: T | ((prev: T) => T)) => void]
```

**Implementation**:
```typescript
export function useLocalStorage<T>(key: string, initialValue: T) {
  const [stored, setStored] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch {
      return initialValue
    }
  })

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(stored))
    } catch {
      // Silent fallback
    }
  }, [key, stored])

  const setValue = useCallback((value: T | ((prev: T) => T)) => {
    setStored((prev) => (value instanceof Function ? value(prev) : value))
  }, [])

  return [stored, setValue]
}
```

**Error Handling**: Silent fallback to initialValue on parse/write errors.

**Example Usage**:
```typescript
const [activeView, setActiveView] = useLocalStorage<ViewKey>("hma-view", "directory")
const [compareIds, setCompareIds] = useLocalStorage<number[]>("hma-compare", [])
```

---

#### useDebounce (`app/src/hooks/useDebounce.ts`)

**Purpose**: Debounced value to reduce re-renders during rapid input.

**Signature**:
```typescript
function useDebounce<T>(value: T, delay = 200): T
```

**Implementation**:
```typescript
export function useDebounce<T>(value: T, delay = 200): T {
  const [debounced, setDebounced] = useState(value)

  useEffect(() => {
    const id = window.setTimeout(() => setDebounced(value), delay)
    return () => window.clearTimeout(id)
  }, [value, delay])

  return debounced
}
```

**Example Usage**:
```typescript
const [searchQuery, setSearchQuery] = useState("")
const debouncedSearch = useDebounce(searchQuery, 200)

// filteredHospitals useMemo uses debouncedSearch
```

---

#### useAnimatedNumber (`app/src/hooks/useAnimatedNumber.ts`)

**Purpose**: Animated number counter from 0 to target with easing.

**Signature**:
```typescript
function useAnimatedNumber(target: number, delay = 0, duration = 900): number
```

**Implementation**:
```typescript
export function useAnimatedNumber(target: number, delay = 0, duration = 900): number {
  const [value, setValue] = useState(0)

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      const started = performance.now()
      const step = (now: number) => {
        const t = Math.min(1, (now - started) / duration)
        const eased = 1 - Math.pow(1 - t, 3) // Cubic ease-out
        setValue(Math.round(target * eased))
        if (t < 1) requestAnimationFrame(step)
      }
      requestAnimationFrame(step)
    }, delay)

    return () => window.clearTimeout(timeout)
  }, [target, delay, duration])

  return value
}
```

**Easing Function**: Cubic ease-out (1 - (1-t)³)

**Example Usage**:
```typescript
const animatedScore = useAnimatedNumber(hospital.overallScore, 150, 1000)
// Renders as: 0 → 15 → 32 → 54 → 78 → 92 → 99
```

---

### Visualization Components

#### RadarChart (`app/src/components/RadarChart.tsx`)

**Purpose**: Custom SVG radar chart for multivariate hospital metric comparison.

**Signature**:
```typescript
interface RadarChartProps {
  dataSets: Hospital[]
  size?: number
}

export function RadarChart({ dataSets, size = 320 }: RadarChartProps): JSX.Element
```

**Implementation Details**:
- Pure SVG rendering (no external chart library)
- Polar to Cartesian coordinate transformation
- 4 axes: careScore, techScore, luxuryScore, amenityScore
- Mix-blend-mode: screen for overlapping polygons
- Dashed concentric circles at 25%, 50%, 75%, 100%

**Coordinate Transformation**:
```typescript
const getCoordinates = (value: number, angleIndex: number) => {
  const angle = angleIndex * angleStep - Math.PI / 2
  const normalized = value / 100
  return {
    x: center + radius * normalized * Math.cos(angle),
    y: center + radius * normalized * Math.sin(angle),
  }
}
```

**Why Custom SVG?**: 
- Custom styling control (mix-blend-mode, glow effects)
- Smaller bundle than Recharts for this specific use case
- Precise control over label positioning

---

#### RingScore (`app/src/components/RingScore.tsx`)

**Purpose**: Circular progress ring for metric scores with animation.

**Signature**:
```typescript
interface RingScoreProps {
  value: number
  color: string
  size?: number
}

export function RingScore({ value, color, size = 56 }: RingScoreProps): JSX.Element
```

**Implementation**:
```typescript
const r = (size / 2) - 4
const c = 2 * Math.PI * r
const offset = c - (animated / 100) * c
```

**SVG Structure**:
- Background circle (gray)
- Progress circle (colored, with stroke-dasharray/offset)
- Centered text (animated number)

**Animation**: CSS transition on stroke-dashoffset (1000ms ease-out)

---

#### ScoreBar (`app/src/components/ScoreBar.tsx`)

**Purpose**: Horizontal progress bar for metric scores with animation.

**Signature**:
```typescript
interface ScoreBarProps {
  label: string
  value: number
  color: string
  delay?: number
}

export function ScoreBar({ label, value, color, delay = 0 }: ScoreBarProps): JSX.Element
```

**Implementation**:
```typescript
const animated = useAnimatedNumber(value, delay)

<div className="w-full bg-slate-900/80 h-1.5 rounded-full overflow-hidden">
  <div
    className="h-full rounded-full transition-all duration-1000 ease-out"
    style={{
      width: `${animated}%`,
      backgroundColor: color,
      boxShadow: `0 0 8px ${color}88`,
    }}
  />
</div>
```

**Animation**: CSS width transition with glow effect

---

### Utility Components

#### Ticker (`app/src/components/Ticker.tsx`)

**Purpose**: Scrolling marquee displaying hospital names and key metrics.

**Implementation**:
```typescript
const items = hospitals.flatMap((h) => [
  { shortName: h.shortName, heroTag: h.heroTag, color: h.color },
  { shortName: h.shortName, heroTag: `${h.beds.toLocaleString()} beds · Est. ${h.founded}`, color: h.color },
])

<div className="flex gap-12 whitespace-nowrap animate-marquee hover:[animation-play-state:paused]">
  {[...items, ...items, ...items, ...items].map((item, i) => (
    <span key={i}>{item.shortName}: {item.heroTag}</span>
  ))}
</div>
```

**Features**:
- Infinite scroll (items repeated 4x)
- Pauses on hover
- Hospital-specific colors

---

#### QuickScenarios (`app/src/components/QuickScenarios.tsx`)

**Purpose**: Preset filter scenario buttons for common use cases.

**Scenarios**:
- Cancer & Clinical Trials
- Heart & Cardiac Surgery
- Rehabilitation & Neuro
- Trauma & Emergency
- Luxury & VIP Care
- International Patients
- Reset All Filters

**Implementation**:
```typescript
{QUICK_SCENARIOS.map((scenario) => (
  <button onClick={() => onScenario(scenario.id)}>
    <span>{scenario.icon}</span>
    {scenario.label}
  </button>
))}
```

---

#### SourcesView (`app/src/components/SourcesView.tsx`)

**Purpose**: Data provenance display showing hospital sources, contact info, and data integrity notice.

**Features**:
- Hospital contact information (website, phone, location)
- Source attribution (U.S. News, hospital websites, press releases)
- Data integrity notice (synthetic scores, narrative sources)
- Specialties listing

**Data Integrity Notice**:
> The current dataset contains narrative source strings. For production use, connect these rows to live official URLs, a data fetch layer, or a CMS so the UI can verify claims instead of only displaying them.

---

#### AmenitySection (`app/src/components/AmenitySection.tsx`)

**Purpose**: Tabbed display of hospital amenity categories.

**Categories**:
- Rooms
- Technology
- Facilities
- Services
- Luxury

**Implementation**:
```typescript
export function AmenitySection({ title, items, color }: AmenitySectionProps) {
  return (
    <div>
      <h4 style={{ color }}>{title}</h4>
      <ul>
        {items.map((item, idx) => (
          <li key={idx}>
            <div style={{ backgroundColor: color }} />
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}
```

---

## Data Flow & State Management

### State Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     State Flow Diagram                        │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  User Input                                                  │
│     │                                                        │
│     ▼                                                        │
│  Component Event (onClick, onChange)                        │
│     │                                                        │
│     ▼                                                        │
│  Callback Function (onSearchChange, onTagToggle, etc.)       │
│     │                                                        │
│     ▼                                                        │
│  State Setter (setSearchQuery, setSelectedTags, etc.)       │
│     │                                                        │
│     ▼                                                        │
│  React State Update (useState)                              │
│     │                                                        │
│     ├────────────────────────────────────────┐               │
│     ▼                                        ▼               │
│  useLocalStorage Sync                   Component Re-render     │
│     │                                        │               │
│     ▼                                        │               │
│  localStorage Write                         │               │
│                                              │               │
│  ┌───────────────────────────────────────────┴─────────────┐ │
│  │                                                   │       │ │
│  ▼                                                   ▼       │ │
│  useMemo Recomputation                              │       │ │
│  (filteredHospitals, comparedHospitals)             │       │ │
│     │                                                │       │ │
│     ▼                                                │       │ │
│  New Props to Child Components                       │       │ │
│     │                                                │       │ │
│     ▼                                                │       │ │
│  Child Component Re-render                            │       │ │
│                                                      │       │ │
│  ┌────────────────────────────────────────────────────┴─────┐ │
│                                                           │ │
│  ▼                                                           │ │
│  UI Update                                                   │ │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### Filter Pipeline

```
Raw Hospital Data (6 hospitals)
         │
         ▼
   Search Filter
   (debouncedSearch)
   Searches: name, shortName, tags, specialties, 
             amenities, highlights
         │
         ▼
   Tag Filter
   (selectedTags)
   Hospitals matching ANY selected tag
         │
         ▼
   Specialty Filter
   (selectedSpecialties)
   Hospitals matching ANY selected specialty
         │
         ▼
   Grade Filter
   (selectedGrades)
   Hospitals matching selected grade
         │
         ▼
   Sort Operation
   (sortBy, sortDir)
   Sort by metric in direction
         │
         ▼
   Filtered Hospitals
   (passed to active view)
```

### Comparison Flow

```
User clicks "Compare" on HospitalCard
         │
         ▼
onToggleCompare(hospitalId)
         │
         ▼
setCompareIds(prev => 
  prev.includes(id) 
    ? prev.filter(x => x !== id)  // Remove
    : [...prev, id]                // Add
)
         │
         ├────────────────────────────────────┐
         ▼                                    ▼
useLocalStorage Sync                   comparedHospitals useMemo
         │                                    │
         ▼                                    ▼
localStorage Write                    Filter hospitals by compareIds
         │                                    │
         ▼                                    ▼
Persist selection                Compared hospitals array
                                              │
                                              ▼
                              ComparisonView receives hospitals
                                              │
                                              ▼
                              Radar chart + comparison matrix
```

### Export Flow

```
User clicks "Export CSV" or "Export JSON"
         │
         ▼
exportToCSV(hospitals) or exportToJSON(hospitals)
         │
         ▼
Data transformation
- CSV: Array of arrays with headers
- JSON: JSON.stringify(data, null, 2)
         │
         ▼
Blob creation
new Blob([data], { type: "text/csv" or "application/json" })
         │
         ▼
URL.createObjectURL(blob)
         │
         ▼
Programmatic download
<a href={url} download="filename" click()>
         │
         ▼
URL.revokeObjectURL(url)
```

### Quick Scenario Flow

```
User clicks scenario button (e.g., "Cancer & Clinical Trials")
         │
         ▼
handleScenario("cancer")
         │
         ▼
Find scenario in QUICK_SCENARIOS
         │
         ▼
setSelectedTags([...scenario.tags])
         │
         ▼
setActiveView("directory")
         │
         ▼
toast.success("Applied: Cancer & Clinical Trials")
         │
         ▼
filteredHospitals useMemo recomputes
         │
         ▼
DirectoryView re-renders with filtered results
```

---

## Knowledge Graph

### Semantic Relationships

```
┌─────────────────────────────────────────────────────────────┐
│                    Knowledge Graph Overview                   │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  [App.tsx]                                                  │
│     │ owns state                                            │
│     ├─→ [filteredHospitals] depends on → [hospitals.ts]     │
│     ├─→ [compareIds] persists to → [localStorage]           │
│     ├─→ [activeView] controls → [View Components]           │
│     └─→ exports → [CSV/JSON]                                │
│                                                              │
│  [hospitals.ts]                                              │
│     │ exports                                               │
│     ├─→ [Hospital interface] used by → [All Components]    │
│     ├─→ [METRICS constant] used by → [AnalyticsView]      │
│     ├─→ [VIEW_TABS constant] used by → [App.tsx]            │
│     └─→ [QUICK_SCENARIOS] used by → [QuickScenarios]       │
│                                                              │
│  [View Components]                                           │
│     │                                                       │
│     ├─→ [DirectoryView]                                     │
│     │     ├─→ renders → [HospitalCard]                      │
│     │     ├─→ uses → [METRICS] for sort options             │
│     │     └─→ filters → [hospitals array]                   │
│     │                                                       │
│     ├─→ [ComparisonView]                                    │
│     │     ├─→ renders → [RadarChart]                        │
│     │     ├─→ renders → [RingScore]                        │
│     │     └─→ receives → [comparedHospitals]                │
│     │                                                       │
│     ├─→ [AnalyticsView]                                     │
│     │     ├─→ uses → [Recharts]                             │
│     │     ├─→ uses → [useAnimatedNumber]                    │
│     │     └─→ transforms → [hospitals → chart data]         │
│     │                                                       │
│     └─→ [SourcesView]                                      │
│           └─→ displays → [hospital.source]                  │
│                                                              │
│  [Custom Hooks]                                             │
│     │                                                       │
│     ├─→ [useLocalStorage]                                   │
│     │     ├─→ wraps → [useState]                            │
│     │     └─→ syncs → [localStorage API]                    │
│     │                                                       │
│     ├─→ [useDebounce]                                       │
│     │     ├─→ delays → [state updates]                      │
│     │     └─→ uses → [setTimeout]                           │
│     │                                                       │
│     └─→ [useAnimatedNumber]                                 │
│           ├─→ animates → [number values]                     │
│           └─→ uses → [requestAnimationFrame]                │
│                                                              │
│  [UI Components]                                             │
│     │                                                       │
│     ├─→ [HospitalCard]                                      │
│     │     ├─→ renders → [ScoreBar] × 5                     │
│     │     ├─→ renders → [RingScore] × 5                     │
│     │     └─→ renders → [AmenitySection] × 5               │
│     │                                                       │
│     ├─→ [RadarChart]                                       │
│     │     └─→ renders → [Custom SVG]                        │
│     │                                                       │
│     └─→ [shadcn/ui primitives]                             │
│           └─→ built on → [Radix UI]                        │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### Type Dependency Graph

```
Hospital (interface)
├── extends → AmenityGroups (interface)
├── extends → Highlight (interface)
├── used by → HospitalCard (component)
├── used by → DirectoryView (component)
├── used by → ComparisonView (component)
├── used by → AnalyticsView (component)
├── used by → SourcesView (component)
└── used by → App.tsx (component)

MetricKey (type)
├── derived from → METRICS (constant)
├── used by → App.tsx (sortBy state)
└── used by → DirectoryView (sort options)

ViewKey (type)
├── derived from → VIEW_TABS (constant)
├── used by → App.tsx (activeView state)
└── used by → VIEW_ICONS mapping

DetailTab (type)
├── defined in → HospitalCard (component)
└── used by → AmenitySection tabs
```

### Data Ownership Map

```
┌─────────────────────────────────────────────────────────────┐
│                    Data Ownership                             │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  [App.tsx] owns:                                             │
│  ├── View state (activeView, expandedId)                     │
│  ├── Filter state (searchQuery, tags, specialties, grades)   │
│  ├── Sort state (sortBy, sortDir)                            │
│  └── Comparison state (compareIds)                           │
│                                                              │
│  [HospitalCard] owns:                                        │
│  └── Detail tab state (detailsTab)                           │
│                                                              │
│  [hospitals.ts] owns:                                        │
│  ├── Hospital dataset (6 hospitals)                          │
│  ├── Type definitions (Hospital, Highlight, AmenityGroups)   │
│  └── Constants (METRICS, VIEW_TABS, QUICK_SCENARIOS)        │
│                                                              │
│  [localStorage] owns:                                       │
│  ├── hma-view (activeView)                                  │
│  ├── hma-sort (sortBy)                                     │
│  ├── hma-sort-dir (sortDir)                                 │
│  ├── hma-tags (selectedTags)                                │
│  ├── hma-specialties (selectedSpecialties)                  │
│  ├── hma-grades (selectedGrades)                            │
│  └── hma-compare (compareIds)                               │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### Cross-Reference Map

| Concept | Location | Related To |
|---------|----------|------------|
| Hospital data | `app/src/data/hospitals.ts` | All components |
| Filter logic | `app/src/App.tsx:153-202` | DirectoryView |
| Comparison logic | `app/src/App.tsx:92-99` | ComparisonView |
| Export functions | `app/src/App.tsx:34-70` | Footer buttons |
| Radar chart | `app/src/components/RadarChart.tsx` | ComparisonView |
| Score visualization | `app/src/components/ScoreBar.tsx`, `RingScore.tsx` | HospitalCard |
| Amenity display | `app/src/components/AmenitySection.tsx` | HospitalCard |
| State persistence | `app/src/hooks/useLocalStorage.ts` | App.tsx |
| Search debouncing | `app/src/hooks/useDebounce.ts` | App.tsx |
| Number animation | `app/src/hooks/useAnimatedNumber.ts` | ScoreBar, RingScore, AnalyticsView |

---

## Development Guide

### Getting Started

#### Prerequisites

- Node.js 20.x or higher
- npm or yarn package manager
- Git (for version control)

#### Installation (Primary App)

```bash
cd app
npm install
```

#### Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

#### Build for Production

```bash
npm run build
```

#### Preview Production Build

```bash
npm run preview
```

#### Linting

```bash
npm run lint
```

### Workspace Installation (Next.js Version)

```bash
cd workspace-d7cd9435-24b3-4a5a-b5be-e8c8e1633c4a\ \(1\)
bun install
```

#### Development Server (Workspace)

```bash
bun run dev
```

#### Database Setup (Workspace)

```bash
bun run db:generate
bun run db:push
```

### Code Conventions

#### Naming Conventions

- **Components**: PascalCase (e.g., `HospitalCard`, `DirectoryView`)
- **Hooks**: camelCase with `use` prefix (e.g., `useLocalStorage`, `useDebounce`)
- **Utilities**: camelCase (e.g., `cn` for className utility)
- **Constants**: UPPER_SNAKE_CASE (e.g., `METRICS`, `VIEW_TABS`, `QUICK_SCENARIOS`)
- **Types**: PascalCase (e.g., `Hospital`, `MetricKey`, `ViewKey`)
- **Files**: kebab-case for components (e.g., `hospital-card.tsx`)

#### File Organization

```
src/
├── components/        # UI components
│   ├── ui/           # shadcn/ui primitives (do not modify)
│   └── [custom].tsx  # Domain-specific components
├── data/             # Static data and types
├── hooks/            # Custom React hooks
├── lib/              # Utility functions
├── pages/            # Page components (if using routing)
├── App.tsx           # Root component
└── main.tsx          # Entry point
```

#### Component Structure

```typescript
// 1. Imports
import { useState } from "react"
import type { Hospital } from "@/data/hospitals"

// 2. Interface definitions
interface ComponentProps {
  hospital: Hospital
  onAction: (id: number) => void
}

// 3. Component definition
export function Component({ hospital, onAction }: ComponentProps) {
  // 4. Hooks (useState, useEffect, etc.)
  const [state, setState] = useState(initialValue)

  // 5. Event handlers
  const handleClick = () => {
    onAction(hospital.id)
  }

  // 6. Render
  return (
    <div onClick={handleClick}>
      {hospital.name}
    </div>
  )
}
```

#### State Management Patterns

**Use useState for local component state**:
```typescript
const [isExpanded, setIsExpanded] = useState(false)
```

**Use useLocalStorage for persistent state**:
```typescript
const [activeView, setActiveView] = useLocalStorage<ViewKey>("hma-view", "directory")
```

**Use useMemo for expensive computations**:
```typescript
const filteredHospitals = useMemo(() => {
  return hospitals.filter(/* complex logic */)
}, [hospitals, filterState])
```

**Use useCallback for stable function references**:
```typescript
const toggleCompare = useCallback(
  (id: number) => {
    setCompareIds(prev => /* logic */)
  },
  [setCompareIds]
)
```

#### Styling Conventions

**Use Tailwind CSS classes**:
```typescript
<div className="bg-white border rounded-lg p-4">
  Content
</div>
```

**Use cn() utility for conditional classes**:
```typescript
import { cn } from "@/lib/utils"

<div className={cn(
  "base-class",
  isActive && "active-class",
  isDisabled && "disabled-class"
)}>
  Content
</div>
```

**Use hospital-specific colors**:
```typescript
<div style={{ 
  borderColor: hospital.color,
  boxShadow: `0 0 20px ${hospital.glow}`
}}>
  Content
</div>
```

#### Error Handling Patterns

**Silent fallback for localStorage**:
```typescript
try {
  const item = window.localStorage.getItem(key)
  return item ? JSON.parse(item) : initialValue
} catch {
  return initialValue
}
```

**Validation with early returns**:
```typescript
if (!needs || typeof needs !== 'string') {
  return NextResponse.json({ error: 'Invalid input' }, { status: 400 })
}
```

### Adding a New Hospital

1. **Open** `app/src/data/hospitals.ts`
2. **Add** new hospital object to the `hospitals` array:
```typescript
{
  id: 7,
  name: "New Hospital Name",
  shortName: "New",
  grade: "A",
  txRank: "#10 Texas",
  nationalStatus: "Regional Leader",
  color: "#HEX_COLOR",
  glow: "rgba(R, G, B, 0.4)",
  accent: "rgba(R, G, B, 0.05)",
  location: "Address",
  coordinates: { lat: 29.7, lng: -95.4 },
  founded: 2000,
  beds: 500,
  campuses: 2,
  overallScore: 85,
  heroTag: "HERO TAG",
  image: "https://images.unsplash.com/...",
  amenityScore: 80,
  techScore: 85,
  luxuryScore: 75,
  careScore: 88,
  tags: ["Tag1", "Tag2"],
  specialties: ["Specialty1", "Specialty2"],
  amenities: {
    rooms: ["Room feature 1", "Room feature 2"],
    technology: ["Tech feature 1", "Tech feature 2"],
    facilities: ["Facility 1", "Facility 2"],
    services: ["Service 1", "Service 2"],
    luxury: ["Luxury 1", "Luxury 2"]
  },
  highlights: [
    { icon: "🏥", label: "Highlight 1", desc: "Description" }
  ],
  source: "Source 1 | Source 2",
  website: "https://hospital.com",
  phone: "(713) 555-1234"
}
```

3. **Save** the file
4. **Verify** the hospital appears in the directory

### Adding a New View

1. **Create** new component in `app/src/components/`:
```typescript
// NewView.tsx
import type { Hospital } from "@/data/hospitals"

interface NewViewProps {
  hospitals: Hospital[]
}

export function NewView({ hospitals }: NewViewProps) {
  return (
    <div>
      {/* Your view content */}
    </div>
  )
}
```

2. **Add** view to `VIEW_TABS` in `app/src/data/hospitals.ts`:
```typescript
export const VIEW_TABS = [
  { id: "directory", label: "Directory", desc: "Browse all hospitals", icon: "Search" },
  { id: "compare", label: "Matrix", desc: "Side-by-side comparison", icon: "BarChart3" },
  { id: "analytics", label: "Analytics", desc: "Data visualization", icon: "TrendingUp" },
  { id: "sources", label: "Sources", desc: "Data provenance", icon: "Info" },
  { id: "newview", label: "New View", desc: "Description", icon: "IconName" }
] as const
```

3. **Add** icon mapping in `App.tsx`:
```typescript
const VIEW_ICONS: Record<ViewKey, typeof Search> = {
  directory: Search,
  compare: BarChart3,
  analytics: TrendingUp,
  sources: Info,
  newview: IconName,
}
```

4. **Import** and render in `App.tsx`:
```typescript
import { NewView } from "@/components/NewView"

// In render function:
{activeView === "newview" && (
  <motion.div key="newview">
    <NewView hospitals={filteredHospitals} />
  </motion.div>
)}
```

### Adding a New Metric

1. **Add** metric to `Hospital` interface in `app/src/data/hospitals.ts`:
```typescript
export interface Hospital {
  // ... existing properties
  newMetric: number  // 0-100 score
}
```

2. **Add** metric to all hospital objects in the `hospitals` array

3. **Add** metric to `METRICS` constant:
```typescript
export const METRICS = [
  { key: "overallScore", label: "Overall Rating" },
  { key: "careScore", label: "Clinical Quality" },
  { key: "techScore", label: "Tech Execution" },
  { key: "amenityScore", label: "Inpatient Amenity" },
  { key: "luxuryScore", label: "Luxury & VIP" },
  { key: "newMetric", label: "New Metric" }
] as const
```

4. **Update** ScoreBar and RingScore components to display new metric

5. **Update** RadarChart to include new axis (if applicable)

### Debugging Tips

#### Check State in React DevTools

1. Open React DevTools in browser
2. Select `App` component
3. Inspect `state`, `props`, and `hooks`
4. Verify filter state is updating correctly

#### Check localStorage

```javascript
// In browser console
localStorage.getItem('hma-view')
localStorage.getItem('hma-compare')
localStorage.getItem('hma-tags')
```

#### Clear All Filters

```javascript
// In browser console
localStorage.clear()
location.reload()
```

#### Check Filter Logic

Add console.log in `App.tsx`:
```typescript
const filteredHospitals = useMemo(() => {
  console.log('Filtering with:', { debouncedSearch, selectedTags, selectedSpecialties, selectedGrades })
  // ... rest of filter logic
}, [debouncedSearch, selectedTags, selectedSpecialties, selectedGrades, sortBy, sortDir])
```

---

## API Documentation

### Workspace API Routes

The workspace version includes two API routes for AI-powered features.

#### POST /api/recommend

AI-powered hospital recommendation based on patient needs and priorities.

**Request**:
```json
{
  "needs": "I need cancer treatment with proton therapy",
  "priorities": ["Cutting-edge technology", "Clinical trials", "Research"],
  "insuranceType": "Blue Cross Blue Shield"
}
```

**Response**:
```json
{
  "recommendations": [
    {
      "hospitalId": 2,
      "hospitalName": "MD Anderson Cancer Center",
      "matchScore": 95,
      "reasoning": "MD Anderson is the #1 cancer center in the US with world-class proton therapy and the largest clinical trial program."
    },
    {
      "hospitalId": 1,
      "hospitalName": "Houston Methodist Hospital",
      "matchScore": 82,
      "reasoning": "Strong oncology program with advanced technology and research capabilities."
    }
  ]
}
```

**Error Responses**:
- `400 Bad Request`: Missing or invalid input fields
- `502 Bad Gateway`: AI service error or invalid response format
- `500 Internal Server Error`: Unexpected server error

**Implementation Details**:
- Uses `z-ai-web-dev-sdk` for LLM integration
- System prompt includes hospital data (8 hospitals)
- JSON parsing with regex fallback for markdown code blocks
- Validates response structure before returning

**Example Usage**:
```typescript
const response = await fetch('/api/recommend', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    needs: 'I need heart surgery',
    priorities: ['Top-ranked cardiac program', 'Experienced surgeons']
  })
})
const data = await response.json()
console.log(data.recommendations)
```

---

#### GET /api/search

Web search for additional hospital information.

**Request**:
```
GET /api/search?q=Texas+Children's+Hospital+rankings
```

**Response**:
```json
{
  "results": [
    {
      "title": "Texas Children's Hospital Rankings",
      "url": "https://...",
      "snippet": "..."
    }
  ]
}
```

**Error Responses**:
- `400 Bad Request`: Missing query parameter
- `500 Internal Server Error`: Search service error

**Implementation Details**:
- Uses `z-ai-web-dev-sdk` web_search function
- Searches for "Houston hospital {query}"
- Returns 8 results

**Example Usage**:
```typescript
const response = await fetch('/api/search?q=MD+Anderson+clinical+trials')
const data = await response.json()
console.log(data.results)
```

---

### Database Schema (Workspace)

**Current Schema** (Generic - Not Hospital-Specific):
```prisma
model User {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Post {
  id        String   @id @default(cuid())
  title     String
  content   String?
  published Boolean  @default(false)
  authorId  String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

**⚠️ Issue**: Schema does not match hospital data structure. This is a generic template that should be replaced with hospital-specific models if database persistence is needed.

**Recommended Schema**:
```prisma
model Hospital {
  id            Int      @id @default(autoincrement())
  name          String
  shortName     String
  grade         String
  txRank        String
  nationalStatus String
  color         String
  glow          String
  location      String
  founded       Int
  beds          Int
  campuses      Int
  overallScore  Int
  heroTag       String
  amenityScore  Int
  techScore     Int
  luxuryScore   Int
  careScore     Int
  tags          String   // JSON string
  specialties   String   // JSON string
  amenities     String   // JSON string
  highlights    String   // JSON string
  source        String
  website       String
  phone         String
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
}
```

---

## Testing Strategy

### Current State

**Test Coverage**: 0% (no automated tests)

**Test Files Found**: 0

**Testing Framework**: None configured

### Recommended Testing Strategy

#### Unit Testing

**Framework**: Vitest (built into Vite)

**Installation**:
```bash
npm install -D vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom
```

**Configuration** (`vitest.config.ts`):
```typescript
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
  },
})
```

**Example Tests**:

```typescript
// src/components/__tests__/HospitalCard.test.tsx
import { render, screen, fireEvent } from '@testing-library/react'
import { HospitalCard } from '../HospitalCard'
import { hospitals } from '@/data/hospitals'

describe('HospitalCard', () => {
  it('renders hospital name', () => {
    render(<HospitalCard 
      hospital={hospitals[0]} 
      isExpanded={false}
      isCompared={false}
      onToggleExpand={() => {}}
      onToggleCompare={() => {}}
    />)
    expect(screen.getByText('Houston Methodist Hospital')).toBeInTheDocument()
  })

  it('calls onToggleCompare when compare button clicked', () => {
    const onToggleCompare = vi.fn()
    render(<HospitalCard 
      hospital={hospitals[0]} 
      isExpanded={false}
      isCompared={false}
      onToggleExpand={() => {}}
      onToggleCompare={onToggleCompare}
    />)
    fireEvent.click(screen.getByRole('button', { name: /compare/i }))
    expect(onToggleCompare).toHaveBeenCalledTimes(1)
  })
})
```

```typescript
// src/hooks/__tests__/useLocalStorage.test.ts
import { renderHook, act } from '@testing-library/react'
import { useLocalStorage } from '../useLocalStorage'

describe('useLocalStorage', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('returns initial value when localStorage is empty', () => {
    const { result } = renderHook(() => useLocalStorage('test-key', 'default'))
    expect(result.current[0]).toBe('default')
  })

  it('saves to localStorage on update', () => {
    const { result } = renderHook(() => useLocalStorage('test-key', 'default'))
    act(() => {
      result.current[1]('new-value')
    })
    expect(localStorage.getItem('test-key')).toBe(JSON.stringify('new-value'))
  })
})
```

```typescript
// src/__tests__/filterLogic.test.ts
import { hospitals } from '@/data/hospitals'

describe('Filter Logic', () => {
  it('filters by tag', () => {
    const filtered = hospitals.filter(h => h.tags.includes('Honor Roll'))
    expect(filtered.length).toBeGreaterThan(0)
    expect(filtered.every(h => h.tags.includes('Honor Roll'))).toBe(true)
  })

  it('sorts by overall score descending', () => {
    const sorted = [...hospitals].sort((a, b) => b.overallScore - a.overallScore)
    expect(sorted[0].overallScore).toBeGreaterThanOrEqual(sorted[1].overallScore)
  })
})
```

#### Integration Testing

**Framework**: Playwright

**Installation**:
```bash
npm install -D @playwright/test
```

**Example Test**:
```typescript
// e2e/hospital-directory.spec.ts
import { test, expect } from '@playwright/test'

test('search filters hospitals', async ({ page }) => {
  await page.goto('http://localhost:3000')
  
  // Type in search
  await page.fill('input[placeholder*="Search"]', 'cancer')
  
  // Wait for results
  await page.waitForTimeout(200)
  
  // Verify filtered results
  const cards = page.locator('[data-testid="hospital-card"]')
  const count = await cards.count()
  expect(count).toBeGreaterThan(0)
})

test('comparison feature works', async ({ page }) => {
  await page.goto('http://localhost:3000')
  
  // Click compare on first hospital
  await page.click('[data-testid="hospital-card"]:first-child button:has-text("Compare")')
  
  // Verify compare bar appears
  await expect(page.locator('[data-testid="compare-bar"]')).toBeVisible()
  
  // Navigate to compare view
  await page.click('button:has-text("VIEW MATRIX")')
  
  // Verify comparison view
  await expect(page.locator('[data-testid="comparison-view"]')).toBeVisible()
})
```

#### API Testing (Workspace)

**Framework**: Vitest + MSW

**Installation**:
```bash
npm install -D msw
```

**Example Test**:
```typescript
// src/app/api/__tests__/recommend.test.ts
import { describe, it, expect, vi } from 'vitest'
import { POST } from '../route'

describe('/api/recommend', async () => {
  it('returns recommendations for valid input', async () => {
    const request = new Request('http://localhost:3000/api/recommend', {
      method: 'POST',
      body: JSON.stringify({
        needs: 'I need cancer treatment',
        priorities: ['Clinical trials']
      })
    })
    
    const response = await POST(request)
    const data = await response.json()
    
    expect(response.status).toBe(200)
    expect(data.recommendations).toBeDefined()
    expect(data.recommendations.length).toBeGreaterThan(0)
  })

  it('returns 400 for missing needs field', async () => {
    const request = new Request('http://localhost:3000/api/recommend', {
      method: 'POST',
      body: JSON.stringify({
        priorities: ['Clinical trials']
      })
    })
    
    const response = await POST(request)
    expect(response.status).toBe(400)
  })
})
```

### Test Coverage Goals

| Component Type | Target Coverage | Priority |
|----------------|-----------------|----------|
| Custom Hooks | 90% | High |
| Utility Functions | 100% | High |
| View Components | 70% | Medium |
| API Routes | 80% | High |
| Filter Logic | 90% | High |
| Export Functions | 80% | Medium |

### Running Tests

```bash
# Unit tests
npm run test

# Watch mode
npm run test:watch

# Coverage
npm run test:coverage

# E2E tests
npx playwright test

# API tests
npm run test:api
```

---

## Deployment Guide

### Primary App Deployment

#### Build for Production

```bash
cd app
npm run build
```

This creates a `dist/` directory with optimized assets.

#### Deployment Options

**Option 1: Static Hosting (Vercel, Netlify, GitHub Pages)**

```bash
# Deploy dist/ directory to any static host
# For Vercel:
vercel deploy dist

# For Netlify:
netlify deploy --prod --dir=dist
```

**Option 2: Traditional Web Server**

```bash
# Serve with nginx
server {
  root /var/www/houston-medical-analytics/dist;
  index index.html;
  
  location / {
    try_files $uri $uri/ /index.html;
  }
}
```

**Option 3: Docker**

```dockerfile
# Dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

```bash
docker build -t houston-medical-analytics .
docker run -p 80:80 houston-medical-analytics
```

#### Environment Variables

Currently, the primary app uses no environment variables. All configuration is hardcoded.

**Recommended Environment Variables**:
```bash
# .env
VITE_API_URL=https://api.example.com
VITE_GOOGLE_MAPS_API_KEY=your_key_here
```

#### Performance Optimization

**Current Bundle Size**: ~2MB (including all dependencies)

**Optimization Opportunities**:
1. Code splitting for views
2. Lazy loading images
3. Tree-shaking unused shadcn/ui components
4. Compress hospital data (gzip/brotli)
5. Implement service worker for offline caching

---

### Workspace Deployment (Next.js)

#### Build for Production

```bash
cd workspace-d7cd9435-24b3-4a5a-b5be-e8c8e1633c4a\ \(1\)
bun run build
```

#### Deployment Options

**Option 1: Vercel (Recommended for Next.js)**

```bash
vercel deploy
```

**Option 2: Docker**

```dockerfile
# Dockerfile
FROM oven/bun:1 AS builder
WORKDIR /app
COPY package.json bun.lockb ./
RUN bun install
COPY . .
RUN bun run build

FROM oven/bun:1-alpine
WORKDIR /app
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/public ./public
EXPOSE 3000
CMD ["bun", "server.js"]
```

**Option 3: Bun Production Server**

```bash
NODE_ENV=production bun .next/standalone/server.js
```

#### Environment Variables

```bash
# .env
DATABASE_URL=file:./dev.db
ZAI_API_KEY=your_zai_api_key_here
NEXT_PUBLIC_APP_URL=https://your-domain.com
```

#### Database Setup

```bash
# Generate Prisma client
bun run db:generate

# Push schema to database
bun run db:push

# Or run migrations
bun run db:migrate
```

#### Reverse Proxy (Caddy)

```caddyfile
# Caddyfile
:3000 {
    reverse_proxy localhost:3000
}

:443 {
    reverse_proxy localhost:3000
    encode gzip
}
```

---

### Monitoring & Logging

**Current State**: No monitoring or logging infrastructure

**Recommended Additions**:

1. **Error Tracking**: Sentry
```bash
npm install @sentry/react
```

2. **Analytics**: Vercel Analytics or Google Analytics

3. **Performance Monitoring**: Web Vitals

4. **Logging**: Pino or Winston (for API routes)

5. **Uptime Monitoring**: UptimeRobot or Pingdom

---

## Known Issues & Technical Debt

### Critical Issues

#### 1. Hardcoded Hospital Data

**Location**: `app/src/data/hospitals.ts`

**Issue**: Hospital data is hardcoded in source code (514 lines). Data updates require code deployment.

**Impact**: 
- Data cannot be updated without redeploying
- No data validation or verification
- No audit trail for data changes
- Scalability issue as dataset grows

**Recommendation**:
- Implement CMS or API for data management
- Add data validation layer
- Implement data versioning
- Consider database persistence

**Priority**: HIGH

---

#### 2. No Automated Tests

**Location**: Entire codebase

**Issue**: 0% test coverage, no test framework configured.

**Impact**:
- No regression protection
- Refactoring is risky
- Bugs may go undetected
- No confidence in deployments

**Recommendation**:
- Set up Vitest for unit tests
- Set up Playwright for E2E tests
- Target 70%+ coverage
- Add tests to CI/CD pipeline

**Priority**: HIGH

---

#### 3. Generic Prisma Schema

**Location**: `workspace/prisma/schema.prisma`

**Issue**: Schema has generic User/Post models instead of hospital-specific models.

**Impact**:
- Database schema doesn't match application domain
- Cannot persist hospital data
- Wasted database setup

**Recommendation**:
- Replace with hospital-specific schema
- Add Hospital, Amenity, Specialty models
- Implement proper relationships
- Add migrations for existing data

**Priority**: MEDIUM

---

### Medium Priority Issues

#### 4. No Error Boundaries

**Location**: Entire application

**Issue**: No React error boundaries to catch component errors.

**Impact**:
- Unhandled component errors crash entire app
- Poor user experience
- Difficult to debug production errors

**Recommendation**:
- Add error boundary at root level
- Add error boundary for each view
- Implement error logging
- Show user-friendly error messages

**Priority**: MEDIUM

---

#### 5. Inconsistent Error Handling

**Location**: Hooks vs API routes

**Issue**: Hooks use silent fallback; API routes use explicit error responses.

**Impact**:
- Inconsistent user experience
- Difficult to debug issues
- Silent failures may go unnoticed

**Recommendation**:
- Standardize error handling approach
- Implement error logging everywhere
- Show user-facing error messages
- Add error recovery mechanisms

**Priority**: MEDIUM

---

#### 6. No Authentication/Authorization

**Location**: Entire application

**Issue**: No auth middleware, no user sessions, no protected routes.

**Impact**:
- Cannot implement user-specific features
- Cannot save user preferences server-side
- No access control
- Security risk if sensitive data added

**Recommendation**:
- Evaluate if auth is needed
- If yes, implement NextAuth.js or similar
- Add protected routes
- Implement user preferences
- Add role-based access control

**Priority**: MEDIUM (if user features needed)

---

### Low Priority Issues

#### 7. Export Functions in Component

**Location**: `app/src/App.tsx:34-70`

**Issue**: Utility functions (exportToCSV, exportToJSON) embedded in component.

**Impact**:
- Reduced reusability
- Harder to test
- Violates single responsibility principle

**Recommendation**:
- Extract to `src/lib/export.ts`
- Add unit tests
- Make reusable across components

**Priority**: LOW

---

#### 8. No Loading States

**Location**: Entire application

**Issue**: No loading indicators for async operations.

**Impact**:
- Poor UX during data fetching (if added)
- User uncertainty during operations

**Note**: Currently no async operations in primary app, so this is not an immediate issue.

**Recommendation**:
- Add loading skeletons for future async operations
- Implement optimistic UI updates
- Add progress indicators

**Priority**: LOW

---

#### 9. localStorage Quota Handling

**Location**: `app/src/hooks/useLocalStorage.ts`

**Issue**: No handling for localStorage quota exceeded errors.

**Impact**:
- App may crash if localStorage is full
- Data loss possible

**Recommendation**:
- Add try-catch for quota errors
- Implement fallback to sessionStorage
- Show user-friendly error message
- Implement data cleanup strategy

**Priority**: LOW

---

### Inconsistencies

#### 10. Multiple Project Versions

**Location**: Root directory structure

**Issue**: 3 different implementations (app/, workspace/, standalone files).

**Impact**:
- Unclear which is source of truth
- Maintenance burden
- Potential for divergence
- Confusing for new developers

**Recommendation**:
- Decide on canonical version
- Archive or remove unused versions
- Document version history
- Consolidate if appropriate

**Priority**: MEDIUM

---

#### 11. Different Hospital Datasets

**Location**: `app/src/data/hospitals.ts` (6 hospitals) vs `workspace/src/lib/hospital-data.ts` (8 hospitals)

**Issue**: Data divergence between versions.

**Impact**:
- Inconsistent user experience
- Data maintenance burden
- Potential for confusion

**Recommendation**:
- Consolidate to single dataset
- Implement data sharing mechanism
- Document differences
- Decide on canonical dataset

**Priority**: MEDIUM

---

### AI Integration Issues

#### 12. Unreliable AI Responses

**Location**: `workspace/src/app/api/recommend/route.ts:104-117`

**Issue**: JSON parsing with regex fallback suggests LLM responses are unreliable.

**Impact**:
- AI recommendations may fail silently
- Malformed data may reach frontend
- Poor user experience

**Recommendation**:
- Implement stricter prompt engineering
- Add response validation schema
- Implement retry logic
- Add fallback to rule-based recommendations
- Monitor AI service reliability

**Priority**: MEDIUM

---

## Troubleshooting Guide

### Common Issues

#### Issue: Application Won't Start

**Symptoms**:
- `npm run dev` fails
- Blank page in browser
- Console errors

**Solutions**:

1. **Check Node.js version**:
```bash
node --version  # Should be 20.x or higher
```

2. **Clear node_modules and reinstall**:
```bash
rm -rf node_modules package-lock.json
npm install
```

3. **Check port availability**:
```bash
# Port 3000 may be in use
# Kill process or change port in vite.config.ts
```

4. **Check browser console**:
- Open DevTools (F12)
- Check Console tab for errors
- Check Network tab for failed requests

---

#### Issue: Hospital Data Not Loading

**Symptoms**:
- Empty hospital list
- Console errors about hospitals
- Filter not working

**Solutions**:

1. **Check hospitals.ts file**:
```bash
# Verify file exists and is valid TypeScript
cat app/src/data/hospitals.ts
```

2. **Check for TypeScript errors**:
```bash
npm run build
# Fix any type errors
```

3. **Check imports in App.tsx**:
```typescript
// Verify this import is correct
import { hospitals, VIEW_TABS, QUICK_SCENARIOS } from "@/data/hospitals"
```

4. **Check browser console**:
- Look for "hospitals is not defined" errors
- Look for import errors

---

#### Issue: Filters Not Working

**Symptoms**:
- Search returns no results
- Tag filters don't filter
- Sort doesn't work

**Solutions**:

1. **Check filter state**:
```javascript
// In browser console
console.log(localStorage.getItem('hma-tags'))
console.log(localStorage.getItem('hma-specialties'))
console.log(localStorage.getItem('hma-grades'))
```

2. **Clear localStorage**:
```javascript
localStorage.clear()
location.reload()
```

3. **Check useMemo dependencies**:
```typescript
// In App.tsx, verify this dependency array
const filteredHospitals = useMemo(() => {
  // ...
}, [debouncedSearch, selectedTags, selectedSpecialties, selectedGrades, sortBy, sortDir])
```

4. **Add debug logging**:
```typescript
const filteredHospitals = useMemo(() => {
  console.log('Filter state:', { debouncedSearch, selectedTags, selectedSpecialties, selectedGrades })
  // ...
}, [debouncedSearch, selectedTags, selectedSpecialties, selectedGrades, sortBy, sortDir])
```

---

#### Issue: Comparison Feature Not Working

**Symptoms**:
- Compare button doesn't add to comparison
- Compare bar doesn't appear
- Comparison view shows no hospitals

**Solutions**:

1. **Check compareIds state**:
```javascript
console.log(localStorage.getItem('hma-compare'))
```

2. **Check toggleCompare function**:
```typescript
// In App.tsx, verify this function
const toggleCompare = useCallback(
  (id: number) => {
    setCompareIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    )
  },
  [setCompareIds]
)
```

3. **Check HospitalCard callback**:
```typescript
// Verify HospitalCard calls onToggleCompare correctly
<button onClick={onToggleCompare}>Compare</button>
```

4. **Check comparedHospitals useMemo**:
```typescript
const comparedHospitals = useMemo(
  () => hospitals.filter((h) => compareIds.includes(h.id)),
  [compareIds]
)
```

---

#### Issue: Export Not Working

**Symptoms**:
- Clicking export does nothing
- Downloaded file is empty
- File format is incorrect

**Solutions**:

1. **Check browser console for errors**
2. **Check export functions in App.tsx**:
```typescript
// Verify these functions exist and are called
exportToCSV(filteredHospitals)
exportToJSON(filteredHospitals)
```

3. **Check blob creation**:
```typescript
// Verify blob is created correctly
const blob = new Blob([csv], { type: "text/csv" })
```

4. **Check download trigger**:
```typescript
// Verify this works
a.href = url
a.download = "houston-hospitals-2026.csv"
a.click()
```

5. **Check browser popup blocker**
- Allow popups for localhost

---

#### Issue: Styling Broken

**Symptoms**:
- Unstyled components
- Wrong colors
- Layout issues

**Solutions**:

1. **Check Tailwind CSS is loaded**:
```html
<!-- In index.html -->
<link rel="stylesheet" href="/src/index.css">
```

2. **Check Tailwind config**:
```javascript
// In tailwind.config.js
content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}']
```

3. **Check CSS imports**:
```typescript
// In main.tsx
import './index.css'
```

4. **Clear browser cache**
- Hard refresh (Ctrl+Shift+R)
- Clear cache and cookies

---

#### Issue: Animations Not Working

**Symptoms**:
- No animations on page load
- Transitions don't work
- Stuttering animations

**Solutions**:

1. **Check Framer Motion is installed**:
```bash
npm list framer-motion
```

2. **Check AnimatePresence usage**:
```typescript
// Verify this is used correctly
<AnimatePresence mode="wait">
  {activeView === "directory" && (
    <motion.div key="directory" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <DirectoryView />
    </motion.div>
  )}
</AnimatePresence>
```

3. **Check for reduced motion preference**:
- Some browsers disable animations
- Check OS accessibility settings

---

#### Issue: Workspace API Not Working

**Symptoms**:
- API routes return 500 errors
- AI recommendations fail
- Search returns no results

**Solutions**:

1. **Check z-ai-web-dev-sdk is installed**:
```bash
cd workspace
bun list z-ai-web-dev-sdk
```

2. **Check API key is configured**:
```bash
# In .env file
ZAI_API_KEY=your_key_here
```

3. **Check API route logs**:
```bash
# Check server console for errors
bun run dev
```

4. **Test API directly**:
```bash
curl -X POST http://localhost:3000/api/recommend \
  -H "Content-Type: application/json" \
  -d '{"needs":"test","priorities":["test"]}'
```

5. **Check Prisma database**:
```bash
bun run db:push
```

---

### Debugging Tools

#### React DevTools

1. Install React DevTools browser extension
2. Open DevTools (F12)
3. Select "React" tab
4. Inspect component tree and state

#### Redux DevTools (Not Applicable)

This app doesn't use Redux, but the pattern would be similar for any state management tool.

#### Network Tab

1. Open DevTools (F12)
2. Select "Network" tab
3. Filter by "XHR" or "Fetch"
4. Inspect API requests and responses

#### Console Logging

Add strategic console.log statements:
```typescript
console.log('State:', { activeView, searchQuery, selectedTags })
console.log('Filtered hospitals:', filteredHospitals.length)
console.log('Comparison IDs:', compareIds)
```

#### Breakpoints

1. Open DevTools (F12)
2. Go to "Sources" tab
3. Find source file
4. Click line number to set breakpoint
5. Trigger action to hit breakpoint

---

### Performance Issues

#### Issue: Slow Initial Load

**Symptoms**:
- Long load time (>3s)
- Large bundle size
- Slow time to interactive

**Solutions**:

1. **Check bundle size**:
```bash
npm run build
# Check dist/ directory size
```

2. **Analyze bundle**:
```bash
npm install -D rollup-plugin-visualizer
# Update vite.config.ts to include plugin
```

3. **Implement code splitting**:
```typescript
// Lazy load components
const AnalyticsView = lazy(() => import('./components/AnalyticsView'))
```

4. **Optimize images**:
- Use WebP format
- Implement lazy loading
- Use responsive images

---

#### Issue: Slow Filtering

**Symptoms**:
- Lag when typing in search
- Delay when clicking filters

**Solutions**:

1. **Check debounce is working**:
```typescript
const debouncedSearch = useDebounce(searchQuery, 200)
```

2. **Optimize filter logic**:
```typescript
// Use useMemo to avoid recalculating
const filteredHospitals = useMemo(() => {
  // Filter logic
}, [dependencies])
```

3. **Virtualize long lists**:
```bash
npm install react-window
```

---

## Roadmap & Next Steps

### Immediate Priorities (Next 1-2 Weeks)

1. **Consolidate Project Versions**
   - Decide on canonical version (likely primary app)
   - Archive or remove unused versions
   - Document decision and rationale

2. **Implement Testing Infrastructure**
   - Set up Vitest for unit tests
   - Set up Playwright for E2E tests
   - Write tests for critical paths
   - Target 50% coverage initially

3. **Fix Prisma Schema**
   - Replace with hospital-specific models
   - Implement proper relationships
   - Add migrations
   - Update API routes to use database

### Short-Term Goals (Next 1-2 Months)

4. **Add Data Layer**
   - Implement CMS or API for hospital data
   - Add data validation
   - Implement data versioning
   - Add data update workflow

5. **Add Error Boundaries**
   - Implement root error boundary
   - Add error logging (Sentry)
   - Show user-friendly error messages
   - Add error recovery mechanisms

6. **Improve Documentation**
   - Add API documentation
   - Add component documentation
   - Add contribution guidelines
   - Add troubleshooting guide

### Medium-Term Goals (Next 3-6 Months)

7. **Add Authentication**
   - Evaluate auth requirements
   - Implement NextAuth.js or similar
   - Add user preferences
   - Add saved comparisons feature

8. **Performance Optimization**
   - Implement code splitting
   - Optimize bundle size
   - Add service worker
   - Implement caching strategy

9. **Enhanced Analytics**
   - Add more chart types
   - Add trend analysis
   - Add benchmarking features
   - Add export to PDF

### Long-Term Goals (6+ Months)

10. **Mobile App**
    - Evaluate React Native or PWA
    - Implement offline support
    - Add push notifications
    - Optimize for mobile

11. **AI Features**
    - Improve recommendation accuracy
    - Add natural language search
    - Add chat interface
    - Add predictive analytics

12. **Multi-Region Support**
    - Add other cities
    - Add international hospitals
    - Add currency conversion
    - Add language localization

---

## Contributing Guidelines

### Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Focus on what is best for the community
- Show empathy towards other community members

### Contribution Workflow

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Make your changes**
4. **Run tests**: `npm test`
5. **Run linting**: `npm run lint`
6. **Commit your changes**: `git commit -m 'Add amazing feature'`
7. **Push to branch**: `git push origin feature/amazing-feature`
8. **Open a Pull Request**

### Commit Message Convention

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types**:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

**Example**:
```
feat(directory): add advanced filter by bed count

Adds a new filter option to the directory view that allows users to
filter hospitals by bed count ranges. This helps users find hospitals
that match their capacity requirements.

Closes #123
```

### Pull Request Guidelines

- **Title**: Should follow commit message convention
- **Description**: Explain the what and why
- **Screenshots**: Include for UI changes
- **Testing**: Describe how you tested your changes
- **Breaking Changes**: Document any breaking changes
- **Checklist**:
  - [ ] Tests pass
  - [ ] Linting passes
  - [ ] Documentation updated
  - [ ] No console errors
  - [ ] Responsive design verified

### Code Review Process

1. **Self-review**: Review your own PR before submitting
2. **Small PRs**: Keep PRs focused and small
3. **Context**: Provide context in PR description
4. **Respond to feedback**: Address review comments promptly
5. **Squash commits**: Keep commit history clean

### Development Standards

- **TypeScript**: Use strict mode, avoid `any`
- **Components**: Keep components small and focused
- **Hooks**: Extract reusable logic into custom hooks
- **Styling**: Use Tailwind CSS, avoid inline styles
- **Naming**: Follow naming conventions
- **Comments**: Comment complex logic, not obvious code

---

## Glossary & References

### Glossary

| Term | Definition |
|------|------------|
| **shadcn/ui** | Component library built on Radix UI primitives |
| **Radix UI** | Headless UI component library for accessible design |
| **Vite** | Build tool and dev server for modern web apps |
| **Framer Motion** | Animation library for React |
| **Recharts** | Chart library for React |
| **useMemo** | React hook for memoizing expensive computations |
| **useCallback** | React hook for memoizing functions |
| **useState** | React hook for component state |
| **useEffect** | React hook for side effects |
| **localStorage** | Browser API for persistent key-value storage |
| **TypeScript** | Typed superset of JavaScript |
| **JSX** | XML-like syntax for React components |
| **Prop Drilling** | Passing data through multiple component layers |
| **Code Splitting** | Splitting code into smaller bundles for lazy loading |
| **Tree Shaking** | Removing unused code from bundle |
| **Hot Module Replacement (HMR)** | Updating modules without full page reload |
| **SPA** | Single Page Application |
| **SSR** | Server-Side Rendering |
| **CSR** | Client-Side Rendering |
| **Prisma** | Type-safe ORM for Node.js |
| **Next.js** | React framework for full-stack apps |
| **Bun** | Fast JavaScript runtime |

### References

#### Documentation

- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Vite Guide](https://vite.dev/guide/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [shadcn/ui Docs](https://ui.shadcn.com)
- [Radix UI Docs](https://www.radix-ui.com/docs)
- [Framer Motion Docs](https://www.framer.com/motion/)
- [Recharts Docs](https://recharts.org/)
- [Next.js Docs](https://nextjs.org/docs)
- [Prisma Docs](https://www.prisma.io/docs)

#### Tools

- [Vitest](https://vitest.dev/)
- [Playwright](https://playwright.dev/)
- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io/)
- [GitHub Actions](https://github.com/features/actions)

#### Resources

- [Houston Medical Center](https://www.tmc.edu/)
- [U.S. News Hospital Rankings](https://health.usnews.com/best-hospitals)
- [Texas Department of State Health Services](https://www.dshs.texas.gov/)

---

## Appendix: Quick Reference Cards

### Component Quick Reference

| Component | File | Props | Purpose |
|-----------|------|-------|---------|
| App | `App.tsx` | None | Root component, state management |
| DirectoryView | `DirectoryView.tsx` | hospitals, filters, callbacks | Directory with filters |
| ComparisonView | `ComparisonView.tsx` | hospitals, onRemoveCompare | Side-by-side comparison |
| AnalyticsView | `AnalyticsView.tsx` | hospitals | Data visualization |
| SourcesView | `SourcesView.tsx` | hospitals | Data provenance |
| HospitalCard | `HospitalCard.tsx` | hospital, isExpanded, isCompared, callbacks | Individual hospital display |
| Ticker | `Ticker.tsx` | None | Scrolling marquee |
| QuickScenarios | `QuickScenarios.tsx` | onScenario | Preset filters |
| RadarChart | `RadarChart.tsx` | dataSets, size | Custom radar chart |
| RingScore | `RingScore.tsx` | value, color, size | Circular progress ring |
| ScoreBar | `ScoreBar.tsx` | label, value, color, delay | Horizontal progress bar |
| AmenitySection | `AmenitySection.tsx` | title, items, color | Amenity details |

### Hook Quick Reference

| Hook | Signature | Purpose |
|------|-----------|---------|
| useLocalStorage | `useLocalStorage<T>(key, initialValue): [T, setter]` | Persistent state |
| useDebounce | `useDebounce<T>(value, delay): T` | Debounced value |
| useAnimatedNumber | `useAnimatedNumber(target, delay, duration): number` | Animated counter |

### Type Quick Reference

| Type | Properties |
|------|------------|
| Hospital | id, name, shortName, grade, txRank, nationalStatus, color, glow, accent, location, coordinates, founded, beds, campuses, overallScore, heroTag, image, amenityScore, techScore, luxuryScore, careScore, tags, specialties, amenities, highlights, source, website, phone |
| Highlight | icon, label, desc |
| AmenityGroups | rooms, technology, facilities, services, luxury |
| MetricKey | "overallScore" \| "careScore" \| "techScore" \| "amenityScore" \| "luxuryScore" |
| ViewKey | "directory" \| "compare" \| "analytics" \| "sources" |

### Constant Quick Reference

| Constant | Type | Values |
|----------|------|--------|
| METRICS | readonly array | [{key, label}, ...] |
| VIEW_TABS | readonly array | [{id, label, desc, icon}, ...] |
| QUICK_SCENARIOS | readonly array | [{id, label, icon, tags}, ...] |
| ALL_TAGS | string[] | All unique tags from hospitals |
| SPECIALTIES | string[] | All unique specialties from hospitals |
| GRADES | readonly tuple | ["S", "A+", "A"] |

### Command Quick Reference

| Command | Purpose |
|---------|---------|
| `npm install` | Install dependencies |
| `npm run dev` | Start dev server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run linter |
| `npm test` | Run tests |
| `bun install` | Install dependencies (workspace) |
| `bun run dev` | Start dev server (workspace) |
| `bun run build` | Build for production (workspace) |
| `bun run db:push` | Push database schema (workspace) |
| `bun run db:generate` | Generate Prisma client (workspace) |

### File Path Quick Reference

| Purpose | Path |
|---------|------|
| Entry point | `app/src/main.tsx` |
| Root component | `app/src/App.tsx` |
| Hospital data | `app/src/data/hospitals.ts` |
| Components | `app/src/components/` |
| UI components | `app/src/components/ui/` |
| Hooks | `app/src/hooks/` |
| Utilities | `app/src/lib/utils.ts` |
| Package config | `app/package.json` |
| Vite config | `app/vite.config.ts` |
| Tailwind config | `app/tailwind.config.js` |
| TypeScript config | `app/tsconfig.json` |
| Workspace page | `workspace/src/app/page.tsx` |
| Workspace data | `workspace/src/lib/hospital-data.ts` |
| Workspace API | `workspace/src/app/api/` |
| Prisma schema | `workspace/prisma/schema.prisma` |

---

**Document Version**: 1.0.0  
**Last Updated**: June 1, 2026  
**Maintained By**: Development Team  
**Feedback**: Please open an issue for corrections or additions
# houston-hospitals
