import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Worker } from "../../types/worker";

interface WorkersState {
  workers: Worker[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: WorkersState = {
  workers: [],
  status: "idle",
  error: null,
};

export const fetchWorkers = createAsyncThunk(
  "workers/fetchWorkers",
  async (page: number) => {
    const response = await fetch(
      `https://2q2woep105.execute-api.eu-west-1.amazonaws.com/napptilus/oompa-loompas?page=${page}`
    );
    const data = await response.json();
    return data.results as Worker[];
  }
);

const workersSlice = createSlice({
  name: "workers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWorkers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchWorkers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.workers = action.payload;
      })
      .addCase(fetchWorkers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch workers";
      });
  },
});

export default workersSlice.reducer;
