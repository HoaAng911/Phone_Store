// src/components/user/Header.jsx
import { Search, ShoppingCart, User, Menu, Info, Phone } from 'lucide-react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Badge } from '../ui/badge'
import { Link } from 'react-router-dom' 
import { useState } from 'react'
import Logo from '../../assets/Logo.webp'

export default function Header() {
  const [mobileMenu, setMobileMenu] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-30 bg-white border-b">
      
      {/* Main Header */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <div className="w-10 h-10 rounded-lg overflow-hidden border">
              <img src={Logo} alt="Ant_Store Logo" className="w-full h-full object-cover" />
            </div>
            <span className="font-bold text-xl hidden sm:block">ANT_STORE</span>
          </Link>

          {/* Search - Desktop */}
          <div className="hidden md:flex flex-1 justify-center mx-4">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Tìm kiếm sản phẩm..."
                className="pl-10 pr-4 w-full"
              />
            </div>
          </div>

          {/* Navigation Links - Desktop */}
          <nav className="hidden lg:flex items-center gap-6 mr-4">
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

          {/* Actions */}
          <div className="flex items-center gap-3 shrink-0">
            <Button asChild variant="ghost" size="sm" className="hidden sm:flex gap-2">
              <Link to="/login">
                <User className="w-4 h-4" />
                Đăng nhập
              </Link>
            </Button>

            <Button asChild variant="ghost" className="relative">
              <Link to="/cart">
                <ShoppingCart className="w-5 h-5" />
                <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center">
                  3
                </Badge>
              </Link>
            </Button>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setMobileMenu(!mobileMenu)}
            >
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenu && (
        <div className="md:hidden border-t bg-white">
          <div className="container mx-auto px-4 py-4 space-y-3">
            <Link to="/about" className="flex items-center gap-3 py-2 text-sm font-medium">
              <Info className="w-5 h-5" />
              Giới thiệu
            </Link>
            <Link to="/contact" className="flex items-center gap-3 py-2 text-sm font-medium">
              <Phone className="w-5 h-5" />
              Liên hệ
            </Link>
            <Link to="/login" className="block py-2 text-sm font-medium">Đăng nhập</Link>
            <div className="py-2">
              <Input placeholder="Tìm kiếm..." className="w-full" />
            </div>
          </div>
        </div>
      )}
    </header>
  )
}