import React from 'react';
import { Upload, X } from 'lucide-react';

const ImageUpload = ({ file, setFile, preview, setPreview }) => {
  const handleFileChange = (e) => {
    const f = e.target.files[0];
    if (!f) return;
    if (!['image/jpeg', 'image/png', 'image/webp', 'image/gif'].includes(f.type)) return alert('Chỉ chấp nhận ảnh JPG, PNG, WebP, GIF');
    if (f.size > 5 * 1024 * 1024) return alert('File quá 5MB');
    setFile(f);
    setPreview(URL.createObjectURL(f));
  };
  const removeImage = () => {
    setFile(null);
    setPreview(null);
    document.getElementById('file-upload').value = '';
  };

  return (
    <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
      <label className="block text-sm font-medium text-gray-600 mb-2">Hình ảnh sản phẩm</label>
      <div className="flex items-start gap-4">
        <div className="relative">
          <input id="file-upload" type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
          <label
            htmlFor="file-upload"
            className="flex flex-col items-center justify-center w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-600 hover:bg-blue-50 transition-all duration-200"
          >
            {preview ? (
              <div className="relative w-full h-full">
                <img src={preview} alt="preview" className="w-full h-full object-contain rounded-lg" />
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-sm hover:bg-red-600 transition-all duration-200"
                >
                  <X size={14} />
                </button>
              </div>
            ) : (
              <>
                <Upload className="w-6 h-6 text-gray-500 mb-1" />
                <span className="text-xs text-gray-500">Chọn ảnh</span>
              </>
            )}
          </label>
        </div>
      </div>
    </div>
  );
};

export default ImageUpload;