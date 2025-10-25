import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import useProductStore from "../store/productStore";

/**
 *  Component: ProductDetail
 * Hiển thị chi tiết sản phẩm:
 *  - Ảnh sản phẩm
 *  - Thông tin cơ bản (tên, mô tả, giá, thương hiệu, tồn kho)
 *  - Thông số kỹ thuật
 */
const ProductDetail = () => {
  const { id } = useParams();
  const { product, fetchProductById, loading } = useProductStore();

  //  Fetch sản phẩm khi component mount hoặc id thay đổi
  useEffect(() => {
    fetchProductById(id);
  }, [id, fetchProductById]);

  //  Loading state hoặc chưa có product
  if (loading || !product)
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <p className="text-lg text-gray-500 animate-pulse font-medium">
          Đang tải sản phẩm...
        </p>
      </div>
    );

  //  Chuẩn bị danh sách thông số kỹ thuật
  const specs = [
    { label: "Màn hình", value: product.specification.screenSize },
    { label: "Độ phân giải", value: product.specification.resolution },
    { label: "CPU", value: product.specification.cpu },
    { label: "RAM", value: product.specification.ram },
    { label: "Bộ nhớ", value: product.specification.storage },
    { label: "Pin", value: product.specification.battery },
    { label: "Hệ điều hành", value: product.specification.os },
    { label: "Camera", value: product.specification.camera },
    { label: "SIM", value: product.specification.sim },
    { label: "Trọng lượng", value: product.specification.weight },
    {
      label: "Màu sắc",
      value: product.specification.colors?.length
        ? product.specification.colors.join(", ")
        : "Không có",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-semibold text-gray-800">
            Chi tiết sản phẩm
          </h1>
          <Link
            to="/products/list"
            className="flex items-center gap-2 px-4 py-2 bg-white text-gray-600 rounded-md shadow-sm hover:bg-gray-100 hover:text-gray-800 transition-all duration-200"
          >
            Quay lại
          </Link>
        </div>

        {/* Product Card */}
        <div className="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-100">
          {/* Header ID */}
          <div className="bg-gray-800 px-6 py-3">
            <p className="text-white text-sm font-medium">ID: #{product.id}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6">
            {/* Image Section */}
            <div className="flex flex-col items-center justify-center">
              <div className="relative">
                {product.images?.[0]?.url ? (
                  <img
                    src={product.images[0].url}
                    alt={product.name}
                    className="w-64 h-64 object-contain rounded-lg shadow-md border border-gray-100"
                  />
                ) : (
                  <div className="w-64 h-64 bg-gray-100 flex items-center justify-center text-gray-500 rounded-lg">
                    No Image
                  </div>
                )}
                <div className="absolute bottom-2 right-2 bg-gray-700 text-white px-2 py-1 rounded-full text-xs font-medium">
                  {product.images?.length || 0} ảnh
                </div>
              </div>
            </div>

            {/* Main Info */}
            <div className="flex flex-col justify-center space-y-6">
              <div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                  {product.name}
                </h2>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {product.description}
                </p>
              </div>

              <div className="space-y-4">
                {/* Giá */}
                <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-600">
                  <p className="text-xs text-gray-500 mb-1">Giá bán</p>
                  <p className="text-2xl font-semibold text-green-700">
                    {product.price?.toLocaleString("vi-VN")}₫
                  </p>
                </div>

                {/* Thương hiệu & Tồn kho */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                    <p className="text-xs text-gray-500 mb-1">Thương hiệu</p>
                    <p className="font-medium text-gray-700">{product.brand}</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                    <p className="text-xs text-gray-500 mb-1">Tồn kho</p>
                    <p
                      className={`font-medium ${
                        product.stock > 0 ? "text-green-600" : "text-red-500"
                      }`}
                    >
                      {product.stock > 0
                        ? `${product.stock} sản phẩm`
                        : "Hết hàng"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Specifications */}
          {product.specification && (
            <div className="bg-gray-50 px-6 py-8 border-t border-gray-200">
              <h3 className="text-xl font-semibold text-gray-800 mb-6">
                Thông số kỹ thuật
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {specs.map((spec, index) => (
                  <div
                    key={index}
                    className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"
                  >
                    <p className="text-xs text-gray-500 font-medium">{spec.label}</p>
                    <p className="text-sm text-gray-700 font-medium">{spec.value}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
