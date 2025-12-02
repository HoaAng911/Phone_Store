// src/components/profile/ui/ReviewCard.jsx
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import { Star, Edit2, Trash2 } from 'lucide-react';

export default function ReviewCard({ review, onDelete }) {
  return (
    <div className="bg-white rounded-lg p-5 border border-gray-200 hover:border-blue-300 hover:shadow-md transition">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="font-semibold text-base text-gray-800 mb-1">
            {review.product?.name || 'Sản phẩm'}
          </h3>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < review.rating 
                      ? 'fill-amber-400 text-amber-400' 
                      : 'fill-gray-200 text-gray-200'
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-gray-400">
              {format(new Date(review.createdAt), 'dd/MM/yyyy', { locale: vi })}
            </span>
          </div>
        </div>
      </div>

      {review.comment && (
        <p className="text-sm text-gray-600 leading-relaxed mb-4 bg-gray-50 p-3 rounded-md">
          {review.comment}
        </p>
      )}

      <div className="flex gap-2">
        <button className="flex items-center gap-1.5 px-4 py-2 text-sm text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-md font-medium transition">
          <Edit2 className="w-4 h-4" />
          Sửa
        </button>
        <button
          onClick={() => onDelete(review.id)}
          className="flex items-center gap-1.5 px-4 py-2 text-sm text-red-600 bg-red-50 hover:bg-red-100 rounded-md font-medium transition"
        >
          <Trash2 className="w-4 h-4" />
          Xóa
        </button>
      </div>
    </div>
  );
}