// src/components/profile/ProfileHeader.jsx
import { User, Mail, Phone, Shield, Package, Star } from 'lucide-react';

export default function ProfileHeader({ user }) {
  return (
    <div className="bg-gradient-to-br from-blue-50 via-white to-purple-50 border-b border-gray-200">
      <div className="container max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">

          {/* Avatar tròn đơn giản hơn */}
          <div className="relative">
            <div className="w-32 h-32 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 p-1 shadow-lg">
              <div className="w-full h-full rounded-full bg-white flex items-center justify-center text-5xl font-bold text-blue-600">
                {user.username?.[0]?.toUpperCase() || user.email[0].toUpperCase()}
              </div>
            </div>

            {/* Badge role */}
            <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-2 shadow-md border-2 border-white">
              {user.role === 'admin' ? (
                <Shield className="w-6 h-6 text-red-500" />
              ) : (
                <User className="w-6 h-6 text-blue-600" />
              )}
            </div>
          </div>

          {/* Thông tin người dùng */}
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-3xl font-bold text-gray-800 mb-3">
              {user.username || 'Người dùng'}
            </h1>

            <div className="flex flex-wrap gap-4 justify-center md:justify-start text-gray-600 mb-4 text-sm">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-500" />
                <span>{user.email}</span>
              </div>
              {user.phoneNumber && (
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-green-500" />
                  <span>{user.phoneNumber}</span>
                </div>
              )}
            </div>

            {/* Role badge đơn giản */}
            <span className={`inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium ${user.role === 'admin'
              ? 'bg-red-100 text-red-700'
              : 'bg-blue-100 text-blue-700'
              }`}>
              {user.role === 'admin' ? '👑 Quản trị viên' : '⭐ Thành viên'}
            </span>
          </div>

          {/* Stats – thiết kế đơn giản, dễ nhìn */}
          <div className="flex gap-4">
            <div className="bg-white rounded-xl px-6 py-4 text-center shadow-sm border border-gray-100 min-w-[110px]">
              <div className="flex justify-center mb-1">
                <Package className="w-7 h-7 text-blue-500" />
              </div>
              <div className="text-2xl font-bold text-gray-800">{user.orders?.length || 0}</div>
              <div className="text-xs text-gray-500 mt-0.5">Đơn hàng</div>
            </div>

            <div className="bg-white rounded-xl px-6 py-4 text-center shadow-sm border border-gray-100 min-w-[110px]">
              <div className="flex justify-center mb-1">
                <Star className="w-7 h-7 text-amber-500" />
              </div>
              <div className="text-2xl font-bold text-gray-800">{user.reviews?.length || 0}</div>
              <div className="text-xs text-gray-500 mt-0.5">Đánh giá</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}