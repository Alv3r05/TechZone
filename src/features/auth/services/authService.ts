import api from "../../../lib/api";

import type { AuthResponse, LoginInput, RegisterInput } from "../../../types/user";

export const login = async (data: LoginInput): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>("/users/login", data);

  return response.data;
};

export const register = async (data: RegisterInput): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>("/users", data);

  return response.data;
};
