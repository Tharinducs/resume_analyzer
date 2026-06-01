import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  loading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
    updateUserInStore: (state, action) => {
      if (state.user && typeof state.user === "object") {
        state.user = { ...(state.user as Record<string, unknown>), ...action.payload };
      }
    },
  },
});

export const { loginSuccess, logout, updateUserInStore } = authSlice.actions;
export default authSlice.reducer;
