import { createSlice } from "@reduxjs/toolkit";

const HEADER_STATE = {
  isMobileMenuOpen: false,
}

const headerSlice = createSlice({
  name: "header",
  initialState: HEADER_STATE,
  reducers: {
    toggleMobileMenu: (state, action) => {
      state.isMobileMenuOpen = !state.isMobileMenuOpen;
    }
  }
});

export const { toggleMobileMenu } = headerSlice.actions;
export default headerSlice.reducer;