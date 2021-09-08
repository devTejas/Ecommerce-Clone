import Head from "next/head";
import Banner from "../components/banner";
import Header from "../components/header";
import ProductFeed from "../components/ProductFeed";

export default function Home({ products }) {
  return (
    <div>
      <Head>
        <title>ShopIt</title>
      </Head>
      <Header />
      <main className="max-w-screen-2xl mx-auto bg-gray-100 md:px-12">
        <Banner />
        <ProductFeed products={products} />
      </main>
    </div>
  );
}

export const getServerSideProps = async (context) => {
  const products = await fetch("https://fakestoreapi.com/products").then(
    (res) => res.json()
  );

  // const response = await fetch("https://fakestoreapi.com/products");
  // const data = await response.json();

  return {
    props: {
      products,
    },
  };
};
