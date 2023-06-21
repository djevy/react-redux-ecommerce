import React from "react";
import { useSelector } from "react-redux";
import { selectFilteredAllProducts } from "./allProductsSlice";
import Spinner from "../spinner/Spinner";
import Product from "../product/Product";

const Products = () => {
  // const dispatch = useDispatch();
  const { isLoading } = useSelector((state: any) => state.allProducts);
  const allProducts = useSelector(selectFilteredAllProducts);
  console.log(allProducts);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div>
      <h2>Products</h2>
      {allProducts.map((product: any) => (
        <Product product={product} key={product._id}/>
      ))}
    </div>
  );
};

export default Products;
