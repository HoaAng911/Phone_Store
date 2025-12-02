// src/components/profile/ui/AddressModal.jsx (hoặc modals/)
import { useState, useEffect } from 'react';
import { X, MapPin } from 'lucide-react';
import useAddressStore from '@/store/useAddressStore';
import toast from 'react-hot-toast';

export default function AddressModal({ isOpen, onClose, address, userId, onSuccess }) {
  const { createAddress, updateAddress } = useAddressStore();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    fullName: '',
    phone: '',
    street: '',
    ward: '',
    district: '',
    city: '',
    country: 'Việt Nam',
    postalCode: '',
    isDefault: false,
  });

  useEffect(() => {
    if (address) {
      setForm({
        fullName: address.fullName || '',
        phone: address.phone || '',
        street: address.street || '',
        ward: address.ward || '',
        district: address.district || '',
        city: address.city || '',
        country: address.country || 'Việt Nam',
        postalCode: address.postalCode || '',
        isDefault: !!address.isDefault,
      });
    } else {
      setForm({
        fullName: '',
        phone: '',
        street: '',
        ward: '',
        district: '',
        city: '',
        country: 'Việt Nam',
        postalCode: '',
        isDefault: false,
      });
    }
  }, [address, isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (address) {
        await updateAddress(address.id, userId, form);
        toast.success('Cập nhật địa chỉ thành công!');
      } else {
        await createAddress(userId, form);
        toast.success('Thêm địa chỉ thành công!');
      }
      onSuccess();
    } catch (err) {
      toast.error('Lưu thất bại, vui lòng thử lại!');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        {/* Header - kiểu Shopee mới */}
        <div className="flex items-center justify-between p-5 bg-gradient-to-r from-violet-600 to-purple-600 text-white">
          <h2 className="text-xl font-bold flex items-center gap-3">
            <MapPin className="w-6 h-6" />
            {address ? 'Sửa địa chỉ giao hàng' : 'Thêm địa chỉ mới'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-lg transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <input
              required
              type="text"
              placeholder="Họ và tên *"
              value={form.fullName}
              onChange={(e) => setForm({ ...form, fullName: e.target.value })}
              className="px-4 py-3 border border-gray-300 rounded-xl focus:border-violet-500 focus:ring-4 focus:ring-violet-100 transition-all"
            />
            <input
              required
              type="tel"
              placeholder="Số điện thoại *"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="px-4 py-3 border border-gray-300 rounded-xl focus:border-violet-500 focus:ring-4 focus:ring-violet-100 transition-all"
            />
          </div>

          <input
            required
            type="text"
            placeholder="Đường, số nhà, thôn/xóm *"
            value={form.street}
            onChange={(e) => setForm({ ...form, street: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-violet-500 focus:ring-4 focus:ring-violet-100 transition-all"
          />

          <div className="grid grid-cols-3 gap-3">
            <input
              required
              type="text"
              placeholder="Phường/Xã *"
              value={form.ward}
              onChange={(e) => setForm({ ...form, ward: e.target.value })}
              className="px-4 py-3 border border-gray-300 rounded-xl focus:border-violet-500 focus:ring-4 focus:ring-violet-100 transition-all"
            />
            <input
              required
              type="text"
              placeholder="Quận/Huyện *"
              value={form.district}
              onChange={(e) => setForm({ ...form, district: e.target.value })}
              className="px-4 py-3 border border-gray-300 rounded-xl focus:border-violet-500 focus:ring-4 focus:ring-violet-100 transition-all"
            />
            <input
              required
              type="text"
              placeholder="Tỉnh/Thành phố *"
              value={form.city}
              onChange={(e) => setForm({ ...form, city: e.target.value })}
              className="px-4 py-3 border border-gray-300 rounded-xl focus:border-violet-500 focus:ring-4 focus:ring-violet-100 transition-all"
            />
          </div>

          {/* Checkbox mặc định - kiểu Tiki */}
          <label className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition-all">
            <input
              type="checkbox"
              checked={form.isDefault}
              onChange={(e) => setForm({ ...form, isDefault: e.target.checked })}
              className="w-5 h-5 text-violet-600 rounded focus:ring-violet-500"
            />
            <span className="font-medium text-gray-800">
              Đặt làm địa chỉ mặc định
            </span>
          </label>

          {/* Buttons */}
          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-4 border-2 border-gray-300 rounded-xl font-bold text-gray-700 hover:bg-gray-50 transition-all"
            >
              Hủy bỏ
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-4 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-xl font-bold hover:from-violet-700 hover:to-purple-700 disabled:opacity-60 transition-all shadow-lg"
            >
              {loading ? 'Đang lưu...' : address ? 'Cập nhật' : 'Hoàn thành'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}