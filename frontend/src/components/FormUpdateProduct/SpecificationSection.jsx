import React, { useState } from 'react';
import SpecificationFields from './SpecificationFields';
import ColorInputList from './ColorInputList';

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

  return (
    <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Thông số kỹ thuật</h3>
      <SpecificationFields specification={specification} setSpecification={setSpecification} />
      <ColorInputList newColor={newColor} setNewColor={setNewColor} addColor={addColor} colors={specification.colors} removeColor={removeColor} />
    </div>
  );
};

export default SpecificationSection;