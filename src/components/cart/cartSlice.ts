import { createSlice } from "@reduxjs/toolkit";

export interface CartProductType {
  _id: string;
  name: string;
  slug: {
    current: string;
  };
  image: string[];
  details: string;
  price: number;
  sizes?: string[];
  size?: string;
  quantity: number;
}
interface CartProductsState {
  products: CartProductType[];
}
const initialState: CartProductsState = {
  products: [],
};

export const cartProductsSlice = createSlice({
  name: "cartProducts",
  initialState: initialState,
  reducers: {
    addCartProduct: (state, action) => {
      const product = state.products.find(
        (product: CartProductType) => product._id === action.payload._id
      );
      if (!product) {
        state.products.push(action.payload);
      } else {
        product.quantity = action.payload.quantity;
      }
    },
    removeCartProduct: (state, action) => {
      state.products = state.products.filter(
        (product) => product.name !== action.payload.name
      );
    },
    increaseCartProductQuantity: (state, action) => {
      const product = state.products.find(
        (product: CartProductType) => product._id === action.payload._id
      );
      if (product) {
        product.quantity++;
      }
    },
    decreaseCartProductQuantity: (state, action) => {
      const product = state.products.find(
        (product: CartProductType) => product._id === action.payload._id
      );
      if (product) {
        product.quantity--;
      }
    },
  },
});

export const { addCartProduct, removeCartProduct, increaseCartProductQuantity, decreaseCartProductQuantity } = cartProductsSlice.actions;

export const selectCartProducts = (state: {
  cartProducts: CartProductsState;
}) => state.cartProducts.products;

export default cartProductsSlice.reducer;
