import { create } from 'zustand';
import axiosClient from '../../lib/client/axiosClient';
import useAuthStore from '../auth/store/useAuthStore';

const useCartStore = create((set, get) => ({
  cartItems: [],
  total: 0,
  loading: false,


  fetchCart: async () => {
    try {
      const userId = useAuthStore.getState().user?.id;
      if (!userId) {
        console.warn('fetchCart: userId chưa có');
      }
      set({ loading: true });
      const res = await axiosClient.get(`/cart/${userId}`);
      set({ cartItems: res.data, loading: false });
      get().calculateTotal(userId);
    } catch (error) {
      console.error("Lỗi khi tải giỏ hàng:", error.response?.data || error.message);
      set({ loading: false, cartItems: [] });
    }
  },

  addToCart: async ({ userId, productId, quantity = 1, selectedColor }) => {
    try {
      set({ loading: true });

      const res = await axiosClient.post(
        `/cart/${userId}`, {
        productId, quantity, selectedColor
      }
      );
      const newItem = res.data;

      set((state) => ({
        cartItems: [

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


 updateCartItem: async ({ userId, productId, quantity, selectedColor }) => {
  // Lưu cart cũ để rollback nếu lỗi
  const previousCart = get().cartItems;

  // optimistic: cập nhật local ngay
  set((state) => ({
    cartItems: state.cartItems.map((item) =>
      item.userId === userId && item.productId === productId
        ? { ...item, quantity }
        : item
    ),
  }));

  try {
    set({ loading: true });

    const res = await axiosClient.patch(`/cart/${userId}`, {
      productId,
      quantity,
      selectedColor,
    });

    const updatedItem = res.data;

    // đồng bộ lại store với backend trả về
    set((state) => ({
      cartItems: state.cartItems.map((item) =>
        item.userId === userId && item.productId === productId
          ? { ...item, ...updatedItem }
          : item
      ),
      loading: false,
    }));

    get().calculateTotal(userId);
    return updatedItem;
  } catch (error) {
    // rollback nếu lỗi
    set({ cartItems: previousCart, loading: false });
    console.error("Lỗi khi cập nhật giỏ hàng:", error.response?.data || error.message);
    throw error;
  }
},



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


  calculateTotal: async (userId) => {
    try {
      const res = await axiosClient.get(`/cart/${userId}/total`);
      set({ total: res.data.total });
    } catch (error) {
      console.error("Lỗi khi tính tổng giỏ hàng:", error.response?.data || error.message);
      set({ total: 0 });
    }
  },


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


  reset: () => set({ cartItems: [], total: 0, loading: false }),
}));

export default useCartStore;