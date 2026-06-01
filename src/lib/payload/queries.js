import { payloadGraphql, isPayloadConfigured } from "./client.js";
import {
  mapAboutPage,
  mapArtistSettings,
  mapHomePage,
  mapMerchPage,
  mapProduct,
  mapRelease,
  mapTourDate,
} from "./mappers.js";
import {
  mockAboutPage,
  mockArtistSettings,
  mockHomePage,
  mockMerchPage,
  mockReleases,
  mockTourDates,
} from "./mock-data.js";
import { PLACEHOLDER_PRODUCTS } from "./constants.js";

const ARTIST_SETTINGS_QUERY = `
  query ArtistSettings {
    ArtistSetting {
      artistName
      tagline
      logo {
        url
      }
      socialLinks {
        id
        platform
        url
        label
      }
    }
  }
`;

const HOME_PAGE_QUERY = `
  query HomePage {
    HomePage {
      heroHeadline
      heroSubheadline
      heroImage {
        url
      }
      heroCtaLabel
      heroCtaUrl
      latestRelease {
        id
        title
        releaseDate
        coverArt {
          url
        }
        embedUrl
        description
        streamingLinks {
          spotify
          apple
          youtube
          tidal
          bandcamp
        }
      }
    }
  }
`;

const TOUR_DATES_QUERY = `
  query TourDates {
    TourDates(sort: "date", limit: 100) {
      docs {
        id
        date
        city
        venue
        country
        ticketUrl
        isPast
      }
    }
  }
`;

const RELEASES_QUERY = `
  query Releases {
    Releases(sort: "-releaseDate", limit: 50) {
      docs {
        id
        title
        releaseDate
        coverArt {
          url
        }
        embedUrl
        description
        streamingLinks {
          spotify
          apple
          youtube
          tidal
          bandcamp
        }
      }
    }
  }
`;

const ABOUT_PAGE_QUERY = `
  query AboutPage {
    AboutPage {
      title
      intro
      body
      photos {
        url
        alt
      }
      labelName
      soundDescription
      goals
    }
  }
`;

const MERCH_PAGE_QUERY = `
  query MerchPage {
    MerchPage {
      headline
      description
    }
  }
`;

const PRODUCTS_QUERY = `
  query Products {
    Products(where: { _status: { equals: published } }, limit: 20) {
      docs {
        id
        title
        slug
        description
        priceInUSD
        image {
          url
        }
      }
    }
  }
`;

export function splitTourDates(dates) {
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
  if (!isPayloadConfigured()) return mockArtistSettings;

  try {
    const data = await payloadGraphql(ARTIST_SETTINGS_QUERY);
    if (!data?.ArtistSetting) return mockArtistSettings;
    return mapArtistSettings(data.ArtistSetting);
  } catch {
    return mockArtistSettings;
  }
}

export async function getHomePageData() {
  if (!isPayloadConfigured()) {
    const { future } = splitTourDates(mockTourDates);
    return { ...mockHomePage, upcomingTourDates: future };
  }

  try {
    const [homeData, tourData] = await Promise.all([
      payloadGraphql(HOME_PAGE_QUERY),
      payloadGraphql(TOUR_DATES_QUERY),
    ]);

    const home = homeData?.HomePage;
    if (!home) {
      const { future } = splitTourDates(mockTourDates);
      return { ...mockHomePage, upcomingTourDates: future };
    }

    const latestRelease = home.latestRelease ? mapRelease(home.latestRelease) : null;
    const allDates = (tourData?.TourDates?.docs || []).map(mapTourDate);
    const { future } = splitTourDates(allDates);

    return {
      ...mapHomePage(home, latestRelease),
      upcomingTourDates: future,
    };
  } catch {
    const { future } = splitTourDates(mockTourDates);
    return { ...mockHomePage, upcomingTourDates: future };
  }
}

export async function getTourDates() {
  if (!isPayloadConfigured()) return splitTourDates(mockTourDates);

  try {
    const data = await payloadGraphql(TOUR_DATES_QUERY);
    const dates = (data?.TourDates?.docs || []).map(mapTourDate);
    return splitTourDates(dates.length ? dates : mockTourDates);
  } catch {
    return splitTourDates(mockTourDates);
  }
}

export async function getReleases() {
  if (!isPayloadConfigured()) return mockReleases;

  try {
    const data = await payloadGraphql(RELEASES_QUERY);
    const releases = (data?.Releases?.docs || []).map(mapRelease);
    return releases.length ? releases : mockReleases;
  } catch {
    return mockReleases;
  }
}

export async function getAboutPage() {
  if (!isPayloadConfigured()) return mockAboutPage;

  try {
    const data = await payloadGraphql(ABOUT_PAGE_QUERY);
    if (!data?.AboutPage) return mockAboutPage;
    return mapAboutPage(data.AboutPage);
  } catch {
    return mockAboutPage;
  }
}

export async function getMerchPage() {
  if (!isPayloadConfigured()) return mockMerchPage;

  try {
    const data = await payloadGraphql(MERCH_PAGE_QUERY);
    if (!data?.MerchPage) return mockMerchPage;
    return mapMerchPage(data.MerchPage);
  } catch {
    return mockMerchPage;
  }
}

export async function getProducts() {
  if (!isPayloadConfigured()) return PLACEHOLDER_PRODUCTS;

  try {
    const data = await payloadGraphql(PRODUCTS_QUERY);
    const products = (data?.Products?.docs || []).map(mapProduct);
    return products.length ? products : PLACEHOLDER_PRODUCTS;
  } catch {
    return PLACEHOLDER_PRODUCTS;
  }
}

export { splitTourDates };
