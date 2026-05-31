export const mockArtistSettings = {
  artistName: "NEON PULSE",
  tagline: "Electronic · House · Global",
  logoUrl: null,
  socialLinks: [
    { id: "1", platform: "instagram", url: "https://instagram.com", label: "Instagram" },
    { id: "2", platform: "tiktok", url: "https://tiktok.com", label: "TikTok" },
    { id: "3", platform: "spotify", url: "https://spotify.com", label: "Spotify" },
    { id: "4", platform: "youtube", url: "https://youtube.com", label: "YouTube" },
  ],
};

export const mockLatestRelease = {
  id: "release-1",
  title: "Afterglow EP",
  releaseDate: "2025-11-14",
  year: 2025,
  coverArtUrl: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=600&h=600&fit=crop",
  embedUrl: "https://open.spotify.com/embed/album/4uLU6hMCjMI75M1A2tKUQC?utm_source=generator",
  description: "Four tracks of late-night energy — pulsing basslines, shimmering synths, and warehouse-ready grooves.",
  streamingLinks: {
    spotify: "https://open.spotify.com",
    apple: "https://music.apple.com",
    youtube: "https://music.youtube.com",
    tidal: "https://tidal.com",
    bandcamp: "https://bandcamp.com",
  },
};

export const mockReleases = [
  mockLatestRelease,
  {
    id: "release-2",
    title: "Midnight Circuit",
    releaseDate: "2025-03-22",
    year: 2025,
    coverArtUrl: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&h=600&fit=crop",
    embedUrl: null,
    description: "A single built for peak-time — relentless four-on-the-floor with a hypnotic vocal chop.",
    streamingLinks: {
      spotify: "https://open.spotify.com",
      apple: "https://music.apple.com",
      youtube: "https://music.youtube.com",
    },
  },
  {
    id: "release-3",
    title: "Signal Lost",
    releaseDate: "2024-09-01",
    year: 2024,
    coverArtUrl: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&h=600&fit=crop",
    embedUrl: null,
    description: "Debut EP — raw, unfiltered club music recorded between Berlin and Brooklyn.",
    streamingLinks: {
      spotify: "https://open.spotify.com",
      apple: "https://music.apple.com",
      bandcamp: "https://bandcamp.com",
    },
  },
];

function futureDate(daysFromNow) {
  const d = new Date();
  d.setDate(d.getDate() + daysFromNow);
  return d.toISOString().split("T")[0];
}

function pastDate(daysAgo) {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  return d.toISOString().split("T")[0];
}

function formatDate(iso) {
  return new Date(iso).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export const mockTourDates = [
  {
    id: "tour-1",
    date: futureDate(14),
    dateFormatted: formatDate(futureDate(14)),
    city: "Berlin",
    venue: "Berghain",
    country: "Germany",
    ticketUrl: "https://example.com/tickets/berlin",
    isPast: false,
  },
  {
    id: "tour-2",
    date: futureDate(28),
    dateFormatted: formatDate(futureDate(28)),
    city: "London",
    venue: "Fabric",
    country: "UK",
    ticketUrl: "https://example.com/tickets/london",
    isPast: false,
  },
  {
    id: "tour-3",
    date: futureDate(42),
    dateFormatted: formatDate(futureDate(42)),
    city: "Amsterdam",
    venue: "De School",
    country: "Netherlands",
    ticketUrl: "https://example.com/tickets/amsterdam",
    isPast: false,
  },
  {
    id: "tour-4",
    date: futureDate(56),
    dateFormatted: formatDate(futureDate(56)),
    city: "New York",
    venue: "Brooklyn Mirage",
    country: "USA",
    ticketUrl: "https://example.com/tickets/nyc",
    isPast: false,
  },
  {
    id: "tour-5",
    date: pastDate(30),
    dateFormatted: formatDate(pastDate(30)),
    city: "Ibiza",
    venue: "DC-10",
    country: "Spain",
    ticketUrl: "#",
    isPast: true,
  },
  {
    id: "tour-6",
    date: pastDate(90),
    dateFormatted: formatDate(pastDate(90)),
    city: "Tokyo",
    venue: "Womb",
    country: "Japan",
    ticketUrl: "#",
    isPast: true,
  },
];

export const mockHomePage = {
  heroHeadline: "NEON PULSE",
  heroSubheadline: "Touring the world. Pushing the sound forward.",
  heroImageUrl: "https://images.unsplash.com/photo-1571266028243-e68f8570c9e0?w=1600&h=900&fit=crop",
  heroCtaLabel: "Latest Release",
  heroCtaUrl: "/music",
  latestRelease: mockLatestRelease,
};

export const mockAboutPage = {
  title: "About NEON PULSE",
  intro:
    "NEON PULSE is the project of producer and DJ Alex Rivera — a collision of warehouse techno, melodic house, and global club culture.",
  body: null,
  photos: [
    {
      url: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&h=600&fit=crop",
      alt: "NEON PULSE performing live",
    },
    {
      url: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=600&fit=crop",
      alt: "NEON PULSE in the studio",
    },
  ],
  labelName: "Frequency Records",
  soundDescription:
    "Dark, driving, and emotionally charged — NEON PULSE blends analog warmth with modern production. Think 3 AM on a dancefloor somewhere between Berlin and Brooklyn.",
  goals:
    "Building a global community around forward-thinking electronic music. Every set is a journey; every release is a statement.",
};

export const mockMerchPage = {
  headline: "Official Merch",
  description: "Limited-run tour tees, vinyl, and exclusive drops. Ships worldwide.",
};
