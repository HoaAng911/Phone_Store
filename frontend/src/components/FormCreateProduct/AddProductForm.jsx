// AddProductForm.jsx
import React, { useState } from 'react';
import ImageUpload from './ImageUpload';
import SpecificationSection from './SpecificationSection';

const AddProductForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    brand: '',
    stock: '',
    sku: '',
    category: 'phone',
    originalPrice: '',
    discountPercent: '',
  });

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showSpecs, setShowSpecs] = useState(false);

  const [specification, setSpecification] = useState({
    screenSize: '',
    resolution: '',
    cpu: '',
    ram: '',
    storage: '',
    battery: '',
    os: '',
    camera: '',
    sim: '',
    weight: '',
    colors: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Tự động tính % giảm giá
    if (name === 'originalPrice' || name === 'price') {
      const original = name === 'originalPrice' ? Number(value) : Number(formData.originalPrice);
      const current = name === 'price' ? Number(value) : Number(formData.price);
      if (original > current && current > 0) {
        const discount = Math.round(((original - current) / original) * 100);
        setFormData(prev => ({ ...prev, discountPercent: discount }));
      } else {
        setFormData(prev => ({ ...prev, discountPercent: '' }));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.price || !formData.brand || !formData.sku) {
      alert('Vui lòng điền đầy đủ thông tin bắt buộc');
      return;
    }

    setLoading(true);
    try {
      // Giả lập upload ảnh
      let imageUrl = '';
      if (file) {
        // Ở đây bạn sẽ gọi API upload thật
        imageUrl = URL.createObjectURL(file); // Giả lập
      }

      const product = {
        ...formData,
        price: Number(formData.price),
        stock: formData.stock ? Number(formData.stock) : 0,
        originalPrice: formData.originalPrice ? Number(formData.originalPrice) : Number(formData.price),
        discountPercent: formData.discountPercent ? Number(formData.discountPercent) : 0,
        images: imageUrl ? [{ url: imageUrl }] : [],
        specification: Object.values(specification).some(v => Array.isArray(v) ? v.length : v)
          ? specification
          : null,
        status: 'active',
      };

      console.log('Sản phẩm gửi đi:', product);
      alert('Thêm sản phẩm thành công!');
      
      // Reset
      setFormData({
        name: '', description: '', price: '', brand: '', stock: '',
        sku: '', category: 'phone', originalPrice: '', discountPercent: ''
      });
      setFile(null);
      setPreview(null);
      setSpecification({
        screenSize: '', resolution: '', cpu: '', ram: '', storage: '',
        battery: '', os: '', camera: '', sim: '', weight: '', colors: []
      });
      setShowSpecs(false);
    } catch (err) {
      alert('Lỗi khi thêm sản phẩm');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Thêm Sản Phẩm Mới</h2>

      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Thông tin cơ bản */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Tên sản phẩm <span className="text-red-500">*</span></label>
            <input name="name" value={formData.name} onChange={handleChange} className="w-full p-2 border rounded" placeholder="iPhone 15 Pro" required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Thương hiệu <span className="text-red-500">*</span></label>
            <input name="brand" value={formData.brand} onChange={handleChange} className="w-full p-2 border rounded" placeholder="Apple" required />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Mô tả</label>
          <textarea name="description" value={formData.description} onChange={handleChange} rows={3} className="w-full p-2 border rounded" placeholder="Mô tả ngắn gọn..." />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Giá (VNĐ) <span className="text-red-500">*</span></label>
            <input type="number" name="price" value={formData.price} onChange={handleChange} className="w-full p-2 border rounded" required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Tồn kho</label>
            <input type="number" name="stock" value={formData.stock} onChange={handleChange} className="w-full p-2 border rounded" placeholder="0" />
          </div>
        </div>

        {/* Thông tin quản lý */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">SKU <span className="text-red-500">*</span></label>
            <input name="sku" value={formData.sku} onChange={handleChange} className="w-full p-2 border rounded uppercase" placeholder="IPHONE-15-PRO" required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Danh mục</label>
            <select name="category" value={formData.category} onChange={handleChange} className="w-full p-2 border rounded">
              <option value="phone">Điện thoại</option>
              <option value="laptop">Laptop</option>
              <option value="tablet">Máy tính bảng</option>
              <option value="accessories">Phụ kiện</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Giá gốc (VNĐ)</label>
            <input type="number" name="originalPrice" value={formData.originalPrice} onChange={handleChange} className="w-full p-2 border rounded" placeholder="Giá trước giảm" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Giảm giá (%)</label>
            <input type="number" value={formData.discountPercent} readOnly className="w-full p-2 border rounded bg-gray-100" />
          </div>
        </div>

        {/* Upload ảnh */}
        <ImageUpload file={file} setFile={setFile} preview={preview} setPreview={setPreview} />

        {/* Thông số kỹ thuật (toggle) */}
        <button
          type="button"
          onClick={() => setShowSpecs(!showSpecs)}
          className="text-blue-600 hover:underline text-sm font-medium"
        >
          {showSpecs ? '↑ Ẩn thông số kỹ thuật' : '↓ Thêm thông số kỹ thuật'}
        </button>

        {showSpecs && (
          <SpecificationSection specification={specification} setSpecification={setSpecification} />
        )}

        {/* Nút submit */}
        <div className="pt-4 border-t">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Đang thêm...' : 'Thêm sản phẩm'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProductForm;