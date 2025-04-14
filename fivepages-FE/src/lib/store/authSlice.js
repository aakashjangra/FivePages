// src/lib/store/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  isAuthenticated: false,
  isReady: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginComplete: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    logoutComplete: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
    setReady: (state) => {
      state.isReady = true;
    },
  },
});

export const { loginComplete, logoutComplete, setReady } = authSlice.actions;
export default authSlice.reducer;
