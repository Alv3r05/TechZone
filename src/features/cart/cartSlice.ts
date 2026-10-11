import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import type { RootState } from "../../store/store";

export interface CartProduct {
  id: number;
  name: string;
  image: string;
  price: number;
  quantity: number;
  stock: number;
  createdBy: number;
}

export interface CartState {
  products: CartProduct[];
}

const getInitialState = (): CartState => {
  const stored = localStorage.getItem("cart");

  if (!stored) {
    return { products: [] };
  }

  try {
    const products = JSON.parse(stored) as CartProduct[];

    return Array.isArray(products) ? { products } : { products: [] };
  } catch {
    localStorage.removeItem("cart");
    return { products: [] };
  }
};

const cartSlice = createSlice({
  name: "cart",
  initialState: getInitialState(),
  reducers: {
    addToCart: (state, action: PayloadAction<CartProduct>) => {
      const product = {
        ...action.payload,
        price: Number(action.payload.price),
      };

      if (product.quantity > product.stock) {
        return;
      }

      const existingProduct = state.products.find(
        (item) => item.id === product.id,
      );

      if (existingProduct) {
        existingProduct.quantity = Math.min(
          existingProduct.quantity + product.quantity,
          existingProduct.stock,
        );
        return;
      }

      state.products.push(product);
    },

    increaseQuantity: (state, action: PayloadAction<number>) => {
      const product = state.products.find((item) => item.id === action.payload);

      if (!product) {
        return;
      }

      if (product.quantity >= product.stock) {
        return;
      }

      product.quantity += 1;
    },

    decreaseQuantity: (state, action: PayloadAction<number>) => {
      const product = state.products.find((item) => item.id === action.payload);

      if (!product) {
        return;
      }

      if (product.quantity > 1) {
        product.quantity -= 1;
      }
    },

    removeFromCart: (state, action: PayloadAction<number>) => {
      state.products = state.products.filter(
        (product) => product.id !== action.payload,
      );
    },

    clearCart: (state) => {
      state.products = [];
    },
  },
});

export const {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  clearCart,
} = cartSlice.actions;

export const selectCartQuantity = (state: RootState): number =>
  state.cart.products.reduce((total, product) => total + product.quantity, 0);

export const selectCartSubtotal = (state: RootState): number =>
  state.cart.products.reduce(
    (total, product) => total + product.price * product.quantity,
    0,
  );

export default cartSlice.reducer;
