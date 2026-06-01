import config from "@payload-config";
import { getPayload } from "payload";
import { isPayloadConfigured, isStripeConfigured } from "./client.js";
import { PLACEHOLDER_PRODUCTS } from "./constants.js";

async function getLineTotal(payload, line) {
  try {
    const product = await payload.findByID({
      collection: "products",
      id: line.productId,
    });
    const priceCents = product?.priceInUSD ?? 0;
    return (priceCents / 100) * line.quantity;
  } catch {
    const fallback = PLACEHOLDER_PRODUCTS.find((p) => p.variantId === line.productId);
    return parseFloat(fallback?.price || "0") * line.quantity;
  }
}

export async function createCheckoutCart(lines) {
  if (!isPayloadConfigured()) {
    const total = lines.reduce((sum, line) => {
      const product = PLACEHOLDER_PRODUCTS.find((p) => p.variantId === line.productId);
      return sum + parseFloat(product?.price || "0") * line.quantity;
    }, 0);

    return {
      id: "mock-cart-id",
      checkoutUrl: null,
      total: total.toFixed(2),
      currencyCode: "USD",
      isMock: true,
    };
  }

  const payload = await getPayload({ config });

  const items = lines.map((line) => ({
    product: line.productId,
    quantity: line.quantity,
  }));

  const cart = await payload.create({
    collection: "carts",
    data: {
      items,
      currency: "USD",
    },
  });

  let total = 0;
  for (const line of lines) {
    total += await getLineTotal(payload, line);
  }

  if (!isStripeConfigured()) {
    return {
      id: cart.id,
      checkoutUrl: null,
      total: total.toFixed(2),
      currencyCode: "USD",
      isMock: true,
    };
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const checkoutUrl = `${siteUrl.replace(/\/$/, "")}/checkout?cart=${cart.id}`;

  return {
    id: cart.id,
    checkoutUrl,
    total: total.toFixed(2),
    currencyCode: "USD",
    isMock: false,
  };
}
