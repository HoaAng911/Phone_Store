import { useEffect } from 'react';
import { useProductStore } from '@/store';
import FlashSaleCard from '../../features/products/FlashSaleCard';
import CountdownTimer from '../ui/CountdownTimer';

export default function FlashSaleSection() {
  const { flashSalesProduct, loading, fetchFlashSalesProduct } = useProductStore();

  useEffect(() => {
    fetchFlashSalesProduct();
  }, [fetchFlashSalesProduct]);

  // Loading
  if (loading) {
    return (
      <section className="py-12 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-3 text-gray-500">
            <div className="w-6 h-6 border-3 border-gray-300 border-t-red-600 rounded-full animate-spin"></div>
            <span className="text-lg font-medium">Đang tải Flash Sale...</span>
          </div>
        </div>
      </section>
    );
  }

  // Không có sản phẩm → ẩn section
  if (!flashSalesProduct || flashSalesProduct.length === 0) return null;

  const endTime = flashSalesProduct[0]?.flashSaleUntil;

  return (
    <section className="py-12 bg-blue-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">

        {/* Tiêu đề chính giữa */}
        <div className="text-center mb-10">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
            FLASH SALE
          </h2>
          <p className="text-gray-600 mt-3 text-lg">Giảm giá cực sốc – Chốt đơn ngay kẻo hết!</p>
          <div className="w-32 h-1.5 bg-gradient-to-r from-red-500 to-pink-500 mx-auto mt-5 rounded-full"></div>
        </div>

        {/* Countdown + số sản phẩm – LUÔN CĂN PHẢI (mobile cũng phải) */}
        <div className="flex flex-col md:flex-row justify-end items-center gap-4 mb-10">
          <CountdownTimer endTime={endTime} />

          <div className="flex items-center gap-2.5 bg-red-600 text-white px-5 py-3 rounded-xl shadow-lg font-bold">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
            </svg>
            <span className="text-sm md:text-base">
              {flashSalesProduct.length} sản phẩm
            </span>
          </div>
        </div>

        {/* Grid sản phẩm – responsive đẹp */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-5">
          {flashSalesProduct.map((product) => (
            <FlashSaleCard key={product.id} product={product} />
          ))}
        </div>

      </div>
    </section>
  );
}