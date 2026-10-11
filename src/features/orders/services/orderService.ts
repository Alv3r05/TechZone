import api from "../../../lib/api";

export interface CreateOrderItem {
  product_id: number;
  quantity: number;
}

export interface CreateOrderInput {
  items: CreateOrderItem[];
}

export interface OrderItem {
  id: number;
  product_id: number;
  quantity: number;
  price_at_purchase: number;
  product_name?: string;
  category?: string | null;
}

export interface Order {
  id: number;
  user_id: number;
  status: "pending" | "paid" | "shipped" | "cancelled";
  created_at: string;
  items?: OrderItem[];
}

export const createOrder = async (data: CreateOrderInput): Promise<Order> => {
  const response = await api.post<Order>("/orders", data);

  return response.data;
};

export const getOrders = async (): Promise<Order[]> => {
  const response = await api.get<Order[]>("/orders");

  return response.data;
};

export const getOrderById = async (id: number): Promise<Order> => {
  const response = await api.get<Order>(`/orders/${id}`);

  return response.data;
};

export const updateOrder = async (
  id: number,
  items: CreateOrderItem[],
): Promise<Order> => {
  const response = await api.put<Order>(`/orders/${id}`, { items });

  return response.data;
};

export const deleteOrder = async (id: number): Promise<{ message: string }> => {
  const response = await api.delete<{ message: string }>(`/orders/${id}`);

  return response.data;
};
