import { Upload } from "lucide-react";
import axiosClient from "../api/axiosClient";
import { create } from 'zustand'

const useProductStore = create((set) => ({
  products: [],
  product: null,
  loading: false,

  //Lay danh sach san pham
  fetchProducts: async () => {
    try {
      set({ loading: true })
      const res = await axiosClient.get("/products")
      set({ products: res.data, loading: false })
    } catch (error) {
      console.error("Lỗi khi tải danh sách sản phẩm", error)
      set({ loading: false })
    }
  },
  //Lay chi tiet 1 san pham
  fetchProductById: async (id) => {
    try {
      set({ loading: true })
      const res = await axiosClient.get(`/products/${id}`)
      set({ product: res.data, loading: false })
    } catch (error) {
      console.error("Lỗi khi tải sản phẩm ", error)
      set({ loading: false })
    }
  },
  //Tao moi san pham
  createProduct: async (data) => {
    try {
      const res = await axiosClient.post("/products", data, {
  headers: { "Content-Type": "application/json" }})
      set((state) => ({
        products: [...state.products, res.data]
      }))
      return res.data;
    } catch (error) {
      console.error("Lỗi khi tạo sản phẩm ", error)
      throw error
    }
  },
  //Cap nhat san pham
  updateProduct: async (id, data) => {
    try {
      const res = await axiosClient.patch(`/products/${id}`, data, {
  headers: { "Content-Type": "application/json" }})
      set((state) => ({
        products: state.products.map((p) => p.id === id ? res.data : p)
      }))
    } catch (error) {
      console.error("Lỗi khi cập nhật sản phẩm ", error)
    }
  },
  //Xoa san pham
  deleteProduct: async (id) => {
    try {
      await axiosClient.delete(`/products/${id}`)
      set((state) => ({
        products: state.products.filter((p) => p.id !== id)
      }))
    } catch (error) {
      console.error("Lỗi khi xóa sản phẩm ", error)
    }
  },
 UploadImage: async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file); // key phải là "file"
      const res = await axiosClient.post("/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data; // { url: "..." }
    } catch (error) {
      console.error("Lỗi khi upload ảnh", error);
      throw error
    }
  }

}))
export default useProductStore