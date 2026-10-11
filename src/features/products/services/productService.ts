import api from "../../../lib/api";
import type { Product } from "../../../types/product";

export interface CreateProductInput {
  name: string;
  description?: string | null;
  price: number;
  stock: number;
  category?: string | null;
  brand?: string | null;
}

export interface UpdateProductInput {
  name?: string;
  description?: string | null;
  price?: number;
  stock?: number;
  category?: string | null;
  brand?: string | null;
}

export const categories = [
  "Laptops",
  "Phones",
  "Peripherals",
  "Components",
  "Monitors",
  "Audio",
  "Accessories",
  "Video Games",
  "Others",
];

export const getProducts = async (): Promise<Product[]> => {
  const response = await api.get<Product[]>("/products");

  return response.data;
};

export const getMyProducts = async (): Promise<Product[]> => {
  const response = await api.get<Product[]>("/products/mine");

  return response.data;
};

export const getProductById = async (id: number): Promise<Product> => {
  const response = await api.get<Product>(`/products/${id}`);

  return response.data;
};

export const updateProduct = async (
  id: number,
  data: UpdateProductInput,
): Promise<Product> => {
  const response = await api.put<Product>(`/products/${id}`, data);

  return response.data;
};

export const createProduct = async (
  data: CreateProductInput,
): Promise<Product> => {
  const response = await api.post<Product>("/products", data);
  return response.data;
};

export const deleteProduct = async (
  id: number,
): Promise<{ message: string }> => {
  const response = await api.delete<{ message: string }>(`/products/${id}`);

  return response.data;
};
