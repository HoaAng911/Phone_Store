// store/useAuthStore.js
import { create } from 'zustand';
import axiosClient from '../api/axiosClient';

const useAuthStore = create((set) => ({
  user: null,
  token: null,
  loading: false,
  error: null,

  // Login
  login: async (email, password) => {
    set({ loading: true, error: null });
    try {
      const { data } = await axiosClient.post('/auth/login', { email, password });

      
      const { access_token, user } = data;

      localStorage.setItem('access_token', access_token);
      axiosClient.defaults.headers.Authorization = `Bearer ${access_token}`;

      set({ user, token: access_token, loading: false });
      return user;
    } catch (err) {
      const message = err.response?.data?.message || 'Đăng nhập thất bại';
      set({ error: message, loading: false });
      throw err;
    }
  },

register: async (formData) => {
    set({ loading: true, error: null });
    try {
          const { data } = await axiosClient.post('/auth/register', formData);
      const { access_token, user } = data;   
      if (access_token && user) {
        localStorage.setItem('access_token', access_token);
        axiosClient.defaults.headers.Authorization = `Bearer ${access_token}`;
        set({ user, token: access_token, loading: false });
        return { user, token: access_token };
      }
      set({ loading: false });
      return data;
    } catch (err) {
      const message = err.response?.data?.message || 'Đăng ký thất bại';
      set({ error: message, loading: false });
      throw err;
    }
  },
  logout: () => {
    localStorage.removeItem('access_token');
    delete axiosClient.defaults.headers.Authorization;
    set({ user: null, token: null });
  },
  init: () => {
    const token = localStorage.getItem('access_token');
    if (token) {
      axiosClient.defaults.headers.Authorization = `Bearer ${token}`;
      
    }
  },
}));

export default useAuthStore;