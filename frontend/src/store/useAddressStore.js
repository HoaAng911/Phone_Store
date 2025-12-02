// src/store/useAddressStore.js
import { create } from 'zustand';
import axiosClient from '../lib/client/axiosClient';

const useAddressStore = create((set, get) => ({
  addresses: [],
  loading: false,
  error: null,

  // -------------------------------------------------
  fetchAddresses: async (userId) => {
    set({ loading: true, error: null });
    try {
      const { data } = await axiosClient.get(`/addresses/user/${userId}`);
      console.log('API /addresses/user/:userId trả về thành công:', data);
      set({ addresses: data, loading: false });
      
    } catch (err) {
      const msg = err.response?.data?.message || 'Không thể tải danh sách địa chỉ';
      console.error('[useAddressStore] fetchAddresses error:', err);
      set({ addresses: [], loading: false, error: msg });
    }
  },

  // -------------------------------------------------
  createAddress: async (userId, payload) => {
    try {
      await axiosClient.post(`/addresses/user/${userId}`, payload);
      get().fetchAddresses(userId); // refresh
    } catch (err) {
      const msg = err.response?.data?.message || 'Không thể tạo địa chỉ';
      console.error('[useAddressStore] createAddress error:', err);
      set({ error: msg });
    }
  },

  // -------------------------------------------------
  updateAddress: async (id, userId, payload) => {
    try {
      await axiosClient.put(`/addresses/${id}/user/${userId}`, payload);
      get().fetchAddresses(userId); // refresh
    } catch (err) {
      const msg = err.response?.data?.message || 'Không thể cập nhật địa chỉ';
      console.error('[useAddressStore] updateAddress error:', err);
      set({ error: msg });
    }
  },

  // -------------------------------------------------
  deleteAddress: async (id, userId) => {
    try {
      await axiosClient.delete(`/addresses/${id}/user/${userId}`);
      get().fetchAddresses(userId); // refresh
    } catch (err) {
      const msg = err.response?.data?.message || 'Không thể xóa địa chỉ';
      console.error('[useAddressStore] deleteAddress error:', err);
      set({ error: msg });
    }
  },
}));

export default useAddressStore;
