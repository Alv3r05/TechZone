import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import type { User } from "../../types/user";

export interface AuthState {
  user: User | null;
  token: string | null;
}

const getInitialState = (): AuthState => {
  const storedUser = localStorage.getItem("user");
  const storedToken = localStorage.getItem("token");

  if (!storedUser || !storedToken) {
    return { user: null, token: null };
  }

  try {
    const user = JSON.parse(storedUser) as User;

    return { user, token: storedToken };
  } catch {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  }

  return {
    user: null,
    token: null,
  };
};

const authSlice = createSlice({
  name: "auth",
  initialState: getInitialState(),
  reducers: {
    loginUser: (
      state,
      action: PayloadAction<{ user: User; token: string }>,
    ) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { loginUser, logout } = authSlice.actions;

export default authSlice.reducer;
