// src/components/ui/LoadingSpinner.jsx
export default function LoadingSpinner({ size = 'md' }) {
  const sizeClasses = {
    sm: 'w-6 h-6 border-2',
    md: 'w-8 h-8 border-3',
    lg: 'w-12 h-12 border-4'
  };

  return (
    <div className="flex items-center justify-center">
      <div className={`${sizeClasses[size]} border-violet-600 rounded-full animate-spin border-t-transparent`}></div>
    </div>
  );
}