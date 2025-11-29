// src/components/user/Header.jsx
import { ShoppingCart, User } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';

import Logo from '../../assets/Logo.webp';
import useCartStore from '@/features/cart/useCart';
import useAuthStore from '../../features/auth/store/useAuthStore';

// Dropdown khi đã đăng nhập
const UserDropdown = ({ user, onClose, onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    onClose();
    navigate('/login');
  };

  return (
    <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden z-50">
      <div className="px-4 py-3 border-b border-gray-100">
        <p className="text-sm font-semibold text-gray-900 truncate">
          {user.username || user.email}
        </p>
        <p className="text-xs text-gray-500 truncate">{user.email}</p>
      </div>

      <Link
        to="/profile"
        onClick={onClose}
        className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
      >
        My Profile
      </Link>
      <Link
        to="/orders"
        onClick={onClose}
        className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
      >
        My Orders
      </Link>

      <div className="border-t border-gray-100">
        <button
          onClick={handleLogout}
          className="w-full text-left px-4 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
};

// Navigation links (desktop)
const NavLinks = () => (
  <nav className="hidden md:flex items-center gap-8 flex-1 justify-center">
    {[
      { to: '/', label: 'Home' },
      { to: '/products', label: 'Products' },
      { to: '/about', label: 'About' },
      { to: '/contact', label: 'Contact' },
    ].map(({ to, label }) => (
      <Link
        key={to}
        to={to}
        className="relative text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors py-1 group"
      >
        {label}
        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gray-900 group-hover:w-full transition-all duration-300" />
      </Link>
    ))}
  </nav>
);

export default function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const totalQuantity = useCartStore((state) =>
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

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <img src={Logo} alt="ANT_STORE" className="w-9 h-9 rounded-lg object-cover" />
            <span className="hidden sm:block font-semibold text-lg tracking-tight">
              ANT_STORE
            </span>
          </Link>

          {/* Desktop Navigation */}
          <NavLinks />

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            {/* User */}
            {user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="w-10 h-10 rounded-full bg-gray-900 text-white flex items-center justify-center text-sm font-medium hover:bg-gray-800 transition-colors"
                >
                  {(user.username || user.email)[0].toUpperCase()}
                </button>

                {isDropdownOpen && (
                  <UserDropdown user={user} onClose={() => setIsDropdownOpen(false)} onLogout={logout} />
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
              >
                <User className="w-4 h-4" />
                <span className="hidden sm:inline">Sign In</span>
              </Link>
            )}

            {/* Cart */}
            <Link to="/cart" className="relative p-2 hover:bg-gray-50 rounded-lg transition-colors">
              <ShoppingCart className="w-5 h-5 text-gray-700" />
              {totalQuantity > 0 && (
                <span className="absolute -top-1 -right-1 min-w-5 h-5 px-1 flex items-center justify-center rounded-full bg-red-500 text-white text-xs font-medium">
                  {totalQuantity > 99 ? '99+' : totalQuantity}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}