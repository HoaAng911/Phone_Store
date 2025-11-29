export default function FlashSaleCard({ product }) {
  const imageUrl = 
    product.images?.[0]?.url || 
    'https://via.placeholder.com/300?text=No+Image';

  return (
    <a
      href={`/san-pham/${product.id}`}
      className="block group"
    >
      <div className="bg-white rounded-lg overflow-hidden border border-gray-200 hover:border-gray-300 transition-all duration-300 h-full hover:shadow-lg">
        <div className="relative aspect-square overflow-hidden bg-gray-50">
          <img
            src={imageUrl}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          {product.discountPercent > 0 && (
            <div className="absolute top-3 right-3 bg-red-600 text-white text-xs font-semibold px-2.5 py-1 rounded-md shadow-sm">
              -{product.discountPercent}%
            </div>
          )}
        </div>

        <div className="p-4">
          <h3 className="font-medium text-gray-900 text-sm leading-snug line-clamp-2 min-h-[2.5rem] mb-3">
            {product.name}
          </h3>

          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold text-red-600">
              {product.price?.toLocaleString('vi-VN')}₫
            </span>
            {product.originalPrice && (
              <span className="text-sm text-gray-400 line-through">
                {product.originalPrice.toLocaleString('vi-VN')}₫
              </span>
            )}
          </div>

          {product.sold && (
            <div className="mt-2 text-xs text-gray-500">
              Đã bán {product.sold}
            </div>
          )}
        </div>
      </div>
    </a>
  );
}