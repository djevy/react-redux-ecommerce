import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createSelector } from 'reselect'
import { client } from "../../client";
import { selectSearchTerm } from "../search/searchSlice";

export const loadProducts = createAsyncThunk(
  "allProducts/getAllProducts",
  async () => {
    const data = await client.fetch(`*[_type =="product"]`);
    // const json = await data.json();
    // console.log(data)
    return data;
  }
);

const sliceOptions = {
  name: "allProducts",
  initialState: {
    products: [],
    isLoading: false,
    hasError: false,
  },
  reducers: {},
  extraReducers: (builder: any) => {
    builder
      .addCase(loadProducts.pending, (state: any) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(loadProducts.fulfilled, (state: any, action: any) => {
        state.products = action.payload;
        state.isLoading = false;
        state.hasError = false;
      })
      .addCase(loadProducts.rejected, (state: any) => {
        state.isLoading = false;
        state.hasError = true;
      });
  },
};

export const allProductsSlice = createSlice(sliceOptions);

export const selectAllProducts = (state: any) => state.allProducts.products;

// export const selectFilteredAllProducts = (state: any) => {
//   const allProducts = selectAllProducts(state);
//   const searchTerm = selectSearchTerm(state);

//   return allProducts.filter((product: any) =>
//     product.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );
// };

export const selectFilteredAllProducts = createSelector(
  [selectAllProducts, selectSearchTerm],
  (allProducts, searchTerm) => {
    return allProducts.filter((product: any) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
);


export default allProductsSlice.reducer;
