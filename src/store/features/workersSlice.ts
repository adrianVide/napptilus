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
    const localStorageKey = `workers_page_${page}`;
    const storedItem = localStorage.getItem(localStorageKey);

    if (storedItem) {
      const { workers, timestamp }: { workers: Worker[]; timestamp: number } =
        JSON.parse(storedItem);
      const now = new Date().getTime();
      const hoursElapsed = (now - timestamp) / (1000 * 60 * 60);

      if (hoursElapsed < 24) {
        return workers as Worker[];
      }
    }

    const response = await fetch(
      `https://2q2woep105.execute-api.eu-west-1.amazonaws.com/napptilus/oompa-loompas?page=${page}`
    );
    const data = await response.json();
    const workers = data.results as Worker[];

    const timestamp = new Date().getTime();
    localStorage.setItem(
      localStorageKey,
      JSON.stringify({ workers, timestamp })
    );

    return workers as Worker[];
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
        const newWorkers = action.payload.filter(
          (newWorker) =>
            !state.workers.some(
              (existingWorker) => existingWorker.id === newWorker.id
            )
        );
        state.workers = [...state.workers, ...newWorkers];
      })
      .addCase(fetchWorkers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch workers";
      });
  },
});

export default workersSlice.reducer;
