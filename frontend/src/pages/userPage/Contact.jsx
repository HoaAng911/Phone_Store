import React from "react";
import ContactImg from '../../assets/contact_img.png'

const Contact = () => {
  return (
    <div className="font-outfit text-base pt-10 border-t">
      
      <div className="text-center">
        <div className="inline-flex gap-2 items-center mb-3">
          <p className="text-gray-500 text-2xl">
            LIÊN HỆ <span className="text-gray-700 font-medium">VỚI CHÚNG TÔI</span>
          </p>
          <p className="w-8 sm:w-12 h-[1px] sm:h-[2px] bg-gray-700"></p>
        </div>
      </div>

    
      <div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-28">
        <img
          className="w-full md:max-w-[480px]"
          src={ContactImg}
          alt="Liên hệ"
        />

        <div className="flex flex-col justify-center items-start gap-6">
          <p className="font-semibold text-xl text-gray-600">Cửa hàng của chúng tôi</p>
          <p className="text-gray-500">
            54709 Willms Station
            <br />
            Phòng 350, Washington, Hoa Kỳ
          </p>

          <p className="text-gray-500">
            Điện thoại: (415) 555-0132
            <br />
            Email: admin@hoang.com
          </p>

          <p className="font-semibold text-xl text-gray-600">
            Cơ hội nghề nghiệp tại ANT_STORE
          </p>
          <p className="text-gray-500">
            Tìm hiểu thêm về đội ngũ và các vị trí tuyển dụng của chúng tôi.
          </p>

          <button className="border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500">
            Khám phá cơ hội việc làm
          </button>
        </div>
      </div>
    </div>
  );
};

export default Contact;
