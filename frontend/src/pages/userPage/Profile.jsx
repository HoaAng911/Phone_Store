// src/components/Profile.jsx
import { useEffect, useState } from 'react';
import useAuthStore from '@/store/useAuthStore';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import { 
  User, MapPin, ShoppingCart, Package, 
  Star, Calendar, Phone, Mail, 
  Clock, Shield, ChevronRight, Plus,
  Edit2, Trash2
} from 'lucide-react';

export default function Profile() {
  const { user, loading, init, fetchProfile } = useAuthStore();
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
  if (user) {
    fetchProfile(); 
  }
}, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-12 h-12 border-4 border-violet-600 rounded-full animate-spin border-t-transparent"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-xl text-gray-500">Vui lòng đăng nhập</p>
      </div>
    );
  }

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

  const tabs = [
    { id: 'overview', label: 'Tổng quan', icon: User },
    { id: 'addresses', label: 'Địa chỉ', icon: MapPin },
    { id: 'orders', label: 'Đơn hàng', icon: Package },
    { id: 'reviews', label: 'Đánh giá', icon: Star }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 text-white">
        <div className="container max-w-6xl mx-auto px-4 py-12">
          <div className="flex flex-col md:flex-row items-center gap-6">
            {/* Avatar */}
            <div className="relative">
              <div className="w-32 h-32 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-5xl font-bold border-4 border-white/30 shadow-2xl">
                {user.username?.[0]?.toUpperCase() || user.email[0].toUpperCase()}
              </div>
              <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-2 shadow-lg">
                {user.role === 'admin' ? (
                  <Shield className="w-6 h-6 text-violet-600" />
                ) : (
                  <User className="w-6 h-6 text-violet-600" />
                )}
              </div>
            </div>

            {/* User Info */}
            <div className="text-center md:text-left flex-1">
              <h1 className="text-4xl font-bold mb-2">
                {user.username || 'Người dùng'}
              </h1>
              <div className="flex flex-wrap gap-4 justify-center md:justify-start text-white/90">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <span>{user.email}</span>
                </div>
                {user.phoneNumber && (
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    <span>{user.phoneNumber}</span>
                  </div>
                )}
              </div>
              <div className="flex gap-3 mt-4 justify-center md:justify-start">
                <span className={`px-4 py-1.5 rounded-full text-sm font-semibold ${
                  user.role === 'admin' 
                    ? 'bg-red-500 text-white' 
                    : 'bg-white/20 backdrop-blur-sm border border-white/30'
                }`}>
                  {user.role === 'admin' ? 'Quản trị viên' : 'Khách hàng'}
                </span>
              </div>
            </div>

            {/* Stats Quick View */}
            <div className="grid grid-cols-2 gap-4 md:gap-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 text-center border border-white/20">
                <div className="text-3xl font-bold">{user.orders?.length || 0}</div>
                <div className="text-sm text-white/80">Đơn hàng</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 text-center border border-white/20">
                <div className="text-3xl font-bold">{user.reviews?.length || 0}</div>
                <div className="text-sm text-white/80">Đánh giá</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b sticky top-0 z-10 shadow-sm">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="flex gap-1 overflow-x-auto">
            {tabs.map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors border-b-2 whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'border-violet-600 text-violet-600'
                      : 'border-transparent text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container max-w-6xl mx-auto px-4 py-8">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-gray-900">{user.addresses?.length || 0}</div>
                    <div className="text-sm text-gray-600">Địa chỉ</div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                    <Package className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-gray-900">{user.orders?.length || 0}</div>
                    <div className="text-sm text-gray-600">Đơn hàng</div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                    <Star className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-gray-900">{user.reviews?.length || 0}</div>
                    <div className="text-sm text-gray-600">Đánh giá</div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
                    <ShoppingCart className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-gray-900">{user.cart?.items?.length || 0}</div>
                    <div className="text-sm text-gray-600">Trong giỏ</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Account Info */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-violet-600" />
                Thông tin tài khoản
              </h3>
              <div className="space-y-3 text-gray-700">
                <div className="flex items-center gap-2">
                  <span className="text-gray-600">Tham gia:</span>
                  <span className="font-medium">
                    {user.createdAt ? format(new Date(user.createdAt), 'dd/MM/yyyy HH:mm', { locale: vi }) : '—'}
                  </span>
                </div>
                {user.lastLogin && (
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600">Đăng nhập cuối:</span>
                    <span className="font-medium">
                      {format(new Date(user.lastLogin), 'dd/MM/yyyy HH:mm', { locale: vi })}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold mb-4">Hoạt động gần đây</h3>
              {user.orders && user.orders.length > 0 ? (
                <div className="space-y-3">
                  {user.orders.slice(0, 3).map(order => (
                    <div key={order.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Package className="w-5 h-5 text-gray-400" />
                        <div>
                          <p className="font-medium">{order.orderNumber}</p>
                          <p className="text-sm text-gray-500">
                            {format(new Date(order.createdAt), 'dd/MM/yyyy', { locale: vi })}
                          </p>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs ${getStatusColor(order.status)}`}>
                        {getStatusText(order.status)}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-4">Chưa có hoạt động nào</p>
              )}
            </div>
          </div>
        )}

        {/* Addresses Tab */}
        {activeTab === 'addresses' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Địa chỉ của tôi</h2>
              <button className="flex items-center gap-2 bg-violet-600 text-white px-4 py-2 rounded-lg hover:bg-violet-700 transition">
                <Plus className="w-5 h-5" />
                Thêm địa chỉ
              </button>
            </div>

            {user.addresses && user.addresses.length > 0 ? (
              <div className="grid gap-4">
                {user.addresses.map(address => (
                  <div key={address.id} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <h3 className="font-semibold text-lg">{address.fullName}</h3>
                          {address.isDefault && (
                            <span className="px-3 py-1 bg-violet-100 text-violet-700 text-xs rounded-full font-medium">
                              Mặc định
                            </span>
                          )}
                        </div>
                        <div className="space-y-2 text-gray-600">
                          <p className="flex items-center gap-2">
                            <Phone className="w-4 h-4" />
                            {address.phoneNumber}
                          </p>
                          <p className="flex items-start gap-2">
                            <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                            <span>
                              {address.street}, {address.ward}, {address.district}, {address.city}
                            </span>
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button className="p-2 text-violet-600 hover:bg-violet-50 rounded-lg transition">
                          <Edit2 className="w-5 h-5" />
                        </button>
                        <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition">
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-2xl">
                <MapPin className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                <p className="text-gray-500 mb-4">Chưa có địa chỉ nào</p>
                <button className="flex items-center gap-2 bg-violet-600 text-white px-6 py-3 rounded-lg hover:bg-violet-700 transition mx-auto">
                  <Plus className="w-5 h-5" />
                  Thêm địa chỉ đầu tiên
                </button>
              </div>
            )}
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold mb-6">Đơn hàng của tôi</h2>

            {user.orders && user.orders.length > 0 ? (
              <div className="space-y-4">
                {user.orders.map(order => (
                  <div key={order.id} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                      <div>
                        <h3 className="font-semibold text-lg mb-1">{order.orderNumber}</h3>
                        <p className="text-sm text-gray-500">
                          {format(new Date(order.createdAt), 'dd/MM/yyyy HH:mm', { locale: vi })}
                        </p>
                      </div>
                      <span className={`px-4 py-2 rounded-full text-sm font-medium self-start ${getStatusColor(order.status)}`}>
                        {getStatusText(order.status)}
                      </span>
                    </div>
                    
                    {/* Order items preview */}
                    {order.items && order.items.length > 0 && (
                      <div className="space-y-2 mb-4">
                        {order.items.slice(0, 2).map((item, idx) => (
                          <div key={idx} className="flex justify-between text-sm text-gray-600">
                            <span>{item.product?.name || 'Sản phẩm'} x{item.quantity}</span>
                            <span>{(item.price * item.quantity).toLocaleString('vi-VN')}₫</span>
                          </div>
                        ))}
                        {order.items.length > 2 && (
                          <p className="text-sm text-gray-500">
                            và {order.items.length - 2} sản phẩm khác...
                          </p>
                        )}
                      </div>
                    )}
                    
                    <div className="flex justify-between items-center pt-4 border-t">
                      <div className="text-lg font-semibold text-violet-600">
                        Tổng: {order.total?.toLocaleString('vi-VN')}₫
                      </div>
                      <button className="flex items-center gap-1 text-violet-600 hover:text-violet-700 font-medium">
                        Chi tiết
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-2xl">
                <Package className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                <p className="text-gray-500">Chưa có đơn hàng nào</p>
              </div>
            )}
          </div>
        )}

        {/* Reviews Tab */}
        {activeTab === 'reviews' && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold mb-6">Đánh giá của tôi</h2>

            {user.reviews && user.reviews.length > 0 ? (
              <div className="space-y-4">
                {user.reviews.map(review => (
                  <div key={review.id} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-semibold text-lg">{review.product?.name || 'Sản phẩm'}</h3>
                        <p className="text-sm text-gray-500">
                          {format(new Date(review.createdAt), 'dd/MM/yyyy HH:mm', { locale: vi })}
                        </p>
                      </div>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-5 h-5 ${
                              i < review.rating 
                                ? 'fill-yellow-400 text-yellow-400' 
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    {review.comment && (
                      <p className="text-gray-700 mb-3">{review.comment}</p>
                    )}
                    <div className="flex gap-2 pt-3 border-t">
                      <button className="flex items-center gap-1 px-3 py-1.5 text-sm text-violet-600 hover:bg-violet-50 rounded-lg transition">
                        <Edit2 className="w-4 h-4" />
                        Chỉnh sửa
                      </button>
                      <button className="flex items-center gap-1 px-3 py-1.5 text-sm text-red-600 hover:bg-red-50 rounded-lg transition">
                        <Trash2 className="w-4 h-4" />
                        Xóa
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-2xl">
                <Star className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                <p className="text-gray-500">Chưa có đánh giá nào</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}