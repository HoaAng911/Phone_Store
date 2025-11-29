// src/layouts/UserLayout.jsx
import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'

export default function UserLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* HEADER */}
      <Header />

      {/* NỘI DUNG CHÍNH */}
      <main className="flex-1 pt-16">
        <div className="container mx-auto px-4">
          <Outlet />
        </div>
      </main>

      {/* FOOTER */}
      <Footer />
    </div>
  )
}