// src/components/profile/tabs/OrdersTab.jsx
import { Package } from 'lucide-react';
import OrderItem from '../ui/OrderItem';

export default function OrdersTab({ orders = [] }) {
  const handleViewDetail = (order) => {
    // Sau này sẽ mở modal hoặc chuyển trang chi tiết
    alert(`Xem chi tiết đơn hàng: ${order.orderNumber}`);
  };

  if (orders.length === 0) {
    return (
      <div className="text-center py-16 bg-white rounded-2xl">
        <Package className="w-16 h-16 mx-auto text-gray-300 mb-4" />
        <p className="text-gray-500 text-lg">Chưa có đơn hàng nào</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Đơn hàng của tôi</h2>

      <div className="space-y-5">
        {orders.map((order) => (
          <OrderItem
            key={order.id}
            order={order}
            onClickDetail={() => handleViewDetail(order)}
          />
        ))}
      </div>
    </div>
  );
}