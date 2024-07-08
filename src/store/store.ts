import { configureStore } from '@reduxjs/toolkit';
import workersReducer from './features/workersSlice';

export const store = configureStore({
  reducer: {
    workers: workersReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;