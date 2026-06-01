/** @type {import('payload').CollectionConfig} */
export const Media = {
  slug: "media",
  access: {
    read: () => true,
  },
  upload: true,
  fields: [
    {
      name: "alt",
      type: "text",
      required: true,
    },
  ],
};
