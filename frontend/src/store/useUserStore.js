// src/store/useUserStore.js
import { create } from 'zustand';
import axiosClient from '../api/axiosClient';

const useUserStore = create((set, get) => ({
  users: [],
  stats: { total: 0, admin: 0 },
  loading: false,
  error: null,               // <-- mới

  // -------------------------------------------------
  fetchUsers: async () => {
    set({ loading: true, error: null });
    try {
      const { data } = await axiosClient.get('/users');
      set({ users: data, loading: false });
    } catch (err) {
      const msg = err.response?.data?.message || 'Không thể tải danh sách người dùng';
      console.error('[useUserStore] fetchUsers error:', err);
      set({ users: [], loading: false, error: msg });
    }
  },

  // -------------------------------------------------
  fetchStats: async () => {
    try {
      const { data } = await axiosClient.get('/users/stats');
      set({ stats: data });
      return data;
    } catch (err) {
      console.error('[useUserStore] fetchStats error:', err);
      return { total: 0, admin: 0 };
    }
  },

  // -------------------------------------------------
  createUser: async (payload) => {
    await axiosClient.post('/users', payload);
    get().fetchUsers();               // refresh
  },
  updateUser: async (id, payload) => {
    await axiosClient.put(`/users/${id}`, payload);
    get().fetchUsers();
  },
  deleteUser: async (id) => {
    await axiosClient.delete(`/users/${id}`);
    get().fetchUsers();
  },
}));

export default useUserStore;