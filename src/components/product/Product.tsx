import { useDispatch, useSelector } from "react-redux";
import { urlFor } from "../../client";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, CardActions } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
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
    <Card className="product-card" sx={{ maxWidth: 345, minWidth: 300 }}>
      <CardActionArea>
        <Link to={`/product/${product.slug.current}`}>
          <CardMedia
            component="img"
            height="250"
            image={urlFor(product.image && product.image[0])?.url()}
            alt={product.name}
          />
          <CardContent className="card-content">
            <Typography gutterBottom variant="h5" component="div">
              {product.name}
            </Typography>
            <Typography className="product-price">
              £{product.price.toFixed(2)}
            </Typography>
          </CardContent>
        </Link>
      </CardActionArea>
      <CardActions>
        {favoriteProducts.find(favoriteProduct => favoriteProduct._id === product._id) ? (
          <Tooltip title="Remove from favorites">
            <IconButton
              aria-label="add to favorites"
              color="error"
              onClick={() => onRemoveFavoriteProductHandler(product)}
            >
              <FavoriteIcon />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Add to favorites">
            <IconButton
              aria-label="add to favorites"
              onClick={() => onAddFavoriteProductHandler(product)}
            >
              <FavoriteBorderIcon />
            </IconButton>
          </Tooltip>
        )}
        <Tooltip title="Add to cart">
          <IconButton size="small" color="error" aria-label="add to cart">
            <AddShoppingCartIcon />
          </IconButton>
        </Tooltip>
      </CardActions>
    </Card>
  );
};

export default Product;
