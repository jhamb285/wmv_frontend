# Dubai Events Platform 🏙️✨

**Discover the hottest venues and events in Dubai through real-time data and interactive mapping.**

[![Next.js](https://img.shields.io/badge/Next.js-15.5.2-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-2.45-3ECF8E)](https://supabase.com/)

## 🌟 Features

### ✅ V1.0 - Production Ready
- **🎯 Dynamic Contextual Filtering** - Smart filters that show only relevant options based on your selections
- **🗺️ Interactive Map Experience** - Google Maps with custom venue pins and smart clustering
- **📱 Fully Responsive Design** - Optimized for mobile, tablet, and desktop
- **🔄 Real-Time Data Integration** - Live venue and event data from Supabase
- **🎨 Glass Morphism UI** - Modern design with backdrop-blur effects
- **📅 Event Grouping by Date** - Organized event display with scrollable tiles
- **🎵 Advanced Vibe Filtering** - Handles complex categories like "Beach/Pool/Dayclub | Luxury/Fine"
- **📍 Venue-Event Linking** - Intelligent matching via Instagram handles
- **🌊 Smooth Scrolling** - Optimized scrolling across all components

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn
- Supabase account
- Google Maps API key

### Installation

```bash
# Clone the repository
git clone https://github.com/jhamb285/WMV.git
cd dubai-events

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
```

### Environment Setup

Create `.env.local` with:
```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your-google-maps-key
```

### Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 🏗️ Project Structure

```
dubai-events-v6/
├── src/                    # Source code
│   ├── app/               # Next.js 15 App Router
│   │   ├── api/           # API Routes
│   │   │   ├── venues/    # Venue data endpoints
│   │   │   ├── events/    # Event data endpoints
│   │   │   └── filter-options/ # Dynamic filter options
│   │   ├── globals.css    # Global styles + Dubai theme
│   │   └── page.tsx       # Main application page
│   ├── components/        # React components
│   │   ├── filters/       # Filter components
│   │   ├── map/          # Map and venue components
│   │   ├── navigation/   # Navigation systems
│   │   ├── venue/        # Venue detail components
│   │   └── ui/           # Reusable UI components
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Utility functions
│   ├── stores/           # Zustand state management
│   ├── styles/           # Component-specific styles
│   └── types/            # TypeScript definitions
├── tests/                # Test suite
│   ├── e2e/             # End-to-end Playwright tests
│   ├── integration/     # Integration tests
│   ├── unit/            # Unit tests
│   ├── debug/           # Debug utilities
│   └── reports/         # Test reports
├── database/            # Database files
│   ├── migrations/      # Database migrations
│   └── schema/          # Schema definitions
├── docs/                # Documentation
│   ├── screenshots/     # UI screenshots
│   ├── deployment/      # Deployment guides
│   ├── development/     # Development docs
│   ├── api/             # API documentation
│   └── workflows/       # Workflow definitions
├── scripts/             # Utility scripts
└── public/              # Static assets
```

## 🎨 Design System

### Dubai Retro Theme
Our custom color palette inspired by vintage Dubai maps:

- **🟨 Nightclub/Premium**: `#f8c967` - Highway gold
- **🟢 Restaurant/Dining**: `#a5b076` - Park green
- **🟠 Bar/Lounge**: `#e98d58` - Controlled access orange
- **🟦 Beach/Pool**: `#b9d3c2` - Water blue-green
- **🟤 Rooftop**: `#db8555` - Controlled access stroke
- **🟫 Hotel**: `#dfd2ae` - Natural landscape

### Glass Morphism Effects
- Backdrop blur: `blur(20px)`
- Transparency layers with rgba colors
- Subtle border highlights
- Multiple shadow layers for depth

## 🛠️ Technical Architecture

### Frontend Stack
- **Next.js 15.5.2** - App Router with Turbopack
- **React 19.1.0** - Latest React features
- **TypeScript 5.0** - Full type safety across 65+ components
- **Tailwind CSS 4.0** - Utility-first styling with custom Dubai theme
- **Framer Motion 12.23.12** - Smooth animations
- **Lucide React 0.542.0** - Modern icon library
- **Zustand 5.0.8** - Lightweight state management
- **React Query 5.87.1** - Server state management

### Backend Integration
- **Supabase 2.57.2** - PostgreSQL database with RLS policies
- **Google Maps API 2.20.7** - Interactive mapping with custom retro styling
- **Next.js API Routes** - 5 serverless API endpoints
- **Authentication** - Multi-provider (Google OAuth, Email, Phone OTP)

### Architecture Highlights
- **Client-Side Filtering**: 552-line filtering hook for instant performance
- **Hierarchical Filters**: Two-level genre/vibe categorization system
- **Real-Time Data**: Direct Supabase integration with optimized queries
- **Type Safety**: 387-line type definition file covering all data structures
- **Responsive Design**: Mobile-first with 3 breakpoints (mobile/tablet/desktop)

### Key Features Implementation

#### Dynamic Filtering System
```typescript
// Excludes current filter type for contextual options
const getFilteredDataExcluding = (excludeFilterType: string) => {
  // Apply all filters EXCEPT the current one
  // This allows each filter to show relevant options
}
```

#### Responsive Navigation
- **Desktop**: Horizontal pill navigation with glass morphism
- **Mobile**: Bottom navigation with expandable panels
- **Touch Optimized**: 44px minimum touch targets

#### Advanced Scrolling
- **Viewport-based constraints**: `max-h-[50vh]` instead of `max-h-full`
- **Mobile optimized**: `-webkit-overflow-scrolling: touch`
- **Custom scrollbars**: Styled thin scrollbars

## 📱 Responsive Breakpoints

- **Mobile**: `< 768px` - Bottom navigation, full-width sidebar
- **Tablet**: `768px - 1024px` - Horizontal nav, partial sidebar
- **Desktop**: `> 1024px` - Full horizontal nav, fixed sidebar

## 🔧 API Endpoints

### `GET /api/venues`
Fetch venues with applied filters
- **Parameters**: `areas`, `vibes`, `dates`, `genres`, `offers`
- **Response**: Array of venue objects with coordinates

### `GET /api/events`
Fetch events for specific venues
- **Parameters**: `venue_name`, `limit`, filter arrays
- **Response**: Events with venue matching via Instagram handles

### `POST /api/filter-options`
Get contextual filter options
- **Body**: Current filter state
- **Response**: Available options for each filter category

## 🗄️ Database Schema

```sql
-- Main events/venues table
CREATE TABLE final_1 (
  id SERIAL PRIMARY KEY,
  venue_name TEXT,
  venue_instagram_handle TEXT,
  area TEXT,
  event_vibe TEXT[],     -- Pipe-separated vibes
  event_genres TEXT[],   -- Music genres
  event_date DATE,
  event_offers TEXT[],
  latitude DECIMAL,
  longitude DECIMAL,
  venue_type TEXT
);
```

## 🧪 Testing

```bash
# Run unit tests
npm run test

# Run E2E tests with Playwright
npm run test:e2e

# Run specific test file
npm run test filter-functionality
```

## 📦 Build & Deployment

```bash
# Build for production
npm run build

# Start production server
npm start

# Deploy to Vercel (recommended)
vercel deploy
```

### Deployment Checklist
- [ ] Environment variables configured
- [ ] Supabase RLS policies set up
- [ ] Google Maps API restrictions configured
- [ ] Domain added to Supabase allowed origins

## 🐛 Known Issues & Solutions

### ✅ Solved in V1.0
- **Universal Scrolling Failure** - Fixed nested height constraints
- **Vibes Filter Matching** - Implemented substring matching for pipe-separated values
- **Venue-Event Linking** - Added Instagram handle fallback matching
- **Mobile Viewport Scrolling** - Removed `maximumScale` restriction

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Use TypeScript for all new code
- Follow the existing component structure
- Add tests for new features
- Update documentation as needed

## 📖 Documentation

### Core Documentation
- **[CLAUDE.md](./CLAUDE.md)** - ⭐ **NEW!** AI Assistant project context (start here for AI tools like Claude, GPT, etc.)
- **[README](./README.md)** - This file - Project overview and quick start
- **[Frontend Architecture](./docs/FRONTEND_ARCHITECTURE.md)** - **NEW!** Complete frontend documentation (components, hooks, state management, filtering, maps, authentication)
- **[Backend & API](./docs/BACKEND_API.md)** - **NEW!** Complete backend documentation (API routes, database schema, data processing, Supabase integration)
- **[Documentation Index](./docs/INDEX.md)** - Complete documentation navigation guide

### Feature & Implementation Guides
- **[V1 Features Guide](./docs/development/V1_FEATURES.md)** - Comprehensive feature documentation
- **[Technical Implementation](./docs/development/TECHNICAL_IMPLEMENTATION.md)** - Deep dive into architecture
- **[Development Status](./docs/development/DEVELOPMENT_STATUS.md)** - Current development status
- **[V2 Roadmap](./docs/development/V2_ROADMAP.md)** - Future development plans

### Deployment & Database
- **[Deployment Guide](./docs/deployment/DEPLOYMENT.md)** - Production deployment instructions
- **[Deployment Info](./docs/deployment/DEPLOYMENT_INFO.md)** - Deployment configuration details
- **[Database Setup](./docs/deployment/DATABASE_SETUP.md)** - Supabase configuration guide

### API Documentation
- **[Google Maps Issues Log](./docs/api/GOOGLE_MAPS_ISSUES_LOG.md)** - Google Maps integration notes
- **[Google Maps Test Report](./docs/api/GOOGLE_MAPS_TEST_REPORT.md)** - Testing documentation
- **[Venue Pin Click Fix](./docs/api/VENUE_PIN_CLICK_FIX.md)** - Technical implementation notes

## 🎯 Roadmap

### V2.0 - Enhanced Social Features
- [ ] Real-time Instagram Stories integration
- [ ] User authentication and preferences
- [ ] Event favorites and recommendations
- [ ] Social sharing capabilities

### V2.1 - Advanced Features
- [ ] Push notifications for events
- [ ] Offline map caching
- [ ] Advanced search with autocomplete
- [ ] Venue reviews and ratings

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Supabase** for the excellent backend platform
- **Google Maps** for mapping services
- **Next.js team** for the amazing framework
- **Tailwind CSS** for the utility-first approach
- **Dubai** for being an incredible city to explore! 🏙️

## 📧 Contact

**Where's My Vibe Team**
- GitHub: [@jhamb285](https://github.com/jhamb285)
- Project Link: [https://github.com/jhamb285/WMV](https://github.com/jhamb285/WMV)

---

**Made with ❤️ for Dubai's vibrant nightlife scene**