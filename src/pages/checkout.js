import { useSession } from "next-auth/client";
import Image from "next/image";
import React from "react";
import { useSelector } from "react-redux";
import CheckoutProduct from "../components/CheckoutProduct";
import Header from "../components/header";
import { selectItems, selectNumberOfItems } from "../slices/basketSlice";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";

const stripePromise = loadStripe(process.env.stripe_public_key);

const Checkout = () => {
  const items = useSelector(selectItems);
  const numberOfItems = useSelector(selectNumberOfItems);
  const cartItems = [];
  let totalPrice = 0;
  for (const key in items) {
    if (Object.hasOwnProperty.call(items, key)) {
      const cartProduct = items[key];
      cartItems.push(cartProduct);
      totalPrice += cartProduct.price * cartProduct.count;
    }
  }

  const createCheckoutSession = async () => {
    const stripe = await stripePromise;

    // call the backend to create a checkout session...
    const checkoutSession = await axios.post("/api/create-checkout-session", {
      items: items,
      email: session.user.email,
    });

    // redirect user to stripe checkout
    const result = await stripe.redirectToCheckout({
      sessionId: checkoutSession.data.id,
    });

    if (result.error) alert(result.error.message);
  };

  const [session] = useSession();

  return (
    <div className="bg-gray-100 font-poppins">
      <Header />
      <main className="lg:flex max-w-screen-2xl mx-auto">
        {/* Left Side */}
        <div className="flex-grow m-5 shadow-sm">
          <Image
            src="/assets/ad.jpg"
            width={1020}
            height={250}
            objectFit="contain"
          />

          <div className="flex flex-col p-5 space-y-10 bg-white">
            <h1 className="text-3xl border-b pb-4">
              {numberOfItems ? "Your Shopping Cart" : "Cart is Empty!"}
            </h1>
            {cartItems.map((item) => (
              <CheckoutProduct key={item.id} {...item} />
            ))}
          </div>
        </div>
        {/* Right Side */}
        {numberOfItems > 0 && (
          <div className="flex flex-col bg-white p-10 shadow-md">
            <h2 className="whitespace-nowrap">
              SubTotal ({numberOfItems} items)
              <span className="font-bold">Rs. {totalPrice.toFixed(2)} (₹)</span>
            </h2>

            <button
              role="link"
              disabled={!session}
              className={`button mt-2 ${
                !session &&
                "from-gray-300 to-gray-500 border-gray-200 text-gray-300 cursor-not-allowed"
              }`}
              onClick={createCheckoutSession}
            >
              {!session ? "Sign In to Checkout" : "Proceed to checkout"}
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default Checkout;
