import { getContentfulClient, isContentfulConfigured } from "./client";
import { CONTENT_TYPES, CACHE_TAGS } from "./constants";
import {
  mapAboutPage,
  mapArtistSettings,
  mapHomePage,
  mapMerchPage,
  mapRelease,
  mapSocialLink,
  mapTourDate,
} from "./mappers";
import {
  mockAboutPage,
  mockArtistSettings,
  mockHomePage,
  mockMerchPage,
  mockReleases,
  mockTourDates,
} from "./mock-data";

function splitTourDates(dates) {
  const now = new Date();
  now.setHours(0, 0, 0, 0);

  const future = [];
  const past = [];

  for (const date of dates) {
    const showDate = new Date(date.date);
    if (showDate >= now && !date.isPast) {
      future.push(date);
    } else {
      past.push(date);
    }
  }

  future.sort((a, b) => new Date(a.date) - new Date(b.date));
  past.sort((a, b) => new Date(b.date) - new Date(a.date));

  return { future, past };
}

export async function getArtistSettings() {
  if (!isContentfulConfigured()) return mockArtistSettings;

  const client = getContentfulClient();
  const entries = await client.getEntries({
    content_type: CONTENT_TYPES.ARTIST_SETTINGS,
    limit: 1,
    include: 2,
  });

  if (!entries.items.length) return mockArtistSettings;

  const entry = entries.items[0];
  const socialLinks = (entry.fields.socialLinks || [])
    .filter(Boolean)
    .map((link) => (link.fields ? mapSocialLink(link) : link));

  return mapArtistSettings(entry, socialLinks);
}

export async function getHomePageData() {
  if (!isContentfulConfigured()) {
    const { future } = splitTourDates(mockTourDates);
    return {
      ...mockHomePage,
      upcomingTourDates: future,
    };
  }

  const client = getContentfulClient();
  const entries = await client.getEntries({
    content_type: CONTENT_TYPES.HOME_PAGE,
    limit: 1,
    include: 2,
  });

  if (!entries.items.length) {
    const { future } = splitTourDates(mockTourDates);
    return { ...mockHomePage, upcomingTourDates: future };
  }

  const entry = entries.items[0];
  const latestRelease = entry.fields.latestRelease
    ? mapRelease(entry.fields.latestRelease)
    : null;

  const tourEntries = await client.getEntries({
    content_type: CONTENT_TYPES.TOUR_DATE,
    order: "fields.date",
    limit: 100,
  });

  const allDates = tourEntries.items.map(mapTourDate);
  const { future } = splitTourDates(allDates);

  return {
    ...mapHomePage(entry, latestRelease),
    upcomingTourDates: future,
  };
}

export async function getTourDates() {
  if (!isContentfulConfigured()) {
    return splitTourDates(mockTourDates);
  }

  const client = getContentfulClient();
  const entries = await client.getEntries({
    content_type: CONTENT_TYPES.TOUR_DATE,
    order: "fields.date",
    limit: 100,
  });

  return splitTourDates(entries.items.map(mapTourDate));
}

export async function getReleases() {
  if (!isContentfulConfigured()) return mockReleases;

  const client = getContentfulClient();
  const entries = await client.getEntries({
    content_type: CONTENT_TYPES.RELEASE,
    order: "-fields.releaseDate",
    limit: 50,
  });

  if (!entries.items.length) return mockReleases;

  return entries.items.map(mapRelease);
}

export async function getAboutPage() {
  if (!isContentfulConfigured()) return mockAboutPage;

  const client = getContentfulClient();
  const entries = await client.getEntries({
    content_type: CONTENT_TYPES.ABOUT_PAGE,
    limit: 1,
    include: 2,
  });

  if (!entries.items.length) return mockAboutPage;

  return mapAboutPage(entries.items[0]);
}

export async function getMerchPage() {
  if (!isContentfulConfigured()) return mockMerchPage;

  const client = getContentfulClient();
  const entries = await client.getEntries({
    content_type: CONTENT_TYPES.MERCH_PAGE,
    limit: 1,
  });

  if (!entries.items.length) return mockMerchPage;

  return mapMerchPage(entries.items[0]);
}

export { CACHE_TAGS, splitTourDates };
