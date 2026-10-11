export interface Product {
  id: number;
  name: string;
  description: string | null;
  price: number;
  stock: number;
  category: string | null;
  brand: string | null;
  created_by: number;
  created_at: string;
}
