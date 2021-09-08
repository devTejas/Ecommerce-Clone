import React, { useEffect } from "react";
import Image from "next/image";

const Product = (props) => {
  const { title, description, price, category, image } = props;
  let random = Math.random();
  useEffect(() => {}, []);
  return (
    <div className="relative flex flex-col m-5 z=30 p-10 text-sm text-gray-600 bg-white">
      <p className="absolute text-xs top-2 right-2">{category}</p>
      <Image
        loading="lazy"
        src={image}
        alt={title}
        width={100}
        height={170}
        objectFit="contain"
      />
      <p className="font-bold text-black overflow-ellipsis">{title}</p>
      <p>⭐{"⭐".repeat(Math.round(random * 4))}</p>
      <p className="text-xs my-2 text-gray-500 line-clamp-2">{description}</p>
      <p className="mb-5">Rs.{price}(₹)</p>
      {random < 0.5 && <p className="text-xs space-x-2 -mt-5">Prime</p>}
      <button className="mt-auto button">Add to Cart</button>
    </div>
  );
};

export default Product;
