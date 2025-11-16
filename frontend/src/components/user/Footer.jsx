import { FaFacebookF, FaInstagram, FaCcVisa, FaCcMastercard } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-10 mt-auto">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-4">
        
        {/* Hỗ trợ */}
        <div>
          <h3 className="font-bold mb-3">Hỗ trợ</h3>
          <ul className="text-sm space-y-1">
            <li><a href="#" className="hover:underline">Hướng dẫn mua hàng</a></li>
            <li><a href="#" className="hover:underline">Chính sách bảo hành</a></li>
          </ul>
        </div>

        {/* Liên hệ */}
        <div>
          <h3 className="font-bold mb-3">Liên hệ</h3>
          <p className="text-sm">Hotline: <strong>1800.1088</strong></p>
          <p className="text-sm">Email: support@hoang.com</p>
        </div>

        {/* Theo dõi */}
        <div>
          <h3 className="font-bold mb-3">Theo dõi</h3>
          <div className="flex gap-3">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-600 hover:bg-blue-600 w-8 h-8 flex items-center justify-center rounded-full transition"
            >
              <FaFacebookF size={18} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-600 hover:bg-pink-500 w-8 h-8 flex items-center justify-center rounded-full transition"
            >
              <FaInstagram size={18} />
            </a>
          </div>
        </div>

        {/* Thanh toán */}
        <div>
          <h3 className="font-bold mb-3">Thanh toán</h3>
          <div className="flex gap-3 flex-wrap">
            <div className="bg-gray-700 w-12 h-8 flex items-center justify-center rounded">
              <FaCcVisa size={28} className="text-blue-400" />
            </div>
            <div className="bg-gray-700 w-12 h-8 flex items-center justify-center rounded">
              <FaCcMastercard size={28} className="text-yellow-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Bản quyền */}
      <div className="text-center mt-8 text-sm text-gray-400">
        © 2025 ANT_STORE. All rights reserved.
      </div>
    </footer>
  );
}
