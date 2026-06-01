function getEnv(name) {
  return process.env[name]?.trim() || undefined;
}

export function isPayloadConfigured() {
  return Boolean(getEnv("MONGODB_URI") && getEnv("PAYLOAD_SECRET"));
}

export function isStripeConfigured() {
  return Boolean(
    getEnv("STRIPE_SECRET_KEY") && getEnv("NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY"),
  );
}

function getGraphqlUrl() {
  const siteUrl = getEnv("NEXT_PUBLIC_SITE_URL") || "http://localhost:3000";
  return `${siteUrl.replace(/\/$/, "")}/api/graphql`;
}

export async function payloadGraphql(query, variables = {}) {
  const response = await fetch(getGraphqlUrl(), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query, variables }),
    next: { revalidate: 3600 },
  });

  const json = await response.json();

  if (json.errors?.length) {
    throw new Error(json.errors[0].message);
  }

  return json.data;
}
