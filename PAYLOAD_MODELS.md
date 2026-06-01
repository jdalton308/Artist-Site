# Payload CMS Content Models

This document describes the Payload collections and globals that map to pages and components in the artist site. Content is managed in the Payload admin panel at `/admin`.

The frontend reads all content via Payload's **GraphQL API** at `/api/graphql`.

---

## Globals

### `artist-settings` (Global)

**Maps to:** `SiteHeader`, `SiteFooter`, root `layout.jsx`

| Field | Type | Required | Notes |
|---|---|---|---|
| `artistName` | Text | Yes | Display name, e.g. "NEON PULSE" |
| `tagline` | Text | No | Shown in footer |
| `logo` | Upload (Media) | No | Optional logo asset |
| `socialLinks` | Relationship (many) | No | Links to `social-links` entries |

---

### `home-page` (Global)

**Maps to:** `/` home page

| Field | Type | Required | Notes |
|---|---|---|---|
| `heroHeadline` | Text | Yes | Main hero title |
| `heroSubheadline` | Textarea | No | Subtitle under headline |
| `heroImage` | Upload (Media) | No | Background/hero image |
| `heroCtaLabel` | Text | No | Primary CTA button text |
| `heroCtaUrl` | Text | No | CTA link, e.g. `/music` |
| `latestRelease` | Relationship (one) | No | Reference to a `releases` entry |

---

### `about-page` (Global)

**Maps to:** `/about` page, `AboutSection` organism

| Field | Type | Required | Notes |
|---|---|---|---|
| `title` | Text | Yes | Page heading |
| `intro` | Textarea | No | Opening paragraph |
| `body` | Rich text | No | Extended bio (optional) |
| `photos` | Upload (many) | No | Artist photos |
| `labelName` | Text | No | Record label name |
| `soundDescription` | Textarea | No | Description of musical style |
| `goals` | Textarea | No | Artist vision / goals |

---

### `merch-page` (Global)

**Maps to:** `/merch` page header copy

| Field | Type | Required | Notes |
|---|---|---|---|
| `headline` | Text | Yes | Page title, e.g. "Official Merch" |
| `description` | Textarea | No | Intro copy above product grid |

---

## Collections

### `social-links`

**Maps to:** `SocialLinks` molecule

| Field | Type | Required | Notes |
|---|---|---|---|
| `platform` | Select | Yes | `instagram`, `tiktok`, `spotify`, `youtube` |
| `url` | Text | Yes | Full profile URL |
| `label` | Text | No | Accessible label (defaults to platform) |

---

### `tour-dates`

**Maps to:** `TourDateRow`, `UpcomingShows`, `/live` page

| Field | Type | Required | Notes |
|---|---|---|---|
| `date` | Date | Yes | Show date (ISO format) |
| `city` | Text | Yes | City name |
| `venue` | Text | Yes | Venue name |
| `country` | Text | No | Country |
| `ticketUrl` | Text | No | External ticket purchase URL |
| `isPast` | Checkbox | No | Override; otherwise derived from date |

---

### `releases`

**Maps to:** `ReleaseCard`, `LatestRelease`, `/music` page

| Field | Type | Required | Notes |
|---|---|---|---|
| `title` | Text | Yes | Release title |
| `releaseDate` | Date | Yes | Used for sorting and year display |
| `coverArt` | Upload (Media) | No | Album/EP artwork |
| `embedUrl` | Text | No | Spotify/YouTube embed iframe URL |
| `description` | Textarea | No | Release description |
| `streamingLinks` | Group | No | Fields: `spotify`, `apple`, `youtube`, `tidal`, `bandcamp` |

---

### `products` (Ecommerce Plugin)

**Maps to:** `/merch` product grid and cart

| Field | Type | Required | Notes |
|---|---|---|---|
| `title` | Text | Yes | Product name |
| `slug` | Text | Yes | URL-friendly identifier |
| `description` | Textarea | No | Product description |
| `image` | Upload (Media) | No | Product image |
| `priceInUSD` | Number | Yes | Price in cents (e.g. 3500 = $35.00) |
| `inventory` | Number | No | Stock count |

Products also support draft/publish workflow via Payload versions.

---

## GraphQL API

Payload exposes a GraphQL playground at `/api/graphql-playground` in development.

Example query:

```graphql
query HomePage {
  HomePage {
    heroHeadline
    heroSubheadline
    latestRelease {
      title
      releaseDate
    }
  }
}
```

The frontend data layer lives in `src/lib/payload/queries.js` and uses these GraphQL queries.

---

## Revalidation

Content changes trigger on-demand revalidation via Payload hooks. You can also call the webhook endpoint manually:

- **URL:** `https://YOUR_DOMAIN/api/revalidate?secret=YOUR_SECRET`
- **Method:** POST
- **Body:** `{ "collection": "tour-dates" }` or `{ "global": "home-page" }`

Set `PAYLOAD_REVALIDATE_SECRET` in your environment to match the `secret` query parameter.

---

## Component Mapping Summary

| Payload Model | Page / Component |
|---|---|
| `artist-settings` | Layout, Header, Footer |
| `social-links` | SocialLinks |
| `home-page` | `/` |
| `tour-dates` | `/`, `/live`, TourDateRow |
| `releases` | `/`, `/music`, ReleaseCard |
| `about-page` | `/about` |
| `merch-page` | `/merch` (copy only) |
| `products` | `/merch` (ProductGrid, Cart) |
