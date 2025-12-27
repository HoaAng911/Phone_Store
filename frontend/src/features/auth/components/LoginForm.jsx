// components/Auth/LoginForm.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../../auth/store/useAuthStore';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebookF } from 'react-icons/fa';

export default function LoginForm() {
  const [form, setForm] = useState({ email: '', password: '' });
  const { login, loading, error } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await login(form.email, form.password);
      if (user.role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/profile');
      }
    } catch (err) {
      // error đã được xử lý trong store
    }
  };

  const handleSocialLogin = (provider) => {
    // TODO: Xử lý OAuth với Google/Facebook
    console.log(`Đăng nhập bằng ${provider}`);
  };

  const handleForgotPassword = () => {
    // TODO: Chuyển đến trang quên mật khẩu
    navigate('/forgot-password');
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm">
        {/* Title */}
        <h1 className="text-2xl font-bold text-gray-900 uppercase text-center mb-8">ĐĂNG NHẬP</h1>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm mb-6 text-center">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tên đăng nhập *
            </label>
            <input
              type="text"
              placeholder="Tên đăng nhập"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Mật khẩu *
            </label>
            <input
              type="password"
              placeholder="Mật khẩu"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-transparent"
              required
            />
          </div>

          <div className="flex space-x-2">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-black text-white font-semibold py-2 rounded-md transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                </svg>
                  <span>Đang đăng nhập...</span>
                </>
              ) : (
                <span>Đăng nhập</span>
              )}
            </button>
            <button
              type="button"
              onClick={handleForgotPassword}
              className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 font-medium whitespace-nowrap"
            >
              Quên mật khẩu?
            </button>
          </div>
        </form>

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="px-3 bg-white text-sm text-gray-500 uppercase">HOẶC</span>
          </div>
        </div>

        {/* Social Login */}
        <div className="flex space-x-3">
          <button
            onClick={() => handleSocialLogin('Facebook')}
            className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
          >
            <FaFacebookF className="w-5 h-5 text-blue-600" />
            <span className="text-sm font-medium text-gray-700">Facebook</span>
          </button>
          <button
            onClick={() => handleSocialLogin('Google')}
            className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
          >
            <FcGoogle className="w-5 h-5" />
            <span className="text-sm font-medium text-gray-700">Google</span>
          </button>
        </div>
        {/* Register link */}
        <p className="mt-4 text-center text-sm text-gray-600">
          Chưa có tài khoản?{' '}
          <button
            type="button"
            onClick={() => navigate('/register')}
            className="font-semibold text-blue-600 hover:text-blue-700 underline"
          >
            Đăng ký ngay
          </button>
        </p>
      </div>
    </div>
  );
}