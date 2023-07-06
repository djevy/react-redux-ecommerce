import { useSelector } from "react-redux";
import { Carousel } from "@trendyol-js/react-carousel";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Product from "../product/Product";
import "./productsCarousel.css";
import { RootState } from "../../store";
import { ProductType } from "../products/allProductsSlice";
import { Link } from "react-router-dom";
import { scrollToTop } from "../../utils/ScrollToTop";

interface ProductsProps {
  props: ProductType[];
  title: string;
  type: string;
}

const ProductsCarousel = ({ props, title, type }: ProductsProps) => {
  const { isLoading } = useSelector((state: RootState) => state.allProducts);

  return (
    <div className="products-carousel-component">
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

{     type ==="category" ? <Link to={`/products/${title.toLowerCase()}`} onClick={scrollToTop}>
        <h2 className="products-carousel-title">{title}</h2>
      </Link> : <Link to={`/collections/${title.toLowerCase()}`} onClick={scrollToTop}>
        <h2 className="products-carousel-title">{title} Collection</h2>
      </Link>}
      {props.length > 1 ? (
        <div>
          <Box sx={{ display: { xs: "block", sm: "none" } }}>
            {isLoading ? (
              <CircularProgress />
            ) : (
              <Carousel
                show={1}
                slide={1}
                swiping={true}
                useArrowKeys={true}
                leftArrow={<ArrowBackIosIcon />}
                rightArrow={<ArrowForwardIosIcon />}
                responsive={true}
              >
                {props.map((product: ProductType) => (
                  <Product
                    key={product._id}
                    image={product.image}
                    name={product.name}
                    _id={product._id}
                    slug={product.slug}
                    details={product.details}
                    price={product.price}
                    dealPrice={product.dealPrice}
                  />
                ))}
              </Carousel>
            )}
          </Box>
          <Box sx={{ display: { xs: "none", sm: "block", lg: "none" } }}>
            {isLoading ? (
              <CircularProgress />
            ) : (
              <Carousel
                show={3}
                slide={1}
                swiping={true}
                useArrowKeys={true}
                leftArrow={<ArrowBackIosIcon />}
                rightArrow={<ArrowForwardIosIcon />}
                responsive={true}
              >
                {props.map((product: ProductType) => (
                  <Product
                    key={product._id}
                    image={product.image}
                    name={product.name}
                    _id={product._id}
                    slug={product.slug}
                    details={product.details}
                    price={product.price}
                    dealPrice={product.dealPrice}
                  />
                ))}
              </Carousel>
            )}
          </Box>
          <Box sx={{ display: { xs: "none", lg: "block" } }}>
            {isLoading ? (
              <CircularProgress />
            ) : (
              <Carousel
                show={4}
                slide={1}
                swiping={true}
                useArrowKeys={true}
                leftArrow={<ArrowBackIosIcon />}
                rightArrow={<ArrowForwardIosIcon />}
                responsive={true}
              >
                {props.map((product: ProductType) => (
                  <Product
                    key={product._id}
                    image={product.image}
                    name={product.name}
                    _id={product._id}
                    slug={product.slug}
                    details={product.details}
                    price={product.price}
                    dealPrice={product.dealPrice}
                  />
                ))}
              </Carousel>
            )}
          </Box>
        </div>
      ) : (
        <div className="single-product">
          {props.map((product: ProductType) => (
            <Product
              key={product._id}
              image={product.image}
              name={product.name}
              _id={product._id}
              slug={product.slug}
              details={product.details}
              price={product.price}
              dealPrice={product.dealPrice}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductsCarousel;
