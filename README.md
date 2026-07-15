# Dev Event Hub 🎯

A modern, full-stack event management platform built with Next.js 16, designed for developers to discover, create, and manage tech events, conferences, hackathons, and meetups.

## ✨ Features

- **Event Discovery**: Browse comprehensive listings of developer events with real-time updates
- **Event Creation**: Create and publish events with image uploads via Cloudinary
- **Event Booking**: Reserve spots for events with duplicate booking prevention
- **Server-Side Rendering**: Optimized performance with Next.js App Router and caching
- **Responsive Design**: Beautiful UI that works seamlessly across all devices
- **MongoDB Integration**: Robust data persistence with Mongoose ODM
- **Type Safety**: Full TypeScript support for better developer experience
- **Analytics**: Integrated PostHog analytics for event tracking

## 🚀 Tech Stack

- **Framework**: [Next.js 16.2.10](https://nextjs.org/) with App Router and Turbopack
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Database**: [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) with Mongoose
- **Styling**: CSS Modules with custom animations
- **Image Upload**: [Cloudinary](https://cloudinary.com/)
- **Analytics**: [PostHog](https://posthog.com/)
- **Deployment**: [Vercel](https://vercel.com/)

## 📦 Installation

### Prerequisites

- Node.js 18+ and npm
- MongoDB Atlas account
- Cloudinary account (for image uploads)

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/Suhas7842/Next.js-dev-event.git
   cd Next.js-dev-event
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   # MongoDB Connection
   MONGODB_URI=your_mongodb_connection_string
   
   # Cloudinary (for image uploads)
   CLOUDINARY_URL=cloudinary://api_key:api_secret@cloud_name
   
   # PostHog Analytics (optional)
   NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN=your_posthog_token
   NEXT_PUBLIC_POSTHOG_HOST=https://us.i.posthog.com
   
   # Base URL (set to your domain in production)
   NEXT_PUBLIC_BASE_URL=http://localhost:3000
   ```

4. **Seed the database** (optional)
   ```bash
   npm run seed
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🗂️ Project Structure

```
dev-event/
├── app/                          # Next.js App Router
│   ├── api/                      # API Routes
│   │   ├── bookings/             # Booking endpoints
│   │   └── events/               # Event CRUD endpoints
│   ├── events/                   # Event pages
│   │   ├── [slug]/              # Dynamic event detail page
│   │   └── page.tsx             # Events listing page
│   ├── create-event/            # Event creation page
│   ├── home/                    # Home redirect
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Homepage
│   └── providers.tsx            # Client providers (PostHog)
├── components/                  # React components
│   ├── BookEvent.tsx           # Booking form component
│   ├── EventCard.tsx           # Event card component
│   ├── ExploreBtn.tsx          # Explore button with animation
│   ├── LightRays.tsx           # Background animation
│   └── Navbar.tsx              # Navigation component
├── database/                    # Database models
│   ├── booking.model.ts        # Booking schema
│   ├── event.model.ts          # Event schema
│   └── index.ts                # Model exports
├── lib/                        # Utilities
│   ├── actions/                # Server actions
│   │   ├── booking.actions.ts
│   │   └── event.actions.ts
│   ├── constants.ts            # App constants
│   └── mongodb.ts              # MongoDB connection
├── public/                     # Static assets
│   ├── icons/                  # SVG icons
│   └── images/                 # Event images
├── scripts/                    # Utility scripts
│   └── seed-events.ts          # Database seeding
└── styles/                     # Global styles
```

## 🔌 API Routes

### Events

- **GET** `/api/events` - Fetch all events
- **POST** `/api/events` - Create a new event (with image upload)
- **GET** `/api/events/[slug]` - Fetch event by slug

### Bookings

- **POST** `/api/bookings` - Create a booking
- **GET** `/api/bookings?eventSlug=[slug]` - Get booking count for an event

## 🎨 Key Features Explained

### Event Management
- Create events with rich metadata (title, description, venue, date, agenda, tags)
- Upload event images directly to Cloudinary
- Automatic slug generation for SEO-friendly URLs
- Similar events recommendation based on tags

### Booking System
- Email-based booking with validation
- Duplicate booking prevention (one booking per email per event)
- Real-time booking count display
- Server-side validation and error handling

### Performance Optimizations
- Server-side rendering with Next.js App Router
- Database query caching with `cacheLife('hours')`
- Image optimization with Next.js Image component
- Lean Mongoose queries for faster data fetching

### Data Validation
- TypeScript type safety throughout the application
- Mongoose schema validation
- Email format validation (RFC 5321 compliant)
- File upload validation (type, size)

## 🌐 Deployment

The application is deployed on Vercel with automatic deployments from the `master` branch.

### Deploy Your Own

1. **Push to GitHub**
   ```bash
   git push origin master
   ```

2. **Import to Vercel**
   - Go to [Vercel](https://vercel.com/new)
   - Import your GitHub repository
   - Configure environment variables
   - Deploy

3. **Configure Environment Variables in Vercel**
   - Add all variables from `.env.local`
   - Set `NEXT_PUBLIC_BASE_URL` to your Vercel domain
   - Ensure MongoDB Atlas allows Vercel IPs (use `0.0.0.0/0` or specific IPs)

## 🛠️ Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run seed         # Seed database with sample events
npm run lint         # Run ESLint
```

## 📝 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `MONGODB_URI` | MongoDB connection string | ✅ |
| `CLOUDINARY_URL` | Cloudinary credentials | ✅ |
| `NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN` | PostHog analytics token | ❌ |
| `NEXT_PUBLIC_POSTHOG_HOST` | PostHog API host | ❌ |
| `NEXT_PUBLIC_BASE_URL` | Application base URL | ❌ |

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request