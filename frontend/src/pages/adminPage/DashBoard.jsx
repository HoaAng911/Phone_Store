import React, { useEffect, useState } from "react";
import useUserStore from "../store/useUserStore";
import useProductStore from "../store/useProduct";
import DashboardCharts from "./DashBoardChart";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Users, UserCheck, Package, DollarSign, TrendingUp } from "lucide-react";

const DashBoard = () => {
  const [stats, setStats] = useState({ total: 0, admin: 0 });
  const [loading, setLoading] = useState(true);
  const [productStats, setProductStats] = useState(null);

  const fetchStats = useUserStore((state) => state.fetchStats);
  const getProductStat = useProductStore((state) => state.getProductStat);

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

  // Loading Skeleton
  if (loading) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-7xl mx-auto space-y-8">
          <Skeleton className="h-12 w-64 mx-auto" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <Card key={i}>
                <CardHeader>
                  <Skeleton className="h-6 w-32" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-10 w-20" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const userCards = [
    {
      label: "Tổng thành viên",
      value: stats.total,
      icon: Users,
      color: "text-blue-600",
      bg: "bg-blue-50",
      border: "border-blue-200",
    },
    {
      label: "Tổng Admin",
      value: stats.admin,
      icon: UserCheck,
      color: "text-green-600",
      bg: "bg-green-50",
      border: "border-green-200",
    },
    {
      label: "User thường",
      value: stats.total - stats.admin,
      icon: Users,
      color: "text-purple-600",
      bg: "bg-purple-50",
      border: "border-purple-200",
    },
  ];

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-foreground tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground mt-2">Tổng quan hệ thống quản lý</p>
        </div>

        {/* User Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {userCards.map((card, idx) => (
            <Card key={idx} className={`hover:shadow-lg transition-shadow ${card.border} border-l-4`}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {card.label}
                </CardTitle>
                <card.icon className={`w-5 h-5 ${card.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground">{card.value}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  {idx === 2 ? "Thành viên thường" : ""}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Product Stats */}
        {productStats && (
          <div className="space-y-8">
            {/* Brand Table */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="w-5 h-5" />
                  Sản phẩm theo thương hiệu
                </CardTitle>
                <CardDescription>
                  Phân bố sản phẩm theo nhà sản xuất
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Thương hiệu</TableHead>
                        <TableHead className="text-right">Số lượng</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {productStats.resultBrand.map((b) => (
                        <TableRow key={b.brand} className="hover:bg-muted/50">
                          <TableCell className="font-medium">{b.brand}</TableCell>
                          <TableCell className="text-right font-semibold">
                            <Badge variant="secondary">{b.count}</Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <Card className="border-l-4 border-green-500 bg-green-50/50">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Package className="w-4 h-4 text-green-600" />
                    Tổng sản phẩm
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-green-700">
                    {productStats.totalProduct}
                  </p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-blue-500 bg-blue-50/50">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-blue-600" />
                    Tổng tồn kho
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-blue-700">
                    {productStats.totalStock}
                  </p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-yellow-500 bg-yellow-50/50">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-yellow-600" />
                    Giá trị tồn kho
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-yellow-700">
                    {productStats.totalStockValue?.toLocaleString("vi-VN")}₫
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Biểu đồ thống kê</CardTitle>
              </CardHeader>
              <CardContent>
                <DashboardCharts />
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashBoard;