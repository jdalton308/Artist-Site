import { createClient } from "contentful";

function getEnv(name) {
  return process.env[name]?.trim() || undefined;
}

export function isContentfulConfigured() {
  return Boolean(getEnv("CONTENTFUL_SPACE_ID") && getEnv("CONTENTFUL_ACCESS_TOKEN"));
}

export function getContentfulClient() {
  const space = getEnv("CONTENTFUL_SPACE_ID");
  const accessToken = getEnv("CONTENTFUL_ACCESS_TOKEN");

  if (!space || !accessToken) {
    throw new Error(
      "Missing Contentful credentials. Set CONTENTFUL_SPACE_ID and CONTENTFUL_ACCESS_TOKEN in .env.local",
    );
  }

  return createClient({
    space,
    accessToken,
    host: "cdn.contentful.com",
  });
}
