// layouts/MainLayout.jsx
import SideBar from '../components/Sidebar'
import { Outlet } from 'react-router-dom'  // ← Thêm Outlet

export default function MainLayout() {
  return (
    <div className="flex h-screen bg-gray-50">
      <SideBar />
      <main className="flex-1 overflow-y-auto ml-52">
        <div className="p-6">
          <Outlet />  {/* ← Render DashBoard, UserList, v.v. ở đây */}
        </div>
      </main>
    </div>
  )
}