import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchPizzas = createAsyncThunk(
  "pizzas/fetchPizzasStatus",
  async (params) => {
    const { sortBy, category, order, searchValue, currentPage } = params;
    const { data } = await axios.get(
      `https://62d30c4f81cb1ecafa69a899.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${searchValue}`
    );
    return data;
  }
);

const initialState = {
  pizzasList: [],
  status: "loading", //loading | success | error
};

const pizzasSlice = createSlice({
  name: "pizzas",
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: {
    [fetchPizzas.pending]: (state) => {
      state.status = "loading";
      state.pizzasList = [];
    },
    [fetchPizzas.fulfilled]: (state, action) => {
      state.pizzasList = action.payload;
      state.status = "success";
    },
    [fetchPizzas.rejected]: (state) => {
      state.status = "error";
      state.pizzasList = [];
    },
  },
});

export const selectPizzas = (state) => state.pizzas;

export const { setItems } = pizzasSlice.actions;

export default pizzasSlice.reducer;
