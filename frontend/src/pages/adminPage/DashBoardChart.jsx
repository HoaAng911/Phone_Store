import React, { useEffect, useState } from "react";
import useProductStore from "../store/useProduct";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from "recharts";

const DashboardCharts = () => {
  const [productStats, setProductStats] = useState(null);
  const getProductStat = useProductStore((state) => state.getProductStat);

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

  if (!productStats) return null;

  const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7f50", "#8dd1e1", "#a4de6c"];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8 max-w-6xl mx-auto">
      
      {/* Bar chart: số lượng sản phẩm theo thương hiệu */}
      <div className="bg-white p-6 shadow rounded">
        <h3 className="text-lg font-semibold mb-4">Số lượng sản phẩm theo thương hiệu</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={productStats.resultBrand}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="brand" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Pie chart: tỉ lệ kho (inStock / outStock) */}
      <div className="bg-white p-6 shadow rounded">
        <h3 className="text-lg font-semibold mb-4">Tỉ lệ sản phẩm còn/hết hàng</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={[
                { name: "Còn hàng", value: productStats.inStockCount },
                { name: "Hết hàng", value: productStats.outStockCount }
              ]}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              <Cell fill="#82ca9d" />
              <Cell fill="#ff7f50" />
            </Pie>
            <Tooltip />
            <Legend verticalAlign="bottom" />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DashboardCharts;
