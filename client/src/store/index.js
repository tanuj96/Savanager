import { configureStore, createSlice } from "@reduxjs/toolkit";

const investmentSlice = createSlice({
  name: "investments",
  initialState: {
    investments: [],
  },
  reducers: {
    addInvestment: (state, action) => {
      state.investments.push(action.payload);
    },
    removeInvestment: (state, action) => {
      state.investments.splice(action.payload, 1);
    },
  },
});

export const { addInvestment , removeInvestment} = investmentSlice.actions;

const store = configureStore({
  reducer: {
    investments: investmentSlice.reducer,
  },
});

export default store;
