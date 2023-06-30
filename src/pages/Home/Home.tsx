import { useMemo } from "react";
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
  const jacketProducts = useSelector(
    useMemo(() => selectProductsByCategory("jackets"), [])
  );
  const summerProducts = useSelector(
    useMemo(() => selectProductsByCollection("summer"), [])
  );
  const weddingProducts = useSelector(
    useMemo(() => selectProductsByCollection("wedding"), [])
  );
  // console.log("jackets", jacketProducts);
  return (
    <div>
      <Banner />
      <ProductsCarousel props={allProducts} title={"All Products"} type="category"/>
      <ProductsCarousel props={weddingProducts} title={"Wedding"} type="collection"/>
      <ProductsCarousel props={summerProducts} title={"Summer"} type="collection"/>
      <ProductsCarousel props={jacketProducts} title={"Jackets"} type="category"/>
    </div>
  );
};

export default Home;
