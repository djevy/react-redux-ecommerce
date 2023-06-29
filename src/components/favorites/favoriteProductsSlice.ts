import { ProductType } from "./../products/allProductsSlice";
import { createSlice } from "@reduxjs/toolkit";

interface FavoriteProductsState {
  products: ProductType[];
}
const initialState: FavoriteProductsState = {
  products: [],
};

const loadState = (): FavoriteProductsState => {
  try {
    const serializedState = localStorage.getItem("favoriteProducts");
    if (serializedState === null) {
      return initialState;
    }
    return JSON.parse(serializedState);
  } catch (error) {
    console.log("Error loading state from localStorage:", error);
    return initialState;
  }
};

const saveState = (state: FavoriteProductsState): void => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("favoriteProducts", serializedState);
  } catch (error) {
    console.log("Error saving state to localStorage:", error);
  }
};

export const favoriteProductsSlice = createSlice({
  name: "favoriteProducts",
  initialState: loadState(),
  reducers: {
    addFavoriteProduct: (state, action) => {
      state.products.push(action.payload);
      saveState(state);
    },
    removeFavoriteProduct: (state, action) => {
      state.products = state.products.filter(
        (product) => product.name !== action.payload.name
      );
      saveState(state);
    },
  },
});

export const { addFavoriteProduct, removeFavoriteProduct } =
  favoriteProductsSlice.actions;

export const selectFavoriteProducts = (state: {
  favoriteProducts: FavoriteProductsState;
}) => state.favoriteProducts.products;

export default favoriteProductsSlice.reducer;
