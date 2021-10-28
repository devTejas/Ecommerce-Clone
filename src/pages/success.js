import { useRouter } from "next/router";
import React from "react";
import Header from "../components/header";

const Success = () => {
  const router = useRouter();
  return (
    <div className="bg-gray-100 h-screen font-poppins">
      <Header />
      <main className="max-w-screen-lg mx-auto">
        <div className="flex flex-col p-10 bg-white">
          <div className="flex items-center space-x-2 mb-5">
            <h1 className="text-3xl">
              Thank you, your order has been confirmed!
            </h1>
          </div>
          <p>
            Thank you for shopping with us. To check the status of your order's
            please click below
          </p>
          <button
            onClick={() => router.push("/orders")}
            className="button mt-8"
          >
            Go to my Orders
          </button>
        </div>
      </main>
    </div>
  );
};

export default Success;
