import React, { useState } from 'react';
import { Upload, X } from 'lucide-react';
import useProductStore from '../store/productStore';

const AddProductForm = () => {
  const { UploadImage, createProduct } = useProductStore();

  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    brand: '',
    stock: '',
  });

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const allowdTypes = [
        'image/jpeg',
        'image/jpg',
        'image/png',
        'image/webp',
        'image/gif',]
        if(!allowdTypes.includes(selectedFile.type)){
          alert('Chỉ chấp nhận file ảnh JPG, PNG, WebP, GIF');
        e.target.value = ''; // Reset input
        return;
        }
        if(selectedFile.size>5*1024*1024){
           alert('Kích thước file không được vượt quá 5MB');
        e.target.value = '';
        return;
        }
      setFile(selectedFile);

      const previewUrl = URL.createObjectURL(selectedFile);
      setPreview(previewUrl);
    }
  };

  const handleRemoveImage = () => {
    setFile(null);
    setPreview(null);
    // Reset input file
    const fileInput = document.getElementById('file-upload');
    if (fileInput) fileInput.value = '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.price || !form.brand) {
      alert('Vui lòng điền đầy đủ thông tin bắt buộc');
      return;
    }

    setLoading(true);

    try {

      let images = [];
      if (file) {
        const uploadRes = await UploadImage(file);
        if (uploadRes?.url) {
          images.push({ url: uploadRes.url });
        }
      }


      const productData = {
        name: form.name,
        description: form.description,
        price: Number(form.price),
        brand: form.brand,
        stock: form.stock ? Number(form.stock) : 0,
        images,
      };

      const newProduct = await createProduct(productData);

      console.log('New product created:', newProduct);

      alert('Thêm sản phẩm thành công');

      // Reset form
      setForm({ name: '', description: '', price: '', brand: '', stock: '' });
      setFile(null);
      setPreview(null);

      const fileInput = document.getElementById('file-upload');
      if (fileInput) fileInput.value = '';

    } catch (error) {
      console.error('Lỗi khi tạo sản phẩm:', error);
      alert('Có lỗi xảy ra khi thêm sản phẩm');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Thêm Sản Phẩm Mới</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Thông tin cơ bản */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tên sản phẩm <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Nhập tên sản phẩm"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Thương hiệu <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Nhập thương hiệu"
              value={form.brand}
              onChange={(e) => setForm({ ...form, brand: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              required
            />
          </div>
        </div>

        {/* Mô tả */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Mô tả
          </label>
          <textarea
            placeholder="Nhập mô tả sản phẩm"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
            rows="3"
          />
        </div>

        {/* Giá và tồn kho */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Giá sản phẩm (VNĐ) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              placeholder="0"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              required
              min="0"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tồn kho
            </label>
            <input
              type="number"
              placeholder="0"
              value={form.stock}
              onChange={(e) => setForm({ ...form, stock: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              min="0"
            />
          </div>
        </div>

        {/* Upload ảnh */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Hình ảnh sản phẩm
          </label>

          <div className="flex items-start gap-4">
            {/* Ô upload */}
            <div className="relative">
              <input
                type="file"
                id="file-upload"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
              <label
                htmlFor="file-upload"
                className="flex flex-col items-center justify-center w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-colors"
              >
                {preview ? (
                  <div className="relative w-full h-full">
                    <img
                      src={preview}
                      alt="Preview"
                      className="w-full h-full object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        handleRemoveImage();
                      }}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ) : (
                  <>
                    <Upload className="w-8 h-8 text-gray-400 mb-2" />
                    <span className="text-xs text-gray-500 text-center px-2">
                      Chọn ảnh
                    </span>
                  </>
                )}
              </label>
            </div>

            {/* Hướng dẫn */}
            {!preview && (
              <div className="text-sm text-gray-500">
                <p className="mb-1">• Định dạng: JPG, PNG</p>
                <p className="mb-1">• Kích thước tối đa: 5MB</p>
                <p>• Tỷ lệ khuyến nghị: 1:1</p>
              </div>
            )}
          </div>
        </div>

        {/* Nút submit */}
        <div className="flex justify-end gap-3 pt-4 border-t">
          <button
            type="button"
            onClick={() => {
              setForm({ name: '', description: '', price: '', brand: '', stock: '' });
              handleRemoveImage();
            }}
            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            disabled={loading}
          >
            Hủy
          </button>
          <button
            type="submit"
            disabled={loading}
            className={`px-6 py-2 bg-blue-500 text-white rounded-lg font-medium transition-colors ${loading
                ? 'opacity-50 cursor-not-allowed'
                : 'hover:bg-blue-600'
              }`}
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Đang thêm...
              </span>
            ) : (
              'Thêm sản phẩm'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProductForm;