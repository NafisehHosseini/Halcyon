import { GridActionsCellItem } from "@mui/x-data-grid";
import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
      if (itemIndex >= 0) {
        state.cartItems[itemIndex].cartQuantity += 1;
        toast.info(
          `شما ${state.cartItems[itemIndex].name} را به سبد خرید اضافه کردید`
        );
      } else {
        const tempPruduct = { ...action.payload, cartQuantity: 1 };
        state.cartItems.push(tempPruduct);
        toast.success(`${action.payload.name} به سبد خرید اضافه شد`);
      }
      // if (state.cartItems[itemIndex].count>state.cartItems[itemIndex].cartQuantity) {
      // toast.error(`مقدار موجودی کالا به اندازه مورد نظر شما کافی نمی باشد`);
      // }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    badge: (state, action) => {
      state.cartTotalQuantity = action.payload;
    },
    removeFromCart: (state, action) => {
      const nextCartItems = state.cartItems.filter(
        (cartItem) => cartItem.id !== action.payload.id
      );
      state.cartItems = nextCartItems;
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      toast.error(`${action.payload.name} از سبد خرید حذف شد`);
    },
    decreaseCartItem: (state, action) => {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
      if (itemIndex >= 0) {
        if (state.cartItems[itemIndex].cartQuantity > 1) {
          state.cartItems[itemIndex].cartQuantity -= 1;
          toast.error(
            `شما ${state.cartItems[itemIndex].name} را از سبد خرید حذف کردید`
          );
        } else {
          const nextCartItems = state.cartItems.filter(
            (cartItem) => cartItem.id !== action.payload.id
          );
          state.cartItems = nextCartItems;
          localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
          toast.error(`${action.payload.name} از سبد خرید حذف شد`);
        }
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    clearCart(state) {
      state.cartItems = [];
      // toast.error(`سبد خرید خالی شد`);
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    getTotals: (state, action) => {
      let { total, quantity } = state.cartItems.reduce(
        (cartTotal, cartItem) => {
          const { price, cartQuantity } = cartItem;
          const itemTotal = price * cartQuantity;
          cartTotal.total += itemTotal;
          cartTotal.quantity += cartQuantity;
          return cartTotal;
        },
        {
          total: 0,
          quantity: 0,
        }
      );
      state.cartTotalQuantity = quantity;
      state.cartTotalAmount = total;
    },
  },
});
export const {
  addToCart,
  removeFromCart,
  decreaseCartItem,
  clearCart,
  getTotals,
} = cartSlice.actions;
const cartReducer = cartSlice.reducer;
export const cartSelector = (state) => state.cart;
export default cartReducer;
