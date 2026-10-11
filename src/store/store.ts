import { configureStore } from "@reduxjs/toolkit";
import type { Middleware } from "@reduxjs/toolkit";

import authReducer, { loginUser, logout } from "../features/auth/authSlice";
import cartReducer from "../features/cart/cartSlice";

const persistAuth = (state: RootState): void => {
  if (state.auth.user && state.auth.token) {
    localStorage.setItem("user", JSON.stringify(state.auth.user));
    localStorage.setItem("token", state.auth.token);
    return;
  }

  localStorage.removeItem("user");
  localStorage.removeItem("token");
};

const persistenceMiddleware: Middleware =
  ({ getState }) =>
  (next) =>
  (action) => {
    const result = next(action);
    const state = getState() as RootState;

    if (loginUser.match(action) || logout.match(action)) {
      persistAuth(state);
    }

    if (
      typeof action === "object" &&
      action !== null &&
      "type" in action &&
      typeof action.type === "string" &&
      action.type.startsWith("cart/")
    ) {
      localStorage.setItem("cart", JSON.stringify(state.cart.products));
    }

    return result;
  };

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(persistenceMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
