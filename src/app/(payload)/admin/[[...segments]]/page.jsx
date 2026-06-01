import config from "@payload-config";
import { RootPage, generatePageMetadata } from "@payloadcms/next/views";
import { importMap } from "../importMap.js";

/** @param {{ params: Promise<{ segments: string[] }>, searchParams: Promise<Record<string, string | string[]>> }} args */
export async function generateMetadata({ params, searchParams }) {
  return generatePageMetadata({ config, params, searchParams });
}

/** @param {{ params: Promise<{ segments: string[] }>, searchParams: Promise<Record<string, string | string[]>> }} args */
export default async function AdminPage({ params, searchParams }) {
  return RootPage({ config, params, searchParams, importMap });
}
