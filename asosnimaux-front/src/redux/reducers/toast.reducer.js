import { createSlice } from "@reduxjs/toolkit";

const TOAST_STATE = {
  isToastOpen: false,
}

const toastSlice = createSlice({
  name: "toast",
  initialState: TOAST_STATE,
  reducers: {
    triggerToast: (state, action) => {
      return {
        ...state,
        isToastOpen: true
      }
    },
    removeToast: (state, action) => {
      return {
        ...state,
        isToastOpen: false
      }
    }
  }
});

export const { triggerToast, removeToast } = toastSlice.actions;
export default toastSlice.reducer;