# Artist Site

A white-label website for a touring DJ artist or band. Built with **Next.js**, deployed on **Vercel**, with **Contentful** for content management and **Shopify Storefront API** for merch.

The placeholder artist **NEON PULSE** ships with mock data so you can preview the site immediately — no CMS or Shopify credentials required for local development.

---

## Features

- **Brand-first design** — dark theme with violet/magenta gradients and a token-based CSS design system
- **Tour dates** — upcoming shows on the home page, full list on `/live` with a past-dates toggle
- **Music catalog** — releases with embedded players and streaming platform links
- **About page** — copy-heavy bio with photos, label, sound, and vision sections
- **Merch shop** — Shopify-powered cart with checkout redirect (placeholder products when Shopify is not configured)
- **Social links** — Instagram, TikTok, and more in the header and footer
- **ISR pre-rendering** — static pages with 1-hour revalidation, plus Contentful webhooks for on-demand updates

---

## Routes

| Route | Purpose |
|---|---|
| `/` | Hero, latest release section, next 3 tour dates (links to `/live`) |
| `/live` | Full list of future tour dates with ticket links; toggle to show past dates |
| `/music` | All releases with embedded players and links to Spotify, Apple Music, YouTube Music, Tidal, Bandcamp |
| `/about` | Artist bio, photos, label, sound description, and goals |
| `/merch` | Product grid, cart drawer, and Shopify checkout redirect |

All content routes are pre-rendered with ISR (`revalidate: 3600`).

---

## Tech Stack

- **Next.js 16** (App Router) — vanilla JavaScript, no TypeScript
- **React 19**
- **Vanilla CSS** — token-based design system using CSS custom properties (no Tailwind)
- **Contentful** — headless CMS for all editorial content
- **Shopify Storefront API** — headless commerce for the merch page
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
│   └── api/
│       ├── revalidate/route.js # Contentful webhook handler
│       └── shopify/checkout/route.js
├── components/
│   ├── atoms/                  # Button, Heading, Text, Icon, Badge, GradientBackground
│   ├── molecules/              # SocialLinks, NavLink, TourDateRow, ReleaseCard, etc.
│   └── organisms/              # SiteHeader, SiteFooter, Hero, CartDrawer, etc.
└── lib/
    ├── contentful/             # Client, queries, mappers, mock data
    └── shopify/                # Storefront API client + placeholder products
```

Components follow an **atoms → molecules → organisms** hierarchy. Each component has its own co-located CSS file that references semantic design tokens.

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm (or yarn/pnpm)

### Install and run

```bash
cd artist-site
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to preview the site with mock data.

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
| `CONTENTFUL_SPACE_ID` | For CMS | Contentful space ID |
| `CONTENTFUL_ACCESS_TOKEN` | For CMS | Contentful Delivery API token |
| `CONTENTFUL_REVALIDATE_SECRET` | For webhooks | Random secret for the revalidation endpoint |
| `SHOPIFY_STORE_DOMAIN` | For merch | e.g. `your-store.myshopify.com` |
| `SHOPIFY_STOREFRONT_ACCESS_TOKEN` | For merch | Shopify Storefront API access token |
| `NEXT_PUBLIC_SITE_URL` | Optional | Site URL for absolute links |

**Without Contentful credentials**, the site falls back to mock data in `src/lib/contentful/mock-data.js`.

**Without Shopify credentials**, the merch page uses two placeholder products and redirects checkout to a stub URL.

---

## Contentful Setup

### 1. Create content models

Follow the field definitions in [`CONTENTFUL_MODELS.md`](./CONTENTFUL_MODELS.md). The content types are:

| Content type | Maps to |
|---|---|
| `artistSettings` (singleton) | Header, footer, layout |
| `socialLink` | SocialLinks component |
| `homePage` (singleton) | `/` home page |
| `tourDate` | `/`, `/live`, TourDateRow |
| `release` | `/`, `/music`, ReleaseCard |
| `aboutPage` (singleton) | `/about` |
| `merchPage` (singleton) | `/merch` page copy (products come from Shopify) |

### 2. Add content

Create and publish entries for each singleton and add tour dates, releases, and social links.

### 3. Configure webhook

In Contentful: **Settings → Webhooks → Add webhook**

- **URL:** `https://YOUR_DOMAIN.vercel.app/api/revalidate?secret=YOUR_SECRET`
- **Triggers:** Entry publish, Entry unpublish
- **Content types:** All (or select the types listed above)

Set `CONTENTFUL_REVALIDATE_SECRET` in Vercel to match the `secret` query parameter.

When content is published, the webhook revalidates the affected routes:

| Content type | Routes revalidated |
|---|---|
| `artistSettings` | All pages |
| `homePage` | `/` |
| `tourDate` | `/`, `/live` |
| `release` | `/`, `/music` |
| `aboutPage` | `/about` |
| `merchPage` | `/merch` |

---

## Shopify Setup

### 1. Create a custom app

In your Shopify admin: **Settings → Apps and sales channels → Develop apps**

Create a custom app with **Storefront API** access scopes.

### 2. Install and get token

Install the app on your store and copy the **Storefront API access token**.

### 3. Add products

Add products in Shopify admin. The merch page fetches them via the Storefront API. When credentials are missing, two placeholder products are shown instead.

### 4. Checkout flow

1. User adds items to cart on `/merch`
2. Cart state is managed client-side
3. **Checkout** calls `/api/shopify/checkout` which creates a Shopify cart
4. User is redirected to `cart.checkoutUrl` (Shopify-hosted checkout)

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

1. **Content** — update or replace Contentful entries (or edit mock data for local dev)
2. **Colors** — swap raw palette values in `:root` in `globals.css`
3. **Metadata** — update `title` and `description` in `src/app/layout.jsx`
4. **Per-artist deployment** — duplicate the Contentful space or use one space with an `artistSlug` filter

---

## Deploy on Vercel

1. Push the repo to GitHub (or connect your Git provider)
2. Import the project in [Vercel](https://vercel.com/new)
3. Add all environment variables from `.env.example`
4. Deploy — static pages are generated at build time and refreshed via Contentful webhooks on publish

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

---

## License

Private — all rights reserved.
