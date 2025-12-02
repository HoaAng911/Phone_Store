// src/components/ForYouSection.jsx  (đổi tên file luôn cho đúng nghĩa)
import { useEffect } from "react";
import { useProductStore } from '@/store';
import FeatureCard from "./FeatureCard";
import { Skeleton } from "@/component/ui/skeleton"; 
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const ForYouSection = () => {
  const { featuresProduct, loading, fetchFeaturesProduct } = useProductStore();

  useEffect(() => {
    fetchFeaturesProduct();
  }, [fetchFeaturesProduct]);

  // ==================== LOADING ====================
  if (loading) {
    return (
      <section className="py-12 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">
            Dành riêng cho bạn
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="space-y-3">
                <Skeleton className="aspect-square rounded-2xl bg-gray-200/80" />
                <Skeleton className="h-5 w-4/5 rounded-full bg-gray-200/70" />
                <Skeleton className="h-4 w-3/5 rounded-full bg-gray-200/60" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // ==================== KHÔNG CÓ DATA ====================
  if (!featuresProduct || featuresProduct.length === 0) return null;

  // ==================== CÓ DATA → SWIPER CAROUSEL ====================
  return (
    <section className="py-12 bg-gradient-to-b from-white to-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        {/* Tiêu đề + icon lửa */}
        <div className="flex items-center gap-3 mb-8">
          <div className="relative">
            <h2 className="text-3xl font-bold text-gray-800">
              Dành riêng cho bạn
            </h2>
            <div className="absolute -top-1 -right-6 text-red-500">
              <svg className="w-8 h-8 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.394 2.08a1 1 0 00-1.788 0c-.449.9-.986 2.164-1.05 3.727-.13 3.028 1.106 5.81 3.444 7.073 2.338 1.264 5.28.24 6.608-2.347.66-1.287.862-2.66.862-3.82 0-2.708-1.94-4.847-4.076-6.633z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Swiper Carousel */}
        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={16}
          slidesPerView={2}
          loop={true}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          navigation={{
            nextEl: ".for-you-next",
            prevEl: ".for-you-prev",
          }}
          breakpoints={{
            640:  { slidesPerView: 2, spaceBetween: 20 },
            768:  { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
            1280: { slidesPerView: 5 },
            1536: { slidesPerView: 6 },
          }}
          className="for-you-swiper pb-10"
        >
          {featuresProduct.map((product) => (
            <SwiperSlide key={product.id}>
              <FeatureCard product={product} />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Nút điều hướng đẹp hơn */}
        <div className="flex justify-center gap-4 mt-4">
          <button className="for-you-prev group w-12 h-12 rounded-full bg-white shadow-lg border border-gray-200 flex items-center justify-center hover:bg-red-50 hover:border-red-300 transition-all duration-300">
            <svg className="w-6 h-6 text-gray-600 group-hover:text-red-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button className="for-you-next group w-12 h-12 rounded-full bg-white shadow-lg border border-gray-200 flex items-center justify-center hover:bg-red-50 hover:border-red-300 transition-all duration-300">
            <svg className="w-6 h-6 text-gray-600 group-hover:text-red-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default ForYouSection;