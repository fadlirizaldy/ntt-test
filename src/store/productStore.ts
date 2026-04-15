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
  fetchProductById: (id: number) => Promise<Product | void>;
  postProduct: (product: Omit<Product, "id">) => Promise<Product | void>;
  editProduct: (
    id: number,
    updatedProduct: Omit<Product, "id">,
  ) => Promise<Product | void>;
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

  fetchProductById: async (id: number) => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch(`https://dummyjson.com/products/${id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch product");
      }
      const data = await response.json();
      set({ isLoading: false });
      return data;
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "An error occurred",
        isLoading: false,
      });
    }
  },

  postProduct: async (product: Omit<Product, "id">) => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch(`https://dummyjson.com/products/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      });
      if (!response.ok) {
        throw new Error("Failed to add product");
      }
      const data = await response.json();
      set({ isLoading: false });
      return data;
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "An error occurred",
        isLoading: false,
      });
    }
  },

  editProduct: async (id: number, updatedProduct: Omit<Product, "id">) => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch(`https://dummyjson.com/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedProduct),
      });
      if (!response.ok) {
        throw new Error("Failed to update product");
      }
      const data = await response.json();
      set({ isLoading: false });
      return data;
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "An error occurred",
        isLoading: false,
      });
    }
  },

  deleteProduct: async (id: number) => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch(`https://dummyjson.com/products/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete product");
      }
      const data = await response.json();
      set({ isLoading: false });
      return data;
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "An error occurred",
        isLoading: false,
      });
    }
  },
}));
