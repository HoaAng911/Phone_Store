import { create } from "zustand";
import axiosClient from "../lib/client/axiosClient";

const useProductStore = create((set) => ({
  products: [],
  categories: [],
  product: null,
  loading: false,
  page: 1,
  total: 0,
  totalPage: 1,
  featuresProduct: [],
  flashSalesProduct: [],

  fetchFilteredProducts: async ({ category, minPrice, maxPrice, sort, page = 1, limit = 15 }) => {
    try {
      set({ loading: true });

      // Chuẩn bị params gửi lên backend
      const params = { page, limit };
      if (category && category !== "all") params.category = category;
      if (minPrice > 0) params.priceMin = minPrice;
      if (maxPrice < 100000000) params.priceMax = maxPrice;
      if (sort && sort !== "newest") params.sort = sort;

      const res = await axiosClient.get("/products", { params });

      const data = res.data.data || [];
      const total = res.data.total || 0;
      const totalPage = Math.ceil(total / limit);

      set({
        products: data,
        total,
        page,
        limit,
        totalPage,
        loading: false
      });

    } catch (error) {
      console.error("Lỗi khi lọc sản phẩm:", error);
      set({ loading: false });
    }
  },

  fetchFlashSalesProduct: async () => {
    try {
      set({ loading: true });
      const res = await axiosClient.get("/products/flash-sale?limit=6");
      set({ flashSalesProduct: res.data, loading: false });
    } catch (error) {
      console.error("Lỗi khi tải flash sale:", error);
      set({ loading: false });
    }
  },

  fetchFeaturesProduct: async () => {
    try {
      set({ loading: true });
      const res = await axiosClient.get("/products/featured");
      set({ featuresProduct: res.data, loading: false });
    } catch (error) {
      console.error("Lỗi khi tải sản phẩm nổi bật:", error);
      set({ loading: false });
    }
  },

  fetchCategories: async () => {
    try {
      set({ loading: true });
      const res = await axiosClient.get("/products/categories");
      const uniqueCategories = Array.from(new Set(res.data));
      set({ categories: uniqueCategories, loading: false });
    } catch (error) {
      console.error("Lỗi khi tải danh mục:", error);
      set({ loading: false });
    }
  },

  fetchProducts: async (page = 1) => {
    try {
      set({ loading: true });
      const res = await axiosClient.get("/products", {
        params: { page, limit: 5 },
      });
      const result = res.data;
      set({
        products: result.data,
        page: result.page || 1,
        totalPage: result.totalPage || 1,
        loading: false,
      });
    } catch (error) {
      console.error("Lỗi khi tải danh sách sản phẩm:", error);
      set({ loading: false });
    }
  },

  fetchProductById: async (id) => {
    try {
      set({ loading: true });
      const res = await axiosClient.get(`/products/${id}`);
      set({ product: res.data, loading: false });
    } catch (error) {
      console.error("Lỗi khi tải sản phẩm:", error);
      set({ loading: false });
    }
  },

  createProduct: async (data) => {
    try {
      const res = await axiosClient.post("/products", data, {
        headers: { "Content-Type": "application/json" },
      });
      set((state) => ({
        products: [...state.products, res.data],
      }));
      return res.data;
    } catch (error) {
      console.error("Lỗi khi tạo sản phẩm:", error);
      throw error;
    }
  },

  updateProduct: async (id, data) => {
    try {
      const res = await axiosClient.patch(`/products/${id}`, data);
      set((state) => ({
        products: state.products.map((p) =>
          p.id === id ? res.data : p
        ),
      }));
    } catch (error) {
      console.error("Lỗi khi cập nhật sản phẩm:", error);
    }
  },

  deleteProduct: async (id) => {
    try {
      await axiosClient.delete(`/products/${id}`);
      set((state) => ({
        products: state.products.filter((p) => p.id !== id),
      }));
    } catch (error) {
      console.error("Lỗi khi xóa sản phẩm:", error);
    }
  },

  UploadImage: async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await axiosClient.post("/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data;
    } catch (error) {
      console.error("Lỗi khi upload ảnh:", error);
      throw error;
    }
  },

  getProductStat: async () => {
    try {
      const res = await axiosClient.get("/products/stats");
      return res.data;
    } catch (error) {
      console.error("Lỗi khi gọi thống kê:", error);
      throw error;
    }
  },

  setPage: (newPage) => set({ page: newPage }),
}));

export default useProductStore;