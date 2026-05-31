"use client";

import { useState, useCallback } from "react";
import Heading from "@/components/atoms/Heading/Heading";
import Text from "@/components/atoms/Text/Text";
import Icon from "@/components/atoms/Icon/Icon";
import ProductGrid from "@/components/organisms/ProductGrid/ProductGrid";
import CartDrawer from "@/components/organisms/CartDrawer/CartDrawer";
import "./MerchPageClient.css";

export default function MerchPageClient({ pageContent, products = [] }) {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleAddToCart = useCallback((product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.variantId === product.variantId);
      if (existing) {
        return prev.map((item) =>
          item.variantId === product.variantId
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [
        ...prev,
        {
          variantId: product.variantId,
          title: product.title,
          price: product.price,
          imageUrl: product.imageUrl,
          quantity: 1,
        },
      ];
    });
    setCartOpen(true);
  }, []);

  const handleRemove = useCallback((variantId) => {
    setCartItems((prev) => prev.filter((item) => item.variantId !== variantId));
  }, []);

  const handleCheckout = useCallback(async () => {
    if (!cartItems.length) return;

    setIsCheckingOut(true);

    try {
      const lines = cartItems.map((item) => ({
        merchandiseId: item.variantId,
        quantity: item.quantity,
      }));

      const response = await fetch("/api/shopify/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lines }),
      });

      const data = await response.json();

      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
      }
    } catch (error) {
      console.error("Checkout failed:", error);
    } finally {
      setIsCheckingOut(false);
    }
  }, [cartItems]);

  return (
    <div className="merch-page">
      <div className="merch-page__header">
        <div>
          <span className="section__eyebrow">Shop</span>
          <Heading size="lg">{pageContent.headline}</Heading>
          {pageContent.description && (
            <Text variant="lead">{pageContent.description}</Text>
          )}
        </div>
        <button
          type="button"
          className="merch-page__cart-btn"
          onClick={() => setCartOpen(true)}
          aria-label={`Open cart (${cartCount} items)`}
        >
          <Icon name="cart" size="lg" />
          {cartCount > 0 && <span className="merch-page__cart-count">{cartCount}</span>}
        </button>
      </div>

      <ProductGrid products={products} onAddToCart={handleAddToCart} />

      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cartItems}
        onRemove={handleRemove}
        onCheckout={handleCheckout}
        isCheckingOut={isCheckingOut}
      />
    </div>
  );
}
