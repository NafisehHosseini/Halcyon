import { createSlice } from "@reduxjs/toolkit";
import service from "./http";

const categorySlice = createSlice({
  name: "category",
  initialState: {
    category: [],
  },
  reducers: {
    setCategory: (state, action) => {
      return { category: [...action.payload] };
    },
  },
});

export const { setCategory } = categorySlice.actions;
export const categorySelector = (state) => state.category;
export default categorySlice.reducer;

export function fetchCategory() {
  return async (disptch) => {
    service.getCategory().then((res) => disptch(setCategory(res.data)));
  };
}
