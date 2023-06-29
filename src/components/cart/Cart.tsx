import React from "react";
import "./cart.css";

import Divider from "@mui/material/Divider";
import { CircularProgress, IconButton, Tooltip } from "@mui/material";
import Button from "@mui/material/Button";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { urlFor } from "../../client";
import {
  CartProductType,
  removeCartProduct,
  selectCartProducts,
  increaseCartProductQuantity,
  decreaseCartProductQuantity,
} from "./cartSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const cartProducts = useSelector(selectCartProducts);

  const onRemoveCartProductHandler = (product: CartProductType) => {
    dispatch(removeCartProduct(product));
  };
  const increaseProductQuantity = (product: CartProductType) => {
    dispatch(increaseCartProductQuantity(product));
  };
  const decreaseProductQuantity = (product: CartProductType) => {
    dispatch(decreaseCartProductQuantity(product));
  };

  return (
    <div className="cart-container">
      <h3 className="cart-title">Cart</h3>
      <Divider />
      {cartProducts.length > 0 ? (
        cartProducts.map((product: CartProductType, i: number) => (
          <div key={i} className="cart-products">
            <div className="cart-product-layout">
              <Link
                to={`/product/${product.slug.current}`}
                className="cart-product-details"
              >
                {product && product.image ? (
                  <img
                    src={urlFor(product.image[0])?.url()}
                    alt={product.name}
                    className="cart-product-image"
                  />
                ) : (
                  <CircularProgress color="inherit" />
                )}

                <p className="cart-product-name">{product.name}</p>
                <p className="cart-product-price">
                  £{product.price.toFixed(2)}
                </p>
              </Link>
              <Tooltip title="Remove from cart">
                <IconButton
                  aria-label="Remove from cart"
                  color="error"
                  onClick={() => onRemoveCartProductHandler(product)}
                >
                  <RemoveShoppingCartIcon />
                </IconButton>
              </Tooltip>
            </div>
            {product.size && (
              <div className="cart-size">
                <p>Size: {product.size}</p>
              </div>
            )}
            <div className="quantity">
              <p className="quantity-details">
                <span
                  className="minus-quantity"
                  onClick={() => decreaseProductQuantity(product)}
                >
                  <RemoveIcon />
                </span>
                <span className="number-quantity">{product.quantity}</span>

                <span
                  className="plus-quantity"
                  onClick={() => increaseProductQuantity(product)}
                >
                  <AddIcon />
                </span>
              </p>
            </div>
            <Divider />
          </div>
        ))
      ) : (
        <div className="cart-product-layout">
          <p className="add-to-cart">Add some products to your cart!</p>
        </div>
      )}
      {cartProducts.length > 0 && (
        <div>
          <p>Total: </p>
          <Link to="/checkout" className="buttons" id="checkout-button">
            <Button variant="contained" color="error" className="add-to-cart">
              Checkout
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Cart;
