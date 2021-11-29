import { signIn, signOut, useSession } from "next-auth/client";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectItems, selectNumberOfItems } from "../slices/basketSlice";

const Header = () => {
  const [session] = useSession();
  const router = useRouter();
  const [darkMode, setDarkMode] = useState(true);

  const numberOfItems = useSelector(selectNumberOfItems);
  // console.log(numberOfItems, useSelector(selectItems));

  const items = useSelector(selectItems);

  const dispatch = useDispatch();

  useEffect(() => {
    // let localStorageItems = JSON.parse(localStorage.getItem("items"));
    // console.log(
    //   localStorage.getItem("items"),
    //   JSON.parse(localStorage.getItem("items"))
    // );
    // if (!items) {
    //   localStorageItems.map((item) => dispatch(addToBasket(item)));
    // }
  }, [items]);

  // changing from darkmode to lightmode
  const switchTheme = () => {
    setDarkMode(!darkMode);
    darkMode === false && localStorage.setItem("theme", "light");
  };

  return (
    <header className="text-shopit_orange sticky top-0 z-50 dark:border-b-2 dark:border-shopit_orange">
      <div className=" flex items-center bg-shopit_blue p-1 py-2 flex-grow">
        <div className="mt-2 flex items-center sm::flex-grow-0 flex-grow">
          <div
            className="flex flex-col cursor-pointer mx-2"
            onClick={() => router.push("/")}
          >
            <img
              className="w-7 mx-2"
              src="/assets/shopping-bag(4).svg"
              alt="Logo"
            />
            <span className="text-center font-bold">ShopIt</span>
          </div>
          {/* <div className="hidden sm:flex items-center h-10 rounded-md flex-grow cursor-pointer bg-yellow-400 hover:bg-yellow-500">
            <input
              type="search"
              className="p-2 h-full w-6 flex-grow flex-shrink rounded-l-md focus:outline-none px-4 border-2 dark:border-white dark:bg-black"
              name="search"
              placeholder="Search your item"
            />
            <button className="h-12 px-3">🔍</button>
          </div> */}
        </div>
        <div className="flex items-center justify-evenly text-xs space-x-6 mx-6 whitespace-nowrap">
          <div className="link" onClick={session?.user ? signOut : signIn}>
            <p className="font-extrabold md:text-sm">{`Hello, ${
              session?.user ? session.user?.name : "Guest"
            }`}</p>
            <p className="font-extrabold md:text-sm">{`Sign ${
              session?.user ? "Out" : "In"
            }`}</p>
          </div>
          <div className="link" onClick={() => router.push("/orders")}>
            <p className="font-extrabold md:text-sm">Orders</p>
          </div>
          <div
            className="link flex items-center"
            onClick={() => router.push("/checkout")}
          >
            <div className="relative">
              <span className="absolute top-0 right-0 left-4 md:right-10 h-4 w-4 bg-yellow-400 text-center rounded-full text-black font-bold">
                {numberOfItems}
              </span>
              <img
                className="max-w-none"
                src="/assets/shopping-cart(4).svg"
                alt="Cart"
              />
            </div>
            <p className="link hidden sm:inline font-extrabold md:text-sm mt-2">
              Cart
            </p>
          </div>
          <div
            className="link hover:bg-shopit_orange rounded-md"
            onClick={switchTheme}
          >
            {darkMode ? (
              <img
                className="hover:bg-shopit_orange"
                src={`assets/sun2.svg`}
                alt=""
              />
            ) : (
              <img
                className="hover:bg-shopit_orange"
                src={`assets/moon2.svg`}
                alt=""
              />
            )}
          </div>
        </div>
      </div>
      {/* <div className="flex items-center space-x-3 p-2 pl-6 bg-shopit_blue-light text-sm">
        <p className="link flex items-center">
          <img className="mr-1" src="/assets/menu.svg" alt="Menu" />
          All
        </p>
        <p className="link">Today's Deals</p>
        <p className="link">Sell</p>
        <p className="hidden link sm:inline-flex">Customer Service</p>
        <p className="hidden link sm:inline-flex">Registry</p>
        <p className="hidden link sm:inline-flex">Gift Cards</p>
        <p className="hidden link md:inline-flex">Mobiles</p>
        <p className="hidden link md:inline-flex">Computers</p>
        <p className="hidden link lg:inline-flex">Electronics</p>
        <p className="hidden link lg:inline-flex">Crafts</p>
        <p className="hidden link lg:inline-flex">Arts</p>
      </div> */}
    </header>
  );
};

export default Header;
