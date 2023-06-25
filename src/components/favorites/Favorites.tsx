import React from "react";
import "./favorites.css";
import {
  selectFavoriteProducts,
  removeFavoriteProduct,
} from "./favoriteProductsSlice";
import { useDispatch, useSelector } from "react-redux";
import { ProductType } from "../products/allProductsSlice";
import { CircularProgress, IconButton, Tooltip } from "@mui/material";
import Divider from "@mui/material/Divider";
import HeartBrokenIcon from "@mui/icons-material/HeartBroken";
import { Link } from "react-router-dom";
import { urlFor } from "../../client";

const Favorites = () => {
  const dispatch = useDispatch();
  const favoriteProducts = useSelector(selectFavoriteProducts);

  const onRemoveFavoriteProductHandler = (product: ProductType) => {
    dispatch(removeFavoriteProduct(product));
  };

  return (
    <div className="favorites-container">
      <h3 className="favorites-title">Favorite Products</h3>
      <Divider />
      {favoriteProducts.length > 0 ? (
        favoriteProducts.map((product: ProductType, i: number) => (
          <div key={i}>
            <div className="favorite-product-layout">
              <Link to={`/product/${product.slug.current}`}>
                {product && product.image ? (
                  <img
                    src={urlFor(product.image[0])?.url()}
                    alt={product.name}
                    className="favorite-product-image"
                  />
                ) : (
                  <CircularProgress color="inherit" />
                )}

                <p className="favorite-product-name">{product.name}</p>
                <p className="favorite-product-price">
                  £{product.price.toFixed(2)}
                </p>
              </Link>
              <Tooltip title="Remove from favorites">
                <IconButton
                  aria-label="add to favorites"
                  color="error"
                  onClick={() => onRemoveFavoriteProductHandler(product)}
                >
                  <HeartBrokenIcon />
                </IconButton>
              </Tooltip>
            </div>
            <Divider />
          </div>
        ))
      ) : (
<div className="favorite-product-layout">
          <p className="add-favorites">
            Add some of your favorite products whilst browsing and come back later
          </p>
</div>
      )}
    </div>
  );
};

export default Favorites;
