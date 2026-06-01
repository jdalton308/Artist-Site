import { revalidateContent } from "../hooks/revalidateContent.js";

/** @type {import('payload').CollectionConfig} */
export const TourDates = {
  slug: "tour-dates",
  admin: {
    useAsTitle: "city",
    defaultColumns: ["date", "city", "venue"],
  },
  access: {
    read: () => true,
  },
  hooks: {
    afterChange: [revalidateContent(["/", "/live"])],
  },
  fields: [
    {
      name: "date",
      type: "date",
      required: true,
    },
    {
      name: "city",
      type: "text",
      required: true,
    },
    {
      name: "venue",
      type: "text",
      required: true,
    },
    {
      name: "country",
      type: "text",
    },
    {
      name: "ticketUrl",
      type: "text",
    },
    {
      name: "isPast",
      type: "checkbox",
      defaultValue: false,
    },
  ],
};
