import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { client } from "../../client";

export interface BannerType {
  _id: string;
  buttonText: string;
  slug: {
    current: string;
  };
  image: string;
  details: string;
  smallText: string;
  midText: string;
  largeText: string;
}

export const loadBanner = createAsyncThunk("banner/getBanner", async () => {
  const data = await client.fetch(`*[_type =="banner"]`);
  return data;
});

interface BannerState {
  banner: BannerType[];
  isLoading: boolean;
  hasError: boolean;
}

const initialState: BannerState = {
  banner: [],
  isLoading: false,
  hasError: false,
};

const bannerSlice = createSlice({
  name: "banner",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadBanner.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(loadBanner.fulfilled, (state, action) => {
        state.banner = action.payload;
        state.isLoading = false;
        state.hasError = false;
      })
      .addCase(loadBanner.rejected, (state) => {
        state.isLoading = false;
        state.hasError = true;
      });
  },
});

export const { reducer: bannerReducer } = bannerSlice;

export const selectBanner = (state: { banner: BannerState }) =>
  state.banner.banner;

export default bannerReducer;
