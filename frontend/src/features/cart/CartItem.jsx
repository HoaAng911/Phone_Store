// src/components/user/CartItem.jsx
import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { Trash2, Plus, Minus } from 'lucide-react';
import useCartStore from './useCart';
import useAuthStore from '@/features/auth/store/useAuthStore';

const formatPrice = (price) =>
  new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);

const CartItem = ({ item }) => {
  const { updateCartItem, removeFromCart, loading } = useCartStore();
  const { user } = useAuthStore();
  const userId = user?.id;

  const [quantity, setQuantity] = useState(item.quantity || 1);

  
  useEffect(() => {
    setQuantity(item.quantity || 1);
  }, [item.quantity]);

  const product = item.product;
  if (!product) return null;

  // Flash sale đang diễn ra?
  const isFlashSaleActive = product.flashSaleUntil
    ? new Date(product.flashSaleUntil) > new Date()
    : false;


  const currentPrice = product.price;
  const totalPrice = currentPrice * quantity;

  
  const selectedColor = item.selectedColor || '';

 
  const isItemLoading = loading;

  const handleUpdate = async (newQty) => {
    if (!userId || loading) return;
    if (newQty < 1 || newQty > product.stock) return;

    setQuantity(newQty); 
    try {
      await updateCartItem({
        userId,
        productId: product.id,
        quantity: newQty,
        selectedColor: item.selectedColor,
      });
    } catch (err) {
      setQuantity(item.quantity); // rollback nếu lỗi
      alert('Cập nhật thất bại, vui lòng thử lại!');
    }
  };


  const handleRemove = async () => {
    if (!userId || isItemLoading) return;

    try {
      await removeFromCart(userId, product.id);
    } catch (err) {
      alert('Xóa thất bại!');
    }
  };

  return (
    <div className="flex gap-4 p-4 border rounded-lg bg-white shadow-sm hover:shadow transition">
      <img
        src={product.images?.[0]?.url || '/placeholder.png'}
        alt={product.name}
        className="w-24 h-24 object-cover rounded-md flex-shrink-0"
      />

      <div className="flex-1 space-y-2">
        <h3 className="font-semibold text-lg line-clamp-2">{product.name}</h3>
        <p className="text-sm text-gray-500">{product.brand}</p>

        <div className="text-xs text-gray-600 space-y-1">
          <p>Màu: {selectedColor || 'Không có'}</p>
          <p>
            {product.specification?.screenSize || ''} • {product.specification?.storage || ''}
          </p>
        </div>

        {isFlashSaleActive && (
          <div className="inline-flex items-center gap-1 bg-red-100 text-red-600 text-xs px-2 py-1 rounded-full">
            <span>Flash Sale -{product.discountPercent}%</span>
            <span>đến {format(new Date(product.flashSaleUntil), 'HH:mm dd/MM')}</span>
          </div>
        )}
      </div>

      <div className="flex flex-col items-end gap-3">
        {/* Giá */}
        <div className="text-right">
          {isFlashSaleActive ? (
            <>
              <p className="text-lg font-bold text-red-600">{formatPrice(currentPrice)}</p>
              <p className="text-sm text-gray-500 line-through">
                {formatPrice(product.originalPrice)}
              </p>
            </>
          ) : (
            <p className="text-lg font-bold">{formatPrice(currentPrice)}</p>
          )}
        </div>

        {/* Số lượng */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleUpdate(quantity - 1)}
            disabled={quantity <= 1 || isItemLoading}
            className="p-1 rounded-full hover:bg-gray-100 disabled:opacity-50"
          >
            <Minus className="w-4 h-4" />
          </button>

          <input
            type="text"
            value={quantity}
            onChange={(e) => {
              const val = parseInt(e.target.value) || 1;
              if (val >= 1 && val <= product.stock) handleUpdate(val);
            }}
            className="w-16 text-center border rounded-md font-medium focus:border-red-500 outline-none"
          />

          <button
            onClick={() => handleUpdate(quantity + 1)}
            disabled={quantity >= product.stock || isItemLoading}
            className="p-1 rounded-full hover:bg-gray-100 disabled:opacity-50"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        <p className="text-sm font-semibold">Tổng: {formatPrice(totalPrice)}</p>

        <button
          onClick={handleRemove}
          disabled={isItemLoading}
          className="text-red-500 hover:text-red-700 disabled:opacity-50"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default CartItem;