// src/pages/OrderDetailPage.jsx
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import {
  ArrowLeft,
  Package,
  CheckCircle,
  Truck,
  Home,
  CreditCard,
  User,
  MapPin,
  Phone,
  Mail,
  Calendar,
  ChevronRight,
  Printer,
  Download,
  Share2
} from 'lucide-react';
import useOrderStore from '@/store/useOrderStore';
import LoadingSpinner from './LoadingSpinner';

export default function OrderDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { orderDetail, loading, fetchOrderDetail } = useOrderStore();
  const [activeTab, setActiveTab] = useState('items');

  useEffect(() => {
    if (id) {
      fetchOrderDetail(id);
    }
  }, [id, fetchOrderDetail]);

  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-700',
      processing: 'bg-blue-100 text-blue-700',
      shipped: 'bg-purple-100 text-purple-700',
      delivered: 'bg-green-100 text-green-700',
      cancelled: 'bg-red-100 text-red-700'
    };
    return colors[status] || 'bg-gray-100 text-gray-700';
  };

  const getStatusText = (status) => {
    const texts = {
      pending: 'Chờ xử lý',
      processing: 'Đang xử lý',
      shipped: 'Đang giao',
      delivered: 'Đã giao',
      cancelled: 'Đã hủy'
    };
    return texts[status] || status;
  };

  const getStatusIcon = (status) => {
    const icons = {
      pending: Package,
      processing: Package,
      shipped: Truck,
      delivered: CheckCircle,
      cancelled: Package
    };
    return icons[status] || Package;
  };

  const formatCurrency = (value) => {
    if (value === null || value === undefined || value === '') return '0₫';
    const num = typeof value === 'string' ? parseFloat(value) : Number(value);
    if (isNaN(num)) return '0₫';
    return num.toLocaleString('vi-VN') + '₫';
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!orderDetail) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <Package className="w-24 h-24 text-gray-300 mb-4" />
        <h2 className="text-2xl font-bold text-gray-700 mb-2">Không tìm thấy đơn hàng</h2>
        <p className="text-gray-500 mb-6">Đơn hàng này không tồn tại hoặc đã bị xóa</p>
        <button
          onClick={() => navigate('/profile?tab=orders')}
          className="flex items-center gap-2 bg-violet-600 text-white px-6 py-3 rounded-lg hover:bg-violet-700 transition"
        >
          <ArrowLeft className="w-5 h-5" />
          Quay lại danh sách đơn hàng
        </button>
      </div>
    );
  }

  const StatusIcon = getStatusIcon(orderDetail.status);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container max-w-6xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/profile?tab=orders')}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft className="w-5 h-5" />
                Quay lại
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Chi tiết đơn hàng</h1>
                <p className="text-sm text-gray-500">Mã đơn: {orderDetail.id}</p>
              </div>
            </div>
            
            <div className="flex gap-3">
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                <Printer className="w-4 h-4" />
                In hóa đơn
              </button>
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                <Share2 className="w-4 h-4" />
                Chia sẻ
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Order Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Status Card */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-4 mb-6">
                <div className={`p-3 rounded-full ${getStatusColor(orderDetail.status)}`}>
                  <StatusIcon className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold">Trạng thái đơn hàng</h2>
                  <p className="text-sm text-gray-500">
                    Cập nhật lúc: {format(new Date(orderDetail.updatedAt || orderDetail.createdAt), 'HH:mm dd/MM/yyyy', { locale: vi })}
                  </p>
                </div>
              </div>

              <div className="relative">
                {/* Status Timeline */}
                <div className="flex justify-between mb-4">
                  {['pending', 'processing', 'shipped', 'delivered'].map((status, index) => {
                    const isActive = index <= ['pending', 'processing', 'shipped', 'delivered'].indexOf(orderDetail.status);
                    const Icon = getStatusIcon(status);
                    return (
                      <div key={status} className="flex flex-col items-center relative z-10">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isActive ? 'bg-violet-600 text-white' : 'bg-gray-200 text-gray-400'}`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <span className="text-xs mt-2 text-center">
                          {getStatusText(status)}
                        </span>
                      </div>
                    );
                  })}
                </div>
                <div className="absolute top-5 left-10 right-10 h-0.5 bg-gray-200 -z-10">
                  <div 
                    className="h-full bg-violet-600 transition-all duration-500"
                    style={{ width: `${['pending', 'processing', 'shipped', 'delivered'].indexOf(orderDetail.status) * 33.33}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Tabs Navigation */}
            <div className="bg-white rounded-2xl p-1 shadow-sm">
              <div className="flex gap-1">
                {['items', 'timeline', 'payment'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 px-4 py-3 text-sm font-medium rounded-lg transition ${activeTab === tab ? 'bg-violet-600 text-white' : 'text-gray-600 hover:text-gray-900'}`}
                  >
                    {tab === 'items' && 'Sản phẩm'}
                    {tab === 'timeline' && 'Lịch sử'}
                    {tab === 'payment' && 'Thanh toán'}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            <div className="bg-white rounded-2xl shadow-sm">
              {activeTab === 'items' && (
                <div className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Sản phẩm trong đơn</h3>
                  <div className="space-y-4">
                    {orderDetail.items?.map((item, index) => (
                      <div key={index} className="flex gap-4 p-4 border border-gray-100 rounded-xl hover:bg-gray-50 transition">
                        <div className="flex-shrink-0">
                          {item.product?.images?.[0] ? (
                            <img
                              src={item.product.images[0]}
                              alt={item.product.name}
                              className="w-20 h-20 rounded-lg object-cover"
                            />
                          ) : (
                            <div className="w-20 h-20 bg-gray-200 rounded-lg border-2 border-dashed flex items-center justify-center">
                              <Package className="w-8 h-8 text-gray-400" />
                            </div>
                          )}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">{item.product?.name || 'Sản phẩm'}</h4>
                          <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                            <span>Số lượng: {item.quantity}</span>
                            <span>Đơn giá: {formatCurrency(item.price)}</span>
                          </div>
                          {item.product?.description && (
                            <p className="text-sm text-gray-500 mt-2 line-clamp-2">
                              {item.product.description}
                            </p>
                          )}
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-semibold text-violet-600">
                            {formatCurrency(parseFloat(item.price) * item.quantity)}
                          </div>
                          <button
                            onClick={() => navigate(`/products/${item.product?.id}`)}
                            className="text-sm text-violet-600 hover:text-violet-700 mt-2 flex items-center gap-1"
                          >
                            Xem sản phẩm
                            <ChevronRight className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'timeline' && (
                <div className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Lịch sử đơn hàng</h3>
                  <div className="space-y-4">
                    <div className="flex gap-3">
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">Đơn hàng đã được tạo</p>
                        <p className="text-sm text-gray-500">
                          {format(new Date(orderDetail.createdAt), 'HH:mm dd/MM/yyyy', { locale: vi })}
                        </p>
                      </div>
                    </div>
                    {/* Add more timeline items here */}
                  </div>
                </div>
              )}

              {activeTab === 'payment' && (
                <div className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Thông tin thanh toán</h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm text-gray-500">Phương thức thanh toán</label>
                        <p className="font-medium">Thanh toán khi nhận hàng (COD)</p>
                      </div>
                      <div>
                        <label className="text-sm text-gray-500">Trạng thái thanh toán</label>
                        <p className="font-medium">Chưa thanh toán</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Summary */}
          <div className="space-y-6">
            {/* Order Summary */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold mb-4">Tóm tắt đơn hàng</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Tạm tính</span>
                  <span>{formatCurrency(orderDetail.totalPrice)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Phí vận chuyển</span>
                  <span>0₫</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Giảm giá</span>
                  <span>0₫</span>
                </div>
                <div className="border-t pt-3 flex justify-between text-lg font-semibold">
                  <span>Tổng cộng</span>
                  <span className="text-violet-600">{formatCurrency(orderDetail.totalPrice)}</span>
                </div>
              </div>
            </div>

            {/* Customer Info */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <User className="w-5 h-5" />
                Thông tin khách hàng
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-gray-400" />
                  <span>{orderDetail.user?.username || orderDetail.user?.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <span>{orderDetail.user?.email}</span>
                </div>
                {orderDetail.user?.phoneNumber && (
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <span>{orderDetail.user.phoneNumber}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Shipping Address */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                Địa chỉ giao hàng
              </h3>
              {orderDetail.address ? (
                <div className="space-y-2">
                  <p className="font-medium">{orderDetail.address.fullName}</p>
                  <p className="text-gray-600">{orderDetail.address.phone}</p>
                  <p className="text-gray-600">
                    {orderDetail.address.street}, {orderDetail.address.ward}, {orderDetail.address.district}, {orderDetail.address.city}
                  </p>
                </div>
              ) : (
                <p className="text-gray-500">Không có thông tin địa chỉ</p>
              )}
            </div>

            {/* Order Info */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Thông tin đơn hàng
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Mã đơn:</span>
                  <span className="font-medium">{orderDetail.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Ngày đặt:</span>
                  <span>{format(new Date(orderDetail.createdAt), 'dd/MM/yyyy HH:mm', { locale: vi })}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Phương thức:</span>
                  <span>Giao hàng tận nơi</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button className="w-full flex items-center justify-center gap-2 bg-violet-600 text-white py-3 rounded-lg hover:bg-violet-700 transition font-medium">
                <Truck className="w-5 h-5" />
                Theo dõi đơn hàng
              </button>
              <button className="w-full flex items-center justify-center gap-2 border border-violet-600 text-violet-600 py-3 rounded-lg hover:bg-violet-50 transition font-medium">
                <Download className="w-5 h-5" />
                Tải hóa đơn
              </button>
              {orderDetail.status === 'pending' && (
                <button className="w-full flex items-center justify-center gap-2 border border-red-600 text-red-600 py-3 rounded-lg hover:bg-red-50 transition font-medium">
                  Hủy đơn hàng
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}