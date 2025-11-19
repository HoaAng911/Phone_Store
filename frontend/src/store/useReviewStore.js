// src/store/useReviewStore.js
import { create } from "zustand";
import axiosClient from "../api/axiosClient";

const useReviewStore = create((set) => ({
  reviews: [],
  loading: false,

  // Lấy danh sách review của 1 sản phẩm
  fetchReviews: async (productId) => {
    try {
      set({ loading: true });
      const res = await axiosClient.get(`/reviews/${productId}`);
      set({
        reviews: res.data,
        loading: false,
      });
    } catch (err) {
      console.error("Lỗi khi lấy review:", err);
      set({ loading: false });
    }
  },

  // Tạo review
  createReview: async (data) => {
    try {
     
      const res = await axiosClient.post("/reviews", data);
     
      return res.data;
    } catch (error) {
      console.error("Lỗi khi tạo review:", error);
      throw error;
    }
  },
    deleteReviews: async (reviewId) => {
    try {
      set({ loading: true });
       await axiosClient.delete(`/reviews/${reviewId}`);
      set((state) => ({
      reviews: state.reviews.filter((review) => review.reviewId !== reviewId),
      loading: false,
    }));
    } catch (err) {
      console.error("Lỗi khi xóa review:", err);
      set({ loading: false });
    }
  },

}));

export default useReviewStore;
