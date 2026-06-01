import { revalidateContent } from "../hooks/revalidateContent.js";

/** @type {import('payload').GlobalConfig} */
export const HomePage = {
  slug: "home-page",
  label: "Home Page",
  access: {
    read: () => true,
  },
  hooks: {
    afterChange: [revalidateContent(["/"])],
  },
  fields: [
    {
      name: "heroHeadline",
      type: "text",
      required: true,
    },
    {
      name: "heroSubheadline",
      type: "textarea",
    },
    {
      name: "heroImage",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "heroCtaLabel",
      type: "text",
      defaultValue: "Listen Now",
    },
    {
      name: "heroCtaUrl",
      type: "text",
      defaultValue: "/music",
    },
    {
      name: "latestRelease",
      type: "relationship",
      relationTo: "releases",
    },
  ],
};
