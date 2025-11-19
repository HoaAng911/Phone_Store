import React, { useEffect, useState } from "react";
import { Star } from "lucide-react";
import useReviewStore from "../../../store/useReviewStore"; 
import useAuthStore from "../../../store/useAuthStore";

export default function ProductReview({ productId, rating, reviewCount }) {
  const ratingNumber = parseFloat(rating) || 0;
  const maxStars = 5;

  // Zustand stores
  const { reviews, fetchReviews, createReview } = useReviewStore();
  const { user: currentUser } = useAuthStore();

  // Local state cho form
  const [userRating, setUserRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (productId) fetchReviews(productId); 
  }, [productId, fetchReviews]);

 const handleSubmit = async (e) => {
  e.preventDefault();

  if (!currentUser) return alert("Bạn phải đăng nhập để gửi review!");
  if (!userRating || userRating < 1 || userRating > 5)
    return alert("Vui lòng chọn số sao hợp lệ (1-5)!");
  if (!productId) return alert("Không tìm thấy sản phẩm");

  try {
    setSubmitting(true);
console.log("Submitting comment:", comment);
    await createReview({
      productId,
      rating: Number(userRating),
       comment: comment || "", 
    });

    // reset form
    setUserRating(0);
    setComment("");

    // reload review
    await fetchReviews(productId);
  } catch (err) {
    console.error(err);
    alert("Lỗi khi gửi đánh giá.");
  } finally {
    setSubmitting(false);
  }
};



  return (
    <div className="border-t border-gray-200 pt-6 mt-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Đánh giá sản phẩm</h2>

      {/* Tổng quan đánh giá */}
      <div className="flex items-center gap-4 mb-6">
        <div className="flex items-center gap-1">
          {[...Array(maxStars)].map((_, i) => (
            <Star
              key={i}
              className={`w-5 h-5 ${i < Math.floor(ratingNumber) ? "fill-yellow-500 text-yellow-500" : "text-gray-300"}`}
            />
          ))}
        </div>
        <span className="text-gray-700 font-medium">{ratingNumber.toFixed(1)} / {maxStars}</span>
        <span className="text-gray-500">({reviewCount} đánh giá)</span>
      </div>

      {/* Hiển thị review chi tiết */}
      {reviewCount > 0 ? (
        <div className="space-y-4 mb-6">
          {reviews.map((rev) => (
            <div key={rev.id} className="border-b border-gray-200 pb-4">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-semibold">{rev.user?.username || "Người dùng"}</span>
                <div className="flex items-center gap-1">
                  {[...Array(maxStars)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < rev.rating ? "fill-yellow-500 text-yellow-500" : "text-gray-300"}`}
                    />
                  ))}
                </div>
              </div>
              <p className="text-gray-700">{rev.comment}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 mb-6">Sản phẩm chưa có đánh giá nào. Hãy là người đầu tiên đánh giá!</p>
      )}

      {/* Form gửi review */}
      {currentUser && (
        <form onSubmit={handleSubmit} className="border-t border-gray-200 pt-4 space-y-4">
          <h3 className="text-lg font-medium">Gửi đánh giá của bạn</h3>

          {/* Chọn số sao */}
          <div className="flex items-center gap-2">
            {[...Array(maxStars)].map((_, i) => (
              <Star
                key={i}
                className={`w-6 h-6 cursor-pointer ${i < userRating ? "fill-yellow-500 text-yellow-500" : "text-gray-300"}`}
                onClick={() => setUserRating(i + 1)}
              />
            ))}
          </div>

          {/* Nhập comment */}
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Viết đánh giá của bạn..."
            className="w-full border border-gray-300 rounded p-2"
            rows={3}
          />

          <button
            type="submit"
            disabled={submitting}
            className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
          >
            {submitting ? "Đang gửi..." : "Gửi đánh giá"}
          </button>
        </form>
      )}

      {!currentUser && (
        <p className="text-gray-500 mt-4">Bạn cần đăng nhập để gửi đánh giá.</p>
      )}
    </div>
  );
}
