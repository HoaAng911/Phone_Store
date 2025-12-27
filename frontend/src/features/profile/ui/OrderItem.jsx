// src/components/profile/ui/OrderCard.jsx
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import { Package, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const getStatusColor = (status) => {
  const map = {
    pending: 'bg-yellow-100 text-yellow-700',
    processing: 'bg-blue-100 text-blue-700',
    shipped: 'bg-purple-100 text-purple-700',
    delivered: 'bg-green-100 text-green-700',
    cancelled: 'bg-red-100 text-red-700',
  };
  return map[status] || 'bg-gray-100 text-gray-700';
};

const getStatusText = (status) => {
  const map = {
    pending: 'Chờ xử lý',
    processing: 'Đang xử lý',
    shipped: 'Đang giao',
    delivered: 'Đã giao',
    cancelled: 'Đã hủy',
  };
  return map[status] || status;
};

export default function OrderItem({ order }) {
 

  // Hàm format tiền tệ an toàn
  const formatCurrency = (value) => {
    if (value === null || value === undefined || value === '') return '0₫';
    const num = typeof value === 'string' ? parseFloat(value) : Number(value);
    if (isNaN(num)) return '0₫';
    return num.toLocaleString('vi-VN') + '₫';
  };

  return (
    <div
      className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all cursor-pointer border border-gray-100"
    >
      {/* Header: Mã đơn + ngày + trạng thái */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-5">
        <div>
          {/* SỬA: order.id thay vì order.orderNumber */}
          <h3 className="text-lg font-semibold text-gray-900">
            #{order.id?.slice(0, 8) || order.orderNumber || 'N/A'}
          </h3>
          <p className="text-sm text-gray-500 flex items-center gap-1.5">
            <Package className="w-4 h-4" />
            {order.createdAt ? format(new Date(order.createdAt), 'dd/MM/yyyy HH:mm', { locale: vi }) : '—'}
          </p>
        </div>

        <span className={`px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
          {getStatusText(order.status)}
        </span>
      </div>

      {/* Danh sách sản phẩm */}
      <div className="space-y-3 mb-5">
        {order.items?.slice(0, 3).map((item, idx) => (
          <div key={idx} className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-3">
              {/* Nếu có ảnh thì hiện, không thì placeholder */}
              {item.product?.images?.[0] ? (
                <img
                  src={item.product.images[0]}
                  alt={item.product.name}
                  className="w-12 h-12 rounded-lg object-cover"
                />
              ) : (
                <div className="w-12 h-12 bg-gray-200 rounded-lg border-2 border-dashed" />
              )}
              <div>
                <p className="font-medium text-gray-800 line-clamp-1">{item.product?.name || 'Sản phẩm'}</p>
                <p className="text-gray-500">x{item.quantity}</p>
              </div>
            </div>
            {/* SỬA: format tiền an toàn */}
            <span className="font-medium text-gray-900">
              {formatCurrency(parseFloat(item.price || 0) * item.quantity)}
            </span>
          </div>
        ))}

        {order.items?.length > 3 && (
          <p className="text-sm text-gray-500 text-center pt new Date(2)">
            và {order.items.length - 3} sản phẩm khác...
          </p>
        )}
      </div>

      {/* Footer: Tổng tiền + nút chi tiết */}
      <div className="flex justify-between items-center pt-4 border-t border-gray-200">
        <div>
          <span className="text-sm text-gray-600">Thành tiền:</span>
          {/* SỬA: order.totalPrice thay vì order.total */}
          <span className="text-xl font-bold text-violet-600 ml-2">
            {formatCurrency(order.totalPrice || order.total || 0)}
          </span>
        </div>
        <Link
          to={`/orders/${order.id}`}
          className="flex items-center gap-1.5 text-violet-600 font-medium hover:text-violet-700"
        >
          Xem chi tiết
          <ChevronRight className="w-5 h-5" />
        </Link>

      </div>
    </div>
  );
}