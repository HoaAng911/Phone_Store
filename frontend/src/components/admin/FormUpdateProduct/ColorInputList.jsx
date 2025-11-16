import React from 'react';
import { Plus, X } from 'lucide-react';

const ColorInputList = ({ newColor, setNewColor, addColor, colors, removeColor }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-600 mb-2">Màu sắc</label>
      <div className="flex items-center gap-2 mb-4">
        <input
          type="text"
          value={newColor}
          onChange={e => setNewColor(e.target.value)}
          placeholder="Thêm màu mới..."
          className="flex-1 border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all duration-200"
        />
        <button
          type="button"
          onClick={addColor}
          className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200"
        >
          <Plus size={16} />
        </button>
      </div>
      {colors.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {colors.map((color, index) => (
            <div
              key={index}
              className="flex items-center gap-1 bg-gray-100 border border-gray-200 px-3 py-1 rounded-full"
            >
              <span className="text-sm text-gray-700">{color}</span>
              <button
                type="button"
                onClick={() => removeColor(color)}
                className="text-red-500 hover:text-red-600 transition-all duration-200"
              >
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-gray-500 italic">Chưa có màu nào được thêm</p>
      )}
    </div>
  );
};

export default ColorInputList;