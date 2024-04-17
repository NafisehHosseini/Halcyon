import { createSlice } from "@reduxjs/toolkit";
import service from "./http";

const orderSlice = createSlice({
  name: "orders",
  initialState: {
    orders: [],
  },
  reducers: {
    setOrders: (state, { payload }) => {
      return { orders: [...payload] };
    },
  },
});

export const { setOrders } = orderSlice.actions;
export const orderSelector = (state) => state.orders;
export default orderSlice.reducer;
export function fetchOrder() {
  return async (disptch) => {
    service.getOrders().then((res) => disptch(setOrders(res.data)));
  };
}
