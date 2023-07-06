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
  const shoeProducts = useSelector(
    useMemo(() => selectProductsByCategory("shoes"), [])
  );
  const summerProducts = useSelector(
    useMemo(() => selectProductsByCollection("summer"), [])
  );
  const weddingProducts = useSelector(
    useMemo(() => selectProductsByCollection("wedding"), [])
  );
  const gymProducts = useSelector(
    useMemo(() => selectProductsByCollection("gym wear"), [])
  );

  return (
    <div>
      <Banner />
      <ProductsCarousel props={allProducts} title={"All Products"} type="category"/>
      <ProductsCarousel props={gymProducts} title={"Gym"} type="collection"/>
      <ProductsCarousel props={summerProducts} title={"Summer"} type="collection"/>
      <ProductsCarousel props={weddingProducts} title={"Wedding"} type="collection"/>
      <ProductsCarousel props={shoeProducts} title={"Shoes"} type="category"/>
    </div>
  );
};

export default Home;
