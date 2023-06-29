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
const loadState = (): CartProductsState => {
  try {
    const serializedState = localStorage.getItem("cartProducts");
    if (serializedState === null) {
      return initialState;
    }
    return JSON.parse(serializedState);
  } catch (error) {
    console.log("Error loading state from localStorage:", error);
    return initialState;
  }
};

const saveState = (state: CartProductsState): void => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("cartProducts", serializedState);
  } catch (error) {
    console.log("Error saving state to localStorage:", error);
  }
};

export const cartProductsSlice = createSlice({
  name: "cartProducts",
  initialState: loadState(),
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
      saveState(state);
    },
    removeCartProduct: (state, action) => {
      state.products = state.products.filter(
        (product) => product.name !== action.payload.name
      );
      saveState(state);
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
