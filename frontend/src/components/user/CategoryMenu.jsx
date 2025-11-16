'use client';

import { useEffect, useRef, useState } from 'react';
import { Blinds, Loader2, Sparkles } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import useProductStore from '../../store/useProduct';
import { cn } from '@/lib/utils';

export default function CategoryMenu() {
  const { categories, fetchCategories, loading } = useProductStore();
  const [activeCategory, setActiveCategory] = useState(null);
  const hasFetched = useRef(false);

  useEffect(() => {
    if (!hasFetched.current) {
      fetchCategories();
      hasFetched.current = true;
    }
  }, [fetchCategories]);

  // --- Loading ---
  if (loading) {
    return (
      <div className="flex items-center justify-center gap-2 py-6">
        <Loader2 className="h-5 w-5 animate-spin text-green-700" />
        <span className="text-sm font-medium text-muted-foreground">
          Đang tải danh mục...
        </span>
      </div>
    );
  }

  return (
    <div className="space-y-3 mt-3.5 mb-3.5">
      {/* Header */}
      <div className="flex items-center gap-2">
        <div className="relative">
          <Blinds className="h-5 w-5 text-blue-700 animate-pulse" />
          <div className="absolute inset-0 h-5 w-5 animate-pulse rounded-full bg-blue-400 blur-lg opacity-40" />
        </div>
        <h2 className="bg-gradient-to-r text-gray-700 bg-clip-text text-xl font-bold ">
          Danh mục sản phẩm
        </h2>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap gap-2">
        {categories.map((cat, index) => {
          const isActive = activeCategory === cat;
          return (
            <Badge
              key={cat}
              variant={isActive ? 'default' : 'outline'}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                'cursor-pointer px-5 py-2 text-sm font-medium transition-all duration-300',
                'hover:scale-105 hover:shadow-md',
                'animate-in fade-in slide-in-from-bottom-2',
                'duration-500',
                isActive
                  ? 'bg-gradient-to-r from-green-700 to-emerald-600 text-white shadow-md shadow-green-600/30 '
                  : 'hover:from-green-50 hover:to-emerald-50 hover:border-green-300 hover:text-green-700'
              )}
              style={{
                animationDelay: `${index * 70}ms`,
                animationFillMode: 'both',
              }}
            >
              {cat.toUpperCase()}
            </Badge>
          );
        })}
      </div>

      {/* Active Category */}
      {activeCategory && (
        <div
          className={cn(
            'flex items-center gap-2  border border-slate-200 bg-gradient-to-r from-green-50 to-emerald-50 p-2 text-sm',
            'animate-in fade-in slide-in-from-top-1 duration-300'
          )}
        >
          <div className="relative">
            <div className="h-1.5 w-1.5 animate-ping rounded-2xl bg-green-700" />
            <div className="absolute inset-0 h-1.5 w-1.5 rounded-2xl bg-green-700" />
          </div>
          <p className="text-slate-700">
            Đang xem:{' '}
            <span className="font-semibold text-green-700">{activeCategory}</span>
          </p>
        </div>
      )}
    </div>
  );
}