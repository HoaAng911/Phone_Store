// ImageUpload.jsx
import React from 'react';

const ImageUpload = ({ file, setFile, preview, setPreview }) => {
  const handleChange = (e) => {
    const f = e.target.files[0];
    if (!f) return;

    if (!f.type.startsWith('image/')) {
      alert('Chỉ chấp nhận file ảnh');
      return;
    }
    if (f.size > 5 * 1024 * 1024) {
      alert('File không quá 5MB');
      return;
    }

    setFile(f);
    setPreview(URL.createObjectURL(f));
  };

  const remove = () => {
    setFile(null);
    setPreview(null);
  };

  return (
    <div className="border p-4 rounded bg-gray-50">
      <label className="block text-sm font-medium mb-2">Hình ảnh sản phẩm <span className="text-red-500">*</span></label>
      <div className="flex items-center gap-4">
        <input type="file" accept="image/*" onChange={handleChange} className="flex-1" />
        {preview && (
          <div className="relative">
            <img src={preview} alt="Preview" className="w-20 h-20 object-cover rounded border" />
            <button onClick={remove} className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 text-xs">×</button>
          </div>
        )}
      </div>
      {file && <p className="text-xs text-gray-600 mt-1">{file.name} ({(file.size / 1024 / 1024).toFixed(2)}MB)</p>}
    </div>
  );
};

export default ImageUpload;