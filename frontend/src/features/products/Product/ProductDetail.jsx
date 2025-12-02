import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import {
  Clock, ChevronRight, Truck, Shield, Check, Star,
  Plus, Minus, Gift, CreditCard, Tag, Heart
} from 'lucide-react';
import { useProductStore } from '@/store';
import useCartStore from '@/features/cart/useCart';
import useAuthStore from '../../auth/store/useAuthStore';
import ProductReview from '@/features/products/ProductReview';
import { toast } from 'sonner'
const formatPrice = (price) =>
  new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);

const CountdownTimer = ({ endTime }) => {
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const end = new Date(endTime).getTime();
      const diff = end - now;

      if (diff <= 0) {
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
        clearInterval(timer);
        return;
      }

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({ hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(timer);
  }, [endTime]);

  if (!timeLeft.hours && !timeLeft.minutes && !timeLeft.seconds) return null;

  return (
    <div className="flex items-center gap-2 bg-red-50 px-3 py-2 rounded">
      <Clock className="w-4 h-4 text-red-600" />
      <span className="text-sm text-gray-700">Kết thúc sau</span>
      <div className="flex gap-1">
        <div className="px-2 py-1 bg-red-600 text-white text-xs font-bold rounded">
          {String(timeLeft.hours).padStart(2, '0')}
        </div>
        <span className="text-red-600 font-bold">:</span>
        <div className="px-2 py-1 bg-red-600 text-white text-xs font-bold rounded">
          {String(timeLeft.minutes).padStart(2, '0')}
        </div>
        <span className="text-red-600 font-bold">:</span>
        <div className="px-2 py-1 bg-red-600 text-white text-xs font-bold rounded">
          {String(timeLeft.seconds).padStart(2, '0')}
        </div>
      </div>
    </div>
  );
};

export default function ProductDetail() {
  const { id } = useParams();
  const { product, loading, fetchProductById } = useProductStore();
  const { addToCart, loading: cartLoading } = useCartStore();
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const { user } = useAuthStore();
  const userId = user?.id;
  const navigate = useNavigate();
  const location = useLocation();
  // Fetch product khi component mount
  useEffect(() => {
    if (id) fetchProductById(id);
  }, [id]);

  // Set default color khi product load xong
  useEffect(() => {
    if (product?.specification?.colors?.length > 0) {
      setSelectedColor(product.specification.colors[0]);
    }
  }, [product]);
  const handleAddToCart = async () => {
    if (!product) return;
    if (!userId) {
      toast.error("Vui lòng đăng nhập để thêm vào giỏ hàng!", {
        description: "Bạn sẽ được chuyển đến trang đăng nhập",
      });
      setTimeout(() => {
        navigate('/login', { state: { redirectTo: location.pathname } });
      }, 400);
      return;
    }

    if (!selectedColor) {
      toast.error("Vui lòng chọn màu sắc sản phẩm!");
      return;
    }
    try {
      await addToCart({
        userId,
        productId: product.id,
        quantity,
        selectedColor: selectedColor,
      });

      toast.success("Đã thêm vào giỏ hàng thành công!", {
        description: `${product.name} × ${quantity}`,
      })
    } catch (err) {
      console.error("Lỗi thêm giỏ hàng:", err);
      toast.error("Không thể thêm vào giỏ hàng", {
        description: "Vui lòng thử lại sau vài giây",
      });
    }
  };

  if (loading || !product) return <div className="p-6 text-center">Đang tải sản phẩm...</div>;

  const isFlashSale = product.flashSaleUntil && new Date(product.flashSaleUntil) > new Date();
  const saved = product.originalPrice - product.price;

  const updateQuantity = (delta) =>
    setQuantity((prev) => Math.min(Math.max(prev + delta, 1), product.stock));

  const colorMap = {
    'Space Gray': { bg: 'bg-gray-700', name: 'Xám Không Gian' },
    'Silver': { bg: 'bg-gray-300', name: 'Bạc' },
    'Gold': { bg: 'bg-yellow-400', name: 'Vàng' },
    'Rose Gold': { bg: 'bg-pink-300', name: 'Vàng Hồng' },
  };

  const promotions = [
    { icon: Gift, title: 'Giảm thêm 500.000đ', desc: 'Khi thanh toán qua VNPay' },
    { icon: CreditCard, title: 'Trả góp 0%', desc: 'Qua thẻ tín dụng' },
    { icon: Tag, title: 'Thu cũ đổi mới', desc: 'Trợ giá lên đến 2 triệu' },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header breadcrumb */}
      <div className="bg-gray-50 border-b">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <nav className="flex text-sm items-center gap-2 text-gray-600">
            <a href="/" className="hover:text-red-600">Trang chủ</a>
            <ChevronRight className="w-4 h-4" />
            <a href="/tablet" className="hover:text-red-600">Máy tính bảng</a>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900 font-medium">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* LEFT: Image Gallery */}
          <div className="lg:col-span-5">
            <div className="sticky top-4">
              {/* Main image */}
              <div className="bg-white border rounded-lg overflow-hidden relative mb-3">
                {isFlashSale && (
                  <div className="absolute top-3 left-3 z-10">
                    <div className="bg-gradient-to-r from-red-600 to-red-500 text-white px-3 py-1 rounded-md text-sm font-bold shadow-lg">
                      GIẢM {product.discountPercent}%
                    </div>
                  </div>
                )}
                <button className="absolute top-3 right-3 z-10 bg-white rounded-full p-2 shadow-md hover:bg-gray-50">
                  <Heart className="w-5 h-5 text-gray-600" />
                </button>
                <div className="aspect-square p-8 flex items-center justify-center">
                  <img
                    src={product.images[selectedImage]?.url}
                    alt={product.name}
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>

              {/* Thumbnails */}
              {product.images?.length > 1 && (
                <div className="flex gap-2 justify-center">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(idx)}
                      className={`w-16 h-16 border-2 rounded-lg overflow-hidden transition-all ${selectedImage === idx ? 'border-red-600' : 'border-gray-200 hover:border-gray-300'
                        }`}
                    >
                      <img src={img.url} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* RIGHT: Product Info */}
          <div className="lg:col-span-7">
            {/* Brand & Rating */}
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                {product.brand}
              </span>
              {product.rating > 0 && (
                <div className="flex items-center gap-1">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">
                    {product.rating} ({product.reviewCount} đánh giá)
                  </span>
                </div>
              )}
            </div>

            {/* Product name */}
            <h1 className="text-2xl font-bold text-gray-900 mb-2">{product.name}</h1>
            <p className="text-gray-600 text-sm mb-4">{product.shortDescription}</p>

            {/* Price section */}
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-3xl font-bold text-red-600">{formatPrice(product.price)}</span>
                {product.originalPrice > product.price && (
                  <span className="text-lg text-gray-400 line-through">{formatPrice(product.originalPrice)}</span>
                )}
              </div>
              {saved > 0 && (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-red-600 font-medium">
                    Tiết kiệm: {formatPrice(saved)}
                  </span>
                  {isFlashSale && <CountdownTimer endTime={product.flashSaleUntil} />}
                </div>
              )}
            </div>

            {/* Color selection */}
            {product.specification.colors?.length > 0 && (
              <div className="mb-4 pb-4 border-b">
                <h3 className="text-sm font-semibold text-gray-700 mb-3">Chọn màu sắc</h3>
                <div className="flex gap-2">
                  {product.specification.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-4 py-2 border-2 rounded-lg text-sm font-medium transition-all ${selectedColor === color
                        ? 'border-red-600 bg-red-50 text-red-600'
                        : 'border-gray-200 text-gray-700 hover:border-gray-300'
                        }`}
                    >
                      {colorMap[color]?.name || color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Promotions */}
            <div className="mb-4 pb-4 border-b">
              <h3 className="text-sm font-semibold text-gray-700 mb-3">Khuyến mãi đặc biệt</h3>
              <div className="space-y-2">
                {promotions.map((promo, idx) => (
                  <div key={idx} className="flex items-start gap-3 bg-blue-50 p-3 rounded-lg">
                    <promo.icon className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{promo.title}</p>
                      <p className="text-xs text-gray-600">{promo.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="flex items-center gap-6 mb-6">
              <span className="text-sm font-semibold text-gray-700">Số lượng</span>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => updateQuantity(-1)}
                  className="w-9 h-9 border border-gray-300 rounded hover:bg-gray-50 flex items-center justify-center"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-12 text-center font-bold text-lg">{quantity}</span>
                <button
                  onClick={() => updateQuantity(1)}
                  className="w-9 h-9 border border-gray-300 rounded hover:bg-gray-50 flex items-center justify-center"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <span className="text-sm text-gray-500">Còn {product.stock} sản phẩm</span>
            </div>

            {/* Action buttons */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <button className="bg-white border-2 border-red-600
               text-red-600 py-3 rounded-lg font-bold hover:bg-red-50 transition-colors"
                onClick={handleAddToCart}
                disabled={cartLoading}
              >
                {cartLoading ? 'Đang thêm...' : 'Thêm vào giỏ hàng'}
              </button>
              <button className="bg-red-600 text-white py-3 rounded-lg font-bold hover:bg-red-700 transition-colors">
                Mua ngay
              </button>
            </div>

            {/* Policies */}
            <div className="grid grid-cols-3 gap-3 py-4 border-t">
              <div className="text-center">
                <Truck className="w-6 h-6 text-blue-600 mx-auto mb-1" />
                <p className="text-xs font-semibold text-gray-900">Giao hàng nhanh</p>
                <p className="text-xs text-gray-500">Trong 2-3 ngày</p>
              </div>
              <div className="text-center">
                <Shield className="w-6 h-6 text-green-600 mx-auto mb-1" />
                <p className="text-xs font-semibold text-gray-900">Bảo hành 12 tháng</p>
                <p className="text-xs text-gray-500">Chính hãng Apple</p>
              </div>
              <div className="text-center">
                <Check className="w-6 h-6 text-red-600 mx-auto mb-1" />
                <p className="text-xs font-semibold text-gray-900">Đổi trả 7 ngày</p>
                <p className="text-xs text-gray-500">Miễn phí 100%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Specifications */}
        <div className="mt-8 bg-gray-50 rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">Thông số kỹ thuật</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex justify-between py-3 border-b">
              <span className="text-gray-600">Màn hình</span>
              <span className="font-semibold">{product.specification.screenSize}</span>
            </div>
            <div className="flex justify-between py-3 border-b">
              <span className="text-gray-600">Chip</span>
              <span className="font-semibold">{product.specification.cpu}</span>
            </div>
            <div className="flex justify-between py-3 border-b">
              <span className="text-gray-600">RAM</span>
              <span className="font-semibold">{product.specification.ram}</span>
            </div>
            <div className="flex justify-between py-3 border-b">
              <span className="text-gray-600">Bộ nhớ</span>
              <span className="font-semibold">{product.specification.storage}</span>
            </div>
            <div className="flex justify-between py-3 border-b">
              <span className="text-gray-600">Pin</span>
              <span className="font-semibold">{product.specification.battery}</span>
            </div>
            <div className="flex justify-between py-3 border-b">
              <span className="text-gray-600">Trọng lượng</span>
              <span className="font-semibold">{product.specification.weight}</span>
            </div>
            <ProductReview productId={product.id} rating={product.rating} reviewCount={product.reviewCount} />
          </div>
        </div>
      </div>
    </div>
  );
}
