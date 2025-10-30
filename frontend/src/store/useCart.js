import { create } from 'zustand'
import axiosClient from '../api/axiosClient'

const useCartStore = create((set,get) => ({

  cartItems: [],
  total: 0,
  loading: false,
  fetchCart: async (userId) => {
    try {
      set({ loading: true })
      //goi api
      const res = await axiosClient.get(`/cart/${userId}`)
      set({ cartItems: res.data, loading: false })
    
      //Tinh tong tien sau lay gio
      get().calculateTotal(userId)
    } catch (error) {
      console.error(" Lỗi khi tải giỏ hàng:", error);
      set({ loading: false });
    }
  },
  addToCart: async (data) => {
    try {
      set({ loading: true })
      const res = await axiosClient.post('/cart', data, {
        headers: { "Content-Type": "application/json" },
      })
      const newItem = res.data
      set((state) => ({
        cartItems: [
          ...state.cartItems.filter(
            (item) => !(item.userId === data.userId && item.productId === data.productId)
            , newItem)
        ], loading: false
      }))
      get().calculateTotal(data.userId)
      return newItem
    } catch (error) {
      console.error(" Lỗi khi thêm vào giỏ hàng:", error);
      set({ loading: false });
    }
  },
  //Cap nhat so luong sanpham trong gio
  updateCartItem: async (data) => {
    try {
      set({loading:true})
      const res = await axiosClient.patch('/cart',data,{
          headers: { "Content-Type": "application/json" },
      })
      const updatedItem = res.data
      set((state) => ({
        cartItems: state.cartItems.map((item) =>
          item.userId === data.userId && item.productId === data.productId
            ? updatedItem
            : item
        ),
        loading: false,
      }));
      get().calculateTotal(data.userId)
      return updatedItem
    } catch (error) {
       console.error(" Lỗi khi cập nhật vào giỏ hàng:", error);
      set({ loading: false });
    }
  },
  // xoa 1 san pham khoi gio
  removeFromCart:async(userId,productId)=>{
try {
  set({loading:true})
  await axiosClient.delete(`/cart/${userId}/${productId}`)
  set((state)=>({
      cartItems:state.cartItems.filter(
        (item)=>!(item.userId===userId&&item.productId===productId)
      ),
      loading:false
  }))
  get().calculateTotal(userId)
} catch (error) {
  console.error("Lỗi khi xóa sản phẩm khỏi giỏ:", error);
      set({ loading: false });
}
  },
  //tinh tong gio hang
  calculateTotal: async (userId) => {
    try {
      const res = await axiosClient.get(`/cart/${userId}/total`)
      const { total } = res.data
      set({ total })
    } catch (error) {
      console.error(" Lỗi khi tính tổng giỏ hàng:", error);
      set({ total: 0 });
    }
  },
  //Xoa toan bo gio hang
  clearCart:async(userId)=>{
    try {
      set({loading:true})
      await axiosClient.delete(`/cart/${userId}`)
      set({
        cartItems:[],
        total:0,
        loading:false
      })
    } catch (error) {
      console.error("Lỗi khi xóa giỏ hàng:", error);
      set({ loading: false });
    }
  },
  //reset store (dung khi logout)
  reset:()=>{
    set({
      cartItems:[],
      total:0,
      loading:false,
    })
  }
}))
export default useCartStore