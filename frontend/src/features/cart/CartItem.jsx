// src/components/user/CartItem.jsx
import React, { useState, useEffect, useRef, memo } from 'react';
import { Trash2, Plus, Minus } from 'lucide-react';
import useCartStore from './useCart';
import useAuthStore from '@/features/auth/store/useAuthStore';

const formatPrice = (price) =>
  new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);

const CartItem = memo(({ item, readonly = false }) => {
  const { user } = useAuthStore();
  const userId = user?.id;

  const updateCartItem = useCartStore((state) => state.updateCartItem);
  const removeFromCart = useCartStore((state) => state.removeFromCart);

  const [quantity, setQuantity] = useState(item.quantity || 1);
  const [isUpdating, setIsUpdating] = useState(false);
  const debounceTimerRef = useRef(null);

  useEffect(() => {
    setQuantity(item.quantity || 1);
  }, [item.quantity]);

  const product = item.product;

 
 

  const currentPrice = product.price;
  const totalPrice = currentPrice * quantity;
  const selectedColor = item.selectedColor || '';

  const performUpdate = async (newQty) => {
    if (!userId || newQty < 1 || newQty > product.stock || readonly) return;

    setIsUpdating(true);
    try {
      await updateCartItem({
        userId,
        productId: product.id,
        quantity: newQty,
        selectedColor: item.selectedColor,
      });
    } catch (err) {
      setQuantity(item.quantity);
      alert('Cập nhật thất bại!');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleButtonClick = (newQty) => {
    if (newQty < 1 || newQty > product.stock || readonly) return;
    setQuantity(newQty);
    performUpdate(newQty);
  };

  const handleInputChange = (newQty) => {
    if (newQty < 1 || newQty > product.stock || readonly) return;
    setQuantity(newQty);
    if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
    debounceTimerRef.current = setTimeout(() => performUpdate(newQty), 800);
  };

  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
    };
  }, []);

  const handleRemove = async () => {
    if (!userId || isUpdating || readonly) return;
    if (window.confirm('Xóa sản phẩm khỏi giỏ hàng?')) {
      await removeFromCart(userId, product.id);
    }
  };
 if (!product) {
    return (
      <div className="flex gap-4 p-4 border rounded-lg bg-gray-50 animate-pulse">
        <div className="w-24 h-24 bg-gray-200 rounded-md" />
        <div className="flex-1 space-y-3">
          <div className="h-5 bg-gray-200 rounded w-3/4" />
          <div className="h-4 bg-gray-200 rounded w-1/2" />
        </div>
      </div>
    );
  }
  return (
    <div className="flex gap-4 p-4 border border-gray-200 rounded-lg bg-white shadow-sm hover:border-blue-300 transition-all">
      <img
        src={product.images?.[0]?.url || '/placeholder.png'}
        alt={product.name}
        className="w-24 h-24 object-cover rounded-md border"
      />

      <div className="flex-1">
        <h3 className="font-semibold text-base line-clamp-2">{product.name}</h3>
        <p className="text-sm text-gray-500">{product.brand}</p>
        {selectedColor && <p className="text-xs text-gray-600 mt-1">Màu: {selectedColor}</p>}

        <div className="mt-3">
          {!readonly ? (
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleButtonClick(quantity - 1)}
                disabled={quantity <= 1 || isUpdating}
                className="w-8 h-8 rounded border flex items-center justify-center hover:bg-gray-50 disabled:opacity-50"
              >
                <Minus className="w-4 h-4" />
              </button>

              <input
                type="number"
                value={quantity}
                onChange={(e) => handleInputChange(parseInt(e.target.value) || 1)}
                className="w-16 h-8 text-center border rounded font-medium"
                min="1"
                max={product.stock}
              />

              <button
                onClick={() => handleButtonClick(quantity + 1)}
                disabled={quantity >= product.stock || isUpdating}
                className="w-8 h-8 rounded border flex items-center justify-center hover:bg-gray-50 disabled:opacity-50"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <p className="text-sm font-medium">Số lượng: <span className="text-red-600">{quantity}</span></p>
          )}
        </div>

        {isUpdating && <p className="text-xs text-blue-600 mt-1">Đang lưu...</p>}
      </div>

      <div className="text-right">
        <p className="text-lg font-bold text-red-600">{formatPrice(totalPrice)}</p>
        {!readonly && (
          <button
            onClick={handleRemove}
            className="text-sm text-gray-500 hover:text-red-600 mt-3 flex items-center gap-1"
          >
            <Trash2 className="w-4 h-4" />
            Xóa
          </button>
        )}
      </div>
    </div>
  );
});

CartItem.displayName = 'CartItem';

export default CartItem;