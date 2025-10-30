"use client";

import { useState } from "react";
import useCartStore from "../store/useCart";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Loader2, Plus, Trash2, Calculator, Trash } from "lucide-react";

export default function CartTestPage() {
  const [userId, setUserId] = useState(1);
  const [productId, setProductId] = useState("");
  const [quantity, setQuantity] = useState(1);

  const {
    cartItems,
    total,
    loading,
    fetchCart,
    addToCart,
    updateCartItem,
    removeFromCart,
    calculateTotal,
    clearCart,
  } = useCartStore();

  const handleFetch = () => fetchCart(userId);
  const handleAdd = () => {
    if (!productId) return;
    addToCart({ userId, productId: Number(productId), quantity: Number(quantity) });
    setProductId("");
    setQuantity(1);
  };

  const handleUpdate = (productId, newQty) => {
    if (newQty > 0) {
      updateCartItem({ userId, productId, quantity: newQty });
    }
  };

  const handleRemove = (productId) => removeFromCart(userId, productId);

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl">TEST GIỎ HÀNG (Admin)</CardTitle>
            <CardDescription>
              Quản lý giỏ hàng người dùng theo User ID
            </CardDescription>
          </CardHeader>
        </Card>

        {/* User ID Input */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Lấy giỏ hàng</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-end">
              <div className="flex-1">
                <Label htmlFor="userId">User ID</Label>
                <Input
                  id="userId"
                  type="number"
                  value={userId}
                  onChange={(e) => setUserId(Number(e.target.value))}
                  min="1"
                  className="mt-1"
                />
              </div>
              <Button onClick={handleFetch} disabled={loading} className="w-full sm:w-auto">
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Đang tải...
                  </>
                ) : (
                  "Lấy giỏ hàng"
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Add Product Form */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Thêm / Cập nhật sản phẩm</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="productId">Product ID</Label>
                <Input
                  id="productId"
                  type="number"
                  placeholder="Nhập ID"
                  value={productId}
                  onChange={(e) => setProductId(e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="quantity">Số lượng</Label>
                <Input
                  id="quantity"
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
                  min="1"
                  className="mt-1"
                />
              </div>
              <div className="flex items-end">
                <Button
                  onClick={handleAdd}
                  disabled={!productId || loading}
                  className="w-full"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Thêm vào giỏ
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Cart Table */}
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <CardTitle>
                  Giỏ hàng User{" "}
                  <Badge variant="secondary" className="font-mono">
                    {userId}
                  </Badge>
                </CardTitle>
                <CardDescription>
                  Tổng tiền:{" "}
                  <span className="text-lg font-bold text-green-600">
                    {total.toLocaleString("vi-VN")}₫
                  </span>
                </CardDescription>
              </div>
              <div className="flex gap-2 w-full sm:w-auto">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => calculateTotal(userId)}
                  className="flex-1 sm:flex-initial"
                >
                  <Calculator className="mr-2 h-4 w-4" />
                  Tính lại
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => clearCart(userId)}
                  className="flex-1 sm:flex-initial"
                >
                  <Trash className="mr-2 h-4 w-4" />
                  Xóa toàn bộ
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            {cartItems.length === 0 ? (
              <div className="p-12 text-center">
                <p className="text-muted-foreground text-lg">Giỏ hàng trống</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Hãy thêm sản phẩm để bắt đầu!
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product ID</TableHead>
                      <TableHead>Số lượng</TableHead>
                      <TableHead className="text-center">Hành động</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {cartItems.map((item) => (
                      <TableRow key={item.productId} className="hover:bg-muted/50">
                        <TableCell className="font-mono font-semibold">
                          {item.productId}
                        </TableCell>
                        <TableCell>
                          <Input
                            type="number"
                            value={item.quantity}
                            min="1"
                            onChange={(e) =>
                              handleUpdate(item.productId, Number(e.target.value))
                            }
                            className="w-20"
                          />
                        </TableCell>
                        <TableCell className="text-center">
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleRemove(item.productId)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}