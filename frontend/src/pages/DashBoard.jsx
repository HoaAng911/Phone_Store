import React, { useEffect, useState } from 'react'
import useUserStore from '../store/userStore'
import { Users, ShieldCheck, User } from 'lucide-react'

const DashBoard = () => {
  const [stats, setStats] = useState({ total: 0, admin: 0 })
  const [loading, setLoading] = useState(true)
  const fetchStats = useUserStore(state => state.fetchStats)

  useEffect(() => {
    const loadStat = async () => {
      try {
        const res = await fetchStats()
        console.log(res)
        setStats(res)
      } catch (error) {
        console.error("Lỗi khi tải thống kê:", error)
      } finally {
        setLoading(false)
      }
    }
    loadStat()
  }, [fetchStats])

  if (loading) return <p className="text-center mt-6">Đang tải thống kê...</p>

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-center flex items-center justify-center gap-3">
        <ShieldCheck className="text-blue-600" size={32} />
        Dashboard
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
        <div className="bg-white shadow-md rounded p-6 text-center border-t-4 border-blue-500 hover:shadow-lg transition">
          <div className="flex justify-center mb-2">
            <Users size={40} className="text-blue-600" />
          </div>
          <h2 className="text-lg font-semibold text-gray-600">Tổng thành viên</h2>
          <p className="text-3xl font-bold text-blue-600 mt-2">{stats.total}</p>
        </div>

        <div className="bg-white shadow-md rounded p-6 text-center border-t-4 border-green-500 hover:shadow-lg transition">
          <div className="flex justify-center mb-2">
            <ShieldCheck size={40} className="text-green-600" />
          </div>
          <h2 className="text-lg font-semibold text-gray-600">Tổng Admin</h2>
          <p className="text-3xl font-bold text-green-600 mt-2">{stats.admin}</p>
        </div>

        <div className="bg-white shadow-md rounded p-6 text-center border-t-4 border-purple-500 hover:shadow-lg transition">
          <div className="flex justify-center mb-2">
            <User size={40} className="text-purple-600" />
          </div>
          <h2 className="text-lg font-semibold text-gray-600">Tổng User thường</h2>
          <p className="text-3xl font-bold text-purple-600 mt-2">{stats.total - stats.admin}</p>
        </div>
      </div>
    </div>
  )
}

export default DashBoard
