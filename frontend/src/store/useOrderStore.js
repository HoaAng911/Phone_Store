import { create } from 'zustand'
import axiosClient from '../lib/client/axiosClient'

const useOrderStore = create((set, get) => ({

  // STATE
  orders: [],
  orderDetail: null,
  total: 0,
  loading: false,

  // Lấy tất cả đơn hàng
  fetchAllOrder: async () => {
    try {
      set({ loading: true })
      const res = await axiosClient.get('/orders')
      set({
        orders: res.data,
        loading: false
      })
      console.log(orders)
    } catch (error) {
      console.error(" Lỗi khi tải danh sách đơn hàng:", error);
      set({ loading: false })
    }
  },

  // Lấy đơn hàng theo userId (GET /orders/my)
  fetchMyOrders: async (userId) => {
    try {
      set({ loading: true })
      const res = await axiosClient.get(`/orders/my?userId=${userId}`)
      console.log('API Response:', res); // Debug
      console.log('Response data:', res.data); // Debug

      set({
        orders: res.data,
        loading: false
      })
    } catch (error) {
      console.error(" Lỗi khi tải danh sách đơn hàng của user:", error);
      set({ loading: false })
    }
  },

  // Lấy chi tiết đơn hàng
  fetchOrderDetail: async (orderId) => {
    try {
      set({ loading: true })
      const res = await axiosClient.get(`/orders/${orderId}`)
      set({
        orderDetail: res.data,
        loading: false
      })
    } catch (error) {
      console.error(" Lỗi lấy chi tiết đơn hàng:", error);
      set({ loading: false })
    }
  },

  // Tạo đơn hàng
  createOrder: async (userId, data) => {
    try {
      set({ loading: true })
      const res = await axiosClient.post(`/orders?userId=${userId}`, data)

      set({ loading: false })
      return res.data
    } catch (error) {
      console.error(" Lỗi tạo đơn hàng:", error);
      set({ loading: false })
    }
  },


  reset: () => {
    set({
      orders: [],
      total: 0,
      loading: false,
      orderDetail: null,
    })
  }

}))

export default useOrderStore
