import { useSession } from "next-auth/client";
import Image from "next/image";
import React from "react";
import { useSelector } from "react-redux";
import CheckoutProduct from "../components/CheckoutProduct";
import Header from "../components/header";
import { selectItems, selectNumberOfItems } from "../slices/basketSlice";

const Checkout = () => {
  const items = useSelector(selectItems);
  const numberOfItems = useSelector(selectNumberOfItems);
  const cartItems = [];
  for (const key in items) {
    if (Object.hasOwnProperty.call(items, key)) {
      const cartProduct = items[key];
      cartItems.push(cartProduct);
    }
  }

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
          </div>
          {cartItems.map((item) => (
            <CheckoutProduct key={item.id} {...item} />
          ))}
        </div>
        {/* Right Side */}
        <div>
          {numberOfItems > 0 && (
            <div>
              <h2 className="whitespace-nowrap">
                SubTotal ({numberOfItems} items)
                <span className="font-bold">{/* Currency */}</span>
                <button>
                  {!session ? "Sign In to Checkout" : "Proceed to checkout"}
                </button>
              </h2>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Checkout;
