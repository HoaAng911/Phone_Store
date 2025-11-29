import React from 'react';
import aboutImg from '../assets/about.jpg';

const AboutUs = () => {
  return (
    <section className="font-outfit bg-white">
      {/* Hero Title */}
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-10 text-center">
        <div className="inline-flex flex-col items-center">
          <p className="text-4xl md:text-5xl font-light text-gray-700 tracking-wider">
            VỀ <span className="font-bold text-black">CHÚNG TÔI</span>
          </p>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent mt-4"></div>
        </div>
        <p className="mt-6 text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
          ANT_STORE không chỉ là nơi mua sắm – mà là nơi khởi nguồn phong cách sống hiện đại, 
          tự tin và khác biệt của người Việt trẻ.
        </p>
      </div>

      {/* Giới thiệu + Hình ảnh */}
      <div className="max-w-7xl mx-auto px-6 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-16 xl:gap-24 items-center">
          {/* Hình ảnh */}
          <div className="order-2 lg:order-1">
            <div className="relative group">
              <img
                src={aboutImg}
                alt="Về ANT STORE"
                className="w-full rounded-2xl shadow-2xl object-cover hover:scale-[1.02] transition-transform duration-700"
              />
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
          </div>

          {/* Nội dung */}
          <div className="order-1 lg:order-2 space-y-8">
            <div className="space-y-6 text-gray-700 leading-relaxed text-lg">
              <p>
                ANT_STORE ra đời từ niềm đam mê thời trang và khát vọng mang đến cho người Việt 
                những sản phẩm chất lượng quốc tế với mức giá hợp lý.
              </p>
              <p>
                Chúng tôi tin rằng, mỗi chiếc áo, mỗi phụ kiện không chỉ là vật dụng – 
                mà là cách bạn thể hiện cá tính, phong cách và câu chuyện của chính mình.
              </p>
              <p>
                Từ những thiết kế tinh tế, chất liệu cao cấp đến dịch vụ tận tâm – 
                tất cả đều được chăm chút để mang lại trải nghiệm mua sắm đáng nhớ nhất.
              </p>
            </div>

            <div className="pt-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Sứ Mệnh Của Chúng Tôi</h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                Mang đến cho hàng triệu người Việt cơ hội sở hữu những sản phẩm thời trang đẹp – chất – giá tốt, 
                đồng thời lan tỏa tinh thần tự tin, sáng tạo và sống chất từng ngày.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Vì sao chọn chúng tôi - Card đẹp hơn */}
      <div className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-3xl md:text-4xl font-light text-gray-700 tracking-wider inline-block">
              VÌ SAO CHỌN <span className="font-bold text-black">ANT_STORE</span>
            </p>
            <div className="w-20 h-px bg-gradient-to-r from-transparent via-orange-600 to-transparent mx-auto mt-4"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Chất Lượng Đảm Bảo",
                desc: "Mỗi sản phẩm đều được kiểm duyệt nghiêm ngặt trước khi đến tay bạn.",
                icon: "✓"
              },
              {
                title: "Giá Trị Thực Sự",
                desc: "Cam kết giá cạnh tranh nhất thị trường mà vẫn giữ chất lượng cao cấp.",
                icon: "★"
              },
              {
                title: "Dịch Vụ Tận Tâm 24/7",
                desc: "Đội ngũ hỗ trợ luôn sẵn sàng giải đáp mọi thắc mắc của bạn, bất cứ lúc nào.",
                icon: "♥"
              }
            ].map((item, index) => (
              <div
                key={index}
                className="group bg-white rounded-2xl p-8 shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border border-gray-100"
              >
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center text-3xl mb-6 group-hover:bg-orange-600 group-hover:text-white transition-colors duration-300">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;