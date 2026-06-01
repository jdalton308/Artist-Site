import { ecommercePlugin } from "@payloadcms/plugin-ecommerce";
import { stripeAdapter } from "@payloadcms/plugin-ecommerce/payments/stripe";
import { revalidatePath } from "next/cache";
import {
  adminOnlyFieldAccess,
  adminOrPublishedStatus,
  isAdmin,
  isDocumentOwner,
} from "../access/index.js";

function revalidateMerch() {
  revalidatePath("/merch");
}

const stripeSecretKey = process.env.STRIPE_SECRET_KEY?.trim();
const stripePublishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY?.trim();
const stripeWebhookSecret = process.env.STRIPE_WEBHOOKS_SIGNING_SECRET?.trim();

const paymentMethods = [];

if (stripeSecretKey && stripePublishableKey) {
  paymentMethods.push(
    stripeAdapter({
      secretKey: stripeSecretKey,
      publishableKey: stripePublishableKey,
      webhookSecret: stripeWebhookSecret || "",
    }),
  );
}

/** @type {import('@payloadcms/plugin-ecommerce/types').CollectionOverride} */
const productsCollectionOverride = ({ defaultCollection }) => ({
  ...defaultCollection,
  admin: {
    ...defaultCollection.admin,
    useAsTitle: "title",
    defaultColumns: ["title", "priceInUSD", "_status"],
  },
  hooks: {
    ...defaultCollection.hooks,
    afterChange: [...(defaultCollection.hooks?.afterChange || []), revalidateMerch],
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      index: true,
    },
    {
      name: "description",
      type: "textarea",
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
    },
    ...defaultCollection.fields,
  ],
});

/** @type {import('payload').Plugin[]} */
export const plugins = [
  ecommercePlugin({
    access: {
      adminOnlyFieldAccess,
      adminOrPublishedStatus,
      isAdmin,
      isDocumentOwner,
    },
    customers: {
      slug: "users",
    },
    payments: {
      paymentMethods,
    },
    products: {
      variants: false,
      productsCollectionOverride,
    },
  }),
];
