import path from "path";
import { fileURLToPath } from "url";
import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { buildConfig } from "payload";
import sharp from "sharp";

import { Media } from "./collections/Media.js";
import { Releases } from "./collections/Releases.js";
import { SocialLinks } from "./collections/SocialLinks.js";
import { TourDates } from "./collections/TourDates.js";
import { Users } from "./collections/Users.js";
import { AboutPage } from "./globals/AboutPage.js";
import { ArtistSettings } from "./globals/ArtistSettings.js";
import { HomePage } from "./globals/HomePage.js";
import { MerchPage } from "./globals/MerchPage.js";
import { plugins } from "./plugins/index.js";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, SocialLinks, TourDates, Releases],
  globals: [ArtistSettings, HomePage, AboutPage, MerchPage],
  db: mongooseAdapter({
    url: process.env.MONGODB_URI || "",
  }),
  editor: lexicalEditor(),
  graphQL: {
    disable: false,
    disablePlaygroundInProduction: false,
  },
  plugins,
  secret: process.env.PAYLOAD_SECRET || "",
  sharp,
});
