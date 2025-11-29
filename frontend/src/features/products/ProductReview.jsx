
import React, { useEffect, useState } from "react";
import { Star, CheckCircle } from "lucide-react";
import { useReviewStore } from '@/store';
import useAuthStore from "../auth/store/useAuthStore";

export default function ProductReview({ productId, rating, reviewCount }) {
  const ratingNumber = parseFloat(rating) || 0;
  const maxStars = 5;

  const { reviews, fetchReviews, createReview } = useReviewStore();
  const { user: currentUser } = useAuthStore();

  const [activeTab, setActiveTab] = useState("all");
  const [userRating, setUserRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (productId) fetchReviews(productId);
  }, [productId, fetchReviews]);

  const calculateBreakdown = () => {
    return [5, 4, 3, 2, 1].map(star => {
      const count = reviews.filter(r => r.rating === star).length;
      const percent = reviewCount > 0 ? (count / reviewCount) * 100 : 0;
      return { star, count, percent };
    });
  };

  const getFilteredReviews = () => {
    if (activeTab === "all") return reviews;
    if (activeTab === "images") return reviews.filter(r => r.images?.length > 0);
    const num = parseInt(activeTab);
    return reviews.filter(r => r.rating === num);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!currentUser) return alert("Bạn phải đăng nhập để gửi đánh giá!");
    if (userRating < 1) return alert("Vui lòng chọn số sao!");
    if (!comment.trim()) return alert("Vui lòng nhập nội dung đánh giá!");

    try {
      setSubmitting(true);
      await createReview({ productId, rating: userRating, comment: comment.trim() });
      setUserRating(0);
      setComment("");
      setShowForm(false);
      await fetchReviews(productId);
      alert("Gửi đánh giá thành công!");
    } catch (err) {
      alert("Có lỗi xảy ra. Vui lòng thử lại!");
    } finally {
      setSubmitting(false);
    }
  };

  const breakdown = calculateBreakdown();
  const filteredReviews = getFilteredReviews();
  const ratingLabels = ["Rất tệ", "Tệ", "Bình thường", "Tốt", "Rất tốt"];

  return (
    <div className="max-w-5xl mx-auto py-12 px-4">
      {/* Tiêu đề */}
      <h2 className="text-2xl font-semibold text-gray-900 mb-10">Đánh giá từ khách hàng</h2>

      {/* Tổng quan đánh giá */}
      <div className="grid md:grid-cols-3 gap-12 mb-12">
        {/* Điểm trung bình */}
        <div className="text-center">
          <div className="text-5xl font-bold text-gray-900 mb-3">
            {ratingNumber.toFixed(1)}
            <span className="text-2xl font-normal text-gray-500"> / 5</span>
          </div>
          <div className="flex justify-center gap-1 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-7 h-7 ${i < Math.round(ratingNumber)
                  ? "fill-amber-400 text-amber-400"
                  : "text-gray-300"
                  }`}
              />
            ))}
          </div>
          <p className="text-gray-600">{reviewCount.toLocaleString()} đánh giá</p>
        </div>

        {/* Phân bố sao */}
        <div className="md:col-span-2 space-y-3">
          {breakdown.map(({ star, count, percent }) => (
            <div key={star} className="flex items-center gap-4">
              <div className="flex items-center gap-2 w-20">
                <span className="text-sm font-medium text-gray-700">{star}</span>
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              </div>
              <div className="flex-1 bg-gray-200 rounded-full h-2 overflow-hidden">
                <div
                  className="h-full bg-amber-400 transition-all duration-700"
                  style={{ width: `${percent}%` }}
                />
              </div>
              <span className="text-sm text-gray-600 w-12 text-right">{count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs lọc */}
      <div className="flex flex-wrap gap-4  mb-10">
        <button
          onClick={() => setActiveTab("all")}
          className={`px-5 py-2.5 text-sm font-medium rounded-lg transition-colors ${activeTab === "all"
            ? "bg-gray-900 text-white"
            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
        >
          Tất cả ({reviewCount})
        </button>
        {[5, 4, 3, 2, 1].map(star => {
          const count = reviews.filter(r => r.rating === star).length;
          return (
            <button
              key={star}
              onClick={() => setActiveTab(star)}
              className={`px-5 py-2.5 text-sm font-medium rounded-lg transition-colors flex items-center gap-1.5 ${activeTab === star
                ? "bg-gray-900 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
            >
              {star} <Star className="w-3.5 h-3.5 fill-current" /> ({count})
            </button>
          );
        })}
      </div>

      {/* Danh sách đánh giá */}
      <div className="space-y-8 pb-12 border-b border-gray-200">
        {filteredReviews.length > 0 ? (
          filteredReviews.map(review => (
            <div key={review.id} className="flex gap-5">
              <div className="w-11 h-11 rounded-full bg-gray-800 flex items-center justify-center text-white font-semibold text-lg flex-shrink-0">
                {(review.user?.username || review.user?.name || "K")[0].toUpperCase()}
              </div>

              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="font-semibold text-gray-900 mb-1">
                      {review.user?.username || review.user?.name || "Khách hàng"}
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${i < review.rating ? "fill-amber-400 text-amber-400" : "text-gray-300"
                              }`}
                          />
                        ))}
                      </div>
                      <span className="text-gray-500">
                        {review.createdAt ? new Date(review.createdAt).toLocaleDateString('vi-VN') : ''}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                        <CheckCircle className="w-3 h-3" />
                        Đã mua hàng
                      </span>
                    </div>
                  </div>
                </div>

                <p className="mt-3 text-gray-700 leading-relaxed">
                  {review.comment}
                </p>

                {review.images?.length > 0 && (
                  <div className="flex gap-3 mt-4">
                    {review.images.map((img, i) => (
                      <img
                        key={i}
                        src={img}
                        alt={`Ảnh đánh giá ${i + 1}`}
                        className="w-24 h-24 object-cover rounded-lg border border-gray-200 hover:border-gray-400 transition-colors cursor-pointer"
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-20 text-gray-500">
            <Star className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <p className="text-lg">
              {activeTab === "all"
                ? "Chưa có đánh giá nào cho sản phẩm này."
                : "Không tìm thấy đánh giá phù hợp với bộ lọc."}
            </p>
            {activeTab === "all" && (
              <p className="mt-2 text-sm">Hãy là người đầu tiên chia sẻ trải nghiệm của bạn!</p>
            )}
          </div>
        )}
      </div>

      {/* Form viết đánh giá */}
      {currentUser ? (
        !showForm ? (
          <button
            onClick={() => setShowForm(true)}
            className="mt-10 w-full md:w-auto px-8 py-4 bg-gray-900 text-white font-medium rounded-xl hover:bg-gray-800 transition-colors"
          >
            Viết đánh giá
          </button>
        ) : (
          <div className="mt-10 bg-gray-50 rounded-2xl p-8 border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Chia sẻ trải nghiệm của bạn</h3>

            {/* Chọn sao */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-700 mb-4">
                Bạn đánh giá sản phẩm này bao nhiêu sao?
              </label>
              <div className="flex items-center gap-4">
                {[...Array(5)].map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setUserRating(i + 1)}
                    onMouseEnter={() => setHoverRating(i + 1)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="transition-transform hover:scale-110"
                  >
                    <Star
                      className={`w-12 h-12 ${i < (hoverRating || userRating)
                        ? "fill-amber-400 text-amber-400 drop-shadow-md"
                        : "text-gray-300"
                        }`}
                    />
                  </button>
                ))}
                {userRating > 0 && (
                  <span className="ml-4 text-lg font-medium text-gray-700">
                    {ratingLabels[userRating - 1]}
                  </span>
                )}
              </div>
            </div>

            {/* Nội dung */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Viết nhận xét của bạn
              </label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Cảm nhận của bạn về sản phẩm này là gì? Chất lượng, đóng gói, giao hàng..."
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none transition-all resize-none"
                rows={5}
              />
            </div>

            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setUserRating(0);
                  setComment("");
                }}
                className="px-6 py-3 border border-gray-300 rounded-xl font-medium hover:bg-gray-100 transition-colors"
              >
                Hủy
              </button>
              <button
                type="submit"
                onClick={handleSubmit}
                disabled={submitting || userRating === 0 || !comment.trim()}
                className="px-8 py-3 bg-gray-900 text-white font-medium rounded-xl hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
              >
                {submitting ? "Đang gửi..." : "Gửi đánh giá"}
              </button>
            </div>
          </div>
        )
      ) : (
        <div className="mt-10 text-center py-8 bg-gray-50 rounded-2xl border border-dashed border-gray-300">
          <p className="text-gray-700 font-medium">
            Đăng nhập để viết đánh giá và giúp cộng đồng mua sắm tốt hơn
          </p>
        </div>
      )}
    </div>
  );
}