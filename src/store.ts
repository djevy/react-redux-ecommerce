import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./components/products/allProductsSlice";
import searchReducer from "./components/search/searchSlice";
import productReducer from "./components/product/singleProductSlice";
import favoritesReducer from "./components/favorites/favoriteProductsSlice";

export const store = configureStore({
  reducer: {
    allProducts: productsReducer,
    singleProduct: productReducer,
    favoriteProducts: favoritesReducer,
    search: searchReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
