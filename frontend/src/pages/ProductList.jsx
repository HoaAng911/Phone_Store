import React, { useEffect } from "react";
import { data, useNavigate } from "react-router-dom";
import useProductStore from "../store/productStore";

/**
 *  Component: ProductList
 * Hiển thị danh sách sản phẩm với các chức năng:
 *  - Xem chi tiết
 *  - Sửa / Xóa
 *  - Phân trang
 */
const ProductList = () => {
  //  Lấy state & action từ Zustand store
  const {
    products,
    fetchProducts,
    loading,
    deleteProduct,
    page,
    totalPage,
    setPage,
  } = useProductStore();

  const navigate = useNavigate();

  //  Fetch sản phẩm mỗi khi page thay đổi
  useEffect(() => {
    fetchProducts(page);
    console.log(products)
  }, [page, fetchProducts]);

  //  Điều hướng tới trang chi tiết sản phẩm
  const handleDetail = (id) => navigate(`/products/${id}`);

  //  Điều hướng tới trang edit sản phẩm
  const handleEdit = (id) => navigate(`/products/edit/${id}`);

  //  Xóa sản phẩm
  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc muốn xóa sản phẩm này?")) return;
    try {
      await deleteProduct(id);
      alert("Xóa sản phẩm thành công");
      fetchProducts(page); // Reload danh sách
    } catch (error) {
      console.error("Lỗi khi xóa sản phẩm:", error);
      alert("Có lỗi xảy ra khi xóa sản phẩm");
    }
  };

  //  Chuyển trang phân trang
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPage) setPage(newPage);
  };

  //  Thêm sản phẩm mới
  const handleAddProduct = () => navigate("/products/add");

  //  Loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <p className="text-lg text-gray-500 animate-pulse font-medium">
          Đang tải dữ liệu...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white shadow-lg  overflow-hidden border border-gray-100">
          {/* Header */}
          <div className="bg-gray-800 px-6 py-3 flex items-center justify-between">
            <h1 className="text-xl font-semibold text-white">
              Danh sách sản phẩm
            </h1>
            <button
              onClick={handleAddProduct}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            >
              Thêm sản phẩm
            </button>
          </div>

          {/* Table */}
          <div className="p-6 overflow-x-auto rounded-lg border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200 text-sm text-center">
              <thead className="bg-gray-50 text-gray-600 uppercase text-xs font-medium">
                <tr>
                  <th className="px-4 py-3">ID</th>
                  <th className="px-4 py-3">Ảnh</th>
                  <th className="px-4 py-3">Tên sản phẩm</th>
                  <th className="px-4 py-3">Giá</th>
                  <th className="px-4 py-3">Thương hiệu</th>
                  <th className="px-4 py-3">Kho</th>
                  <th className="px-4 py-3">Hành động</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {products.data?.map((p) => (
                  <tr
                    key={p.id}
                    className="hover:bg-gray-50 transition-all duration-200"
                  >
                    <td className="px-4 py-4 font-medium text-gray-700">{p.id}</td>

                    {/* Ảnh sản phẩm */}
                    <td className="px-4 py-4">
                      {p.images?.length ? (
                        <img
                          src={p.images[0].url}
                          alt={p.name}
                          className="w-12 h-12 object-contain mx-auto rounded-md border border-gray-100"
                        />
                      ) : (
                        <div className="w-12 h-12 bg-gray-100 flex items-center justify-center text-gray-500 text-xs mx-auto rounded-md">
                          No Image
                        </div>
                      )}
                    </td>

                    <td className="px-4 py-4 text-gray-800 font-medium">{p.name}</td>

                    {/* Giá sản phẩm */}
                    <td className="px-4 py-4 text-gray-700 font-semibold">
                      {p.price?.toLocaleString("vi-VN")}₫
                    </td>

                    <td className="px-4 py-4 text-gray-600">{p.brand}</td>

                    {/* Trạng thái kho */}
                    <td className="px-4 py-4">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                          p.stock > 0
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-600"
                        }`}
                      >
                        {p.stock > 0 ? `Còn hàng (${p.stock})` : "Hết hàng"}
                      </span>
                    </td>

                    {/* Hành động */}
                    <td className="px-4 py-4">
                      <div className="flex justify-center gap-2">
                        <button
                          className="px-3 py-1 bg-blue-600 text-white rounded-md text-xs font-medium hover:bg-blue-700 transition"
                          onClick={() => handleDetail(p.id)}
                        >
                          Xem
                        </button>
                        <button
                          className="px-3 py-1 bg-gray-600 text-white rounded-md text-xs font-medium hover:bg-gray-700 transition"
                          onClick={() => handleEdit(p.id)}
                        >
                          Sửa
                        </button>
                        <button
                          className="px-3 py-1 bg-red-600 text-white rounded-md text-xs font-medium hover:bg-red-700 transition"
                          onClick={() => handleDelete(p.id)}
                        >
                          Xóa
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Phân trang */}
            <div className="mt-6 flex justify-center items-center gap-2">
              <button
                onClick={() => handlePageChange(page - 1)}
                disabled={page === 1}
                className={`px-3 py-1 border rounded-md text-sm font-medium ${
                  page === 1
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-white text-gray-600 hover:bg-gray-100"
                } transition`}
              >
                Prev
              </button>

              {Array.from({ length: totalPage }, (_, i) => (
                <button
                  key={i}
                  onClick={() => handlePageChange(i + 1)}
                  className={`px-3 py-1 border rounded-md text-sm font-medium ${
                    page === i + 1
                      ? "bg-blue-600 text-white"
                      : "bg-white text-gray-600 hover:bg-gray-100"
                  } transition`}
                >
                  {i + 1}
                </button>
              ))}

              <button
                onClick={() => handlePageChange(page + 1)}
                disabled={page === totalPage}
                className={`px-3 py-1 border rounded-md text-sm font-medium ${
                  page === totalPage
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-white text-gray-600 hover:bg-gray-100"
                } transition`}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
