import { useSelector } from "react-redux";
import { ProductType } from "./allProductsSlice";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Product from "../product/Product";
import "./products.css";
import { RootState } from "../../store";
interface ProductsProps {
  props: ProductType[];
  title: string;
}

const Products = ({ props, title }: ProductsProps) => {
  const { isLoading } = useSelector((state: RootState) => state.allProducts);

  // console.log(props);

  return (
    <div className="products-component">
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <h2 className="products-title">{title}</h2>
      <div className="products-layout">
        {props.map((product: ProductType) => (
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
