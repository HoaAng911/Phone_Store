
import { useEffect, useState } from 'react';
import { MapPin, Plus } from 'lucide-react';
import useAuthStore from '@/features/auth/store/useAuthStore';
import useAddressStore from '@/store/useAddressStore';
import AddressCard from '../ui/AddressCard';
import AddressModal from '../ui/AddressModal';
import toast from 'react-hot-toast';

export default function AddressesTab() {
  const { user } = useAuthStore();
  const userId = user?.id || user?._id;

  const addresses = useAddressStore(state => state.addresses);
  const loading = useAddressStore(state => state.loading);
  const fetchAddresses = useAddressStore(state => state.fetchAddresses);
  const deleteAddress = useAddressStore(state => state.deleteAddress);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);

  useEffect(() => {
    if (userId) fetchAddresses(userId);
  }, [userId, fetchAddresses]);


  const openModal = (addr = null) => {
    setEditingAddress(addr);
    setIsModalOpen(true);
  };

 
  const closeModal = () => {
    setIsModalOpen(false);
    setEditingAddress(null);
  };

 
  const handleSuccess = () => {
    closeModal();
    fetchAddresses(userId);
    toast.success(editingAddress ? 'Cập nhật địa chỉ thành công!' : 'Thêm địa chỉ thành công!');
  };

  
  const handleDelete = async (id) => {
    if (!window.confirm('Xóa địa chỉ này thật chứ?')) return;
    try {
      await deleteAddress(id, userId);
      toast.success('Đã xóa địa chỉ!');
    } catch {
      toast.error('Xóa thất bại!');
    }
  };

  if (loading) {
    return <div className="py-20 text-center text-gray-500">Đang tải địa chỉ...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Địa chỉ của tôi</h2>
        <button
          onClick={() => openModal()}  // Mở modal thêm mới
          className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-[5px] hover:bg-blue-800 transition"
        >
          <Plus className="w-5 h-5" />
          Thêm địa chỉ mới
        </button>
      </div>

      {/* Danh sách địa chỉ */}
      {addresses.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl shadow-sm">
          <MapPin className="w-16 h-16 mx-auto text-gray-300 mb-4" />
          <p className="text-gray-500 mb-6">Chưa có địa chỉ nào</p>
          <button
            onClick={() => openModal()}  // Mở modal thêm đầu tiên
            className="bg-violet-600 text-white px-6 py-3 rounded-lg hover:bg-violet-700 transition"
          >
            Thêm địa chỉ đầu tiên
          </button>
        </div>
      ) : (
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {addresses.map((addr) => (
            <AddressCard
              key={addr.id} 
              address={addr}
              onEdit={() => openModal(addr)}  
              onDelete={() => handleDelete(addr.id)}  
            />
          ))}
        </div>
      )}

      {/* Modal thêm/sửa */}
      <AddressModal
        isOpen={isModalOpen}
        onClose={closeModal}
        address={editingAddress}
        userId={userId}
        onSuccess={handleSuccess}
      />
    </div>
  );
}