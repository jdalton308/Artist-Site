import { revalidateContent } from "../hooks/revalidateContent.js";

/** @type {import('payload').GlobalConfig} */
export const MerchPage = {
  slug: "merch-page",
  label: "Merch Page",
  access: {
    read: () => true,
  },
  hooks: {
    afterChange: [revalidateContent(["/merch"])],
  },
  fields: [
    {
      name: "headline",
      type: "text",
      required: true,
      defaultValue: "Official Merch",
    },
    {
      name: "description",
      type: "textarea",
    },
  ],
};
