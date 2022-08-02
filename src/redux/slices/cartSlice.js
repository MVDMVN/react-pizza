import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  totalPrice: 0,
  totalCount: 0,
  items: [],
};

const totalRecalculate = (state) => {
  state.totalPrice = state.items.reduce((sum, item) => {
    return item.price * item.count + sum;
  }, 0);
  state.totalCount = state.items.reduce((sum, item) => {
    return sum + item.count;
  }, 0);
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const fintItem = state.items.find(
        (item) => item.id === action.payload.id
      );

      if (fintItem) {
        fintItem.count++;
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        });
      }

      totalRecalculate(state);
    },
    minusItem: (state, action) => {
      const fintItem = state.items.find(
        (item) => item.id === action.payload.id
      );

      if (fintItem) {
        fintItem.count--;
      }

      totalRecalculate(state);
    },
    removeItem: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);

      totalRecalculate(state);
    },
    clearItems: (state) => {
      state.items = [];

      state.totalPrice = 0;
      state.totalCount = 0;
    },
  },
});

export const { addItem, removeItem, minusItem, clearItems } = cartSlice.actions;

export default cartSlice.reducer;
