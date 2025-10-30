'use client';

import React from 'react';
import SideBar from '../components/Sidebar';

const MainLayout = ({ children }) => {
  return (
    <div className="flex h-screen bg-gray-50">
      <SideBar />
      <main className="flex-1 overflow-y-auto ml-50">
        <div className="">{children}</div>
      </main>
    </div>
  );
};

export default MainLayout;