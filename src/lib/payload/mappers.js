function mediaUrl(media) {
  if (!media) return null;
  if (typeof media === "string") return null;
  return media.url || null;
}

export function mapSocialLink(link) {
  return {
    id: link.id,
    platform: link.platform,
    url: link.url,
    label: link.label || link.platform,
  };
}

export function mapArtistSettings(data) {
  const socialLinks = (data.socialLinks || [])
    .map((link) => (typeof link === "object" ? mapSocialLink(link) : link))
    .filter(Boolean);

  return {
    artistName: data.artistName,
    tagline: data.tagline || "",
    logoUrl: mediaUrl(data.logo),
    socialLinks,
  };
}

export function mapHomePage(data, latestRelease) {
  return {
    heroHeadline: data.heroHeadline,
    heroSubheadline: data.heroSubheadline || "",
    heroImageUrl: mediaUrl(data.heroImage),
    heroCtaLabel: data.heroCtaLabel || "Listen Now",
    heroCtaUrl: data.heroCtaUrl || "/music",
    latestRelease,
  };
}

export function mapTourDate(entry) {
  const date = new Date(entry.date);
  return {
    id: entry.id,
    date: entry.date,
    dateFormatted: date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    }),
    city: entry.city,
    venue: entry.venue,
    country: entry.country || "",
    ticketUrl: entry.ticketUrl || "#",
    isPast: entry.isPast ?? date < new Date(),
  };
}

export function mapRelease(entry) {
  return {
    id: entry.id,
    title: entry.title,
    releaseDate: entry.releaseDate,
    year: entry.releaseDate ? new Date(entry.releaseDate).getFullYear() : null,
    coverArtUrl: mediaUrl(entry.coverArt),
    embedUrl: entry.embedUrl || null,
    description: entry.description || "",
    streamingLinks: entry.streamingLinks || {},
  };
}

export function mapAboutPage(data) {
  const photos = (data.photos || []).map((photo) => ({
    url: mediaUrl(photo),
    alt: typeof photo === "object" ? photo.alt || "Artist photo" : "Artist photo",
  }));

  return {
    title: data.title,
    intro: data.intro || "",
    body: data.body || null,
    photos,
    labelName: data.labelName || "",
    soundDescription: data.soundDescription || "",
    goals: data.goals || "",
  };
}

export function mapMerchPage(data) {
  return {
    headline: data.headline || "Merch",
    description: data.description || "",
  };
}

export function mapProduct(product) {
  const priceCents = product.priceInUSD ?? 0;
  const price = (priceCents / 100).toFixed(2);

  return {
    id: product.id,
    title: product.title,
    handle: product.slug,
    description: product.description || "",
    price,
    currencyCode: "USD",
    imageUrl: mediaUrl(product.image),
    variantId: product.id,
  };
}
