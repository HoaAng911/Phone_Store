import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronDown, ChevronUp, ArrowLeft } from 'lucide-react';
import useProductStore from '../../store/useProduct';
import BasicInfoSection from './BasicInfoSection';
import ImageUpload from './ImageUpload';
import SpecificationSection from './SpecificationSection';

const EditProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { product, fetchProductById, updateProduct, loading,UploadImage  } = useProductStore();
  const [form, setForm] = useState({ name: '', description: '', price: '', brand: '', stock: '' });
  const [specification, setSpecification] = useState({
    screenSize: '', resolution: '', cpu: '', ram: '',
    storage: '', battery: '', os: '', camera: '', sim: '',
    weight: '', colors: [],
  });
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [formLoading, setFormLoading] = useState(false);
  const [showSpecs, setShowSpecs] = useState(false);

  useEffect(() => {
    if (!id || isNaN(id) || id <= 0) {
      alert('ID sản phẩm không hợp lệ');
      navigate('/products/list');
      return;
    }
    fetchProductById(Number(id));
  }, [id, fetchProductById, navigate]);

  useEffect(() => {
    if (product) {
      setForm({
        name: product.name || '',
        description: product.description || '',
        price: product.price || '',
        brand: product.brand || '',
        stock: product.stock || '',
      });
      setSpecification({
        screenSize: product.specification?.screenSize || '',
        resolution: product.specification?.resolution || '',
        cpu: product.specification?.cpu || '',
        ram: product.specification?.ram || '',
        storage: product.specification?.storage || '',
        battery: product.specification?.battery || '',
        os: product.specification?.os || '',
        camera: product.specification?.camera || '',
        sim: product.specification?.sim || '',
        weight: product.specification?.weight || '',
        colors: product.specification?.colors || [],
      });
      if (product.images?.length) {
        setPreview(product.images[0].url);
      }
    }
  }, [product]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.price || !form.brand) return alert('Vui lòng điền đầy đủ thông tin bắt buộc');
    setFormLoading(true);
    try {
      let images = product.images || [];
      if (file) {
        const uploadRes = await UploadImage(file);
        if (uploadRes?.url) images = [{ url: uploadRes.url }];
      }
      const hasSpec = Object.values(specification).some((v) => (Array.isArray(v) ? v.length > 0 : v));
      const productData = {
        ...form,
        price: +form.price,
        stock: +form.stock || 0,
        images,
        specification: hasSpec ? specification : undefined,
      };
      await updateProduct(Number(id), productData);
      alert('Cập nhật sản phẩm thành công');
      navigate('/products/list');
    } catch (error) {
      alert('Lỗi khi cập nhật sản phẩm: ' + (error.message || 'Vui lòng thử lại'));
    } finally {
      setFormLoading(false);
    }
  };

  if (!id || isNaN(id) || id <= 0) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <p className="text-lg text-gray-500 animate-pulse font-medium">ID sản phẩm không hợp lệ, đang chuyển hướng...</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <p className="text-lg text-gray-500 animate-pulse font-medium">Đang tải sản phẩm...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-100">
          <div className="bg-gray-800 px-6 py-3 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-white">Chỉnh sửa sản phẩm #{id}</h2>
            <button
              onClick={() => navigate('/products/list')}
              className="flex items-center gap-2 px-4 py-2 bg-white text-gray-600 rounded-md shadow-sm hover:bg-gray-100 hover:text-gray-800 transition-all duration-200"
            >
              <ArrowLeft size={16} /> Quay lại
            </button>
          </div>
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <BasicInfoSection form={form} setForm={setForm} />
            <ImageUpload file={file} setFile={setFile} preview={preview} setPreview={setPreview} />
            <button
              type="button"
              onClick={() => setShowSpecs(!showSpecs)}
              className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors duration-200"
            >
              {showSpecs ? (
                <>
                  <ChevronUp size={18} /> Ẩn thông số kỹ thuật
                </>
              ) : (
                <>
                  <ChevronDown size={18} /> Chỉnh sửa thông số kỹ thuật
                </>
              )}
            </button>
            {showSpecs && <SpecificationSection specification={specification} setSpecification={setSpecification} />}
            <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
              <button
                type="button"
                onClick={() => navigate('/products/list')}
                className="px-6 py-2 bg-gray-200 text-gray-600 rounded-lg font-medium hover:bg-gray-300 transition-all duration-200"
              >
                Hủy
              </button>
              <button
                type="submit"
                disabled={formLoading}
                className={`px-6 py-2 rounded-lg font-medium text-white transition-all duration-200 ${
                  formLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                {formLoading ? 'Đang cập nhật...' : 'Cập nhật sản phẩm'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProductForm;