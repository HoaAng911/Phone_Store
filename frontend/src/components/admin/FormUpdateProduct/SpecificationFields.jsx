import React from 'react';

const SpecificationFields = ({ specification, setSpecification }) => {
  const fields = [
    { key: 'screenSize', label: 'Kích thước màn hình' },
    { key: 'resolution', label: 'Độ phân giải' },
    { key: 'cpu', label: 'CPU' },
    { key: 'ram', label: 'RAM' },
    { key: 'storage', label: 'Bộ nhớ' },
    { key: 'battery', label: 'Dung lượng pin' },
    { key: 'os', label: 'Hệ điều hành' },
    { key: 'camera', label: 'Camera' },
    { key: 'sim', label: 'SIM' },
    { key: 'weight', label: 'Trọng lượng' },
  ];

  const handleChange = (key, value) => {
    setSpecification(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      {fields.map(f => (
        <div key={f.key}>
          <label className="block text-sm font-medium text-gray-600 mb-1">{f.label}</label>
          <input
            type="text"
            value={specification[f.key]}
            onChange={e => handleChange(f.key, e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all duration-200"
            placeholder={`Nhập ${f.label.toLowerCase()}`}
          />
        </div>
      ))}
    </div>
  );
};

export default SpecificationFields;