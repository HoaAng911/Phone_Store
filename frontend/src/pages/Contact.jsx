import React from "react";
import ContactImg from '../assets/contact_img.png';

const Contact = () => {
  return (
    <section className="font-outfit py-16 lg:py-24 border-t border-gray-200 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Tiêu đề */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-4">
            <p className="text-3xl lg:text-4xl font-light text-gray-600 tracking-wider">
              LIÊN HỆ <span className="font-semibold text-gray-900">VỚI CHÚNG TÔI</span>
            </p>
            <div className="w-20 h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent"></div>
          </div>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Chúng tôi luôn sẵn sàng hỗ trợ bạn. Đừng ngần ngại liên hệ nhé!
          </p>
        </div>

        {/* Nội dung chính */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Hình ảnh */}
          <div className="order-2 lg:order-1">
            <img
              src={ContactImg}
              alt="Liên hệ ANT STORE"
              className="w-full rounded-2xl shadow-xl object-cover hover:scale-[1.02] transition-transform duration-700"
            />
          </div>

          {/* Thông tin liên hệ */}
          <div className="order-1 lg:order-2 space-y-10">
            {/* Địa chỉ cửa hàng */}
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold text-gray-800">Cửa hàng của chúng tôi</h3>
              <div className="text-gray-600 leading-relaxed space-y-2">
                <p className="flex items-start gap-2">
                  <span className="text-gray-900 mt-1">📍</span>
                  <span>
                    54709 Willms Station<br />
                    Suite 350, Washington, USA
                  </span>
                </p>
                <p className="flex items-center gap-2">
                  <span className="text-gray-900">☎</span>
                  <span>(415) 555-0132</span>
                </p>
                <p className="flex items-center gap-2">
                  <span className="text-gray-900">✉</span>
                  <a href="mailto:admin@hoang.com" className="hover:text-black transition-colors">
                    admin@hoang.com
                  </a>
                </p>
              </div>
            </div>

            {/* Tuyển dụng */}
            <div className="space-y-5">
              <h3 className="text-2xl font-semibold text-gray-800">
                Cơ hội nghề nghiệp tại <span className="text-orange-600">ANT_STORE</span>
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Tìm hiểu thêm về đội ngũ và các vị trí tuyển dụng của chúng tôi. 
                Hãy cùng xây dựng một thương hiệu thời trang Việt Nam vươn tầm quốc tế!
              </p>
              <div className="pt-4">
                <button className="group relative overflow-hidden bg-black text-white px-10 py-4 rounded-full font-medium tracking-wide hover:shadow-2xl transition-all duration-500">
                  <span className="relative z-10">Khám phá cơ hội việc làm</span>
                  <span className="absolute inset-0 bg-orange-600 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500"></span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;