// src/pages/user/Cart.jsx
import React, { useEffect } from 'react';
import useCartStore from '../../store/useCart';
import CartItem from '../../components/user/CartItem';
import useAuthStore from '@/store/useAuthStore';

const CartPage = () => {
  const { cartItems, total, loading, fetchCart, clearCart } = useCartStore();
const { user } = useAuthStore();
const userId = user?.id;

  useEffect(() => {
    fetchCart(userId);
  }, [userId, fetchCart]);

  const formatPrice = (price) =>
    new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);

  if (loading) return <div className="text-center py-10">Đang tải giỏ hàng...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Giỏ hàng của bạn</h1>

      {cartItems.length === 0 ? (
        <p className="text-center text-gray-500 py-10">Giỏ hàng trống</p>
      ) : (
        <>
          <div className="space-y-4">
            {cartItems.map((item) => (
              <CartItem key={item.id || item.productId} item={item} />
            ))}
          </div>

          <div className="mt-8 p-6 bg-gray-50 rounded-lg">
            <div className="flex justify-between text-lg font-bold">
              <span>Tổng cộng:</span>
              <span>{formatPrice(total)}</span>
            </div>
            <div className="flex gap-3 mt-4">
              <button
                onClick={() => clearCart(userId)}
                className="flex-1 border border-red-600 text-red-600 py-2 font-medium hover:bg-red-50"
              >
                Xóa toàn bộ
              </button>
              <button className="flex-1 bg-blue-600 text-white py-2 font-bold hover:bg-blue-700">
                Thanh toán
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;