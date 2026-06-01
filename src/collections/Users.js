/** @type {import('payload').CollectionConfig} */
export const Users = {
  slug: "users",
  auth: true,
  admin: {
    useAsTitle: "email",
  },
  fields: [
    {
      name: "roles",
      type: "select",
      hasMany: true,
      defaultValue: ["customer"],
      options: [
        { label: "Admin", value: "admin" },
        { label: "Customer", value: "customer" },
      ],
    },
  ],
};
