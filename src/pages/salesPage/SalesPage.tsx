import { useSelector } from "react-redux";
import "./salesPage.css";
import { useMemo } from "react";
import {
  // productDealTypes,
  selectAllDealProducts,
  selectProductsByDeals,
} from "../../components/products/allProductsSlice";
import ProductsCarousel from "../../components/productsCarousel/ProductsCarousel";

const CheckoutPage = () => {
  // const dealTypes = useSelector(productDealTypes);
  const allDeals = useSelector(selectAllDealProducts);
  // console.log(dealTypes);
  // console.log(allDeals);
  const deal10 = useSelector(useMemo(() => selectProductsByDeals(10), []));
  const deal20 = useSelector(useMemo(() => selectProductsByDeals(20), []));
  const deal30 = useSelector(useMemo(() => selectProductsByDeals(30), []));
  const deal60 = useSelector(useMemo(() => selectProductsByDeals(60), []));
  return (
    <div>
      <h3 id="sales-title">Sales</h3>
      <ProductsCarousel props={allDeals} title={"All Deals"} type="category"/>
      <ProductsCarousel props={deal10} title={"10% off"} type="category" />
      <ProductsCarousel props={deal20} title={"20% off"} type="category" />
      <ProductsCarousel props={deal30} title={"30% off"} type="category" />
      <ProductsCarousel props={deal60} title={"60% off"} type="category" />
    </div>
  );
};

export default CheckoutPage;
