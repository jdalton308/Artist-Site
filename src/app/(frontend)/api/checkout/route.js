import { NextResponse } from "next/server";
import { createCheckoutCart } from "@/lib/payload/checkout";

export async function POST(request) {
  try {
    const { lines } = await request.json();

    if (!lines?.length) {
      return NextResponse.json({ message: "Cart is empty" }, { status: 400 });
    }

    const cart = await createCheckoutCart(lines);

    return NextResponse.json({
      checkoutUrl: cart.checkoutUrl,
      cartId: cart.id,
      total: cart.total,
      currencyCode: cart.currencyCode,
      isMock: cart.isMock ?? false,
    });
  } catch (error) {
    return NextResponse.json(
      { message: error.message || "Checkout failed" },
      { status: 500 },
    );
  }
}
