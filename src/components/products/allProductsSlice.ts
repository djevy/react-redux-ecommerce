import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { client } from "../../client";
import { selectSearchTerm } from "../search/searchSlice";
import { RootState } from "../../store";

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
  category?: string;
  collection?: string;
  deal?: number;
  dealPrice?: number;
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
        state.products = action.payload.map((product: ProductType) => {
          if (product.deal && product.price) {
            const dealPrice = (
              product.price -
              (product.price / 100) * product.deal
            ).toFixed(2);
            return { ...product, dealPrice };
          }
          return product;
        });
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

export const selectAllProducts = (state: RootState) => state.allProducts;

export const selectFilteredAllProducts = createSelector(
  [selectAllProducts, selectSearchTerm],
  (allProducts, searchTerm) => {
    return allProducts.products.filter((product: ProductType) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
);

export const selectProductsByCategory = (category: string) =>
  createSelector([selectAllProducts], (allProducts) =>
    allProducts.products.filter(
      (product: ProductType) =>
        product.category?.toLowerCase() === category.toLowerCase()
    )
  );
export const selectProductsByCollection = (collection: string) =>
  createSelector([selectAllProducts], (allProducts) =>
    allProducts.products.filter(
      (product: ProductType) =>
        product.collection?.toLowerCase() === collection.toLowerCase()
    )
  );

export const selectProductsByDeals = (deal: number) =>
  createSelector([selectAllProducts], (allProducts) =>
    allProducts.products.filter((product: ProductType) => product.deal === deal)
  );
export const selectAllDealProducts = createSelector(
  [selectAllProducts],
  (allProducts) => {
    return allProducts.products.filter((product: ProductType) => product.deal);
  }
);

export const productCategoryTypes = createSelector(
  [selectAllProducts],
  (allProducts) => {
    const categories = [
      ...new Set(
        allProducts.products.map((item: ProductType) => item.category)
      ),
    ];
    return categories;
  }
);
export const productCollectionTypes = createSelector(
  [selectAllProducts],
  (allProducts) => {
    const collections = [
      ...new Set(
        allProducts.products.map((item: ProductType) => item.collection)
      ),
    ];
    return collections;
  }
);
export const productDealTypes = createSelector(
  [selectAllProducts],
  (allProducts) => {
    const deals = [
      ...new Set(allProducts.products.map((item: ProductType) => item.deal)),
    ];
    return deals;
  }
);

export default allProductsReducer;
