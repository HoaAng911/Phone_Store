// src/components/user/Header.jsx
import { ShoppingCart, User } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import Logo from '../../assets/Logo.webp';
import useCartStore from '@/features/cart/useCart';
import useAuthStore from '../../features/auth/store/useAuthStore';
import { toast } from 'sonner';

export default function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false); // ← chỉ hiện 250ms
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const { user, logout } = useAuthStore();
  const totalQuantity = useCartStore(state =>
    state.cartItems.reduce((sum, item) => sum + item.quantity, 0)
  );

  // Đóng dropdown khi click ngoài
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // CHUYỂN TRANG SIÊU MƯỢT — CHỈ 250ms
  const smoothNavigate = (to, requireAuth = false) => {
    if (requireAuth && !user) {
      toast.error("Vui lòng đăng nhập!", { duration: 1500 });
      setTimeout(() => navigate('/login'), 200);
      return;
    }

    // Bật loading overlay
    setIsNavigating(true);

    // Tắt loading + chuyển trang sau đúng 250ms
    const timer = setTimeout(() => {
      navigate(to);
      setIsNavigating(false);
    }, 250);

    // Nếu người dùng click liên tục → clear timer cũ
    return () => clearTimeout(timer);
  };

  return (
    <>
      {/* Loading overlay siêu nhanh — chỉ 250ms */}
      {isNavigating && (
        <div className="fixed inset-0 bg-white/70 backdrop-blur-[2px] z-[9999] flex items-center justify-center pointer-events-none">
          <div className="w-10 h-10 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">

            {/* Logo */}
            <button
              onClick={() => smoothNavigate('/')}
              className="flex items-center gap-3 hover:scale-105 transition-transform"
            >
              <img src={Logo} alt="ANT_STORE" className="w-10 h-10 rounded-lg shadow-md" />
              <span className="hidden sm:block text-2xl font-bold bg-gradient-to-r from-blue-400 to-blue-300 bg-clip-text text-transparent">
                ANT_STORE
              </span>
            </button>

            {/* Nav Links */}
            <nav className="hidden md:flex items-center gap-10">
              {[
                { to: '/', label: 'Home' },
                { to: '/products', label: 'Sản phẩm' },
                { to: '/about', label: 'Giới thiệu' },
                { to: '/contact', label: 'Liên hệ' },
              ].map(({ to, label }) => (
                <button
                  key={to}
                  onClick={() => smoothNavigate(to)}
                  className="text-gray-700 hover:text-red-600 font-medium relative after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-red-600 after:transition-all hover:after:w-full"
                >
                  {label}
                </button>
              ))}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-4">
              {/* User */}
              {user ? (
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="w-11 h-11 rounded-full bg-gradient-to-br from-red-500 to-pink-600 text-white font-bold text-lg shadow-lg hover:scale-110 transition-transform"
                  >
                    {(user.username || user.email)[0].toUpperCase()}
                  </button>

                  {isDropdownOpen && (
                    <div className="absolute right-0 top-full mt-3 w-60 bg-white rounded-2xl shadow-2xl border overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                      <div className="p-4 bg-gradient-to-r from-red-50 to-pink-50">
                        <p className="font-bold text-gray-900">{user.username || user.email}</p>
                        <p className="text-sm text-gray-600">{user.email}</p>
                      </div>
                      <button onClick={() => { smoothNavigate('/profile'); setIsDropdownOpen(false); }} className="w-full text-left px-5 py-3 hover:bg-gray-50">Hồ sơ</button>
                      <button onClick={() => { smoothNavigate('/orders'); setIsDropdownOpen(false); }} className="w-full text-left px-5 py-3 hover:bg-gray-50">Đơn hàng</button>
                      <button onClick={() => { logout(); smoothNavigate('/'); }} className="w-full text-left px-5 py-3 text-red-600 font-medium hover:bg-red-50">Đăng xuất</button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => smoothNavigate('/login')}
                  className="px-5 py-2.5 bg-red-600 text-white rounded-none font-medium hover:bg-red-700 hover:shadow-lg transition-all"
                >
                  Đăng nhập
                </button>
              )}

              {/* Cart */}
              <button
                onClick={() => smoothNavigate('/cart', true)}
                className="relative p-3 hover:bg-red-50 rounded-xl transition-all group"
              >
                <ShoppingCart className="w-6 h-6 text-gray-700 group-hover:text-red-600 transition-colors" />
                {totalQuantity > 0 && (
                  <span className="absolute -top-1 -right-1 min-w-6 h-6 bg-red-600 text-white text-xs font-bold rounded-full flex items-center justify-center animate-bounce">
                    {totalQuantity > 99 ? '99+' : totalQuantity}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}