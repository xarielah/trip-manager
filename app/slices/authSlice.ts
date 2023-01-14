import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

type AuthState = {
  username: string | null;
  email: string | null;
};

const initialState: AuthState = {
  username: null,
  email: null,
};

export const authSlice = createSlice({
  name: "currentUser",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<AuthState>) => {
      state.username = action.payload.username;
      state.email = action.payload.email;
    },
    logoutUser: (state) => {
      state.username = null;
      state.email = null;
    },
  },
});

export const { setUser, logoutUser } = authSlice.actions;

export const selectCurrentUser = (state: RootState) => state.currentUser;

export default authSlice.reducer;
