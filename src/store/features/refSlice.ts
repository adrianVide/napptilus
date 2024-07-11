import { createSlice } from '@reduxjs/toolkit';

const refSlice = createSlice({
  name: 'refs',
  initialState: {
    lastWorkerRefId: null,
  },
  reducers: {
    setLastWorkerRefId: (state, action) => {
      state.lastWorkerRefId = action.payload;
    },
  },
});

export const { setLastWorkerRefId } = refSlice.actions;
export default refSlice.reducer;
