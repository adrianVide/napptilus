import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Worker, WorkerDetail } from "../../types/worker";

interface WorkersState {
  workers: Worker[];
  filteredWorkers: Worker[];
  selectedWorker: WorkerDetail | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: WorkersState = {
  workers: [],
  filteredWorkers: [],
  selectedWorker: null,
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

export const fetchWorkerById = createAsyncThunk(
  "workers/fetchWorkerById",
  async (id: string) => {
    const localStorageKey = `worker_${id}`;
    const storedItem = localStorage.getItem(localStorageKey);

    if (storedItem) {
      const { worker, timestamp }: { worker: Worker; timestamp: number } =
        JSON.parse(storedItem);
      const now = new Date().getTime();
      const hoursElapsed = (now - timestamp) / (1000 * 60 * 60);

      if (hoursElapsed < 24) {
        return worker as WorkerDetail;
      }
    }

    const response = await fetch(
      `https://2q2woep105.execute-api.eu-west-1.amazonaws.com/napptilus/oompa-loompas/${id}`
    );
    const worker = await response.json();

    const timestamp = new Date().getTime();
    localStorage.setItem(
      localStorageKey,
      JSON.stringify({ worker, timestamp })
    );

    return worker as WorkerDetail;
  }
);

const workersSlice = createSlice({
  name: "workers",
  initialState,
  reducers: {
    filterWorkers: (state, action: PayloadAction<string>) => {
      const searchTerm = action.payload.toLowerCase();
      if (searchTerm === "") {
        state.filteredWorkers = state.workers; 
      } else {
        state.filteredWorkers = state.workers.filter((worker) => {
          const fullName = `${worker.first_name} ${worker.last_name}`.toLowerCase();
          return (
            fullName.includes(searchTerm) ||
            worker.profession.toLowerCase().includes(searchTerm)
          );
        });
      }
    },
  },
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
        state.filteredWorkers = state.workers; 
      })
      .addCase(fetchWorkers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch workers";
      })
      .addCase(fetchWorkerById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchWorkerById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.selectedWorker = action.payload;
      })
      .addCase(fetchWorkerById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch worker";
      });
  },
});

export const { filterWorkers } = workersSlice.actions;

export default workersSlice.reducer;
