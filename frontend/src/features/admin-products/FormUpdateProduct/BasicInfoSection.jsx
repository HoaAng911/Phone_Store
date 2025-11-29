import React from 'react';

const BasicInfoSection = ({ form, setForm }) => (
  <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
    <h3 className="text-lg font-semibold text-gray-800 mb-4">Thông tin cơ bản</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">Tên sản phẩm <span className="text-red-500">*</span></label>
        <input
          type="text"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all duration-200"
          placeholder="Nhập tên sản phẩm"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">Thương hiệu <span className="text-red-500">*</span></label>
        <input
          type="text"
          value={form.brand}
          onChange={e => setForm({ ...form, brand: e.target.value })}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all duration-200"
          placeholder="Nhập thương hiệu"
        />
      </div>
    </div>
    <div className="mt-4">
      <label className="block text-sm font-medium text-gray-600 mb-1">Mô tả</label>
      <textarea
        value={form.description}
        onChange={e => setForm({ ...form, description: e.target.value })}
        className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all duration-200"
        rows="4"
        placeholder="Nhập mô tả sản phẩm"
      />
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">Giá (VNĐ) <span className="text-red-500">*</span></label>
        <input
          type="number"
          value={form.price}
          onChange={e => setForm({ ...form, price: e.target.value })}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all duration-200"
          placeholder="Nhập giá sản phẩm"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">Tồn kho</label>
        <input
          type="number"
          value={form.stock}
          onChange={e => setForm({ ...form, stock: e.target.value })}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all duration-200"
          placeholder="Nhập số lượng tồn kho"
        />
      </div>
    </div>
  </div>
);

export default BasicInfoSection;