import { useEffect } from 'react';
import useProductStore from '../../store/useProduct';
import FlashSaleCard from './Product/FlashSaleCard';
import CountdownTimer from '../ui/CountdownTimer';

export default function FlashSaleSection() {
  const { flashSalesProduct, loading, fetchFlashSalesProduct } = useProductStore();

  useEffect(() => {
    fetchFlashSalesProduct();
  }, [fetchFlashSalesProduct]);

  

  // ĐANG TẢI
  if (loading) {
    return (
      <section className="py-12 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 text-gray-400">
            <div className="w-5 h-5 border-2 border-gray-300 border-t-red-600 rounded-full animate-spin"></div>
            <p className="text-base">Đang tải sản phẩm...</p>
          </div>
        </div>
      </section>
    );
  }

  // KHÔNG CÓ DATA
  if (!flashSalesProduct || flashSalesProduct.length === 0) {
    return null;
  }

  // CÓ DATA
  // Lấy flashSaleUntil từ sản phẩm đầu tiên (giả sử tất cả cùng thời gian kết thúc)
  const endTime = flashSalesProduct[0]?.flashSaleUntil;

  return (
    <section className="py-12 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">
              ⚡ Flash Sale
            </h2>
            <p className="text-sm text-gray-500">Giá shock trong thời gian có hạn</p>
          </div>
          
          <div className="flex items-center gap-3">
            <CountdownTimer endTime={endTime} />
            
            <div className="flex items-center gap-2 bg-red-50 text-red-600 px-4 py-2 rounded-lg border border-red-100">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
              </svg>
              <span className="font-semibold text-sm">{flashSalesProduct.length} sản phẩm</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4">
          {flashSalesProduct.map((product) => (
            <FlashSaleCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}