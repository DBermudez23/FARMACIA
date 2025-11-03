// src/features/auth/authSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  aToken: string | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  aToken: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.aToken = action.payload;
      state.isAuthenticated = true;
    },
    clearToken: (state) => {
      state.aToken = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setToken, clearToken } = authSlice.actions;
export default authSlice.reducer;