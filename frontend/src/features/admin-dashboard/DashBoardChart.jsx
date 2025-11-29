// DashboardCharts.jsx
import React from "react";
import { Package, TrendingUp, AlertCircle, CheckCircle, DollarSign } from "lucide-react";
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const DashboardCharts = ({ productStats }) => {
  if (!productStats) return null;

  const summaryCards = [
    {
      title: "Tổng sản phẩm",
      value: productStats.totalProduct,
      icon: Package,
      color: "blue"
    },
    {
      title: "Tổng tồn kho",
      value: productStats.totalStock,
      icon: TrendingUp,
      color: "indigo"
    },
    {
      title: "Giá trị tồn kho",
      value: `${productStats.totalStockValue?.toLocaleString("vi-VN")}₫`,
      icon: DollarSign,
      color: "emerald"
    },
    {
      title: "Còn hàng",
      value: productStats.inStockCount,
      icon: CheckCircle,
      color: "green"
    },
    {
      title: "Hết hàng",
      value: productStats.outStockCount,
      icon: AlertCircle,
      color: "red"
    }
  ];

  const colorClasses = {
    blue: "bg-blue-50 text-blue-600",
    indigo: "bg-indigo-50 text-indigo-600",
    emerald: "bg-emerald-50 text-emerald-600",
    green: "bg-green-50 text-green-600",
    red: "bg-red-50 text-red-600"
  };

  const COLORS = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444', '#06b6d4', '#ec4899'];

  const brandData = productStats.resultBrand?.map((b) => ({
    name: b.brand,
    value: b.count
  })) || [];

  const stockStatusData = [
    { name: 'Còn hàng', value: productStats.inStockCount, color: '#10b981' },
    { name: 'Hết hàng', value: productStats.outStockCount, color: '#ef4444' }
  ];

  return (
    <div className="space-y-8">
      {/* Summary cards */}
      <div>
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Tổng quan kho hàng
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {summaryCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-5 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-3">
                  <p className="text-sm font-medium text-gray-500">
                    {card.title}
                  </p>
                  <div className={`p-2 rounded-lg ${colorClasses[card.color]}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                </div>
                <p className="text-2xl font-bold text-gray-800">
                  {card.value}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Brand table */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bar Chart - Brands */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            Biểu đồ thương hiệu
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={brandData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="name" 
                tick={{ fontSize: 12 }}
                stroke="#9ca3af"
              />
              <YAxis 
                tick={{ fontSize: 12 }}
                stroke="#9ca3af"
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#fff', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px'
                }}
              />
              <Bar dataKey="value" fill="#3b82f6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart - Stock Status */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            Tình trạng kho
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={stockStatusData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {stockStatusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Brand table */}
      <div>
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Sản phẩm theo thương hiệu
        </h2>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Thương hiệu
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Số lượng
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {productStats.resultBrand?.map((b, index) => (
                  <tr key={b.brand} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                      {b.brand}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 text-right">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {b.count}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardCharts;