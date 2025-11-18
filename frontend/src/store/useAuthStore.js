// store/useAuthStore.js
import { create } from 'zustand';
import axiosClient from '../api/axiosClient';

const useAuthStore = create((set) => ({
  user: null,
  token: null,
  loading: false,
  error: null,

  // Đăng nhập
  login: async (email, password) => {
    set({ loading: true, error: null });
    try {
      const { data } = await axiosClient.post('/auth/login', { email, password });
      const { access_token, user } = data;

      if (!access_token || !user) throw new Error('Dữ liệu đăng nhập không hợp lệ');

      localStorage.setItem('access_token', access_token);
      axiosClient.defaults.headers.Authorization = `Bearer ${access_token}`;

      set({ user, token: access_token, loading: false });
     
      return user;
    } catch (err) {
      const message = err.response?.data?.message || 'Đăng nhập thất bại';
      set({ error: message, loading: false });
      localStorage.removeItem('access_token');
      delete axiosClient.defaults.headers.Authorization;
      throw err;
    }
  },

  // Đăng ký (mới thêm)
  register: async (registerData) => {
    set({ loading: true, error: null });
    try {
      const { data } = await axiosClient.post('/auth/register', registerData);
      const { access_token, user } = data;

      if (!access_token || !user) throw new Error('Đăng ký thất bại');

      localStorage.setItem('access_token', access_token);
      axiosClient.defaults.headers.Authorization = `Bearer ${access_token}`;

      set({ user, token: access_token, loading: false });
      return user;
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

  init: async () => {
    const token = localStorage.getItem('access_token');
    console.log('INIT ĐANG DÙNG TOKEN:', token?.substring(0, 20) + '...');
    if (token) {
      axiosClient.defaults.headers.Authorization = `Bearer ${token}`;
      try {
        const { data: user } = await axiosClient.get('/auth/profile');
        set({ token, user });
      } catch (err) {
        localStorage.removeItem('access_token');
        delete axiosClient.defaults.headers.Authorization;
        set({ token: null, user: null });
      }
    }
  },

  fetchProfile: async () => {
    set({ loading: true });
    try {
      const user = await axiosClient.get('/auth/profile').then(res => res.data);
      console.log('FETCHPROFILE ĐANG DÙNG HEADER:', axiosClient.defaults.headers.Authorization);
      set({ user, loading: false });
      console.log(user)
    } catch (err) {
      set({ loading: false });
    }
  },

  updateProfile: async (updateData) => {
    set({ loading: true, error: null });
    try {
      const { data } = await axiosClient.put('/auth/profile', updateData);
      set({ user: data, loading: false });
      return data;
    } catch (err) {
      const message = err.response?.data?.message || 'Cập nhật thất bại';
      set({ error: message, loading: false });
      throw err;
    }
  },
}));

export default useAuthStore;