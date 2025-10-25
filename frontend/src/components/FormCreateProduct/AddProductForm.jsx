import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import useProductStore from '../../store/productStore';
import BasicInfoSection from './BasicInfoSection';
import ImageUpload from './ImageUpload';
import SpecificationSection from './SpecificationSection';

const AddProductForm = () => {
  const { UploadImage, createProduct } = useProductStore();
  const [form, setForm] = useState({ name: '', description: '', price: '', brand: '', stock: '' });
  const [specification, setSpecification] = useState({
    screenSize: '', resolution: '', cpu: '', ram: '',
    storage: '', battery: '', os: '', camera: '', sim: '',
    weight: '', colors: [],
  });
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showSpecs, setShowSpecs] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.price || !form.brand) return alert('Vui lòng điền đầy đủ thông tin bắt buộc');
    setLoading(true);
    try {
      let images = [];
      if (file) {
        const uploadRes = await UploadImage(file);
        if (uploadRes?.url) images.push({ url: uploadRes.url });
      }
      const hasSpec = Object.values(specification).some(v => Array.isArray(v) ? v.length > 0 : v);
      const productData = { ...form, price: +form.price, stock: +form.stock || 0, images, specification: hasSpec ? specification : undefined };
      await createProduct(productData);
      alert('Thêm sản phẩm thành công');
      setForm({ name: '', description: '', price: '', brand: '', stock: '' });
      setSpecification({ screenSize: '', resolution: '', cpu: '', ram: '', storage: '', battery: '', os: '', camera: '', sim: '', weight: '', colors: [] });
      setFile(null); setPreview(null); setShowSpecs(false);
    } catch {
      alert('Lỗi khi tạo sản phẩm');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white shadow-lg  overflow-hidden border border-gray-100">
          <div className="bg-gray-800 px-6 py-3">
            <h2 className="text-xl font-semibold text-white">Thêm Sản Phẩm Mới</h2>
          </div>
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <BasicInfoSection form={form} setForm={setForm} />
            <ImageUpload file={file} setFile={setFile} preview={preview} setPreview={setPreview} />
            <button
              type="button"
              onClick={() => setShowSpecs(!showSpecs)}
              className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors duration-200"
            >
              {showSpecs ? <><ChevronUp size={18} /> Ẩn thông số kỹ thuật</> : <><ChevronDown size={18} /> Thêm thông số kỹ thuật</>}
            </button>
            {showSpecs && <SpecificationSection specification={specification} setSpecification={setSpecification} />}
            <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
              <button
                type="submit"
                disabled={loading}
                className={`px-6 py-2 rounded-lg font-medium text-white transition-all duration-200 ${
                  loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                {loading ? 'Đang thêm...' : 'Thêm sản phẩm'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProductForm;