import React from "react";
import { useSelector } from "react-redux";
import { ProductType, selectFilteredAllProducts } from "./allProductsSlice";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Product from "../product/Product";
import "./products.css";
import { RootState } from "../../store";

const Products = () => {
  // const dispatch = useDispatch();
  const { isLoading } = useSelector((state: RootState) => state.allProducts);
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
        {allProducts.map((product: ProductType) => (
          <Product
            key={product._id}
            image={product.image}
            name={product.name}
            _id={product._id}
            slug={product.slug}
            details={product.details}
            price={product.price}
          />
        ))}
      </div>
    </div>
  );
};

export default Products;
