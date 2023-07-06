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
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

import {
  ProductType,
  selectFilteredAllProducts,
} from "../../components/products/allProductsSlice";
import { loadSingleProduct } from "../../components/product/singleProductSlice";
import { AppDispatch, RootState } from "../../store";
import Product from "../../components/product/Product";
import { ImageUrlBuilder } from "@sanity/image-url/lib/types/builder";
import {
  addFavoriteProduct,
  removeFavoriteProduct,
  selectFavoriteProducts,
} from "../../components/favorites/favoriteProductsSlice";
import { IconButton, Tooltip } from "@mui/material";
import {
  CartProductType,
  addCartProduct,
  increaseCartProductQuantity,
  decreaseCartProductQuantity,
  selectCartProducts,
} from "../../components/cart/cartSlice";

const ProductPage = () => {
  const { id } = useParams();

  const dispatch = useDispatch<AppDispatch>();
  const onAddFavoriteProductHandler = (product: ProductType) => {
    dispatch(addFavoriteProduct(product));
  };
  const onRemoveFavoriteProductHandler = (product: ProductType) => {
    dispatch(removeFavoriteProduct(product));
  };
  const onAddCartProductHandler = (product: ProductType) => {
    const productWithSizeAndQuantity = {
      ...product,
      size: product.sizes && product.sizes[sizeIndex],
      quantity: productQuantity,
    };
    dispatch(addCartProduct(productWithSizeAndQuantity));
  };

  const increaseProductQuantity = (product: CartProductType) => {
    dispatch(increaseCartProductQuantity(product));
    setProductQuantity(productQuantity + 1);
  };
  const decreaseProductQuantity = (product: CartProductType) => {
    if (productQuantity > 0) {
      setProductQuantity(productQuantity - 1);
    }
    dispatch(decreaseCartProductQuantity(product));
  };
  const { hasError } = useSelector((state: RootState) => state.allProducts);

  const productData = useSelector((state: any) => state.singleProduct).product;
  const cartProducts = useSelector(selectCartProducts);
  const cartData = productData
    ? cartProducts.find((product) => product._id === productData._id)
    : null;

  const allProducts = useSelector(selectFilteredAllProducts);
  const filteredProducts = allProducts.filter((product: ProductType) => {
    return product.slug.current !== id;
  });

  const [index, setIndex] = useState(0);
  const [sizeIndex, setSizeIndex] = useState(0);
  const handleSize = (i: number) => {
    setSizeIndex(i);
    // console.log(productData.size);
  };
  const [productQuantity, setProductQuantity] = useState(1);
  const favoriteProducts = useSelector(selectFavoriteProducts);
  useEffect(() => {
    if (id) {
      dispatch(loadSingleProduct(id));
    }
  }, [dispatch, id]);
  useEffect(() => {
    if (cartData) {
      setProductQuantity(cartData?.quantity);
    } else {
      setProductQuantity(0);
    }
  }, [cartData]);
  // console.log("filtered", filteredProducts);
  // console.log(allProducts);
  // console.log("productData", productData);
  // console.log("cartData", cartData);

  return (
    <div className="product-page">
      {productData ? (
        <div>
          <div className="product-page-name-section">
            <h3 className="product-page-name">{productData.name}</h3>
            {favoriteProducts.find(
              (favoriteProduct) => favoriteProduct._id === productData._id
            ) ? (
              <Tooltip
                title="Remove from favorites"
                className="product-page-favorite"
              >
                <IconButton
                  aria-label="add to favorites"
                  color="error"
                  onClick={() => onRemoveFavoriteProductHandler(productData)}
                >
                  <FavoriteIcon fontSize="large" />
                </IconButton>
              </Tooltip>
            ) : (
              <Tooltip
                title="Add to favorites"
                className="product-page-favorite"
              >
                <IconButton
                  aria-label="add to favorites"
                  onClick={() => onAddFavoriteProductHandler(productData)}
                >
                  <FavoriteBorderIcon fontSize="large" />
                </IconButton>
              </Tooltip>
            )}
          </div>

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
                    alt={productData.slug.current}
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
              <h3>Details:</h3>
              <p>{productData.details}</p>
              {productData.dealPrice ? (
                <div className="product-prices">
                  <p className="product-price old-price">
                    £{productData.price.toFixed(2)}
                  </p>
                  <p className="product-price">£{productData.dealPrice}</p>
                </div>
              ) : (
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
                      onClick={() => handleSize(i)}
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
                    onClick={() => decreaseProductQuantity(productData)}
                  >
                    <RemoveIcon />
                  </span>
                  {cartData ? (
                    <span className="number-quantity">{cartData.quantity}</span>
                  ) : (
                    <span className="number-quantity">{productQuantity}</span>
                  )}

                  <span
                    className="plus-quantity"
                    onClick={() => increaseProductQuantity(productData)}
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
                  onClick={() => onAddCartProductHandler(productData)}
                  disabled={productQuantity === 0}
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
                    alt={productData.slug.current}
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
              <div className="other-products-layout">
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
                      dealPrice={product.dealPrice}
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
