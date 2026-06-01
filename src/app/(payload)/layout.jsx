import config from "@payload-config";
import "@payloadcms/next/css";
import { handleServerFunctions, RootLayout } from "@payloadcms/next/layouts";
import { importMap } from "./admin/importMap.js";


/** @param {{ children: React.ReactNode }} props */
export default function PayloadLayout({ children }) {

  /** @type {import('payload').ServerFunctionClient} */
  async function serverFunction(args) {
    "use server";
    return handleServerFunctions({
      ...args,
      config,
      importMap,
    });
  }

  return (
    <RootLayout config={config} importMap={importMap} serverFunction={serverFunction}>
      {children}
    </RootLayout>
  );
}
