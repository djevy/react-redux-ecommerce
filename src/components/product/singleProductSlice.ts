import { createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import { client } from "../../client";
import { ProductType } from "../products/allProductsSlice";

export const loadSingleProduct = createAsyncThunk(
  "singleProduct/getSingleProduct",
  async (id: string) => {
    const data = await client.fetch(
      `*[_type =="product" && slug.current == '${id}'][0]`
    );
    return data;
  }
);

interface SingleProductState {
  product: ProductType | null;
  isLoading: boolean;
  hasError: boolean;
}

const initialState: SingleProductState = {
  product: null,
  isLoading: false,
  hasError: false,
};

const singleProductSlice = createSlice({
  name: "singleProduct",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadSingleProduct.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(loadSingleProduct.fulfilled, (state, action) => {
        const product = action.payload;
        if (product.deal && product.price) {
          const dealPrice = (product.price - (product.price / 100) * product.deal).toFixed(2);
          state.product = { ...product, dealPrice };
        } else {
          state.product = product;
        }
        state.isLoading = false;
        state.hasError = false;
      })
      .addCase(loadSingleProduct.rejected, (state) => {
        state.isLoading = false;
        state.hasError = true;
      });
  },
});

export const { reducer: singleProductReducer } = singleProductSlice;

export const selectSingleProduct = (state: {
  singleProduct: SingleProductState;
}) => state.singleProduct.product;

export default singleProductReducer;
