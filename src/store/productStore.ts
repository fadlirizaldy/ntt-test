import { create } from "zustand";

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  stock: number;
  tags: string[];
  thumbnail?: string;
  category?: string;
  brand?: string;
}

interface ProductState {
  products: Product[];
  isLoading: boolean;
  error: string | null;
  total: number;
  skip: number;
  limit: number;
  fetchProducts: (searchTerm?: string, skip?: number) => Promise<void>;
  deleteProduct: (id: number) => void;
}

export const useProductStore = create<ProductState>((set, get) => ({
  products: [],
  isLoading: false,
  error: null,
  total: 0,
  skip: 0,
  limit: 10,

  fetchProducts: async (searchTerm?: string, skip = 0) => {
    set({ isLoading: true, error: null });
    try {
      let url = `https://dummyjson.com/products`;

      if (searchTerm && searchTerm.trim()) {
        url = `https://dummyjson.com/products/search?q=${encodeURIComponent(searchTerm)}&limit=${get().limit}&skip=${skip}`;
      } else {
        url = `https://dummyjson.com/products?limit=${get().limit}&skip=${skip}`;
      }

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const data = await response.json();
      set({
        products: data.products,
        total: data.total,
        skip: data.skip,
        limit: data.limit,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "An error occurred",
        isLoading: false,
      });
    }
  },

  deleteProduct: (id: number) => {
    const { products } = get();
    set({ products: products.filter((p) => p.id !== id) });
  },
}));
