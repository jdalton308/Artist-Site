import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

const ROUTE_MAP = {
  "artist-settings": ["/", "/live", "/music", "/about", "/merch"],
  "home-page": ["/"],
  "tour-dates": ["/", "/live"],
  releases: ["/", "/music"],
  "about-page": ["/about"],
  "merch-page": ["/merch"],
  products: ["/merch"],
  "social-links": ["/"],
};

export async function POST(request) {
  const secret = process.env.PAYLOAD_REVALIDATE_SECRET;

  if (!secret) {
    return NextResponse.json(
      { message: "PAYLOAD_REVALIDATE_SECRET is not configured" },
      { status: 500 },
    );
  }

  const { searchParams } = new URL(request.url);
  if (searchParams.get("secret") !== secret) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
  }

  let collection;

  try {
    const body = await request.json();
    collection = body.collection || body.global;
  } catch {
    // Payload may send non-JSON payloads for test webhooks.
  }

  const paths = ROUTE_MAP[collection] ?? ["/", "/live", "/music", "/about", "/merch"];

  for (const path of paths) {
    revalidatePath(path);
  }

  return NextResponse.json({
    revalidated: true,
    collection: collection ?? "unknown",
    paths,
  });
}
