import { urlFor } from "../../client";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";

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
        <Button size="small" color="primary">
          Add to basket
        </Button>
      </CardActions>
    </Card>
    // <Link to={`/product/${slug.current}`}>
    //   {image.length > 0 &&
    //     <img
    //       src={urlFor(image && image[0])?.url()}
    //       alt={name}
    //       className="product-image"
    //       loading="lazy"
    //     />
    //   }
    //   <p>{name}</p>
    //   <p>£{price.toFixed(2)}</p>
    // </Link>
  );
}

export default Product;
