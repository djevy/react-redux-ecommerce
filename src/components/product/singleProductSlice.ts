import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { client } from "../../client";

export const loadSingleProduct = createAsyncThunk(
  "singleProduct/getSingleProduct",
  async (id: string) => {
    const data = await client.fetch(`*[_type =="product" && slug.current == '${id}'][0]`);
    return data;
  }
);

const sliceOptions = {
  name: "singleProduct",
  initialState: {
    product: [],
    isLoading: false,
    hasError: false,
  },
  reducers: {},
  extraReducers: (builder: any) => {
    builder
      .addCase(loadSingleProduct.pending, (state: any) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(loadSingleProduct.fulfilled, (state: any, action: any) => {
        state.product = action.payload;
        state.isLoading = false;
        state.hasError = false;
      })
      .addCase(loadSingleProduct.rejected, (state: any) => {
        state.isLoading = false;
        state.hasError = true;
      });
  },
};

export const singleProductSlice = createSlice(sliceOptions);

export const selectSingleProduct = (state: any) => state.singleProduct.product;


export default singleProductSlice.reducer;
