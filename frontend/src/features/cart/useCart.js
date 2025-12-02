import { create } from 'zustand';
import axiosClient from '../../lib/client/axiosClient';
import useAuthStore from '../auth/store/useAuthStore';

const useCartStore = create((set, get) => ({
  cartItems: [],
  total: 0,
  loading: false,

  // Tính total LOCAL - không gọi API
  calculateTotalLocal: () => {
    const items = get().cartItems;
    const total = items.reduce((sum, item) => {
      const price = item.product?.price || 0;
      return sum + price * item.quantity;
    }, 0);
    set({ total });
  },

  fetchCart: async () => {
    try {
      const userId = useAuthStore.getState().user?.id;
      if (!userId) {
        console.warn('fetchCart: userId chưa có');
        return;
      }
      set({ loading: true });
      const res = await axiosClient.get(`/cart/${userId}`);
      set({ cartItems: res.data, loading: false });
      get().calculateTotalLocal();
    } catch (error) {
      console.error("Lỗi khi tải giỏ hàng:", error.response?.data || error.message);
      set({ loading: false, cartItems: [] });
    }
  },

  addToCart: async ({ userId, productId, quantity = 1, selectedColor }) => {
    try {
      const res = await axiosClient.post(`/cart/${userId}`, {
        productId,
        quantity,
        selectedColor,
      });
      const newItem = res.data;

      set((state) => ({
        cartItems: [
          ...state.cartItems.filter(
            (item) => !(item.userId === userId && item.productId === productId)
          ),
          newItem,
        ],
      }));

      get().calculateTotalLocal();
      return newItem;
    } catch (error) {
      console.error("Lỗi khi thêm vào giỏ hàng:", error.response?.data || error.message);
      throw error;
    }
  },

  updateCartItem: async ({ userId, productId, quantity, selectedColor }) => {
    // Lưu cart cũ để rollback
    const previousCart = get().cartItems;
    const previousTotal = get().total;

    // Optimistic update - Cập nhật local NGAY
    set((state) => ({
      cartItems: state.cartItems.map((item) =>
        item.userId === userId && item.productId === productId
          ? { ...item, quantity, selectedColor }
          : item
      ),
    }));

    // Tính total local ngay
    get().calculateTotalLocal();

    try {
      // Gọi API trong background - KHÔNG đợi
      const res = await axiosClient.patch(`/cart/${userId}`, {
        productId,
        quantity,
        selectedColor,
      });

      // Sync lại data từ server (nếu cần)
      const updatedItem = res.data;
      set((state) => ({
        cartItems: state.cartItems.map((item) =>
          item.userId === userId && item.productId === productId
            ? { ...item, ...updatedItem }
            : item
        ),
      }));

      // Tính lại total sau khi sync
      get().calculateTotalLocal();
    } catch (error) {
      // Rollback nếu lỗi
      set({ cartItems: previousCart, total: previousTotal });
      console.error("Lỗi khi cập nhật giỏ hàng:", error.response?.data || error.message);
      throw error;
    }
  },

  removeFromCart: async (userId, productId) => {
    // Optimistic update
    const previousCart = get().cartItems;
    const previousTotal = get().total;

    set((state) => ({
      cartItems: state.cartItems.filter(
        (item) => !(item.userId === userId && item.productId === productId)
      ),
    }));

    get().calculateTotalLocal();

    try {
      await axiosClient.delete(`/cart/${userId}/${productId}`);
    } catch (error) {
      // Rollback
      set({ cartItems: previousCart, total: previousTotal });
      console.error("Lỗi khi xóa sản phẩm khỏi giỏ:", error.response?.data || error.message);
      throw error;
    }
  },

  clearCart: async (userId) => {
    // Optimistic update
    const previousCart = get().cartItems;
    const previousTotal = get().total;

    set({ cartItems: [], total: 0 });

    try {
      await axiosClient.delete(`/cart/${userId}`);
    } catch (error) {
      // Rollback
      set({ cartItems: previousCart, total: previousTotal });
      console.error("Lỗi khi xóa giỏ hàng:", error.response?.data || error.message);
      throw error;
    }
  },

  reset: () => set({ cartItems: [], total: 0, loading: false }),
}));

export default useCartStore;