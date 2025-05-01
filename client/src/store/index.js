import { configureStore, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = 'https://localhost:7108/api/Investment';

 const fetchInvestments = createAsyncThunk(
  "investments/fetchInvestments",
  async () =>{
    const response = await axios.get(API_URL);
    return response.data;
  }
)

 const fetchInvestmentTypes = createAsyncThunk(
  "investmentTypes/fetchInvestmentTypes",
  async () => {
    const response = await axios.get("https://localhost:7108/api/Investment/Types");
    return response.data;
  }
);

 const addInvestmentAsync = createAsyncThunk(
  "investments/addInvestment",
  async (investment) => {
    const response = await axios.post(API_URL, investment);
    return response.data;
  }
)

 const removeInvestmentAsync = createAsyncThunk(
  "investments/removeInvestment",
  async (investmentId) => {
    await axios.delete(`${API_URL}/${investmentId}`);
    return investmentId;
  }
);

const investmentSlice = createSlice({
  name: "investments",
  initialState: {
    investments: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchInvestments.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchInvestments.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.investments = action.payload;
      })
      .addCase(fetchInvestments.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addInvestmentAsync.fulfilled, (state, action) => {
        state.investments.push(action.payload);
      })
      .addCase(removeInvestmentAsync.fulfilled, (state, action) => {
        state.investments = state.investments.filter(
          (investment) => investment.id !== action.payload
        );
      });
  },
});

const investmentTypesSlice = createSlice({
  name: "investmentTypes",
  initialState: {
    types: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchInvestmentTypes.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchInvestmentTypes.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.types = action.payload;
      })
      .addCase(fetchInvestmentTypes.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

const store = configureStore({
  reducer: {
    investments: investmentSlice.reducer,
    investmentTypes: investmentTypesSlice.reducer
  },
});

export default store;
export { fetchInvestments,fetchInvestmentTypes, addInvestmentAsync, removeInvestmentAsync };