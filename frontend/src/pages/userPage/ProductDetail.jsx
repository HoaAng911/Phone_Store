// src/pages/user/ProductDetail.jsx
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import useProductStore from '../../store/useProduct';
import useCartStore from '../../store/useCart'; // <-- THÊM
import { Clock, ChevronRight, Truck, Shield, Check, Star, ArrowLeft, Plus, Minus } from 'lucide-react';
import ProductSpecifications from '../../components/user/Product/ProductSpecifications';
import ProductReview from '@/components/user/Product/ProductReview';
import useAuthStore from '@/store/useAuthStore';

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
    <div className="inline-flex items-center gap-3 px-4 py-2 border-b border-gray-300">
      <Clock className="w-5 h-5 text-red-600" />
      <span className="text-sm font-medium text-gray-700">Flash Sale kết thúc sau:</span>
      <div className="flex gap-1">
        <div className="px-2 py-1 bg-red-600 text-white text-sm font-bold min-w-[30px] text-center">
          {String(timeLeft.hours).padStart(2, '0')}
        </div>
        <span className="text-red-600 font-bold">:</span>
        <div className="px-2 py-1 bg-red-600 text-white text-sm font-bold min-w-[30px] text-center">
          {String(timeLeft.minutes).padStart(2, '0')}
        </div>
        <span className="text-red-600 font-bold">:</span>
        <div className="px-2 py-1 bg-red-600 text-white text-sm font-bold min-w-[30px] text-center">
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

 

  useEffect(() => {
    if (id) fetchProductById(id);
  }, [id, fetchProductById]);

  useEffect(() => {
    if (product?.specification?.colors?.length > 0) {
      setSelectedColor(product.specification.colors[0]);
    }
  }, [product]);

  const handleAddToCart = async () => {
    if (!product) return;
    try {
      await addToCart({
        userId,
        productId: product.id,
        quantity,
      });
      alert("Đã thêm vào giỏ hàng!");
    } catch (err) {
      alert("Lỗi khi thêm vào giỏ!");
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Đang tải...</div>;
  if (!product) return <div className="min-h-screen flex items-center justify-center">Không tìm thấy sản phẩm</div>;

  const isFlashSale = product.flashSaleUntil && new Date(product.flashSaleUntil) > new Date();
  const saved = product.originalPrice - product.price;

  const updateQuantity = (delta) =>
    setQuantity((prev) => Math.min(Math.max(prev + delta, 1), product.stock));

  const colorMap = {
    Silver: 'bg-gray-300',
    'Space Black': 'bg-black',
    'Space Gray': 'bg-gray-700',
    Gold: 'bg-yellow-400',
    'Rose Gold': 'bg-pink-300',
    Blue: 'bg-blue-500',
    Green: 'bg-green-500',
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Link to="/" className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-600 mb-4">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Quay lại</span>
          </Link>
          <nav className="flex text-sm">
            <ol className="inline-flex items-center space-x-2">
              <li><Link to="/" className="text-gray-500 hover:text-blue-600">Trang chủ</Link></li>
              <li><ChevronRight className="w-4 h-4 text-gray-300" /></li>
              <li><Link to="/category/tablet" className="text-gray-500 hover:text-blue-600">Máy tính bảng</Link></li>
              <li><ChevronRight className="w-4 h-4 text-gray-300" /></li>
              <li className="text-blue-600 font-medium truncate max-w-xs">{product.name}</li>
            </ol>
          </nav>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Hình ảnh */}
          <div className="lg:col-span-7">
            <div className="bg-white border rounded-lg overflow-hidden">
              <div className="aspect-square p-12">
                <img
                  src={product.images[selectedImage]?.url || '/placeholder.jpg'}
                  alt={product.name}
                  className="w-full h-full object-contain"
                />
              </div>
              {isFlashSale && (
                <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 text-sm font-bold rounded">
                  -{product.discountPercent}%
                </div>
              )}
            </div>
            {product.images?.length > 1 && (
              <div className="flex gap-2 mt-3 overflow-x-auto">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`w-20 h-20 border-2 rounded ${selectedImage === idx ? 'border-blue-600' : 'border-gray-300'}`}
                  >
                    <img src={img.url} alt="" className="w-full h-full object-contain" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Thông tin */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded">{product.brand}</span>
                {product.rating > 0 && (
                  <div className="flex items-center gap-1 text-yellow-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-current' : ''}`} />
                    ))}
                    <span className="text-xs text-gray-600 ml-1">({product.reviewCount} đánh giá)</span>
                  </div>
                )}
              </div>
              <h1 className="text-2xl font-bold">{product.name}</h1>
              <p className="text-gray-600 mt-2">{product.description}</p>
            </div>

            {/* Giá */}
            <div className="border-b pb-4">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-bold text-red-600">{formatPrice(product.price)}</span>
                {product.originalPrice > product.price && (
                  <span className="text-lg text-gray-400 line-through">{formatPrice(product.originalPrice)}</span>
                )}
              </div>
              {saved > 0 && <p className="text-sm text-red-600 font-medium">Tiết kiệm {formatPrice(saved)}</p>}
              {isFlashSale && <CountdownTimer endTime={product.flashSaleUntil} />}
            </div>

            {/* Màu sắc */}
            {product.specification.colors?.length > 0 && (
              <div className="border-b pb-4">
                <h3 className="font-semibold mb-2">Màu sắc</h3>
                <div className="flex gap-3">
                  {product.specification.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`w-10 h-10 rounded-full border-2 ${selectedColor === color ? 'border-blue-600' : 'border-gray-300'} ${colorMap[color] || 'bg-gray-400'}`}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Số lượng */}
            <div className="flex items-center gap-4 border-b pb-4">
              <span className="font-semibold">Số lượng</span>
              <button onClick={() => updateQuantity(-1)} className="w-10 h-10 border rounded flex items-center justify-center">
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-12 text-center font-bold">{quantity}</span>
              <button onClick={() => updateQuantity(1)} className="w-10 h-10 border rounded flex items-center justify-center">
                <Plus className="w-4 h-4" />
              </button>
              <span className="text-sm text-gray-500">({product.stock} sản phẩm có sẵn)</span>
            </div>

            {/* Nút hành động */}
            <div className="flex gap-3">
              <button
                onClick={handleAddToCart}
                disabled={cartLoading}
                className="flex-1 border-2 border-blue-600 text-blue-600 py-3 font-bold hover:bg-blue-50 disabled:opacity-50"
              >
                {cartLoading ? 'Đang thêm...' : 'Thêm vào giỏ hàng'}
              </button>
              <button className="flex-1 bg-blue-600 text-white py-3 font-bold hover:bg-blue-700">
                Mua ngay
              </button>
            </div>

            {/* Chính sách */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 text-sm">
              <div className="flex gap-3">
                <Truck className="w-6 h-6 text-blue-600 flex-shrink-0" />
                <div>
                  <p className="font-semibold">Giao hàng nhanh</p>
                  <p className="text-gray-600">2–3 ngày nhận hàng</p>
                </div>
              </div>
              <div className="flex gap-3">
                <Shield className="w-6 h-6 text-green-600 flex-shrink-0" />
                <div>
                  <p className="font-semibold">Bảo hành 12 tháng</p>
                  <p className="text-gray-600">Đổi trả 7 ngày</p>
                </div>
              </div>
              <div className="flex gap-3">
                <Check className="w-6 h-6 text-red-600 flex-shrink-0" />
                <div>
                  <p className="font-semibold">Hàng chính hãng</p>
                  <p className="text-gray-600">Hoàn tiền nếu giả</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <ProductSpecifications specification={product.specification} />
        <ProductReview productId={product.id} rating={product.rating} reviewCount={product.reviewCount}  currentUser={user}    />
      </div>
    </div>
  );
}