import React from "react";
import Image from "next/image";
import Product from "./Product";

const ProductFeed = ({ products }) => {
  return (
    // <div className="grid grid-cols-4 gap-4 p-4 bg-gray-100">
    <div className="grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:-mt-52 sm:-mt-32 xs:-mt-20 mx-auto">
      {/* { id, title, description, price, category, image } */}
      {products
        .slice(0, 4)
        .map(({ id, title, description, price, category, image }) => {
          return (
            <Product
              key={id}
              title={title}
              description={description}
              image={image}
              price={price}
              category={category}
            />
          );
        })}
      <img src="/assets/ad.jpg" className="md:col-span-full mx-auto" />
      <div className="md:col-span-2">
        {products
          .slice(4, 5)
          .map(({ id, title, description, price, category, image }) => {
            return (
              <Product
                key={id}
                title={title}
                description={description}
                image={image}
                price={price}
                category={category}
              />
            );
          })}
      </div>
      {products
        .slice(5)
        .map(({ id, title, description, price, category, image }) => {
          return (
            <Product
              key={id}
              title={title}
              description={description}
              image={image}
              price={price}
              category={category}
            />
          );
        })}
    </div>
  );
};

export default ProductFeed;
