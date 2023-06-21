import React from "react";
import { useSelector } from "react-redux";
import { selectFilteredAllProducts } from "./allProductsSlice";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Product from "../product/Product";
import "./products.css";

const Products = () => {
  // const dispatch = useDispatch();
  const { isLoading } = useSelector((state: any) => state.allProducts);
  const allProducts = useSelector(selectFilteredAllProducts);
  console.log(allProducts);

  return (
    <div>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <h2>Products</h2>
      <div className="products-layout">
        {allProducts.map((product: any) => (
          <Product product={product} key={product._id} />
        ))}
      </div>
    </div>
  );
};

export default Products;
