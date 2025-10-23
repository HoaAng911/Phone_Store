import React from 'react'
import SideBar from '../components/Sidebar'

const MainLayout = ({children}) => {
  return (
    //chia doi man hinh ra
    <div className='flex '>
      <SideBar/>
      <main className="flex-1 p-6 overflow-auto">
          {children}
        </main>
    </div>
  )
}

export default MainLayout