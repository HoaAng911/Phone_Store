// components/ProtectedRoute.jsx
import { Navigate, Outlet } from 'react-router-dom'

export default function ProtectedRoute() {
  const token = localStorage.getItem('access_token')

  // Nếu chưa login → về trang login
  if (!token) {
    return <Navigate to="/" replace />
  }

  // Nếu đã login → render children (MainLayout + routes)
  return <Outlet />
}