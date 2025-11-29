// DashBoard.jsx
import React, { useEffect, useState } from "react";
import { useUserStore, useProductStore } from "../../store";
import DashboardCharts from "./DashBoardChart";
import { Users, UserCog, User } from "lucide-react";

const DashBoard = () => {
  const [stats, setStats] = useState({ total: 0, admin: 0 });
  const [productStats, setProductStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchStats = useUserStore((state) => state.fetchStats);
  const getProductStat = useProductStore((state) => state.getProductStat);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const res = await fetchStats();
        setStats(res);
      } catch (err) {
        console.error(err);
      }
    };
    loadStats();
  }, [fetchStats]);

  useEffect(() => {
    const loadProductStats = async () => {
      try {
        const res = await getProductStat();
        console.log("getProductStat response:", res);
        setProductStats(res);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadProductStats();
  }, [getProductStat]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg text-gray-600">Đang tải dữ liệu...</div>
      </div>
    );
  }

  const userCards = [
    {
      title: "Tổng thành viên",
      value: stats.total,
      icon: Users,
      color: "blue"
    },
    {
      title: "Quản trị viên",
      value: stats.admin,
      icon: UserCog,
      color: "purple"
    },
    {
      title: "Người dùng",
      value: stats.total - stats.admin,
      icon: User,
      color: "green"
    }
  ];

  const colorClasses = {
    blue: "bg-blue-50 text-blue-600",
    purple: "bg-purple-50 text-purple-600",
    green: "bg-green-50 text-green-600"
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Dashboard</h1>

        {/* User stats cards */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Thống kê người dùng
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {userCards.map((card, index) => {
              const Icon = card.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500 mb-1">
                        {card.title}
                      </p>
                      <p className="text-3xl font-bold text-gray-800">
                        {card.value}
                      </p>
                    </div>
                    <div
                      className={`p-3 rounded-lg ${colorClasses[card.color]}`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Product stats */}
        {productStats && <DashboardCharts productStats={productStats} />}
      </div>
    </div>
  );
};

export default DashBoard;