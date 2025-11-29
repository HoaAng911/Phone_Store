// pages/ArticleDetail.jsx
import { useParams, Link } from "react-router-dom";
import { useArticleStore } from '@/store';
import { useEffect } from "react";
import { format } from "date-fns";

export default function ArticleDetail() {
  const { slug } = useParams();
  const { article, loading, fetchArticleBySlug } = useArticleStore();

  useEffect(() => {
    fetchArticleBySlug(slug);
  }, [slug, fetchArticleBySlug]);

  if (loading) return <div className="container mx-auto py-20 text-center">Đang tải...</div>;
  if (!article) return <div className="container mx-auto py-20 text-center text-2xl">Không tìm thấy bài viết</div>;

  return (
    <article className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight mb-6">
          {article.title}
        </h1>

        <div className="flex flex-wrap items-center gap-6 text-gray-600">
          <span className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
            </svg>
            Admin
          </span>
          <span>{format(new Date(article.createdAt), "dd 'tháng' MM, yyyy")}</span>
          <span className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            {article.viewCount} lượt xem
          </span>
        </div>
      </div>

      {article.thumbnail && (
        <img
          src={article.thumbnail}
          alt={article.title}
          className="w-full h-96 object-cover rounded-2xl mb-10 shadow-xl"
        />
      )}

      <div
        className="prose prose-lg max-w-none text-gray-700 leading-relaxed"
        dangerouslySetInnerHTML={{ __html: article.content }}
      />

      <div className="mt-16 pt-10 border-t-2 border-gray-200">
        <Link
          to="/tin-tuc"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium"
        >
          ← Quay lại danh sách bài viết
        </Link>
      </div>
    </article>
  );
}