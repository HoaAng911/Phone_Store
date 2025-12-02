// src/components/profile/tabs/ReviewsTab.jsx
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import { Star, Edit2, Trash2 } from 'lucide-react';
import { useReviewStore } from '@/store';
import { useState } from 'react';
import ReviewCard from '../ui/ReviewCard';

// Tạo nhanh EmptyState đẹp ngay tại đây
const EmptyState = ({ icon: Icon, text }) => (
  <div className="text-center py-16 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
    <div className="w-20 h-20 mx-auto mb-5 bg-gray-200 rounded-full flex items-center justify-center">
      <Icon className="w-10 h-10 text-gray-400" />
    </div>
    <p className="text-lg text-gray-600 font-medium">{text}</p>
    <p className="text-sm text-gray-500 mt-2">Khi bạn đánh giá sản phẩm, nó sẽ xuất hiện ở đây</p>
  </div>
);

export default function ReviewsTab({ reviews: initialReviews = [] }) {
  const { deleteReviews } = useReviewStore();
  const [reviews, setReviews] = useState(initialReviews);

  const handleDelete = (id) => {
    if (!confirm('Bạn có chắc muốn xóa đánh giá này không?')) return;
    deleteReviews(id);
    setReviews(prev => prev.filter(r => r.id !== id));
  };

  if (reviews.length === 0) {
    return <EmptyState icon={Star} text="Chưa có đánh giá nào" />;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Đánh giá của tôi</h2>
      <div className="space-y-4">
        {reviews.map(review => (
          <ReviewCard key={review.id} review={review} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
}