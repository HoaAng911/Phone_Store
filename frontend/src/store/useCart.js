import { create } from 'zustand';
import axiosClient from '../api/axiosClient';

const useCartStore = create((set, get) => ({
  cartItems: [],
  total: 0,
  loading: false,

  // LẤY GIỎ HÀNG - OK
  fetchCart: async (userId) => {
    try {
      set({ loading: true });
      const res = await axiosClient.get(`/cart/${userId}`);
      set({ cartItems: res.data, loading: false });
      get().calculateTotal(userId);
    } catch (error) {
      console.error("Lỗi khi tải giỏ hàng:", error.response?.data || error.message);
      set({ loading: false, cartItems: [] });
    }
  },

  // THÊM VÀO GIỎ - ĐÃ SỬA ROUTE + CÚ PHÁP
  addToCart: async ({ userId, productId, quantity = 1 }) => {
    try {
      set({ loading: true });
      console.log("Gửi addToCart:", { userId, productId, quantity });
      const res = await axiosClient.post(
        `/cart/${userId}`,
      );
      const newItem = res.data;

      set((state) => ({
        cartItems: [
          // SỬA CÚ PHÁP: DẤU PHẨY SAI
          ...state.cartItems.filter(
            (item) => !(item.userId === userId && item.productId === productId)
          ),
          newItem,
        ],
        loading: false,
      }));

      get().calculateTotal(userId);
      return newItem;
    } catch (error) {
      console.error("Lỗi khi thêm vào giỏ hàng:", error.response?.data || error.message);
      set({ loading: false });
      throw error;
    }
  },

  // CẬP NHẬT - ĐÃ SỬA ROUTE
  updateCartItem: async ({ userId, productId, quantity }) => {
    try {
      set({ loading: true });
      const res = await axiosClient.patch(
        `/cart/${userId}`,           // ĐÃ SỬA
        { productId, quantity }
      );
      const updatedItem = res.data;

      set((state) => ({
        cartItems: state.cartItems.map((item) =>
          item.userId === userId && item.productId === productId
            ? updatedItem
            : item
        ),
        loading: false,
      }));

      get().calculateTotal(userId);
      return updatedItem;
    } catch (error) {
      console.error("Lỗi khi cập nhật giỏ hàng:", error.response?.data || error.message);
      set({ loading: false });
      throw error;
    }
  },

  // XÓA 1 MẶT HÀNG - OK
  removeFromCart: async (userId, productId) => {
    try {
      set({ loading: true });
      await axiosClient.delete(`/cart/${userId}/${productId}`);
      set((state) => ({
        cartItems: state.cartItems.filter(
          (item) => !(item.userId === userId && item.productId === productId)
        ),
        loading: false,
      }));
      get().calculateTotal(userId);
    } catch (error) {
      console.error("Lỗi khi xóa sản phẩm khỏi giỏ:", error.response?.data || error.message);
      set({ loading: false });
      throw error;
    }
  },

  // TÍNH TỔNG - OK
  calculateTotal: async (userId) => {
    try {
      const res = await axiosClient.get(`/cart/${userId}/total`);
      set({ total: res.data.total });
    } catch (error) {
      console.error("Lỗi khi tính tổng giỏ hàng:", error.response?.data || error.message);
      set({ total: 0 });
    }
  },

  // XÓA TOÀN BỘ - OK
  clearCart: async (userId) => {
    try {
      set({ loading: true });
      await axiosClient.delete(`/cart/${userId}`);
      set({ cartItems: [], total: 0, loading: false });
    } catch (error) {
      console.error("Lỗi khi xóa giỏ hàng:", error.response?.data || error.message);
      set({ loading: false });
      throw error;
    }
  },

  // RESET KHI LOGOUT - OK
  reset: () => set({ cartItems: [], total: 0, loading: false }),
}));

export default useCartStore;