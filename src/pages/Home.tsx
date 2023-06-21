import React from "react";
import Products from "../components/products/Products";
import Search from "../components/search/Search";

type Props = {};

const Home = (props: Props) => {
  return (
    <div>
      <h1>Menswear</h1>
      <Search />
      <Products />
    </div>
  );
};

export default Home;
