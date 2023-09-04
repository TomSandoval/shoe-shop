"use client"
import { createSlice } from "@reduxjs/toolkit";

const cart = window.localStorage.getItem("cart");

const cartSlice = createSlice({
  name: "Cart",
  initialState: cart ? JSON.parse(cart) : [],
  reducers: {
    add(state, action) {
      state.push(action.payload);
      window.localStorage.setItem("cart", JSON.stringify(state));
    },
    remove(state, action) {
      return state.filter((item, index) => index !== action.payload);
    },
  },
});

export const { add, remove } = cartSlice.actions;
export default cartSlice.reducer;
