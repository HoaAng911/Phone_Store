// SpecificationSection.jsx
import React, { useState } from 'react';

const SpecificationSection = ({ specification, setSpecification }) => {
  const [newColor, setNewColor] = useState('');

  const addColor = () => {
    if (newColor.trim()) {
      setSpecification(prev => ({ ...prev, colors: [...prev.colors, newColor.trim()] }));
      setNewColor('');
    }
  };

  const removeColor = (color) => {
    setSpecification(prev => ({ ...prev, colors: prev.colors.filter(c => c !== color) }));
  };

  const handleSpecChange = (key, value) => {
    setSpecification(prev => ({ ...prev, [key]: value }));
  };

  const fields = [
    { key: 'screenSize', label: 'Màn hình' },
    { key: 'resolution', label: 'Độ phân giải' },
    { key: 'cpu', label: 'CPU' },
    { key: 'ram', label: 'RAM' },
    { key: 'storage', label: 'Bộ nhớ' },
    { key: 'battery', label: 'Pin' },
    { key: 'os', label: 'Hệ điều hành' },
    { key: 'camera', label: 'Camera' },
    { key: 'sim', label: 'SIM' },
    { key: 'weight', label: 'Trọng lượng' },
  ];

  return (
    <div className="border p-4 rounded bg-gray-50 space-y-4">
      <h3 className="font-semibold text-gray-800">Thông số kỹ thuật</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {fields.map(f => (
          <input
            key={f.key}
            type="text"
            placeholder={f.label}
            value={specification[f.key] || ''}
            onChange={(e) => handleSpecChange(f.key, e.target.value)}
            className="p-2 border rounded text-sm"
          />
        ))}
      </div>

      <div>
        <div className="flex gap-2">
          <input
            type="text"
            value={newColor}
            onChange={(e) => setNewColor(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addColor()}
            placeholder="Thêm màu..."
            className="flex-1 p-2 border rounded text-sm"
          />
          <button type="button" onClick={addColor} className="bg-blue-600 text-white px-3 rounded">+</button>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {specification.colors.map((color, i) => (
            <span key={i} className="bg-gray-200 px-3 py-1 rounded-full text-sm flex items-center gap-1">
              {color}
              <button onClick={() => removeColor(color)} className="text-red-600">×</button>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SpecificationSection;