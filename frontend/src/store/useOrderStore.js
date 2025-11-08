import { create } from 'zustand'
import axiosClient from '../api/axiosClient'

const useOrderStore = create((set,get) => ({

  orders: [],
  total: 0,
  loading: false,
  fetchAllOrder: async () => {
    try {
      set({ loading: true })
      //goi api
      const res = await axiosClient.get('/orders')
      set({ orders: res.data, loading: false })
    } catch (error) {
      console.error(" Lỗi khi tải danh sách đơn hàng:", error);
      set({ loading: false });
    }
  },
 
  reset:()=>{
    set({
      cartItems:[],
      total:0,
      loading:false,
    })
  }
}))
export default useOrderStore