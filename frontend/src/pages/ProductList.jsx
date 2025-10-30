"use client";

import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useProductStore from "../store/useProductStore";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Plus, Eye, Edit, Trash2, ChevronLeft, ChevronRight } from "lucide-react";

const ProductList = () => {
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

  useEffect(() => {
    fetchProducts(page);
  }, [page, fetchProducts]);

  const handleDetail = (id) => navigate(`/products/${id}`);
  const handleEdit = (id) => navigate(`/products/edit/${id}`);
  const handleAddProduct = () => navigate("/products/add");

  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc muốn xóa sản phẩm này?")) return;
    try {
      await deleteProduct(id);
      alert("Xóa sản phẩm thành công");
      fetchProducts(page);
    } catch (error) {
      console.error("Lỗi khi xóa sản phẩm:", error);
      alert("Có lỗi xảy ra khi xóa sản phẩm");
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPage) setPage(newPage);
  };

  // Loading Skeleton
  if (loading) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex justify-between items-center">
            <Skeleton className="h-9 w-64" />
            <Skeleton className="h-10 w-32" />
          </div>
          <Card>
            <CardHeader>
              <Skeleton className="h-7 w-48" />
              <Skeleton className="h-5 w-32 mt-2" />
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="flex gap-4 items-center">
                    <Skeleton className="h-12 w-12 rounded-md" />
                    <Skeleton className="h-4 flex-1" />
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-8 w-24" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Quản lý sản phẩm</h1>
            <p className="text-muted-foreground mt-1">Theo dõi và chỉnh sửa danh mục sản phẩm</p>
          </div>
          <Button onClick={handleAddProduct} className="gap-2">
            <Plus className="w-4 h-4" />
            Thêm sản phẩm
          </Button>
        </div>

        {/* Table Card */}
        <Card>
          <CardHeader>
            <CardTitle>Danh sách sản phẩm</CardTitle>
            <CardDescription>
              Tổng: {products.data?.length || 0} sản phẩm (Trang {page}/{totalPage})
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-16">ID</TableHead>
                    <TableHead className="w-20">Ảnh</TableHead>
                    <TableHead>Tên sản phẩm</TableHead>
                    <TableHead>Giá</TableHead>
                    <TableHead>Thương hiệu</TableHead>
                    <TableHead>Kho</TableHead>
                    <TableHead className="text-center">Hành động</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {products.data?.map((p) => (
                    <TableRow key={p.id} className="hover:bg-muted/50 transition-colors">
                      <TableCell className="font-medium">{p.id}</TableCell>

                      {/* Ảnh */}
                      <TableCell>
                        {p.images?.length > 0 ? (
                          <img
                            src={p.images[0].url}
                            alt={p.name}
                            className="w-12 h-12 object-contain rounded-md border"
                          />
                        ) : (
                          <div className="w-12 h-12 bg-muted flex items-center justify-center rounded-md text-xs text-muted-foreground">
                            No Image
                          </div>
                        )}
                      </TableCell>

                      <TableCell className="font-medium">{p.name}</TableCell>

                      {/* Giá */}
                      <TableCell className="font-semibold text-foreground">
                        {p.price?.toLocaleString("vi-VN")}₫
                      </TableCell>

                      <TableCell className="text-muted-foreground">{p.brand}</TableCell>

                      {/* Kho */}
                      <TableCell>
                        <Badge
                          variant={p.stock > 0 ? "default" : "destructive"}
                          className={p.stock > 0 ? "bg-green-100 text-green-800 hover:bg-green-200" : ""}
                        >
                          {p.stock > 0 ? `Còn hàng (${p.stock})` : "Hết hàng"}
                        </Badge>
                      </TableCell>

                      {/* Hành động */}
                      <TableCell>
                        <div className="flex justify-center gap-1">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleDetail(p.id)}
                            title="Xem chi tiết"
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleEdit(p.id)}
                            title="Chỉnh sửa"
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-destructive hover:text-destructive"
                            onClick={() => handleDelete(p.id)}
                            title="Xóa"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Phân trang */}
            {totalPage > 1 && (
              <div className="flex items-center justify-center gap-2 mt-6">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(page - 1)}
                  disabled={page === 1}
                >
                  <ChevronLeft className="w-4 h-4" />
                  Prev
                </Button>

                {Array.from({ length: totalPage }, (_, i) => (
                  <Button
                    key={i}
                    variant={page === i + 1 ? "default" : "outline"}
                    size="sm"
                    onClick={() => handlePageChange(i + 1)}
                  >
                    {i + 1}
                  </Button>
                ))}

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(page + 1)}
                  disabled={page === totalPage}
                >
                  Next
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProductList;