import { revalidateAllPages, revalidateContent } from "../hooks/revalidateContent.js";

/** @type {import('payload').GlobalConfig} */
export const ArtistSettings = {
  slug: "artist-settings",
  label: "Artist Settings",
  access: {
    read: () => true,
  },
  hooks: {
    afterChange: [revalidateAllPages],
  },
  fields: [
    {
      name: "artistName",
      type: "text",
      required: true,
    },
    {
      name: "tagline",
      type: "text",
    },
    {
      name: "logo",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "socialLinks",
      type: "relationship",
      relationTo: "social-links",
      hasMany: true,
    },
  ],
};
