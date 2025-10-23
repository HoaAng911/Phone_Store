import React, { useEffect } from 'react';
import useProductStore from '../store/productStore';


const ProductList = () => {
  const { products, fetchProducts, loading } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) return <p className="text-center mt-4 text-gray-600 animate-pulse">Đang tải dữ liệu...</p>;

  return (
    <div className="p-6 bg-white shadow-lg rounded-2xl">
    <h1 className='text-2xl font-bold mb-6 text-gray-800 mt-5'>Danh sách sản phẩm</h1>
      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-50 text-gray-700 uppercase text-xs font-semibold">
            <tr>
              <th className="px-4 py-3 text-center">ID</th>
              <th className="px-4 py-3 text-center">Ảnh</th>
              <th className="px-4 py-3 text-center">Tên sản phẩm</th>
              <th className="px-4 py-3 text-center">Giá</th>
              <th className="px-4 py-3 text-center">Thương hiệu</th>
              <th className="px-4 py-3 text-center">Kho</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100 text-center">
            {products.map((p) => (
              <tr
                key={p.id}
                className="hover:bg-gray-50 transition-all duration-200"
              >
                <td className="px-4 py-3 text-gray-700 font-medium">{p.id}</td>

                <td className="px-4 py-3">
                  {p.images && p.images.length > 0 ? (
                    <img
                      src={p.images[0].url}
                      alt={p.name}
                      className="w-16 h-16 object-cover mx-auto rounded-md shadow-sm border"
                    />
                  ) : (
                    <div className="w-16 h-16 bg-gray-200 flex items-center justify-center text-gray-500 text-xs mx-auto rounded-md">
                      No Image
                    </div>
                  )}
                </td>

                <td className="px-4 py-3 text-gray-800">{p.name}</td>
                <td className="px-4 py-3 text-gray-600 font-semibold">
                  {p.price?.toLocaleString()}đ
                </td>
                <td className="px-4 py-3 text-gray-600">{p.brand}</td>
                <td className="px-4 py-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      p.stock > 0
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-600'
                    }`}
                  >
                    {p.stock > 0 ? 'Còn hàng' : 'Hết hàng'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductList;
