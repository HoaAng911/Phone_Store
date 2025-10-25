import React, { useEffect, useState } from "react";
import useUserStore from "../store/userStore";
import useProductStore from "../store/productStore";
import DashboardCharts from "./DashBoardChart";

const DashBoard = () => {
  const [stats, setStats] = useState({ total: 0, admin: 0 });
  const [loading, setLoading] = useState(true);
  const [productStats, setProductStats] = useState(null);

  const fetchStats = useUserStore((state) => state.fetchStats);
  const getProductStat = useProductStore((state) => state.getProductStat);

  // Fetch user stats
  useEffect(() => {
    const loadStats = async () => {
      try {
        const res = await fetchStats();
        setStats(res);
      } catch (error) {
        console.error("Lỗi khi tải thống kê:", error);
      } finally {
        setLoading(false);
      }
    };
    loadStats();
  }, [fetchStats]);

  // Fetch product stats
  useEffect(() => {
    const loadProductStats = async () => {
      try {
        const res = await getProductStat();
        setProductStats(res);
      } catch (err) {
        console.error(err);
      }
    };
    loadProductStats();
  }, [getProductStat]);

  if (loading)
    return (
      <p className="text-center mt-8 text-gray-500 font-medium text-lg animate-pulse">
        Đang tải thống kê...
      </p>
    );

  const userCards = [
    { label: "Tổng thành viên", value: stats.total, color: "blue", border: "border-blue-600" },
    { label: "Tổng Admin", value: stats.admin, color: "green", border: "border-green-600" },
    { label: "Tổng User thường", value: stats.total - stats.admin, color: "purple", border: "border-purple-600" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 sm:p-6 lg:p-8 font-sans">
      {/* Header */}
      <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800 text-center mb-8 sm:mb-10 tracking-tight">
        Dashboard
      </h1>

      {/* User Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-7xl mx-auto">
        {userCards.map((card, idx) => (
          <div
            key={idx}
            className={`bg-white rounded-xl shadow-md p-6 border-t-4 ${card.border} transform hover:scale-105 transition-transform duration-200 ease-in-out`}
          >
            <h2 className="text-gray-600 font-semibold text-base sm:text-lg">{card.label}</h2>
            <p className={`mt-3 text-3xl sm:text-4xl font-bold text-${card.color}-600`}>{card.value}</p>
          </div>
        ))}
      </div>

      {/* Product Stats */}
      {productStats && (
        <div className="max-w-7xl mx-auto mt-10 sm:mt-12">
          <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-6">Sản phẩm theo thương hiệu</h2>
          <div className="overflow-x-auto bg-white rounded-xl shadow-md border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-medium text-gray-700 uppercase tracking-wider">
                    Thương hiệu
                  </th>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-medium text-gray-700 uppercase tracking-wider">
                    Số lượng
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {productStats.resultBrand.map((b) => (
                  <tr key={b.brand} className="hover:bg-gray-50 transition-colors duration-150">
                    <td className="px-4 sm:px-6 py-4 text-gray-700 font-medium text-sm sm:text-base">{b.brand}</td>
                    <td className="px-4 sm:px-6 py-4 text-gray-800 font-semibold text-sm sm:text-base">{b.count}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Total Stock Info */}
          <div className="mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            <div className="bg-green-50 p-4 sm:p-5 rounded-xl shadow-md border-l-4 border-green-600">
              <p className="text-gray-500 font-medium text-sm">Tổng sản phẩm</p>
              <p className="text-xl sm:text-2xl font-bold text-green-700">{productStats.totalProduct}</p>
            </div>
            <div className="bg-blue-50 p-4 sm:p-5 rounded-xl shadow-md border-l-4 border-blue-600">
              <p className="text-gray-500 font-medium text-sm">Tổng tồn kho</p>
              <p className="text-xl sm:text-2xl font-bold text-blue-700">{productStats.totalStock}</p>
            </div>
            <div className="bg-yellow-50 p-4 sm:p-5 rounded-xl shadow-md border-l-4 border-yellow-600">
              <p className="text-gray-500 font-medium text-sm">Giá trị tồn kho</p>
              <p className="text-xl sm:text-2xl font-bold text-yellow-700">
                {productStats.totalStockValue?.toLocaleString("vi-VN")}₫
              </p>
            </div>
          </div>
            <DashboardCharts />
        </div>
      )}
    </div>
  );
};

export default DashBoard;