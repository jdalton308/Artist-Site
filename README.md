# Artist Site

A white-label website for a touring DJ artist or band. Built with **Next.js**, deployed on **Vercel**, with **Payload CMS** for content management and e-commerce.

The placeholder artist **NEON PULSE** ships with mock data so you can preview the site immediately — no database credentials required for local development.

---

## Features

- **Brand-first design** — dark theme with violet/magenta gradients and a token-based CSS design system
- **Tour dates** — upcoming shows on the home page, full list on `/live` with a past-dates toggle
- **Music catalog** — releases with embedded players and streaming platform links
- **About page** — copy-heavy bio with photos, label, sound, and vision sections
- **Merch shop** — Payload-powered product catalog with cart and Stripe checkout
- **Social links** — Instagram, TikTok, and more in the header and footer
- **ISR pre-rendering** — static pages with 1-hour revalidation, plus Payload hooks for on-demand updates
- **GraphQL API** — all frontend content fetched via Payload's GraphQL endpoint

---

## Routes

| Route | Purpose |
|---|---|
| `/` | Hero, latest release section, next 3 tour dates (links to `/live`) |
| `/live` | Full list of future tour dates with ticket links; toggle to show past dates |
| `/music` | All releases with embedded players and links to Spotify, Apple Music, YouTube Music, Tidal, Bandcamp |
| `/about` | Artist bio, photos, label, sound description, and goals |
| `/merch` | Product grid, cart drawer, and checkout |
| `/admin` | Payload CMS admin panel |

All content routes are pre-rendered with ISR (`revalidate: 3600`).

---

## Tech Stack

- **Next.js 16** (App Router) — vanilla JavaScript, no TypeScript
- **React 19**
- **Vanilla CSS** — token-based design system using CSS custom properties (no Tailwind)
- **Payload CMS 3** — headless CMS with admin panel, MongoDB, and GraphQL API
- **Payload Ecommerce Plugin** — products, carts, orders, and Stripe payments
- **MongoDB** — non-relational database via `@payloadcms/db-mongodb`
- **Vercel** — deployment target

---

## Project Structure

```
src/
├── app/
│   ├── layout.jsx              # Root layout with header/footer
│   ├── page.jsx                # Home (/)
│   ├── live/page.jsx
│   ├── music/page.jsx
│   ├── about/page.jsx
│   ├── merch/page.jsx
│   ├── globals.css             # Design tokens + base styles
│   ├── (payload)/              # Payload admin + API routes
│   │   ├── admin/
│   │   └── api/graphql/        # GraphQL endpoint
│   └── api/
│       ├── revalidate/route.js # On-demand ISR webhook
│       └── checkout/route.js   # Cart checkout handler
├── collections/                # Payload collections
├── globals/                    # Payload globals (singletons)
├── payload.config.js           # Payload CMS configuration
├── components/
│   ├── atoms/                  # Button, Heading, Text, Icon, Badge, GradientBackground
│   ├── molecules/              # SocialLinks, NavLink, TourDateRow, ReleaseCard, etc.
│   └── organisms/              # SiteHeader, SiteFooter, Hero, CartDrawer, etc.
└── lib/
    └── payload/                # GraphQL client, queries, mappers, mock data
```

Components follow an **atoms → molecules → organisms** hierarchy. Each component has its own co-located CSS file that references semantic design tokens.

---

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB (local or Atlas)
- npm (or yarn/pnpm)

### Install and run

```bash
cd artist-site
npm install
cp .env.example .env.local
# Edit .env.local with your MongoDB URI and Payload secret
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to preview the site.

Without MongoDB configured, the site uses mock data automatically.

### Build for production

```bash
npm run build
npm start
```

---

## Environment Variables

Copy the example file and fill in your values:

```bash
cp .env.example .env.local
```

| Variable | Required | Description |
|---|---|---|
| `MONGODB_URI` | For CMS | MongoDB connection string |
| `PAYLOAD_SECRET` | For CMS | Random secret for Payload auth/tokens |
| `PAYLOAD_REVALIDATE_SECRET` | For webhooks | Random secret for the revalidation endpoint |
| `STRIPE_SECRET_KEY` | For checkout | Stripe secret key |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | For checkout | Stripe publishable key |
| `STRIPE_WEBHOOKS_SIGNING_SECRET` | For checkout | Stripe webhook signing secret |
| `NEXT_PUBLIC_SITE_URL` | Recommended | Site URL for GraphQL client and checkout redirects |

**Without Payload credentials**, the site falls back to mock data in `src/lib/payload/mock-data.js`.

**Without Stripe credentials**, the merch page uses placeholder products and shows a checkout message instead of processing payments.

---

## Payload CMS Setup

### 1. Start MongoDB

Use a local MongoDB instance or MongoDB Atlas:

```bash
# Local example
MONGODB_URI=mongodb://127.0.0.1:27017/artist-site
```

### 2. Configure environment

Set `MONGODB_URI`, `PAYLOAD_SECRET`, and `NEXT_PUBLIC_SITE_URL` in `.env.local`.

### 3. Create an admin user

On first visit to [http://localhost:3000/admin](http://localhost:3000/admin), Payload prompts you to create an admin account.

### 4. Add content

Follow the field definitions in [`PAYLOAD_MODELS.md`](./PAYLOAD_MODELS.md). Create globals for site settings and pages, then add tour dates, releases, and products.

### 5. GraphQL API

Payload's GraphQL endpoint is available at `/api/graphql`. The playground is at `/api/graphql-playground` in development.

Frontend queries live in `src/lib/payload/queries.js`.

### 6. Revalidation

Publishing content triggers automatic revalidation via Payload hooks. You can also POST to the webhook endpoint:

```
POST https://YOUR_DOMAIN/api/revalidate?secret=YOUR_SECRET
{ "collection": "tour-dates" }
```

---

## E-commerce Setup

Products are managed in Payload admin under the **Products** collection (via the ecommerce plugin).

### Stripe checkout

1. Create a Stripe account and get API keys
2. Set `STRIPE_SECRET_KEY` and `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` in `.env.local`
3. Add products in Payload admin with prices in cents (e.g. `3500` = $35.00)
4. Publish products — only published products appear on `/merch`

### Checkout flow

1. User adds items to cart on `/merch`
2. Cart state is managed client-side
3. **Checkout** calls `/api/checkout` which creates a Payload cart
4. With Stripe configured, user is redirected to complete payment

---

## CSS Design System

The design system uses a two-layer token approach in `src/app/globals.css`:

1. **Raw palette tokens** — `--color-ink-950`, `--color-violet-500`, `--gradient-hero`, etc.
2. **Semantic tokens** — `--color-bg-primary`, `--color-text-muted`, `--button-bg`, etc.

Component CSS files reference **semantic tokens only**, so re-theming for another artist is mostly a palette swap in `:root`.

Fonts: **Syne** (display) and **Inter** (body), loaded via Google Fonts.

---

## White-Label Customization

To rebrand for a different artist:

1. **Content** — update Payload globals and collections (or edit mock data for local dev)
2. **Colors** — swap raw palette values in `:root` in `globals.css`
3. **Metadata** — update `title` and `description` in `src/app/layout.jsx`

---

## Deploy on Vercel

1. Push the repo to GitHub (or connect your Git provider)
2. Import the project in [Vercel](https://vercel.com/new)
3. Add all environment variables from `.env.example`
4. Provision MongoDB (e.g. MongoDB Atlas) and set `MONGODB_URI`
5. Deploy — static pages are generated at build time and refreshed via Payload hooks on publish

```bash
# Or deploy from CLI
npx vercel
```

---

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run payload` | Run Payload CLI commands |
| `npm run generate:importmap` | Regenerate Payload admin import map |

---

## License

Private — all rights reserved.
