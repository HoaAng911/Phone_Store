
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useProductStore from '../../store/useProduct';
import { Clock, ChevronRight, Truck, Shield, Check, Star, ArrowLeft } from 'lucide-react';

const formatPrice = (price) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
};

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

  if (timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0) return null;

  return (
    <div className="inline-flex items-center gap-3 bg-gradient-to-r from-red-50 to-orange-50 px-4 py-3 rounded-xl border border-red-200">
      <Clock className="w-5 h-5 text-red-600" />
      <span className="text-sm font-semibold text-gray-700">Flash Sale kết thúc sau:</span>
      <div className="flex gap-1.5">
        <div className="bg-gradient-to-br from-red-600 to-red-700 text-white px-3 py-1.5 rounded-lg text-sm font-bold shadow-sm min-w-[40px] text-center">
          {String(timeLeft.hours).padStart(2, '0')}
        </div>
        <span className="text-red-600 font-bold">:</span>
        <div className="bg-gradient-to-br from-red-600 to-red-700 text-white px-3 py-1.5 rounded-lg text-sm font-bold shadow-sm min-w-[40px] text-center">
          {String(timeLeft.minutes).padStart(2, '0')}
        </div>
        <span className="text-red-600 font-bold">:</span>
        <div className="bg-gradient-to-br from-red-600 to-red-700 text-white px-3 py-1.5 rounded-lg text-sm font-bold shadow-sm min-w-[40px] text-center">
          {String(timeLeft.seconds).padStart(2, '0')}
        </div>
      </div>
    </div>
  );
};

export default function ProductDetail() {
  const { id } = useParams();
  const { product, loading, fetchProductById } = useProductStore();

  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    if (id) {
      fetchProductById(id);
    }
  }, [id, fetchProductById]);

  useEffect(() => {
    if (product?.specification?.colors?.length > 0) {
      setSelectedColor(product.specification.colors[0]);
    }
  }, [product]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent mx-auto"></div>
          <p className="mt-4 text-gray-600 font-medium">Đang tải sản phẩm...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center">
          <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-12 h-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <p className="text-xl font-semibold text-gray-700">Không tìm thấy sản phẩm</p>
          <p className="text-gray-500 mt-2">Sản phẩm bạn tìm kiếm không tồn tại hoặc đã bị xóa</p>
        </div>
      </div>
    );
  }

  const isFlashSale = product.flashSaleUntil && new Date(product.flashSaleUntil) > new Date();
  const saved = product.originalPrice - product.price;

  const updateQuantity = (delta) => {
    setQuantity((prev) => {
      const next = prev + delta;
      if (next < 1) return 1;
      if (next > product.stock) return product.stock;
      return next;
    });
  };

  const colorMap = {
    'Silver': 'bg-gradient-to-br from-gray-200 to-gray-300 border border-gray-400',
    'Space Black': 'bg-gradient-to-br from-gray-800 to-black border border-gray-900',
    'Space Gray': 'bg-gradient-to-br from-gray-700 to-gray-900 border border-gray-800',
    'Gold': 'bg-gradient-to-br from-yellow-300 to-yellow-500 border border-yellow-600',
    'Rose Gold': 'bg-gradient-to-br from-pink-300 to-rose-400 border border-rose-500',
    'Blue': 'bg-gradient-to-br from-blue-400 to-blue-600 border border-blue-700',
    'Green': 'bg-gradient-to-br from-green-400 to-green-600 border border-green-700',
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Back Button & Breadcrumb */}
        <div className="mb-6">
          <button className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors mb-4 group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-medium">Quay lại</span>
          </button>

          <nav className="flex text-sm" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-2">
              <li><a href="/" className="text-gray-500 hover:text-blue-600 transition-colors">Trang chủ</a></li>
              <li><ChevronRight className="w-4 h-4 text-gray-300" /></li>
              <li><a href="/category/tablet" className="text-gray-500 hover:text-blue-600 transition-colors">Máy tính bảng</a></li>
              <li><ChevronRight className="w-4 h-4 text-gray-300" /></li>
              <li className="text-blue-600 font-medium truncate max-w-xs">{product.name}</li>
            </ol>
          </nav>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Image Gallery */}
          <div className="lg:col-span-7 space-y-4">
            <div className="relative bg-white rounded-3xl overflow-hidden shadow-xl border border-gray-100 group">
              <div className="aspect-square p-12">
                <img
                  src={product.images[selectedImage]?.url || product.images[0]?.url || '/placeholder.jpg'}
                  alt={product.name}
                  className="w-full h-full object-contain"
                />
              </div>
              {isFlashSale && (
                <div className="absolute top-6 left-6">
                  <div className="bg-gradient-to-r from-red-600 to-red-700 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg flex items-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" />
                    </svg>
                    -{product.discountPercent}%
                  </div>
                </div>
              )}
            </div>

            {/* Thumbnail Gallery */}
            {product.images?.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {product.images.map((img, idx) => (
                  <button
                    key={img.id || idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                      selectedImage === idx
                        ? 'border-blue-600 shadow-lg scale-105'
                        : 'border-gray-200 hover:border-blue-300 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img.url} alt="" className="w-full h-full object-contain p-2 bg-white" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="lg:col-span-5 space-y-6">
            {/* Brand & Title */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                  {product.brand}
                </span>
                {product.rating && parseFloat(product.rating) > 0 && (
                  <div className="flex items-center gap-1 text-yellow-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-3.5 h-3.5 ${i < Math.floor(parseFloat(product.rating)) ? 'fill-current' : ''}`} />
                    ))}
                    <span className="text-xs text-gray-600 ml-1">
                      ({product.rating} - {product.reviewCount} đánh giá)
                    </span>
                  </div>
                )}
              </div>
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">{product.name}</h1>
              <p className="text-gray-600 mt-3 leading-relaxed">{product.description}</p>
            </div>

            {/* Price Section */}
            <div className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-2xl p-6 shadow-sm">
              <div className="flex items-baseline gap-3 mb-2">
                <span className="text-4xl font-bold bg-gradient-to-r from-red-600 to-red-700 bg-clip-text text-transparent">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice > product.price && (
                  <span className="text-xl text-gray-400 line-through font-medium">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
              </div>
              {saved > 0 && (
                <div className="flex items-center gap-2 text-sm">
                  <span className="inline-flex items-center gap-1 text-red-600 font-semibold bg-red-50 px-3 py-1 rounded-full">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                    </svg>
                    Tiết kiệm {formatPrice(saved)}
                  </span>
                  <span className="text-gray-600">(-{product.discountPercent}%)</span>
                </div>
              )}
            </div>

            {/* Flash Sale Timer */}
            {isFlashSale && (
              <div className="animate-pulse">
                <CountdownTimer endTime={product.flashSaleUntil} />
              </div>
            )}

            {/* Color Selection */}
            {product.specification.colors?.length > 0 && (
              <div className="bg-white border border-gray-300 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
                <h3 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-3">
                  <span>Chọn màu sắc:</span>
                  <span className="text-blue-600 font-bold text-lg">{selectedColor}</span>
                </h3>
                <div className="flex gap-4 flex-wrap">
                  {product.specification.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`relative border-3 rounded-xl p-1.5 transition-all duration-200 transform hover:scale-110 ${
                        selectedColor === color
                          ? 'border-blue-600 shadow-lg ring-2 ring-blue-300'
                          : 'border-gray-300 hover:border-blue-400 opacity-80 hover:opacity-100'
                      }`}
                    >
                      <div className={`w-16 h-16 rounded-lg ${colorMap[color] || 'bg-gray-400'} shadow-md`} />
                      {selectedColor === color && (
                        <div className="absolute -top-2 -right-2 bg-blue-600 rounded-full p-1.5 shadow-lg">
                          <Check className="w-4 h-4 text-white" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Selector */}
            <div className="bg-white border border-gray-300 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center justify-between mb-4">
                <span className="text-base font-semibold text-gray-900">Số lượng:</span>
                <span className="text-sm text-gray-600">
                  <span className="font-semibold text-green-600">{product.stock}</span> sản phẩm có sẵn
                </span>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center border-2 border-gray-300 rounded-lg overflow-hidden shadow-sm bg-gray-50">
                  <button
                    onClick={() => updateQuantity(-1)}
                    disabled={quantity <= 1}
                    className="px-5 py-3 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors duration-200 font-bold text-xl text-gray-700"
                  >−</button>
                  <span className="px-6 py-3 font-bold text-lg min-w-[60px] text-center bg-white border-l border-r border-gray-300">{quantity}</span>
                  <button
                    onClick={() => updateQuantity(1)}
                    disabled={quantity >= product.stock}
                    className="px-5 py-3 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors duration-200 font-bold text-xl text-gray-700"
                  >+</button>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-2">
              <button className="flex-1 bg-white border-2 border-blue-600 text-blue-600 py-4 rounded-xl font-bold hover:bg-blue-50 transition-all duration-200 shadow-sm hover:shadow-md">
                Thêm vào giỏ
              </button>
              <button className="flex-1 bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5">
                Mua ngay
              </button>
            </div>

            {/* Benefits */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-5 space-y-3 shadow-sm">
              <div className="flex items-center gap-3 text-sm">
                <div className="bg-green-100 p-2 rounded-lg">
                  <Truck className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-800">Giao hàng miễn phí toàn quốc</p>
                  <p className="text-xs text-gray-600">Nhận hàng trong 2-3 ngày</p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className="bg-green-100 p-2 rounded-lg">
                  <Shield className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-800">Bảo hành chính hãng 12 tháng</p>
                  <p className="text-xs text-gray-600">Hỗ trợ đổi trả trong 7 ngày</p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className="bg-green-100 p-2 rounded-lg">
                  <Check className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-800">Hàng chính hãng 100%</p>
                  <p className="text-xs text-gray-600">Cam kết hoàn tiền nếu hàng giả</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Specifications – ẨN id, createdAt, updatedAt */}
        <div className="mt-12 bg-white border border-gray-200 rounded-3xl shadow-xl p-8">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 flex items-center gap-3">
            <div className="w-1.5 h-8 bg-gradient-to-b from-blue-600 to-blue-700 rounded-full"></div>
            Thông số kỹ thuật
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-1">
            {Object.entries(product.specification || {})
              .filter(([key]) => !['colors', 'id', 'createdAt', 'updatedAt'].includes(key))
              .map(([key, value]) => {
                const labels = {
                  screenSize: 'Màn hình',
                  resolution: 'Độ phân giải',
                  cpu: 'Chip xử lý',
                  ram: 'RAM',
                  storage: 'Bộ nhớ trong',
                  battery: 'Thời lượng pin',
                  os: 'Hệ điều hành',
                  camera: 'Camera',
                  sim: 'SIM',
                  weight: 'Trọng lượng',
                };

                return (
                  <div key={key} className="flex justify-between py-4 border-b border-gray-100 last:border-0 hover:bg-gray-50 px-4 -mx-4 rounded-lg transition-colors">
                    <span className="text-gray-600 font-medium">{labels[key] || key}</span>
                    <span className="font-semibold text-gray-900 text-right">
                      {Array.isArray(value) ? value.join(', ') : value || '—'}
                    </span>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}