import { configureStore } from '@reduxjs/toolkit';
import workersReducer from './features/workersSlice';
import refReducer from './features/refSlice';

export const store = configureStore({
  reducer: {
    workers: workersReducer,
    refs: refReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;