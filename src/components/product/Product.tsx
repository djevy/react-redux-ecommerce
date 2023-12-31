import { useDispatch, useSelector } from "react-redux";
import { urlFor } from "../../client";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Tooltip from "@mui/material/Tooltip";

import "./product.css";
import { ProductType } from "../products/allProductsSlice";
import {
  addFavoriteProduct,
  removeFavoriteProduct,
  selectFavoriteProducts,
} from "../favorites/favoriteProductsSlice";
import { scrollToTop } from "../../utils/ScrollToTop";

const Product = (product: ProductType) => {
  const dispatch = useDispatch();
  const onAddFavoriteProductHandler = (product: ProductType) => {
    dispatch(addFavoriteProduct(product));
  };
  const onRemoveFavoriteProductHandler = (product: ProductType) => {
    dispatch(removeFavoriteProduct(product));
  };
  const favoriteProducts = useSelector(selectFavoriteProducts);

  // console.log(product);
  return (
    <div className="product-card">
      <Link to={`/product/${product.slug.current}`} onClick={scrollToTop}>
        <img
          className="product-image"
          src={urlFor(product.image && product.image[0])?.url()}
          alt={product.name}
          loading="lazy"
        />
        <div className="card-content">
          <Typography gutterBottom variant="h5" component="div">
            {product.name}
          </Typography>
          {product.dealPrice ? (
            <div className="product-prices">
              <Typography className="product-price old-price">
                £{product.price.toFixed(2)}
              </Typography>
              <Typography className="product-price">
                £{product.dealPrice}
              </Typography>
            </div>
          ) : (
            <Typography className="product-price">
              £{product.price.toFixed(2)}
            </Typography>
          )}
        </div>
      </Link>

      <div className="product-favorite-button">
        {favoriteProducts.find(
          (favoriteProduct) => favoriteProduct._id === product._id
        ) ? (
          <Tooltip title="Remove from favorites">
            <IconButton
              aria-label="add to favorites"
              color="error"
              onClick={() => onRemoveFavoriteProductHandler(product)}
            >
              <FavoriteIcon fontSize="large" />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Add to favorites">
            <IconButton
              aria-label="add to favorites"
              onClick={() => onAddFavoriteProductHandler(product)}
            >
              <FavoriteBorderIcon fontSize="large" />
            </IconButton>
          </Tooltip>
        )}
      </div>
    </div>
  );
};

export default Product;
