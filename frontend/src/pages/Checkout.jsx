import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useCartStore from '@/features/cart/useCart';
import useOrderStore from '../store/useOrderStore';
import useAuthStore from '@/features/auth/store/useAuthStore';
import CartItem from '@/features/cart/CartItem';
import { ArrowLeft, PackageCheck } from 'lucide-react';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { cartItems, total, clearCart } = useCartStore();
  const { user } = useAuthStore();
  const { createOrder } = useOrderStore();

  // ← SỬA: Dùng userId an toàn
  const userId = user?.id;
  console.log('User ID:', userId);

  const [loading, setLoading] = useState(false);

  const [address, setAddress] = useState({
    fullName: user?.fullName || '',
    phone: user?.phone || '',
    street: '',
    city: '',
    district: '',
    ward: '',
  });

  // Redirect nếu giỏ trống
  useEffect(() => {
    if (cartItems.length === 0) {
      navigate('/cart', { replace: true });
    }
  }, [cartItems, navigate]);

  // Bảo vệ: Chưa đăng nhập thì đá về login
  useEffect(() => {
    if (!user) {
      alert('Vui lòng đăng nhập để đặt hàng!');
      navigate('/login', { state: { from: '/checkout' } });
    }
  }, [user, navigate]);

  const formatPrice = (price) =>
    new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);

  const getFieldLabel = (field) => {
    const labels = {
      fullName: 'Họ và tên',
      phone: 'Số điện thoại',
      street: 'Đường/Số nhà',
      city: 'Tỉnh/Thành phố',
      district: 'Quận/Huyện',
      ward: 'Phường/Xã',
    };
    return labels[field] || field;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requiredFields = ['fullName', 'phone', 'street', 'city', 'district', 'ward'];
    const missing = requiredFields.find(field => !address[field]?.trim());

    if (missing) {
      alert(`Vui lòng nhập đầy đủ ${getFieldLabel(missing)}`);
      return;
    }

    setLoading(true);

    try {
      const payload = {
        type: 'cart',
        address: {
          fullName: address.fullName.trim(),
          phone: address.phone.trim(),
          street: address.street.trim(),
          city: address.city.trim(),
          district: address.district.trim(),
          ward: address.ward.trim(),
        },
      };

      console.log('Gửi đơn hàng:', payload);

      const newOrder = await createOrder(userId,payload);
      console.log("Trước khi gọi createOrder:", {
        userId,
        type: typeof userId,
        isString: typeof userId === 'string',
        isObject: typeof userId === 'object'
      });
      if (!newOrder?.id) {
        throw new Error('Không nhận được mã đơn hàng');
      }

     
      await clearCart(userId);

      navigate(`/order-success/${newOrder.id}`);

    } catch (err) {
      console.error('Lỗi đặt hàng:', err.response?.data || err);
      const msg = err.response?.data?.message || 'Đặt hàng thất bại, vui lòng thử lại!';
      alert(msg);
    } finally {
      setLoading(false);
    }
  };


  if (!user || cartItems.length === 0) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <button
          onClick={() => navigate('/cart')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition"
        >
          <ArrowLeft className="w-5 h-5" />
          Quay lại giỏ hàng
        </button>

        <h1 className="text-2xl font-bold mb-8">Xác nhận thông tin giao hàng</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="font-semibold text-lg mb-4 flex items-center gap-2">
                <PackageCheck className="w-5 h-5 text-blue-600" />
                Sản phẩm trong đơn hàng
              </h2>

              <div className="space-y-4">
                {cartItems.map((item) => (
                  <CartItem
                    key={`${item.userId}-${item.productId}`}
                    item={item}
                    readonly
                  />
                ))}
              </div>

              <div className="mt-6 pt-6 border-t">
                <div className="flex justify-between text-xl font-bold">
                  <span>Tổng cộng:</span>
                  <span className="text-red-600">{formatPrice(total)}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-6 space-y-5">
              <h2 className="font-semibold text-lg mb-4">Thông tin nhận hàng</h2>

              <input type="text" placeholder="Họ và tên *" value={address.fullName}
                onChange={(e) => setAddress({ ...address, fullName: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />

              <input type="tel" placeholder="Số điện thoại *" value={address.phone}
                onChange={(e) => setAddress({ ...address, phone: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />

              <input type="text" placeholder="Đường, số nhà, thôn/xóm *" value={address.street}
                onChange={(e) => setAddress({ ...address, street: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />

              <input type="text" placeholder="Tỉnh / Thành phố *" value={address.city}
                onChange={(e) => setAddress({ ...address, city: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />

              <input type="text" placeholder="Quận / Huyện *" value={address.district}
                onChange={(e) => setAddress({ ...address, district: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />

              <input type="text" placeholder="Phường / Xã *" value={address.ward}
                onChange={(e) => setAddress({ ...address, ward: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-red-600 text-white py-4 rounded-lg font-bold hover:bg-red-700 transition disabled:opacity-70 flex items-center justify-center gap-2 mt-6"
              >
                {loading ? 'Đang xử lý...' : (
                  <>
                    <PackageCheck className="w-5 h-5" />
                    Hoàn tất đơn hàng
                  </>
                )}
              </button>

              <p className="text-xs text-gray-500 text-center mt-4">
                Miễn phí vận chuyển toàn quốc<br />
                Thanh toán khi nhận hàng (COD)
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;