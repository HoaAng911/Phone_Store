// src/components/ForYouSection.jsx
import { useEffect } from "react";
import { useProductStore } from '@/store';
import FeatureCard from "./FeatureCard"; // ĐÃ ĐỔI TÊN
import { Skeleton } from "@/component/ui";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

const FeatureProduct = () => {
  const { featuresProduct, loading, fetchFeaturesProduct } = useProductStore();

  useEffect(() => {
    fetchFeaturesProduct();
  }, [fetchFeaturesProduct]);

  // === LOADING: 8 SKELETON ===
  if (loading) {
    return (
      <section className="py-10 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Dành cho bạn
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="space-y-3">
                <Skeleton className="aspect-square rounded-xl bg-gray-200" />
                <Skeleton className="h-4 w-4/5 rounded-lg bg-gray-200" />
                <Skeleton className="h-4 w-3/5 rounded-lg bg-gray-200" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // === KHÔNG CÓ DỮ LIỆU ===
  if (!featuresProduct || featuresProduct.length === 0) return null;

  // === HIỂN THỊ SWIPER ===
  return (
    <section className="py-10 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Tiêu đề */}
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
          Sản phẩm nổi bật
        </h2>

        {/* Swiper Carousel */}
        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={20}
          slidesPerView={2}
          navigation={{
            nextEl: ".for-you-swiper-next",
            prevEl: ".for-you-swiper-prev",
          }}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          loop={true}
          breakpoints={{
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
            1280: { slidesPerView: 5 },
          }}
          className="for-you-swiper"
        >
          {featuresProduct.map((product) => (
            <SwiperSlide key={product.id}>
              {/* DỰA VÀO CARD MỚI – KHÔNG CẦN WRAPPER THÊM */}
              <FeatureCard product={product} />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Nút điều hướng */}
        <div className="flex justify-center gap-3 mt-6">
          <button className="for-you-swiper-prev w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-all duration-200">
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button className="for-you-swiper-next w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-all duration-200">
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeatureProduct;