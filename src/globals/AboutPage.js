import { revalidateContent } from "../hooks/revalidateContent.js";

/** @type {import('payload').GlobalConfig} */
export const AboutPage = {
  slug: "about-page",
  label: "About Page",
  access: {
    read: () => true,
  },
  hooks: {
    afterChange: [revalidateContent(["/about"])],
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "intro",
      type: "textarea",
    },
    {
      name: "body",
      type: "richText",
    },
    {
      name: "photos",
      type: "upload",
      relationTo: "media",
      hasMany: true,
    },
    {
      name: "labelName",
      type: "text",
    },
    {
      name: "soundDescription",
      type: "textarea",
    },
    {
      name: "goals",
      type: "textarea",
    },
  ],
};
