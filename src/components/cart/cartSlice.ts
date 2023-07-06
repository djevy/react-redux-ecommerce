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
  dealPrice: number;
  sizes?: string[];
  size?: string;
  quantity: number;
}
interface CartProductsState {
  products: CartProductType[];
  total: number;
  dealTotal: number;
}
const initialState: CartProductsState = {
  products: [],
  total: 0,
  dealTotal: 0,
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
      state.total = calculateCartTotal(state.products);
      state.dealTotal = calculateCartDealTotal(state.products);
      saveState(state);
    },
    removeCartProduct: (state, action) => {
      state.products = state.products.filter(
        (product) => product.name !== action.payload.name
      );
      state.total = calculateCartTotal(state.products);
      state.dealTotal = calculateCartDealTotal(state.products);
      saveState(state);
    },
    increaseCartProductQuantity: (state, action) => {
      const product = state.products.find(
        (product: CartProductType) => product._id === action.payload._id
      );
      if (product) {
        product.quantity++;
        state.total = calculateCartTotal(state.products);
        state.dealTotal = calculateCartDealTotal(state.products);
        saveState(state);
      }
    },
    decreaseCartProductQuantity: (state, action) => {
      const product = state.products.find(
        (product: CartProductType) => product._id === action.payload._id
      );
      if (product && product.quantity > 1) {
        product.quantity--;
        state.total = calculateCartTotal(state.products);
        state.dealTotal = calculateCartDealTotal(state.products);
        saveState(state);
      }
    },
  },
});
const calculateCartTotal = (products: CartProductType[]) => {
  return products.reduce(
    (total, product) => total + product.price * product.quantity,
    0
  );
};
const calculateCartDealTotal = (products: CartProductType[]) => {
  return products.reduce(
    (total, product) =>
      product.dealPrice
        ? total + product.dealPrice * product.quantity
        : total + product.price * product.quantity,
    0
  );
};

export const {
  addCartProduct,
  removeCartProduct,
  increaseCartProductQuantity,
  decreaseCartProductQuantity,
} = cartProductsSlice.actions;

export const selectCartProducts = (state: {
  cartProducts: CartProductsState;
}) => state.cartProducts.products;

export const selectCartTotal = (state: { cartProducts: CartProductsState }) =>
  state.cartProducts.total;
export const selectCartDealTotal = (state: {
  cartProducts: CartProductsState;
}) => state.cartProducts.dealTotal;

export default cartProductsSlice.reducer;
