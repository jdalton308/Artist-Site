function assetUrl(asset) {
  if (!asset?.fields?.file?.url) return null;
  const url = asset.fields.file.url;
  return url.startsWith("//") ? `https:${url}` : url;
}

function mapSocialLink(entry) {
  return {
    id: entry.sys.id,
    platform: entry.fields.platform,
    url: entry.fields.url,
    label: entry.fields.label || entry.fields.platform,
  };
}

export function mapArtistSettings(entry, socialLinks = []) {
  return {
    artistName: entry.fields.artistName,
    tagline: entry.fields.tagline || "",
    logoUrl: assetUrl(entry.fields.logo),
    socialLinks,
  };
}

export function mapHomePage(entry, latestRelease) {
  return {
    heroHeadline: entry.fields.heroHeadline,
    heroSubheadline: entry.fields.heroSubheadline || "",
    heroImageUrl: assetUrl(entry.fields.heroImage),
    heroCtaLabel: entry.fields.heroCtaLabel || "Listen Now",
    heroCtaUrl: entry.fields.heroCtaUrl || "/music",
    latestRelease,
  };
}

export function mapTourDate(entry) {
  const date = new Date(entry.fields.date);
  return {
    id: entry.sys.id,
    date: entry.fields.date,
    dateFormatted: date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    }),
    city: entry.fields.city,
    venue: entry.fields.venue,
    country: entry.fields.country || "",
    ticketUrl: entry.fields.ticketUrl || "#",
    isPast: entry.fields.isPast ?? date < new Date(),
  };
}

export function mapRelease(entry) {
  return {
    id: entry.sys.id,
    title: entry.fields.title,
    releaseDate: entry.fields.releaseDate,
    year: entry.fields.releaseDate
      ? new Date(entry.fields.releaseDate).getFullYear()
      : null,
    coverArtUrl: assetUrl(entry.fields.coverArt),
    embedUrl: entry.fields.embedUrl || null,
    description: entry.fields.description || "",
    streamingLinks: entry.fields.streamingLinks || {},
  };
}

export function mapAboutPage(entry) {
  const photos = (entry.fields.photos || []).map((photo) => ({
    url: assetUrl(photo),
    alt: photo.fields?.title || "Artist photo",
  }));

  return {
    title: entry.fields.title,
    intro: entry.fields.intro || "",
    body: entry.fields.body || null,
    photos,
    labelName: entry.fields.labelName || "",
    soundDescription: entry.fields.soundDescription || "",
    goals: entry.fields.goals || "",
  };
}

export function mapMerchPage(entry) {
  return {
    headline: entry.fields.headline || "Merch",
    description: entry.fields.description || "",
  };
}

export { mapSocialLink, assetUrl };
