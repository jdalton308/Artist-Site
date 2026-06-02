import { revalidatePath } from "next/cache";

/**
 * @param {string[]} paths
 * @returns {import('payload').CollectionAfterChangeHook}
 */
export function revalidateContent(paths) {
  return () => {
    for (const path of paths) {
      console.log(`Revalidating path: ${path}`);
      revalidatePath(path);
    }
  };
}

/** @type {import('payload').GlobalAfterChangeHook} */
export function revalidateAllPages() {
  const paths = ["/", "/live", "/music", "/about", "/merch"];
  for (const path of paths) {
    revalidatePath(path);
  }
}
