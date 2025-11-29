import { Link } from 'react-router-dom'

const formatPrice = (price) =>
  new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    maximumFractionDigits: 0
  }).format(price)

export default function ProductCard({ product }) {

  const getImageSrc = () => {
    const img = product.images?.[0]?.url
    return img || '/api/placeholder/320/256' 
  }

  return (
    <Link
      to={`/product/${product.id}`}
      className="group bg-white border border-gray-200 rounded-xl overflow-hidden hover:border-gray-900 hover:shadow-xl hover:shadow-gray-900/5 transition-all duration-500"
    >
      {/* IMAGE CONTAINER - FIXED RATIO + SMOOTH */}
      <div className="relative w-full pt-[100%] bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
        <img
          src={getImageSrc()}
          alt={product.name}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          loading="lazy"
          onError={(e) => {
           
            e.target.style.display = 'none'
          }}
        />
        
        {/* GRADIENT OVERLAY KHI KHÔNG CÓ ẢNH */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-indigo-600/5 group-hover:from-blue-500/10 group-hover:to-indigo-600/10 transition-all duration-500" />
        
        {/* HOT TAG - nếu có discount */}
        {product.discountPercent > 0 && (
          <div className="absolute top-3 left-3">
            <span className="bg-gradient-to-r from-red-500 to-pink-600 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg">
              -{product.discountPercent}%
            </span>
          </div>
        )}
      </div>

      {/* CONTENT - BEAUTIFUL TYPOGRAPHY */}
      <div className="p-5">
        {/* CATEGORY BADGE - ĐẸP HƠN */}
        <div className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 border border-gray-200 mb-3">
          {product.category}
        </div>

        {/* PRODUCT NAME - 2 LINES MAX + ELLIPSIS */}
        <h3 className="font-semibold text-gray-900 leading-6 line-clamp-2 mb-3 group-hover:text-gray-950 transition-colors duration-300">
          {product.name}
        </h3>

        {/* PRICE - SIÊU ĐẸP */}
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="font-bold text-lg text-gray-900 leading-tight">
              {formatPrice(product.price)}
            </p>
            {product.originalPrice && product.originalPrice > product.price && (
              <p className="text-xs text-gray-400 line-through">
                {formatPrice(product.originalPrice)}
              </p>
            )}
          </div>
          
          {/* STOCK INDICATOR */}
          {product.stock > 0 ? (
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-xs text-green-600 font-medium">Còn hàng</span>
            </div>
          ) : (
            <span className="text-xs text-red-500 font-medium">Hết hàng</span>
          )}
        </div>
      </div>
    </Link>
  )
}