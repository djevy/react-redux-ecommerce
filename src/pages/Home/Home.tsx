import { useMemo } from "react";
import Products from "../../components/products/Products";
import Banner from "../../components/banner/Banner";
import {
  selectFilteredAllProducts,
  selectProductsByCategory,
  selectProductsByCollection,
} from "../../components/products/allProductsSlice";
import { useSelector } from "react-redux";
import ProductsCarousel from "../../components/productsCarousel/ProductsCarousel";

const Home = () => {
  const allProducts = useSelector(selectFilteredAllProducts);
  const hatProducts = useSelector(
    useMemo(() => selectProductsByCategory("hats"), [])
  );
  const weddingProducts = useSelector(
    useMemo(() => selectProductsByCollection("wedding"), [])
  );
  // console.log("hats", hatProducts);
  return (
    <div>
      <Banner />
      {/* <Products props={allProducts} title={"All Products"}/> */}
      <ProductsCarousel props={allProducts} title={"All Products"} />
      <ProductsCarousel props={weddingProducts} title={"Wedding Collection"} />
      <ProductsCarousel props={hatProducts} title={"Hats"} />
    </div>
  );
};

export default Home;
