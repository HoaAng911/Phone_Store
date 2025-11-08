// components/OrderList.jsx
import { useEffect } from 'react';
import useOrderStore from '../store/useOrderStore';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';

const statusColors = {
  pending: 'bg-yellow-500',
  paid: 'bg-blue-500',
  shipping: 'bg-purple-500',
  completed: 'bg-green-500',
  cancelled: 'bg-red-500',
};

const statusText = {
  pending: 'Chờ thanh toán',
  paid: 'Đã thanh toán',
  shipping: 'Đang giao',
  completed: 'Hoàn thành',
  cancelled: 'Đã hủy',
};

export default function OrderList() {
  const { orders, loading, fetchAllOrder } = useOrderStore();

  // Tải đơn hàng khi component mount
  useEffect(() => {
    fetchAllOrder();
  }, [fetchAllOrder]);

  return (
    <Card className="w-full max-w-6xl mx-auto mt-7">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-2xl font-bold">Danh sách đơn hàng</CardTitle>
        <Button
          variant="outline"
          size="sm"
          onClick={fetchAllOrder}
          disabled={loading}
          className="flex items-center gap-2"
        >
          <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          Làm mới
        </Button>
      </CardHeader>

      <CardContent>
        {loading ? (
          // Skeleton khi đang tải
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-20 w-full" />
              </div>
            ))}
          </div>
        ) : orders.length === 0 ? (
          // Không có đơn hàng
          <div className="text-center py-10 text-muted-foreground">
            <p className="text-lg">Chưa có đơn hàng nào.</p>
          </div>
        ) : (
          // Bảng đơn hàng
          <div className="overflow-x-auto">
            <Table>
              <TableCaption>Danh sách đơn hàng gần đây</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Mã đơn</TableHead>
                  <TableHead>Ngày đặt</TableHead>
                  <TableHead>Sản phẩm</TableHead>
                  <TableHead>Tổng tiền</TableHead>
                  <TableHead>Trạng thái</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">#{order.id}</TableCell>
                    <TableCell>
                      {new Date(order.createdAt).toLocaleDateString('vi-VN')}
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        {order.items.map((item, idx) => (
                          <div key={idx} className="text-sm">
                            {item.product.name} x {item.quantity}
                          </div>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell className="font-semibold">
                      {order.totalPrice.toLocaleString('vi-VN')}đ
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={`${statusColors[order.status]} text-white`}
                      >
                        {statusText[order.status]}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}