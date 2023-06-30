import { useSelector } from "react-redux";
import { useMemo } from "react";
import { useParams } from "react-router-dom";
import {
  selectFilteredAllProducts,
  selectProductsByCategory,
} from "../../components/products/allProductsSlice";
import Products from "../../components/products/Products";

const ProductsPage = () => {
  const { category } = useParams();
  const allProducts = useSelector(selectFilteredAllProducts);
  const products = useSelector(
    useMemo(() => selectProductsByCategory(category || ""), [category])
  );
  let title;
  if (category) {
    title = category?.charAt(0).toUpperCase() + category?.slice(1);
  }

  return (
    <div>
      {category !== "all products" ? (
        <Products props={products} title={title || ""} />
      ) : (
        <Products props={allProducts} title={"All Products"} />
      )}
    </div>
  );
};

export default ProductsPage;
