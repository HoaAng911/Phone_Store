// src/components/layout/AdminLayout.jsx

import { Outlet } from 'react-router-dom';
import Sidebar from '@/features/admin-products/Sidebar'; 

export default function AdminLayout() {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 overflow-y-auto ml-64">
        <div className="p-6 pt-8"> 
          <Outlet />
        </div>
      </main>
    </div>
  );
}