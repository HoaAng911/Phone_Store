import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronDown, ChevronUp, ArrowLeft } from 'lucide-react';
import useProductStore from '../../../store/useProduct';
import BasicInfoSection from './BasicInfoSection';
import ImageUpload from './ImageUpload';
import SpecificationSection from './SpecificationSection';

// Validate UUID v4
const isValidUUIDv4 = (id) => {
  const uuidRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/;
  return uuidRegex.test(id);
};

const EditProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { product, fetchProductById, updateProduct, loading, UploadImage } = useProductStore();

  const [form, setForm] = useState({
    name: '', description: '', price: '', brand: '', stock: ''
  });
  const [specification, setSpecification] = useState({
    screenSize: '', resolution: '', cpu: '', ram: '',
    storage: '', battery: '', os: '', camera: '', sim: '',
    weight: '', colors: [],
  });
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [formLoading, setFormLoading] = useState(false);
  const [showSpecs, setShowSpecs] = useState(false);

  // Kiểm tra ID + Gọi API
  useEffect(() => {
    if (!id || !isValidUUIDv4(id)) {
      alert('ID sản phẩm không hợp lệ');
      navigate('/admin/products/list');
      return;
    }

    fetchProductById(id);
  }, [id, fetchProductById, navigate]);

  // Cập nhật form khi có product
  useEffect(() => {
    if (product) {
      setForm({
        name: product.name || '',
        description: product.description || '',
        price: product.price?.toString() || '',
        brand: product.brand || '',
        stock: product.stock?.toString() || '',
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

      if (product.images?.length > 0) {
        setPreview(product.images[0].url);
      }
    }
  }, [product]);

  // Xử lý submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.price || !form.brand) {
      return alert('Vui lòng điền đầy đủ: Tên, Giá, Thương hiệu');
    }

    setFormLoading(true);
    try {
      let images = product.images || [];

      if (file) {
        const uploadRes = await UploadImage(file);
        if (uploadRes?.url) {
          images = [{ url: uploadRes.url }];
        }
      }

      const hasSpec = Object.values(specification).some(v =>
        Array.isArray(v) ? v.length > 0 : v
      );

      const productData = {
        ...form,
        price: parseFloat(form.price),
        stock: parseInt(form.stock) || 0,
        images,
        specification: hasSpec ? specification : undefined,
      };

      // Dùng id dạng UUID (không Number)
      await updateProduct(id, productData);

      alert('Cập nhật sản phẩm thành công!');
      navigate('/admin/products/list');
    } catch (error) {
      console.error('Lỗi cập nhật:', error);
      alert('Lỗi khi cập nhật: ' + (error.message || 'Vui lòng thử lại'));
    } finally {
      setFormLoading(false);
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Đang tải thông tin sản phẩm...</p>
        </div>
      </div>
    );
  }

  // Không tìm thấy sản phẩm
  if (!product) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <p className="text-lg text-red-600">Không tìm thấy sản phẩm</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-100">
          {/* Header */}
          <div className="bg-gradient-to-r from-gray-800 to-gray-900 px-6 py-4 flex items-center justify-between">
            <h2 className="text-xl font-bold text-white">
              Chỉnh sửa sản phẩm
            </h2>
            <button
              onClick={() => navigate('/products/list')}
              className="flex items-center gap-2 px-4 py-2 bg-white text-gray-700 rounded-lg shadow hover:bg-gray-50 transition-all"
            >
              <ArrowLeft size={18} /> Quay lại
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <BasicInfoSection form={form} setForm={setForm} />
            <ImageUpload file={file} setFile={setFile} preview={preview} setPreview={setPreview} />

            {/* Toggle Thông số */}
            <button
              type="button"
              onClick={() => setShowSpecs(!showSpecs)}
              className="flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors"
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

            {showSpecs && (
              <SpecificationSection
                specification={specification}
                setSpecification={setSpecification}
              />
            )}

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={() => navigate('/products/list')}
                className="px-6 py-2.5 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-all"
              >
                Hủy
              </button>
              <button
                type="submit"
                disabled={formLoading}
                className={`px-6 py-2.5 rounded-lg font-medium text-white transition-all flex items-center gap-2 ${
                  formLoading
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700 shadow-md'
                }`}
              >
                {formLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                    Đang cập nhật...
                  </>
                ) : (
                  'Cập nhật sản phẩm'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProductForm;