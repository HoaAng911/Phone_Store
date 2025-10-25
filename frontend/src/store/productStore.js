import { create } from "zustand";
import axiosClient from "../api/axiosClient";

/**
 * Zustand store dùng để quản lý state sản phẩm:
 *  - Danh sách sản phẩm (products)
 *  - Chi tiết sản phẩm (product)
 *  - Trạng thái tải dữ liệu (loading)
 *  - Phân trang (page, totalPage)
 */
const useProductStore = create((set) => ({
  products: [],
  product: null,
  loading: false,
  page: 1,
  totalPage: 1,

  /**
   *  Lấy danh sách sản phẩm (có phân trang)
   * @param {number} page - Trang cần lấy (mặc định = 1)
   */
  fetchProducts: async (page = 1) => {
    try {
      set({ loading: true });
      // Gọi API lấy sản phẩm với query params: page & limit
      const res = await axiosClient.get("/products", {
        params: { page, limit: 5 },
      });

      const result = res.data;

      /**
       *  Giả sử backend trả về:
       * {
       *   data: [...],
       *   page: 1,
       *   totalPage: 10
       * }
       * -> Cập nhật toàn bộ state liên quan đến danh sách.
       */
      set({
        products: result,
        page: result.page || 1,
        totalPage: result.totalPage || 1,
        loading: false,
      });
    } catch (error) {
      console.error(" Lỗi khi tải danh sách sản phẩm:", error);
      set({ loading: false });
    }
  },

  /**
   *  Lấy chi tiết 1 sản phẩm theo ID
   * @param {string} id - ID sản phẩm
   */
  fetchProductById: async (id) => {
    try {
      set({ loading: true });
      const res = await axiosClient.get(`/products/${id}`);
      set({ product: res.data, loading: false });
      console.log(" Fetched product ID:", id);
    } catch (error) {
      console.error(" Lỗi khi tải sản phẩm:", error);
      set({ loading: false });
    }
  },

  /**
   *  Tạo mới sản phẩm
   * @param {object} data - Dữ liệu sản phẩm cần tạo
   */
  createProduct: async (data) => {
    try {
      const res = await axiosClient.post("/products", data, {
        headers: { "Content-Type": "application/json" },
      });

      //  Sau khi tạo thành công, thêm sản phẩm mới vào danh sách
      set((state) => ({
        products: [...state.products, res.data],
      }));

      return res.data;
    } catch (error) {
      console.error(" Lỗi khi tạo sản phẩm:", error);
      throw error; // ném lỗi ra ngoài để component xử lý
    }
  },

  /**
   *  Cập nhật sản phẩm
   * @param {string} id - ID sản phẩm cần cập nhật
   * @param {object} data - Dữ liệu mới
   */
  updateProduct: async (id, data) => {
    try {
      const res = await axiosClient.patch(`/products/${id}`, data, {
        headers: { "Content-Type": "application/json" },
      });

      //  Cập nhật lại sản phẩm trong danh sách tại client
      set((state) => ({
        products: state.products.map((p) =>
          p.id === id ? res.data : p
        ),
      }));
    } catch (error) {
      console.error(" Lỗi khi cập nhật sản phẩm:", error);
    }
  },

  /**
   *  Xóa sản phẩm
   * @param {string} id - ID sản phẩm cần xóa
   */
  deleteProduct: async (id) => {
    try {
      await axiosClient.delete(`/products/${id}`);

      //  Lọc bỏ sản phẩm đã xóa khỏi danh sách trong state
      set((state) => ({
        products: state.products.filter((p) => p.id !== id),
      }));
    } catch (error) {
      console.error(" Lỗi khi xóa sản phẩm:", error);
    }
  },

  /**
   *  Upload ảnh lên server
   * @param {File} file - File ảnh cần upload
   * @returns {Promise<{url: string}>} - Trả về link ảnh đã upload
   */
  UploadImage: async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file); // key phải trùng với field mà backend nhận

      const res = await axiosClient.post("/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      return res.data; // ví dụ: { url: "https://..." }
    } catch (error) {
      console.error(" Lỗi khi upload ảnh:", error);
      throw error;
    }
  },
  getProductStat: async () => {
    try {
      const res = await axiosClient.get("/products/stats")
      return res.data
    } catch (error) {
      console.error(" Lỗi khi gọi thống kê:", error);
      throw error;
    }
  },

  /**
   *  Cập nhật trang hiện tại (pagination)
   * @param {number} newPage - Trang mới cần chuyển đến
   */
  setPage: (newPage) => set({ page: newPage }),
}));

export default useProductStore;
