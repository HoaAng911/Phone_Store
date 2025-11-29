// components/ArticleSection.jsx
import { Link } from "react-router-dom";
import { useArticleStore } from '@/store';
import { useEffect } from "react";
import { format } from "date-fns";

export default function ArticleSection() {
  const { latestArticles, loading, fetchLatestArticles } = useArticleStore();

  useEffect(() => {
    fetchLatestArticles(6);
  }, [fetchLatestArticles]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-center mb-8">Tin công nghệ 24h</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-gray-300 rounded-lg h-48 mb-4"></div>
              <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-300 rounded w-full"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <section className="container mx-auto px-4 py-8 bg-white">
      <div className="mb-6 pb-3 border-b-2 border-red-600">
        <h2 className="text-2xl font-bold text-gray-900 uppercase">
          Tin công nghệ 24h
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {latestArticles.map((article) => (
          <Link
            to={`/tin-tuc/${article.slug}`}
            key={article.id}
            className="block bg-white border border-gray-200 hover:border-red-600 transition-colors"
          >
            <div className="relative">
              <img
                src={article.thumbnail || "/placeholder.jpg"}
                alt={article.title}
                className="w-full h-48 object-cover"
              />
              <span className="absolute top-2 left-2 bg-red-600 text-white px-2 py-1 text-xs font-semibold">
                HOT
              </span>
            </div>

            <div className="p-4">
              <h3 className="font-bold text-base text-gray-900 hover:text-red-600 line-clamp-2 mb-2">
                {article.title}
              </h3>
              <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                {article.summary}
              </p>

              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>{format(new Date(article.createdAt), "dd/MM/yyyy")}</span>
                <span>{article.viewCount} lượt xem</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="text-center mt-8">
        <Link
          to="/tin-tuc"
          className="inline-block bg-red-600 text-white px-6 py-2 font-semibold hover:bg-red-700 transition text-sm"
        >
          XEM THÊM »
        </Link>
      </div>
    </section>
  );
}