// pages/ArticleListPage.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useArticleStore } from '@/store';
import { format } from "date-fns";

export default function ArticleListPage() {
  const {
    articles,
    loading,
    page,
    totalPage,
    limit,
    fetchArticles,
    setPage,
  } = useArticleStore();

  const [searchTerm, setSearchTerm] = useState("");

  // Gọi lần đầu
  useEffect(() => {
    fetchArticles(1, 12);
  }, []);


  useEffect(() => {
    if (searchTerm) {

      return;
    }
    fetchArticles(page, 12);
  }, [page]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPage) {
      setPage(newPage);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Nếu đang loading lần đầu
  if (loading && articles.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          Tin tức công nghệ
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Cập nhật đánh giá sản phẩm, tin tức nóng hổi, mẹo hay mỗi ngày
        </p>
      </div>

      {/* Search Bar */}
      <div className="max-w-2xl mx-auto mb-10">
        <input
          type="text"
          placeholder="Tìm kiếm bài viết... (VD: iPhone 17, laptop gaming)"
          className="w-full px-6 py-4 rounded-xl border border-gray-300 focus:border-blue-500 focus:outline-none text-lg shadow-md"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Danh sách bài viết */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {articles.map((article) => (
          <Link
            to={`/tin-tuc/${article.slug}`}
            key={article.id}
            className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-3"
          >
            <div className="relative">
              <img
                src={article.thumbnail || "/placeholder.jpg"}
                alt={article.title}
                className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                MỚI
              </div>
            </div>

            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 line-clamp-2 mb-3">
                {article.title}
              </h2>

              <p className="text-gray-600 line-clamp-3 mb-4">
                {article.summary}
              </p>

              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>{format(new Date(article.createdAt), "dd/MM/yyyy")}</span>
                <span className="flex items-center gap-1">
                  <svg className="w-w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  {article.viewCount} lượt xem
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Phân trang */}
      {totalPage > 1 && (
        <div className="flex justify-center items-center gap-3 mt-10">
          <button
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
            className="px-5 py-3 rounded-lg bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 transition">
            Trước
          </button>

          <div className="flex gap-2">
            {[...Array(totalPage)].map((_, i) => (
              <button
                key={i + 1}
                onClick={() => handlePageChange(i + 1)}
                className={`px-4 py-2 rounded-lg transition ${page === i + 1
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
                  }`}
              >
                {i + 1}
              </button>
            ))}
          </div>

          <button
            onClick={() => handlePageChange(page + 1)}
            disabled={page === totalPage}
            className="px-5 py-3 rounded-lg bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 transition">
            Sau
          </button>
        </div>
      )}

      {/* Nếu không có bài nào */}
      {articles.length === 0 && !loading && (
        <div className="text-center py-20">
          <p className="text-2xl text-gray-500">Chưa có bài viết nào</p>
        </div>
      )}
    </div>
  );
}