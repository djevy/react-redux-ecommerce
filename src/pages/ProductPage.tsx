import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { urlFor } from "../client";

import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

import { selectFilteredAllProducts } from "../components/products/allProductsSlice";
import { loadSingleProduct } from "../components/product/singleProductSlice";
import { AppDispatch } from "../store";
import Product from "../components/product/Product";

const ProductPage = () => {
  const { id } = useParams();

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (id) {
      dispatch(loadSingleProduct(id));
    }
  }, [dispatch, id]);

  const { hasError } = useSelector((state: any) => state.allProducts);

  const productData = useSelector((state: any) => state.singleProduct).product;
  const allProducts = useSelector(selectFilteredAllProducts);
  console.log(allProducts);
  console.log(productData);
  const [index, setIndex] = useState(0);

  return (
    <div className="generalPageLayout">
      {productData ? (
        <div>
          <h1>{productData.name}</h1>
          <div className="product-layout">
            {productData && productData.image ? (
              <img
                src={
                  productData.image.length > index
                    ? urlFor(productData.image[index])?.url()
                    : urlFor(productData.image[0])?.url()
                }
                alt={productData.name}
                className="product-image"
                id="display-image"
              />
            ) : (
              <CircularProgress color="inherit" />
            )}
            <div className="product-details">
              {/* <div className="product-reviews">
                <StarIcon />
                <StarIcon />
                <StarIcon />
                <StarIcon />
                <StarOutlineIcon />
              </div> */}
              {/* <p>(20)</p> */}
              <h4>Details:</h4>
              <p>{productData.details}</p>
              {productData.price && <p>£{productData.price.toFixed(2)}</p>}
              <div className="quantity">
                <h3>Quantity:</h3>
                <p className="quantity-details">
                  <span
                    className="minus-quantity"
                    // onClick={decreaseProductQuantity}
                  >
                    <RemoveIcon />
                  </span>
                  {/* <span className="number-quantity">{productQuantity}</span> */}
                  <span
                    className="plus-quantity"
                    // onClick={increaseProductQuantity}
                  >
                    <AddIcon />
                  </span>
                </p>
              </div>
              <div className="buttons">
                <button
                  type="button"
                  className="add-to-cart"
                  //   onClick={() => addToCart(productData, productQuantity)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
            <div className="small-images-container alternate-images">
              {productData.image &&
                productData.image.map((item: any, i: any) => (
                  <img
                    src={item && urlFor(item)}
                    alt={productData.slug}
                    key={i}
                    className={
                      i === index
                        ? "product-image selected-product"
                        : "product-image"
                    }
                    onMouseEnter={() => setIndex(i)}
                  />
                ))}
            </div>
          </div>

          <div className="other-products-wrapper">
            <h2>You may also like</h2>
            <div>
              <div className="other-products-container">
                {allProducts ? (
                  allProducts.map((product: any) => (
                    <Product key={product._id} product={product} />
                  ))
                ) : (
                  <CircularProgress color="inherit" />
                )}
              </div>
            </div>
            <ImageList
              sx={{ width: 500, height: 450 }}
              variant="quilted"
              cols={4}
              rowHeight={121}
            >
              {allProducts.map((product: any) => (
                <ImageListItem key={product.image}>
                  <img
                    src={`${product.image}?w=164&h=164&fit=crop&auto=format`}
                    alt={product.title}
                    loading="lazy"
                  />
                </ImageListItem>
              ))}
            </ImageList>
          </div>
        </div>
      ) : (
        <CircularProgress color="inherit" />
      )}
      {hasError ? (
        <Alert severity="error">
          There has been an error, please try and refresh
        </Alert>
      ) : null}
    </div>
  );
};

export default ProductPage;
