import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const searchSlice = createSlice({
  name: "search",
  initialState: "",
  reducers: {
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state = action.payload;
    },
    clearSearchTerm: (state) => {
      state = "";
    },
  },
});

export const { setSearchTerm, clearSearchTerm } = searchSlice.actions;

export const selectSearchTerm = (state: { search: string }) => state.search;

export default searchSlice.reducer;