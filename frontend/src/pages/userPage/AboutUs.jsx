import React from 'react'
import aboutImg from '../../assets/about.jpg'

const AboutUs = () => {
  return (
    <div>
      {/* Tiêu đề "Về Chúng Tôi" */}
      <div className='text-2xl text-center pt-8 border-t'>
        <div className='inline-flex gap-2 items-center mb-3'>
          <p className='text-gray-500'>VỀ <span className="text-gray-700 font-medium">CHÚNG TÔI</span></p>
          <p className="w-8 sm:w-12 h-[1px] sm:h-[2px] bg-gray-700"></p>
        </div>
      </div>

      {/* Phần nội dung giới thiệu */}
      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img className='w-full md:max-w-[450px]' src={aboutImg} alt="" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
          <p>
            ANT_STORE ra đời từ niềm đam mê đổi mới và mong muốn cách mạng hóa
            cách mọi người mua sắm trực tuyến. Hành trình của chúng tôi bắt đầu
            với một ý tưởng đơn giản: cung cấp một nền tảng nơi khách hàng có thể
            dễ dàng khám phá, tìm hiểu và mua sắm đa dạng các sản phẩm ngay tại nhà.
          </p>
          <p>
            Kể từ khi thành lập, chúng tôi không ngừng nỗ lực để chọn lọc và cung cấp
            những sản phẩm chất lượng cao, đáp ứng mọi sở thích và nhu cầu.
            Từ thời trang, làm đẹp đến điện tử và đồ gia dụng, chúng tôi mang đến
            một bộ sưu tập phong phú được nhập từ các thương hiệu và nhà cung cấp uy tín.
          </p>
          <b className="text-gray-800">Sứ Mệnh Của Chúng Tôi</b>
          <p>
            Sứ mệnh của ANT_STORE là mang đến cho khách hàng sự lựa chọn, tiện lợi
            và niềm tin. Chúng tôi cam kết cung cấp trải nghiệm mua sắm mượt mà,
            vượt ngoài mong đợi — từ khâu duyệt sản phẩm, đặt hàng cho đến giao hàng và hậu mãi.
          </p>
        </div>
      </div>

      {/* Phần "Tại Sao Chọn Chúng Tôi" */}
      <div className='text-xl py-4'>
        <div className='inline-flex gap-2 items-center mb-3'>
          <p className='text-gray-500'>VÌ SAO</p>
          <span className="text-gray-700 font-medium">CHỌN CHÚNG TÔI</span>
          <p className="w-8 sm:w-12 h-[1px] sm:h-[2px] bg-gray-700"></p>
        </div>

        <div className='flex flex-col md:flex-row text-sm mb-20'>
          <div className='border border-gray-200 px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
            <b>Đảm Bảo Chất Lượng:</b>
            <p className='text-gray-600'>
              Chúng tôi chọn lọc và kiểm duyệt kỹ lưỡng từng sản phẩm để đảm bảo
              đạt tiêu chuẩn chất lượng nghiêm ngặt nhất.
            </p>
          </div>
          <div className='border border-gray-200 px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
            <b>Giá Cả Hợp Lý:</b>
            <p className='text-gray-600'>
              ANT_STORE mang đến mức giá cạnh tranh, giúp bạn tiết kiệm tối đa mà vẫn
              nhận được sản phẩm chất lượng cao.
            </p>
          </div>
          <div className='border border-gray-200 px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
            <b>Dịch Vụ Khách Hàng Tận Tâm:</b>
            <p className='text-gray-600'>
              Đội ngũ hỗ trợ của chúng tôi luôn sẵn sàng giúp đỡ, mang đến trải nghiệm
              mua sắm hài lòng nhất cho mọi khách hàng.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutUs
