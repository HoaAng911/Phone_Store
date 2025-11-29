// src/components/PersonalizedProductCard.jsx
import { Link } from "react-router-dom";
import { Card, Badge } from "@/component/ui";
import { Phone, Laptop, Tablet, Headphones } from "lucide-react";

const FeatureCard = ({ product }) => {
  const mainImage = product.images?.[0]?.url || "/placeholder.jpg";

  // Dùng discountPercent từ DB (ưu tiên hơn tính toán)
  const discount = product.discountPercent || 0;

  // Trả góp
  const installmentMonths = 12; // Có thể lấy từ config hoặc DB
  const monthlyPayment = installmentMonths > 0
    ? Math.round(product.price / installmentMonths)
    : 0;

  // Icon theo category
  const getCategoryIcon = () => {
    switch (product.category) {
      case "phone": return <Phone className="w-3 h-3" />;
      case "laptop": return <Laptop className="w-3 h-3" />;
      case "tablet": return <Tablet className="w-3 h-3" />;
      case "accessories": return <Headphones className="w-3 h-3" />;
      default: return null;
    }
  };

  return (
    <Link to={`/product/${product.id}`} className="block h-full group">
      <Card className="h-[450px] overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1">

        {/* Ảnh + Badge */}
        <div className="relative bg-gray-50 p-4 aspect-square">
          <img
            src={mainImage}
            alt={product.name}
            loading="eager"
            fetchPriority="high"
            className="mx-auto h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
          />

          {/* Badge Nổi bật (vàng) - nếu isFeatured */}
          {product.isFeatured && (
            <Badge className="absolute top-2 left-2 bg-yellow-500 text-white text-xs font-bold px-2 py-0.5 rounded-md flex items-center gap-1">
              Nổi bật
            </Badge>
          )}

          {/* Badge Giảm giá (đỏ) - nếu có */}
          {discount > 0 && (
            <Badge className="absolute top-2 right-2 bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded-md">
              -{discount}%
            </Badge>
          )}

          {/* Badge Trả góp 0% */}
          {installmentMonths > 0 && (
            <Badge className="absolute top-10 right-2 bg-green-600 text-white text-xs font-medium px-2 py-0.5 rounded-md flex items-center gap-0.5">
              <span className="text-[10px]">0%</span>
            </Badge>
          )}
        </div>

        {/* Nội dung */}
        <div className="p-3 space-y-2">
          {/* Danh mục + Tên */}
          <div className="flex items-center gap-1 text-xs text-gray-500">
            {getCategoryIcon()}
            <span className="capitalize">{product.category}</span>
          </div>

          <h3 className="text-sm font-semibold text-gray-800 line-clamp-2 leading-tight group-hover:text-blue-600 transition-colors">
            {product.name}
          </h3>

          {/* Giá */}
          <div className="flex items-center gap-2 flex-wrap">
            <p className="text-lg font-bold text-red-600">
              {new Intl.NumberFormat("vi-VN").format(product.price)}đ
            </p>
            {product.originalPrice > product.price && (
              <p className="text-xs text-gray-500 line-through">
                {new Intl.NumberFormat("vi-VN").format(product.originalPrice)}đ
              </p>
            )}
          </div>

          {/* Trả góp */}
          {installmentMonths > 0 && (
            <p className="text-xs text-gray-600">
              ~<span className="font-medium text-gray-800">
                {new Intl.NumberFormat("vi-VN").format(monthlyPayment)}đ
              </span>/tháng × {installmentMonths}
            </p>
          )}

          {/* Khuyến mãi thêm */}
          {product.promo && (
            <p className="text-xs text-red-600 font-medium truncate bg-red-50 px-2 py-1 rounded-md">
              {product.promo}
            </p>
          )}
        </div>
      </Card>
    </Link>
  );
};

export default FeatureCard;