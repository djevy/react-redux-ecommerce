import { urlFor } from "../../client";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, CardActions } from "@mui/material";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
// import FavoriteIcon from '@mui/icons-material/Favorite';
import Tooltip from "@mui/material/Tooltip";

import "./product.css";

function Product({ product: { image, name, slug, price } }: any) {
  // console.log(product);
  return (
    <Card className="product-card" sx={{ maxWidth: 345, minWidth: 300 }}>
      <CardActionArea>
        <Link to={`/product/${slug.current}`}>
          <CardMedia
            component="img"
            height="250"
            image={urlFor(image && image[0])?.url()}
            alt={name}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              £{price.toFixed(2)}
            </Typography>
          </CardContent>
        </Link>
      </CardActionArea>
      <CardActions>
        <Tooltip title="Add to favorites">
          <IconButton aria-label="add to favorites">
            <FavoriteBorderIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Add to favorites">
          <IconButton size="small" color="error" aria-label="add to cart">
            <AddShoppingCartIcon />
          </IconButton>
        </Tooltip>
      </CardActions>
    </Card>
  );
}

export default Product;
