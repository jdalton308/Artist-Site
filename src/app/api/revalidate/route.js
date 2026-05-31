import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

const ROUTE_MAP = {
  artistSettings: ["/", "/live", "/music", "/about", "/merch"],
  homePage: ["/"],
  tourDate: ["/", "/live"],
  release: ["/", "/music"],
  aboutPage: ["/about"],
  merchPage: ["/merch"],
  socialLink: ["/"],
};

export async function POST(request) {
  const secret = process.env.CONTENTFUL_REVALIDATE_SECRET;

  if (!secret) {
    return NextResponse.json(
      { message: "CONTENTFUL_REVALIDATE_SECRET is not configured" },
      { status: 500 },
    );
  }

  const { searchParams } = new URL(request.url);
  if (searchParams.get("secret") !== secret) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
  }

  let contentType;

  try {
    const body = await request.json();
    contentType = body.sys?.contentType?.sys?.id;
  } catch {
    // Contentful may send non-JSON payloads for test webhooks.
  }

  const paths = ROUTE_MAP[contentType] ?? ["/", "/live", "/music", "/about", "/merch"];

  for (const path of paths) {
    revalidatePath(path);
  }

  return NextResponse.json({
    revalidated: true,
    contentType: contentType ?? "unknown",
    paths,
  });
}
