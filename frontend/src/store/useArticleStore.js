import { create } from "zustand";
import axiosClient from "../lib/client/axiosClient";


const useArticleStore = create((set) => ({
  // State
  articles: [],
  article: null,
  latestArticles: [],
  loading: false,
  page: 1,
  totalPage: 1,
  limit: 10,

  fetchArticles: async (page = 1, limit = 10, published) => {
    try {
      set({ loading: true });
      const params = { page, limit };
      if (published !== undefined) params.published = published;

      const res = await axiosClient.get("/articles", { params });

      const response = res.data ?? {};
      const payload = response.data ?? response;

      const articlesArray = Array.isArray(payload)
        ? payload
        : payload.items ?? payload.docs ?? payload.results ?? [];

      set({
        articles: articlesArray,
        page: response.page ?? page,
        totalPage: response.totalPages ?? response.totalPage ?? 1,
        limit,
        loading: false,
      });
    } catch (error) {
      console.error("Lỗi khi tải danh sách bài viết:", error);
      set({ loading: false });
    }
  },


  fetchLatestArticles: async (limit = 6) => {
    try {
      set({ loading: true });
      const res = await axiosClient.get("/articles", {
        params: { limit, published: true },
      });

      const response = res.data ?? {};
      const payload = response.data ?? response;
      const latest = Array.isArray(payload) ? payload : payload.items ?? payload.docs ?? payload.results ?? [];

      set({
        latestArticles: latest,
        loading: false,
      });
    } catch (error) {
      console.error("Lỗi khi tải bài viết mới nhất:", error);
      set({ loading: false });
    }
  },


  fetchArticleBySlug: async (slug) => {
    try {
      set({ loading: true });
      const res = await axiosClient.get(`/articles/slug/${slug}`);
      const response = res.data ?? {};
      const payload = response.data ?? response;

      set({
        article: payload,
        loading: false,
      });
    } catch (error) {
      console.error("Lỗi khi tải bài viết:", error);
      set({ article: null, loading: false });
      throw error;
    }
  },


  fetchArticleById: async (id) => {
    try {
      set({ loading: true });
      const res = await axiosClient.get(`/articles/${id}`);
      const response = res.data ?? {};
      const payload = response.data ?? response;

      set({
        article: payload,
        loading: false,
      });
    } catch (error) {
      console.error("Lỗi khi tải bài viết theo ID:", error);
      set({ loading: false });
      throw error;
    }
  },

  // Tạo bài viết mới
  createArticle: async (data) => {
    try {
      set({ loading: true });

      const res = await axiosClient.post("/articles", data, {
        headers: { "Content-Type": "application/json" },
      });

      const payload = res.data ?? {};

      // Thêm vào danh sách + latest nếu published
      set((state) => ({
        articles: [payload, ...state.articles],
        latestArticles:
          payload.isPublished
            ? [payload, ...state.latestArticles].slice(0, 6)
            : state.latestArticles,
        loading: false,
      }));

      return payload;
    } catch (error) {
      console.error("Lỗi khi tạo bài viết:", error);
      set({ loading: false });
      throw error;
    }
  },

  // Cập nhật bài viết
  updateArticle: async (id, data) => {
    try {
      const res = await axiosClient.patch(`/articles/${id}`, data);

      const payload = res.data ?? {};

      set((state) => ({
        articles: state.articles.map((a) => (a.id === id ? payload : a)),
        latestArticles: state.latestArticles.map((a) => (a.id === id ? payload : a)),
        article: state.article?.id === id ? payload : state.article,
      }));
    } catch (error) {
      console.error("Lỗi khi cập nhật bài viết:", error);
      throw error;
    }
  },

  // Xóa bài viết
  deleteArticle: async (id) => {
    try {
      await axiosClient.delete(`/articles/${id}`);

      set((state) => ({
        articles: state.articles.filter((a) => a.id !== id),
        latestArticles: state.latestArticles.filter((a) => a.id !== id),
        article: state.article?.id === id ? null : state.article,
      }));
    } catch (error) {
      console.error("Lỗi khi xóa bài viết:", error);
      throw error;
    }
  },

  // Reset chi tiết bài khi rời trang
  clearCurrentArticle: () => set({ article: null }),

  // Thay đổi trang (dùng trong component phân trang)
  setPage: (page) => set({ page }),
}));

export default useArticleStore;
