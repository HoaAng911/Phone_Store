// src/components/user/Header.jsx
import { Search, ShoppingCart, User, Info, Phone } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useState, useRef, useEffect } from 'react'
import Logo from '../../assets/Logo.webp'
import useCartStore from '@/store/useCart'
import useAuthStore from '@/store/useAuthStore'

export default function Header() {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)
  const totalQuantity = useCartStore((state) =>
    state.cartItems.reduce((sum, item) => sum + item.quantity, 0)
  )
  const { user, logout } = useAuthStore()
const navigate = useNavigate();
  // Click ngoài dropdown để đóng
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <header className="fixed top-0 left-0 right-0 z-30 bg-white border-b shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <div className="w-10 h-10 rounded-lg overflow-hidden border">
              <img src={Logo} alt="Ant_Store Logo" className="w-full h-full object-cover" />
            </div>
            <span className="font-bold text-xl">ANT_STORE</span>
          </Link>

          {/* Search */}
          <div className="flex-1 mx-4 max-w-md">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Tìm kiếm sản phẩm..."
                className="pl-10 pr-4 w-full border rounded-lg h-10 focus:outline-none focus:ring-2 focus:ring-violet-600"
              />
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex items-center gap-6">
            <Link
              to="/about"
              className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-red-600 transition-colors"
            >
              <Info className="w-4 h-4" />
              Giới thiệu
            </Link>
            <Link
              to="/contact"
              className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-red-600 transition-colors"
            >
              <Phone className="w-4 h-4" />
              Liên hệ
            </Link>
          </nav>

          {/* User & Cart */}
          <div className="flex items-center gap-3">
            {user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(prev => !prev)}
                  className="w-8 h-8 rounded-full bg-violet-600 text-white flex items-center justify-center font-bold"
                >
                  {user.username?.[0].toUpperCase() || user.email[0].toUpperCase()}
                </button>

                {/* Dropdown */}
                <div
                  className={`absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg overflow-hidden z-20 transition-all duration-200 transform origin-top ${dropdownOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none'
                    }`}
                >
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Hồ sơ
                  </Link>
                  <button
                    onClick={() => {
                      logout()
                      navigate('/login')
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Đăng xuất
                  </button>
                </div>
              </div>
            ) : (
              <Link
                to="/login"
                className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-violet-600"
              >
                <User className="w-4 h-4" />
                Đăng nhập
              </Link>
            )}

            <Link to="/cart" className="relative">
              <ShoppingCart className="w-5 h-5 text-gray-700" />
              <span className="absolute -top-2 -right-2 h-5 w-5 text-xs flex items-center justify-center rounded-full bg-red-500 text-white">
                {totalQuantity}
              </span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
