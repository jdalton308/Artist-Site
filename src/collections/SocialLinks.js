/** @type {import('payload').CollectionConfig} */
export const SocialLinks = {
  slug: "social-links",
  admin: {
    useAsTitle: "platform",
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "platform",
      type: "select",
      required: true,
      options: [
        { label: "Instagram", value: "instagram" },
        { label: "TikTok", value: "tiktok" },
        { label: "Spotify", value: "spotify" },
        { label: "YouTube", value: "youtube" },
      ],
    },
    {
      name: "url",
      type: "text",
      required: true,
    },
    {
      name: "label",
      type: "text",
    },
  ],
};
