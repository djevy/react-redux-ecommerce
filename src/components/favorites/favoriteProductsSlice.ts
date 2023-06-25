import { ProductType } from "./../products/allProductsSlice";
import { createSlice } from "@reduxjs/toolkit";

interface FavoriteProductsState {
  products: ProductType[];
}
const initialState: FavoriteProductsState = {
  products: [],
};

export const favoriteProductsSlice = createSlice({
  name: "favoriteProducts",
  initialState: initialState,
  reducers: {
    addFavoriteProduct: (state, action) => {
      state.products.push(action.payload);
    },
    removeFavoriteProduct: (state, action) => {
      state.products = state.products.filter(
        (product) => product.name !== action.payload.name
      );
    },
  },
});

export const { addFavoriteProduct, removeFavoriteProduct } =
  favoriteProductsSlice.actions;

export const selectFavoriteProducts = (state: { favoriteProducts: FavoriteProductsState }) => state.favoriteProducts.products;


export default favoriteProductsSlice.reducer;
