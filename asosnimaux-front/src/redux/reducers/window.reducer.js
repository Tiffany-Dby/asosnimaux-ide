import { createSlice } from "@reduxjs/toolkit";

const WINDOW_STATE = {
  width: 0,
  height: 0,
  scrollY: 0
};

const windowSlice = createSlice({
  name: "window",
  initialState: WINDOW_STATE,
  reducers: {
    updateWindowSize: (state, action) => {
      state.width = action.payload.width;
      state.height = action.payload.height;
    },
    updateScroll: (state, action) => {
      state.scrollY = action.payload.scrollY;
    },
  },
});

export const { updateWindowSize, updateScroll } = windowSlice.actions;
export default windowSlice.reducer;