// src/pages/user/Cart.jsx
import React, { useEffect, useMemo } from 'react';
import { ShoppingCart, Trash2, ArrowRight, Package } from 'lucide-react';
import useCartStore from '../features/cart/useCart';
import CartItem from '../features/cart/CartItem';
import useAuthStore from '@/features/auth/store/useAuthStore';
import { Link, Navigate, useNavigate } from 'react-router-dom';

const CartPage = () => {
  // Selector cụ thể - chỉ subscribe những gì cần
  const cartItems = useCartStore((state) => state.cartItems);
  const total = useCartStore((state) => state.total);
  const loading = useCartStore((state) => state.loading);
  const fetchCart = useCartStore((state) => state.fetchCart);
  const clearCart = useCartStore((state) => state.clearCart);
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const userId = user?.id;

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const formatPrice = (price) =>
    new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);


  const cartItemsList = useMemo(() => {
    return cartItems.map((item) => (
      <CartItem key={`${item.userId}-${item.productId}`} item={item} />
    ));
  }, [cartItems]);

  if (loading && cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải giỏ hàng...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="max-w-6xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
          <div className="flex items-center gap-2">
            <ShoppingCart className="w-6 h-6 text-blue-600" />
            <h1 className="text-xl font-bold text-gray-800">
              Giỏ hàng ({cartItems.length} sản phẩm)
            </h1>
          </div>
        </div>

        {cartItems.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <Package className="w-20 h-20 text-gray-300 mx-auto mb-4" />
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              Giỏ hàng trống
            </h2>
            <p className="text-gray-500 mb-6">
              Bạn chưa có sản phẩm nào trong giỏ hàng
            </p>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition"
            >
              Mua sắm ngay
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2 space-y-3">
              {cartItemsList}
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-5 sticky top-4">
                <h3 className="font-semibold text-gray-800 mb-4 pb-3 border-b">
                  Thông tin đơn hàng
                </h3>

                <div className="space-y-3 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Tạm tính:</span>
                    <span className="font-medium">{formatPrice(total)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Phí vận chuyển:</span>
                    <span className="text-green-600 font-medium">Miễn phí</span>
                  </div>
                </div>

                <div className="pt-3 border-t mb-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 font-medium">Tổng cộng:</span>
                    <span className="text-2xl font-bold text-red-600">
                      {formatPrice(total)}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => navigate('/checkout')}
                  className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition shadow-sm mb-3 flex items-center justify-center gap-2"
                >
                  Tiến hành thanh toán
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => {
                    if (window.confirm('Bạn có chắc muốn xóa toàn bộ giỏ hàng?')) {
                      clearCart(userId);
                    }
                  }}
                  className="w-full border border-gray-300 text-gray-700 py-2.5 rounded-lg font-medium hover:bg-gray-50 transition flex items-center justify-center gap-2"
                >
                  <Trash2 className="w-4 h-4" />
                  Xóa toàn bộ
                </button>

                <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                  <p className="text-xs text-blue-700 text-center">
                    ✓ Miễn phí vận chuyển cho đơn hàng trên 500.000đ
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;