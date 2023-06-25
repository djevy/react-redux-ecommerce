import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { urlFor } from "../../client";
import "./productPage.css";

import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";

import {
  ProductType,
  selectFilteredAllProducts,
} from "../../components/products/allProductsSlice";
import { loadSingleProduct } from "../../components/product/singleProductSlice";
import { AppDispatch, RootState } from "../../store";
import Product from "../../components/product/Product";
import { ImageUrlBuilder } from "@sanity/image-url/lib/types/builder";

const ProductPage = () => {
  const { id } = useParams();

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (id) {
      dispatch(loadSingleProduct(id));
    }
  }, [dispatch, id]);

  const { hasError } = useSelector((state: RootState) => state.allProducts);

  const productData = useSelector((state: any) => state.singleProduct).product;

  const allProducts = useSelector(selectFilteredAllProducts);
  const filteredProducts = allProducts.filter((product: ProductType) => {
    return product.slug.current !== id;
  });
  // console.log("filtered", filteredProducts);
  // console.log(allProducts);
  // console.log(productData);
  const [index, setIndex] = useState(0);
  const [sizeIndex, setSizeIndex] = useState(0);

  return (
    <div className="product-page">
      {productData ? (
        <div>
          <h3 className="product-page-name">{productData.name}</h3>
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
            <div className="small-images-container alternate-images mobile">
              {productData.image &&
                productData.image.map((item: ImageUrlBuilder, i: number) => (
                  <img
                    src={item && urlFor(item)?.url()}
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
            <div className="product-details">
              {/* <div className="product-reviews">
                <StarIcon />
                <StarIcon />
                <StarIcon />
                <StarIcon />
                <StarOutlineIcon />
              </div> */}
              {/* <p>(20)</p> */}
              <h3>Details:</h3>
              <p>{productData.details}</p>
              {productData.price && (
                <p className="product-price">£{productData.price.toFixed(2)}</p>
              )}
              {productData.sizes && (
                <div className="product-size">
                  <h4>Size:</h4>
                  {productData.sizes.map((size: number, i: number) => (
                    <Button
                      key={size}
                      variant={i === sizeIndex ? "contained" : "outlined"}
                      color="error"
                      onClick={() => setSizeIndex(i)}
                    >
                      {size}
                    </Button>
                  ))}
                </div>
              )}
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
                  <span className="number-quantity">{0}</span>

                  <span
                    className="plus-quantity"
                    // onClick={increaseProductQuantity}
                  >
                    <AddIcon />
                  </span>
                </p>
              </div>
              <div className="buttons">
                <Button
                  variant="contained"
                  color="error"
                  className="add-to-cart"
                  //   onClick={() => addToCart(productData, productQuantity)}
                >
                  Add to Cart
                </Button>
              </div>
            </div>
            <div className="small-images-container alternate-images none-mobile">
              {productData.image &&
                productData.image.map((item: ImageUrlBuilder, i: number) => (
                  <img
                    src={item && urlFor(item)?.url()}
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
                {filteredProducts ? (
                  filteredProducts.map((product: ProductType) => (
                    <Product
                      key={product._id}
                      image={product.image}
                      name={product.name}
                      _id={product._id}
                      slug={product.slug}
                      details={product.details}
                      price={product.price}
                    />
                  ))
                ) : (
                  <CircularProgress color="inherit" />
                )}
              </div>
            </div>
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
