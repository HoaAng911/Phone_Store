// src/components/profile/ui/AddressCard.jsx
import { Edit2, Trash2, MapPin } from 'lucide-react';

export default function AddressCard({ address, onEdit, onDelete }) {
  return (
    <div className="group relative bg-white rounded-2xl border-2 border-gray-200 hover:border-violet-400 hover:shadow-2xl transition-all duration-300 overflow-hidden">
   
      {address.isDefault && (
        <div className="absolute top-0 right-0 bg-gradient-to-br from-red-500 to-pink-600 text-white text-xs font-bold px-4 py-1.5 rounded-bl-2xl shadow-lg z-10">
          Mặc định
        </div>
      )}

      <div className="p-6">
      
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-lg font-bold text-gray-900">{address.fullName}</h3>
            <p className="text-gray-600 mt-1 flex items-center gap-1.5">
              <span className="text-sm">☎</span>
              <span className="font-medium">{address.phone}</span>
            </p>
          </div>
        </div>

       
        <div className="bg-gray-50 rounded-xl p-4 mb-5 border border-gray-200">
          <div className="flex items-start gap-3 text-gray-700">
            <MapPin className="w-5 h-5 text-violet-600 mt-0.5 flex-shrink-0" />
            <p className="text-sm leading-relaxed">
              <span className="font-medium">{address.street}</span>
              {address.ward && `, ${address.ward}`}
              {address.district && `, ${address.district}`}
              {address.city && `, ${address.city}`}
            </p>
          </div>
        </div>

       
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={onEdit}
            className="flex items-center justify-center gap-2 py-3.5 bg-white border-2 border-gray-300 rounded-xl font-semibold text-gray-700 hover:border-violet-500 hover:bg-violet-50 hover:text-violet-700 transition-all duration-200 group/btn"
          >
            <Edit2 className="w-4.5 h-4.5 group-hover/btn:scale-110 transition-transform" />
            Sửa
          </button>

          <button
            onClick={onDelete}
            className="flex items-center justify-center gap-2 py-3.5 bg-white border-2 border-red-300 rounded-xl font-semibold text-red-600 hover:border-red-500 hover:bg-red-50 hover:text-red-700 transition-all duration-200 group/btn"
          >
            <Trash2 className="w-4.5 h-4.5 group-hover/btn:scale-110 transition-transform" />
            Xóa
          </button>
        </div>
      </div>

      <div className="absolute inset-0 rounded-2xl ring-4 ring-transparent group-hover:ring-violet-200/50 transition-all duration-300 pointer-events-none"></div>
    </div>
  );
}