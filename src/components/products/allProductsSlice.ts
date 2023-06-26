import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { client } from "../../client";
import { selectSearchTerm } from "../search/searchSlice";

export interface ProductType {
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
}

export const loadProducts = createAsyncThunk(
  "allProducts/getAllProducts",
  async () => {
    const data = await client.fetch(`*[_type =="product"]`);
    return data;
  }
);

interface AllProductsState {
  products: ProductType[];
  isLoading: boolean;
  hasError: boolean;
}

const initialState: AllProductsState = {
  products: [],
  isLoading: false,
  hasError: false,
};

const allProductsSlice = createSlice({
  name: "allProducts",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadProducts.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(loadProducts.fulfilled, (state, action) => {
        state.products = action.payload;
        state.isLoading = false;
        state.hasError = false;
      })
      .addCase(loadProducts.rejected, (state) => {
        state.isLoading = false;
        state.hasError = true;
      });
  },
});

export const { reducer: allProductsReducer } = allProductsSlice;

export const selectAllProducts = (state: { allProducts: AllProductsState }) =>
  state.allProducts.products;

export const selectFilteredAllProducts = createSelector(
  [selectAllProducts, selectSearchTerm],
  (allProducts, searchTerm) => {
    return allProducts.filter((product: ProductType) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
);

export default allProductsReducer;
