import React from "react";
import Products from "../components/products/Products";

type Props = {};

const Home = (props: Props) => {
  return (
    <div>
      <h2>Banner</h2>
      <Products />
    </div>
  );
};

export default Home;
