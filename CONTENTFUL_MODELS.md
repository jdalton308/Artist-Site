# Contentful Content Models

This document describes the Contentful content types that map to pages and components in the artist site. Create these in **Contentful → Content model** before connecting the CMS.

---

## `artistSettings` (Singleton)

**Maps to:** `SiteHeader`, `SiteFooter`, root `layout.jsx`

| Field ID | Type | Required | Notes |
|---|---|---|---|
| `artistName` | Short text | Yes | Display name, e.g. "NEON PULSE" |
| `tagline` | Short text | No | Shown in footer |
| `logo` | Media (Image) | No | Optional logo asset |
| `socialLinks` | References (many) | No | Links to `socialLink` entries |

---

## `socialLink`

**Maps to:** `SocialLinks` molecule

| Field ID | Type | Required | Notes |
|---|---|---|---|
| `platform` | Short text | Yes | `instagram`, `tiktok`, `spotify`, `youtube` |
| `url` | Short text | Yes | Full profile URL |
| `label` | Short text | No | Accessible label (defaults to platform) |

---

## `homePage` (Singleton)

**Maps to:** `/` home page

| Field ID | Type | Required | Notes |
|---|---|---|---|
| `heroHeadline` | Short text | Yes | Main hero title |
| `heroSubheadline` | Long text | No | Subtitle under headline |
| `heroImage` | Media (Image) | No | Background/hero image |
| `heroCtaLabel` | Short text | No | Primary CTA button text |
| `heroCtaUrl` | Short text | No | CTA link, e.g. `/music` |
| `latestRelease` | Reference (one) | No | Reference to a `release` entry |

---

## `tourDate`

**Maps to:** `TourDateRow`, `UpcomingShows`, `/live` page

| Field ID | Type | Required | Notes |
|---|---|---|---|
| `date` | Date | Yes | Show date (ISO format) |
| `city` | Short text | Yes | City name |
| `venue` | Short text | Yes | Venue name |
| `country` | Short text | No | Country |
| `ticketUrl` | Short text | No | External ticket purchase URL |
| `isPast` | Boolean | No | Override; otherwise derived from date |

**Webhook revalidation:** Publishing/unpublishing revalidates `/` and `/live`.

---

## `release`

**Maps to:** `ReleaseCard`, `LatestRelease`, `/music` page

| Field ID | Type | Required | Notes |
|---|---|---|---|
| `title` | Short text | Yes | Release title |
| `releaseDate` | Date | Yes | Used for sorting and year display |
| `coverArt` | Media (Image) | No | Album/EP artwork |
| `embedUrl` | Short text | No | Spotify/YouTube embed iframe URL |
| `description` | Long text | No | Release description |
| `streamingLinks` | JSON Object | No | Keys: `spotify`, `apple`, `youtube`, `tidal`, `bandcamp` |

Example `streamingLinks` value:

```json
{
  "spotify": "https://open.spotify.com/album/...",
  "apple": "https://music.apple.com/album/...",
  "youtube": "https://music.youtube.com/playlist?list=...",
  "tidal": "https://tidal.com/album/...",
  "bandcamp": "https://artist.bandcamp.com/album/..."
}
```

---

## `aboutPage` (Singleton)

**Maps to:** `/about` page, `AboutSection` organism

| Field ID | Type | Required | Notes |
|---|---|---|---|
| `title` | Short text | Yes | Page heading |
| `intro` | Long text | No | Opening paragraph |
| `body` | Rich text | No | Extended bio (optional) |
| `photos` | Media (many) | No | Artist photos |
| `labelName` | Short text | No | Record label name |
| `soundDescription` | Long text | No | Description of musical style |
| `goals` | Long text | No | Artist vision / goals |

---

## `merchPage` (Singleton)

**Maps to:** `/merch` page header copy

| Field ID | Type | Required | Notes |
|---|---|---|---|
| `headline` | Short text | Yes | Page title, e.g. "Official Merch" |
| `description` | Long text | No | Intro copy above product grid |

**Note:** Products are fetched from Shopify Storefront API, not Contentful.

---

## Webhook Configuration

1. In Contentful: **Settings → Webhooks → Add webhook**
2. **URL:** `https://YOUR_DOMAIN/api/revalidate?secret=YOUR_SECRET`
3. **Triggers:** Entry publish, Entry unpublish
4. **Filters:** All content types (or select the types above)

Set `CONTENTFUL_REVALIDATE_SECRET` in Vercel to match the `secret` query parameter.

---

## Component Mapping Summary

| Contentful Model | Page / Component |
|---|---|
| `artistSettings` | Layout, Header, Footer |
| `socialLink` | SocialLinks |
| `homePage` | `/` |
| `tourDate` | `/`, `/live`, TourDateRow |
| `release` | `/`, `/music`, ReleaseCard |
| `aboutPage` | `/about` |
| `merchPage` | `/merch` (copy only) |
| Shopify Products | `/merch` (ProductGrid, Cart) |
