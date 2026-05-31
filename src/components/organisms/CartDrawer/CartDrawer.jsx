"use client";

import { useEffect } from "react";
import Button from "@/components/atoms/Button/Button";
import Icon from "@/components/atoms/Icon/Icon";
import CartItem from "@/components/molecules/CartItem/CartItem";
import "./CartDrawer.css";

export default function CartDrawer({
  isOpen,
  onClose,
  items = [],
  onRemove,
  onCheckout,
  isCheckingOut = false,
}) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const total = items.reduce(
    (sum, item) => sum + parseFloat(item.price) * item.quantity,
    0,
  );

  if (!isOpen) return null;

  return (
    <>
      <div className="cart-drawer__overlay" onClick={onClose} aria-hidden="true" />
      <aside className="cart-drawer" role="dialog" aria-label="Shopping cart">
        <div className="cart-drawer__header">
          <h2 className="cart-drawer__title">Cart</h2>
          <button type="button" className="cart-drawer__close" onClick={onClose} aria-label="Close cart">
            <Icon name="close" size="md" />
          </button>
        </div>

        <div className="cart-drawer__body">
          {items.length === 0 ? (
            <p className="cart-drawer__empty">Your cart is empty.</p>
          ) : (
            items.map((item) => (
              <CartItem key={item.variantId} item={item} onRemove={onRemove} />
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="cart-drawer__footer">
            <div className="cart-drawer__total">
              <span>Total</span>
              <span>${total.toFixed(2)} USD</span>
            </div>
            <Button
              variant="primary"
              size="lg"
              onClick={onCheckout}
              disabled={isCheckingOut}
              className="cart-drawer__checkout"
            >
              {isCheckingOut ? "Redirecting…" : "Checkout with Shopify"}
            </Button>
            <p className="cart-drawer__note">
              You&apos;ll be redirected to Shopify to complete your purchase.
            </p>
          </div>
        )}
      </aside>
    </>
  );
}
