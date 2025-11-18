// src/components/user/CartItem.jsx
import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { Trash2, Plus, Minus } from 'lucide-react';
import useCartStore from '../../store/useCart';
import useAuthStore from '@/store/useAuthStore';

const CartItem = ({ item }) => {
  const { updateCartItem, removeFromCart } = useCartStore();
  const { user } = useAuthStore();
  const userId = user?.id;

  const [quantity, setQuantity] = useState(item.quantity || 1);

  useEffect(() => {
    setQuantity(item.quantity);
  }, [item.quantity]);

  const product = item.product;

  if (!product) return null; // tránh crash khi product undefined

  const isFlashSaleActive = product.flashSaleUntil
    ? new Date(product.flashSaleUntil) > new Date()
    : false;

  const currentPrice = isFlashSaleActive ? product.price : product.originalPrice;
  const totalPrice = currentPrice * quantity;

  const formatPrice = (price) =>
    new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);

  const handleUpdate = async (newQty) => {
    if (!userId) return; // nếu chưa login thì ko update
    if (newQty < 1 || newQty > product.stock) return;
    setQuantity(newQty);
    await updateCartItem({ userId, productId: item.productId, quantity: newQty });
  };

  const handleRemove = async () => {
    if (!userId) return;
    await removeFromCart(userId, item.productId);
  };

  return (
    <div className="flex gap-4 p-4 border rounded-lg bg-white shadow-sm">
      <img
        src={product.images?.[0]?.url || '/placeholder.png'}
        alt={product.name || 'product'}
        className="w-24 h-24 object-cover rounded-md flex-shrink-0"
      />

      <div className="flex-1 space-y-2">
        <h3 className="font-semibold text-lg line-clamp-2">{product.name}</h3>
        <p className="text-sm text-gray-500">{product.brand}</p>
        <div className="text-xs text-gray-600">
          <p>Màu: {product.specification?.colors?.[0] || 'Chưa có'}</p>
          <p>{product.specification?.screenSize || ''} • {product.specification?.storage || ''}</p>
        </div>

        {isFlashSaleActive && (
          <div className="inline-flex items-center gap-1 bg-red-100 text-red-600 text-xs px-2 py-1 rounded-full">
            <span>Flash Sale -{product.discountPercent}%</span>
            <span>đến {format(new Date(product.flashSaleUntil), 'HH:mm dd/MM')}</span>
          </div>
        )}
      </div>

      <div className="flex flex-col items-end gap-3">
        <div className="text-right">
          {isFlashSaleActive ? (
            <>
              <p className="text-lg font-bold text-red-600">{formatPrice(product.price)}</p>
              <p className="text-sm text-gray-500 line-through">{formatPrice(product.originalPrice)}</p>
            </>
          ) : (
            <p className="text-lg font-bold">{formatPrice(product.originalPrice)}</p>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => handleUpdate(quantity - 1)}
            className="p-1 rounded-full hover:bg-gray-100 disabled:opacity-50"
            disabled={quantity <= 1}
          >
            <Minus className="w-4 h-4" />
          </button>
          <input
            type="text"
            value={quantity}
            readOnly
            className="w-12 text-center border rounded-md font-medium"
          />
          <button
            onClick={() => handleUpdate(quantity + 1)}
            className="p-1 rounded-full hover:bg-gray-100 disabled:opacity-50"
            disabled={quantity >= product.stock}
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        <p className="text-sm font-semibold">Tổng: {formatPrice(totalPrice)}</p>

        <button onClick={handleRemove} className="text-red-500 hover:text-red-700">
          <Trash2 className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default CartItem;
