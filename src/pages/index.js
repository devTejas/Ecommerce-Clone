import Head from "next/head";
import Banner from "../components/Banner";
import Header from "../components/Header";
import ProductFeed from "../components/ProductFeed";

export default function Home({ products }) {
  return (
    <div className="font-poppins">
      <Head>
        <title>ShopIt</title>
        {/* <link
          href="https://fontless-zeta.vercel.app/css?family=Poppins:ital,wght@0,400&display=swap"
          rel="stylesheet"
        /> */}
        <link
          rel="preload"
          href="/fonts/Poppins/Poppins-Regular.ttf"
          as="font"
          crossOrigin=""
        />
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
