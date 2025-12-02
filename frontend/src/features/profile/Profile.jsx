// src/components/profile/Profile.jsx
import { useEffect, useState } from 'react';
import useAuthStore from '@/features/auth/store/useAuthStore';
import ProfileHeader from './ProfileHeader';
import ProfileTabs from './ProfileTabs';
import ReviewsTab from './tabs/ReviewsTab';
import AddressesTab from './tabs/AddressesTab';
import OrdersTab from './tabs/OrdersTab';

const ALL_TABS = [
  { id: 'overview', label: 'Tổng quan', icon: 'User', enabled: false },
  { id: 'addresses', label: 'Địa chỉ', icon: 'MapPin', enabled: true },
  { id: 'orders', label: 'Đơn hàng', icon: 'Package', enabled: true },
  { id: 'reviews', label: 'Đánh giá', icon: 'Star', enabled: true }, 
];

// Chỉ hiển thị những tab đã bật
const tabs = ALL_TABS.filter(tab => tab.enabled);

export default function Profile() {
  const { user, loading, fetchProfile } = useAuthStore();

  // Tự động chọn tab đầu tiên trong danh sách đã bật
  const [activeTab, setActiveTab] = useState(tabs[0]?.id || 'reviews');

  useEffect(() => {
    if (!user) fetchProfile();
  }, [user, fetchProfile]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-12 h-12 border-4 border-violet-600 rounded-full animate-spin border-t-transparent"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-xl text-gray-500">Vui lòng đăng nhập</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <ProfileHeader user={user} />
      <ProfileTabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      <div className="container max-w-6xl mx-auto px-4 py-8">
        {/* Chỉ render những tab đã có component thật */}
        {activeTab === 'reviews' && <ReviewsTab reviews={user.reviews || []} />}

        {/* Khi nào làm xong tab khác → thêm vào đây và bật enabled: true ở trên */}
        {/* {activeTab === 'overview' && <OverviewTab user={user} />} */}
        {activeTab === 'addresses' && <AddressesTab addresses={user.addresses || []} />} 
        {activeTab === 'orders' && <OrdersTab orders={user.orders || []} />} 

      
      </div>
    </div>
  );
}