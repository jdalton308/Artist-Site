import { revalidateContent } from "../hooks/revalidateContent.js";

/** @type {import('payload').CollectionConfig} */
export const Releases = {
  slug: "releases",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "releaseDate"],
  },
  access: {
    read: () => true,
  },
  hooks: {
    afterChange: [revalidateContent(["/", "/music"])],
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "releaseDate",
      type: "date",
      required: true,
    },
    {
      name: "coverArt",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "embedUrl",
      type: "text",
    },
    {
      name: "description",
      type: "textarea",
    },
    {
      name: "streamingLinks",
      type: "group",
      fields: [
        { name: "spotify", type: "text" },
        { name: "apple", type: "text" },
        { name: "youtube", type: "text" },
        { name: "tidal", type: "text" },
        { name: "bandcamp", type: "text" },
      ],
    },
  ],
};
