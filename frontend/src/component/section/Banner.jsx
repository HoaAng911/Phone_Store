import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import banner1 from "../../assets/banner1.webp";
import banner2 from "../../assets/banner2.webp";
import banner3 from "../../assets/banner3.webp";

const Banner = () => {
  return (
    <div className="w-full h-[500px] relative mb-17">
      <Swiper
        modules={[Navigation, Autoplay]}
        navigation
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={true}
        className="w-full h-full"
      >
        {/* Slide 1 */}
        <SwiperSlide>
          <div className="relative w-full h-[500px]">
            <img
              src={banner1}
              alt="Banner 1"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-start px-10 md:px-20 text-white">
              <h1 className="text-4xl md:text-6xl font-bold mb-4">
                Mua sắm thông minh cùng <span className="text-yellow-400">ANT_STORE</span>
              </h1>
              <p className="text-lg md:text-xl max-w-2xl mb-6">
                Ưu đãi cực lớn cho điện thoại, laptop và phụ kiện hot nhất!
              </p>
              
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 2 */}
        <SwiperSlide>
          <div className="relative w-full h-[500px]">
            <img
              src={banner2}
              alt="Banner 2"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent flex flex-col justify-center px-10 md:px-20 text-white">
              <h1 className="text-5xl font-bold mb-3">Khuyến mãi mùa lễ hội</h1>
              <p className="text-lg max-w-xl mb-5">
                Giảm giá lên đến 50% cho các sản phẩm công nghệ hàng đầu.
              </p>
              <button className="bg-white text-black px-6 py-3 rounded-full w-3xs font-semibold hover:bg-gray-200 transition">
                Xem ngay
              </button>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 3 */}
        <SwiperSlide>
          <div className="relative w-full h-[500px]">
            <img
              src={banner3}
              alt="Banner 3"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-center text-white">
              <h1 className="text-4xl md:text-6xl font-bold mb-4">Trải nghiệm đỉnh cao</h1>
              <p className="text-lg md:text-xl max-w-2xl mb-6">
                Cập nhật công nghệ mới nhất cùng Forever – nơi mua sắm đáng tin cậy.
              </p>
              <button className="bg-yellow-400 text-black px-6 py-3 rounded-full font-semibold hover:bg-yellow-500 transition-all">
                Khám phá thêm
              </button>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Banner;
