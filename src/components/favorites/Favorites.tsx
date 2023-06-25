import React from "react";
import {
  selectFavoriteProducts,
  removeFavoriteProduct,
} from "./favoriteProductsSlice";
import { useDispatch, useSelector } from "react-redux";
import { ProductType } from "../products/allProductsSlice";
import { IconButton, Tooltip } from "@mui/material";
import HeartBrokenIcon from "@mui/icons-material/HeartBroken";
import { Link } from "react-router-dom";


const Favorites = () => {
  const dispatch = useDispatch();
  const favoriteProducts = useSelector(selectFavoriteProducts);

  const onRemoveFavoriteProductHandler = (product: ProductType) => {
    dispatch(removeFavoriteProduct(product));
  };

  return (
    <div className="favorites-container">
      <p>Favorites</p>
      {favoriteProducts.length > 0 ? favoriteProducts.map((product: ProductType, i: number) => (
        <div key={i}>
          <Link to={`/product/${product.slug.current}`}><p>{product.name}</p></Link>
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
      )) : <p>Add some of your favorite products whilst browsing and come back later</p>}
    </div>
  );
};

export default Favorites;
