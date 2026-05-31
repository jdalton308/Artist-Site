export const PLACEHOLDER_PRODUCTS = [
  {
    id: "gid://shopify/Product/1",
    title: "Tour Tee — Black",
    handle: "tour-tee-black",
    description: "Premium heavyweight cotton tee with tour dates on the back.",
    price: "35.00",
    currencyCode: "USD",
    imageUrl: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=600&fit=crop",
    variantId: "gid://shopify/ProductVariant/1",
  },
  {
    id: "gid://shopify/Product/2",
    title: "Signed Vinyl — Afterglow EP",
    handle: "signed-vinyl-afterglow",
    description: "Limited edition 12\" vinyl, hand-signed. Includes digital download.",
    price: "45.00",
    currencyCode: "USD",
    imageUrl: "https://images.unsplash.com/photo-1603048588665-791ca8aea617?w=600&h=600&fit=crop",
    variantId: "gid://shopify/ProductVariant/2",
  },
];

export function isShopifyConfigured() {
  return Boolean(
    process.env.SHOPIFY_STORE_DOMAIN?.trim() &&
      process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN?.trim(),
  );
}

function getStorefrontUrl() {
  const domain = process.env.SHOPIFY_STORE_DOMAIN?.trim();
  const token = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN?.trim();

  if (!domain || !token) {
    throw new Error(
      "Missing Shopify credentials. Set SHOPIFY_STORE_DOMAIN and SHOPIFY_STOREFRONT_ACCESS_TOKEN.",
    );
  }

  return {
    endpoint: `https://${domain}/api/2024-10/graphql.json`,
    token,
  };
}

const PRODUCTS_QUERY = `
  query Products {
    products(first: 10) {
      edges {
        node {
          id
          title
          handle
          description
          featuredImage {
            url
            altText
          }
          variants(first: 1) {
            edges {
              node {
                id
                price {
                  amount
                  currencyCode
                }
              }
            }
          }
        }
      }
    }
  }
`;

const CART_CREATE_MUTATION = `
  mutation CartCreate($lines: [CartLineInput!]!) {
    cartCreate(input: { lines: $lines }) {
      cart {
        id
        checkoutUrl
        lines(first: 20) {
          edges {
            node {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                  title
                  product {
                    title
                    featuredImage {
                      url
                    }
                  }
                  price {
                    amount
                    currencyCode
                  }
                }
              }
            }
          }
        }
        cost {
          totalAmount {
            amount
            currencyCode
          }
        }
      }
      userErrors {
        field
        message
      }
    }
  }
`;

function mapShopifyProduct(node) {
  const variant = node.variants?.edges?.[0]?.node;
  return {
    id: node.id,
    title: node.title,
    handle: node.handle,
    description: node.description || "",
    price: variant?.price?.amount || "0.00",
    currencyCode: variant?.price?.currencyCode || "USD",
    imageUrl: node.featuredImage?.url || null,
    variantId: variant?.id || null,
  };
}

async function shopifyFetch(query, variables = {}) {
  const { endpoint, token } = getStorefrontUrl();

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": token,
    },
    body: JSON.stringify({ query, variables }),
    next: { revalidate: 3600 },
  });

  const json = await response.json();

  if (json.errors?.length) {
    throw new Error(json.errors[0].message);
  }

  return json.data;
}

export async function getProducts() {
  if (!isShopifyConfigured()) {
    return PLACEHOLDER_PRODUCTS;
  }

  try {
    const data = await shopifyFetch(PRODUCTS_QUERY);
    const products = data.products.edges.map(({ node }) => mapShopifyProduct(node));
    return products.length ? products : PLACEHOLDER_PRODUCTS;
  } catch {
    return PLACEHOLDER_PRODUCTS;
  }
}

export async function createCheckoutCart(lines) {
  if (!isShopifyConfigured()) {
    const total = lines.reduce((sum, line) => {
      const product = PLACEHOLDER_PRODUCTS.find((p) => p.variantId === line.merchandiseId);
      return sum + parseFloat(product?.price || "0") * line.quantity;
    }, 0);

    return {
      id: "mock-cart-id",
      checkoutUrl: "https://checkout.shopify.com",
      total: total.toFixed(2),
      currencyCode: "USD",
      isMock: true,
    };
  }

  const data = await shopifyFetch(CART_CREATE_MUTATION, { lines });
  const cart = data.cartCreate.cart;

  return {
    id: cart.id,
    checkoutUrl: cart.checkoutUrl,
    total: cart.cost.totalAmount.amount,
    currencyCode: cart.cost.totalAmount.currencyCode,
    isMock: false,
  };
}
