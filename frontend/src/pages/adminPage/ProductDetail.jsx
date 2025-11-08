// ProductDetail.jsx – ĐÃ SỬA + HIỂN THỊ ĐẦY ĐỦ
import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import useProductStore from "../store/useProduct";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, Image as ImageIcon, Percent } from "lucide-react";

const ProductDetail = () => {
  const { id } = useParams();
  const { product, fetchProductById, loading } = useProductStore();

  useEffect(() => {
    if (id) fetchProductById(id);
  }, [id, fetchProductById]);

  if (loading || !product) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-5xl mx-auto space-y-6">
          <div className="flex justify-between items-center">
            <Skeleton className="h-9 w-48" />
            <Skeleton className="h-10 w-24" />
          </div>
          <Card>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Skeleton className="h-64 w-full rounded-lg" />
                <div className="space-y-6">
                  <Skeleton className="h-8 w-3/4" />
                  <Skeleton className="h-20 w-full" />
                  <div className="grid grid-cols-2 gap-4">
                    <Skeleton className="h-16 w-full" />
                    <Skeleton className="h-16 w-full" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const specs = [
    { label: "Màn hình", value: product.specification?.screenSize || "Không có" },
    { label: "Độ phân giải", value: product.specification?.resolution || "Không có" },
    { label: "CPU", value: product.specification?.cpu || "Không có" },
    { label: "RAM", value: product.specification?.ram || "Không có" },
    { label: "Bộ nhớ", value: product.specification?.storage || "Không có" },
    { label: "Pin", value: product.specification?.battery || "Không có" },
    { label: "Hệ điều hành", value: product.specification?.os || "Không có" },
    { label: "Camera", value: product.specification?.camera || "Không có" },
    { label: "SIM", value: product.specification?.sim || "Không có" },
    { label: "Trọng lượng", value: product.specification?.weight || "Không có" },
    {
      label: "Màu sắc",
      value: product.specification?.colors?.length
        ? product.specification.colors.join(", ")
        : "Không có",
    },
  ];

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Chi tiết sản phẩm</h1>
            <p className="text-muted-foreground mt-1">Thông tin chi tiết về sản phẩm</p>
          </div>
          <Button asChild variant="outline">
            <Link to="/products/list" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Quay lại
            </Link>
          </Button>
        </div>

        {/* Main Product Card */}
        <Card>
          <CardHeader className="bg-muted/50 border-b-0">
            <div className="flex items-center justify-between">
              <CardTitle>ID: #{product.id}</CardTitle>
              <div className="flex gap-2">
                <Badge variant="secondary" className="text-xs">
                  {product.images?.length || 0} ảnh
                </Badge>
                {product.discountPercent > 0 && (
                  <Badge variant="destructive" className="text-xs">
                    <Percent className="w-3 h-3 mr-1" />
                    -{product.discountPercent}%
                  </Badge>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              {/* Image Section */}
              <div className="p-6 border-r lg:border-r-0">
                <div className="flex flex-col items-center">
                  {product.images?.[0]?.url ? (
                    <img
                      src={product.images[0].url}
                      alt={product.name}
                      className="w-full max-w-md h-64 object-contain rounded-lg shadow-md border"
                    />
                  ) : (
                    <div className="w-full max-w-md h-64 bg-muted flex flex-col items-center justify-center rounded-lg text-muted-foreground">
                      <ImageIcon className="w-16 h-16" />
                      <p className="mt-2 text-sm">No Image</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Info Section */}
              <div className="p-6">
                <div className="space-y-6">
                  {/* Product Name & Description */}
                  <div>
                    <h2 className="text-2xl font-bold text-foreground mb-3">
                      {product.name}
                    </h2>
                    <p className="text-muted-foreground leading-relaxed">
                      {product.description || "Chưa có mô tả"}
                    </p>
                  </div>

                  {/* Price Card */}
                  <Card className="bg-green-50 border-green-200">
                    <CardContent className="p-4">
                      <p className="text-sm text-muted-foreground mb-1">Giá bán</p>
                      <p className="text-3xl font-bold text-green-700">
                        {product.price?.toLocaleString("vi-VN")}₫
                      </p>
                      {product.originalPrice > product.price && (
                        <p className="text-sm text-muted-foreground line-through mt-1">
                          {product.originalPrice?.toLocaleString("vi-VN")}₫
                        </p>
                      )}
                    </CardContent>
                  </Card>

                  {/* Brand, SKU, Category, Stock */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Card>
                      <CardContent className="p-4">
                        <p className="text-sm text-muted-foreground mb-2">Thương hiệu</p>
                        <p className="font-semibold text-foreground">{product.brand}</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <p className="text-sm text-muted-foreground mb-2">Mã SKU</p>
                        <p className="font-mono text-sm">{product.sku}</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <p className="text-sm text-muted-foreground mb-2">Danh mục</p>
                        <p className="capitalize">{product.category}</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <p className="text-sm text-muted-foreground mb-2">Tồn kho</p>
                        <Badge
                          variant={product.stock > 0 ? "default" : "destructive"}
                          className={product.stock > 0 ? "bg-green-100 text-green-800" : ""}
                        >
                          {product.stock > 0 ? `${product.stock} sản phẩm` : "Hết hàng"}
                        </Badge>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Specifications Section */}
        {product.specification && (
          <Card>
            <CardHeader>
              <CardTitle>Thông số kỹ thuật</CardTitle>
              <CardDescription>Chi tiết cấu hình sản phẩm</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {specs.map((spec, index) => (
                  <Card key={index} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <p className="text-xs text-muted-foreground font-medium mb-1">
                        {spec.label}
                      </p>
                      <p className="text-sm font-medium text-foreground break-words">
                        {spec.value}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;