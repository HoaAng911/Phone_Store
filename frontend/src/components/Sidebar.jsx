import React, { useState } from 'react'
import { NavLink } from "react-router-dom";
import { Home, Users, Settings, Box, Plus, List } from "lucide-react";

const SideBar = () => {
  const [openMenu, setOpenMenu] = useState(null); // quản lý submenu đang mở

  const menu = [
    { name: "Dashboard", path: '/', icon: <Home size={20} /> },
    { name: "User", path: '/users', icon: <Users size={20} /> },
    {
      name: "Product",
      icon: <Box size={20} />,
      submenu: [
        { name: "Thêm sản phẩm", path: '/products/add', icon: <Plus size={16} /> },
        { name: "Danh sách sản phẩm", path: '/products/list', icon: <List size={16} /> },
      ]
    },
    { name: "Setting", path: '/setting', icon: <Settings size={20} /> }
  ];

  const handleToggle = (name) => {
    // nếu click trùng menu đang mở, đóng nó; nếu khác, mở menu mới
    setOpenMenu(openMenu === name ? null : name);
  };

  return (
    <nav className="flex flex-col gap-2 h-screen bg-gray-50 w-[280px] p-4 shadow-lg">
      <h1 className="text-2xl font-semibold mb-6 text-center tracking-wide">Admin Panel</h1>

      {menu.map((item) => (
        <div key={item.name}>
          {item.submenu ? (
            <>
              <button
                onClick={() => handleToggle(item.name)}
                className="flex items-center justify-between px-4 py-2 w-full rounded-lg text-sm font-medium text-gray-700 hover:bg-blue-100 transition-all"
              >
                <div className="flex items-center gap-3">
                  {item.icon}
                  <span>{item.name}</span>
                </div>
                <span className="text-gray-500">{openMenu === item.name ? '▾' : '▸'}</span>
              </button>

              {openMenu === item.name && (
                <div className="flex flex-col ml-6 mt-1 gap-1">
                  {item.submenu.map(sub => (
                    <NavLink
                      key={sub.path}
                      to={sub.path}
                      className={({ isActive }) =>
                        `flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                          isActive ? "bg-blue-500 text-white shadow-sm" : "text-gray-700 hover:bg-blue-100"
                        }`
                      }
                    >
                      {sub.icon}
                      <span>{sub.name}</span>
                    </NavLink>
                  ))}
                </div>
              )}
            </>
          ) : (
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  isActive ? "bg-blue-500 text-white shadow-sm" : "text-gray-700 hover:bg-blue-100"
                }`
              }
            >
              {item.icon}
              <span>{item.name}</span>
            </NavLink>
          )}
        </div>
      ))}
    </nav>
  );
}

export default SideBar;
