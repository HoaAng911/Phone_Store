'use client';

import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  Home,
  Users,
  Settings,
  Box,
  Plus,
  List,
  ShoppingCart,
  Package,
  ShoppingBag,
  BarChart3,
  ChevronDown,
  ChevronRight,
} from 'lucide-react';

const SideBar = () => {
  const [openMenu, setOpenMenu] = useState(null);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menu = [
    { name: 'Dashboard', path: '/', icon: Home },
    { name: 'User', path: '/users', icon: Users },
    {
      name: 'Product',
      icon: Box,
      submenu: [
        { name: 'Thêm sản phẩm', path: '/products/add', icon: Plus },
        { name: 'Danh sách sản phẩm', path: '/products/list', icon: List },
      ],
    },
    {
      name: 'Order & Cart',
      icon: ShoppingCart,
      submenu: [
        { name: 'Danh sách đơn hàng', path: '/order', icon: Package },
        { name: 'Giỏ hàng người dùng', path: '/carts', icon: ShoppingBag },
        { name: 'Thống kê doanh thu', path: '/order/stat', icon: BarChart3 },
      ],
    },
    { name: 'Setting', path: '/setting', icon: Settings },
  ];

  const toggleMenu = (name) => {
    setOpenMenu(openMenu === name ? null : name);
  };

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
    setOpenMenu(null); // Đóng submenu khi thu gọn
  };

  return (
    <aside
      className={`
        fixed inset-y-0 left-0 z-40 flex flex-col bg-white border-r border-gray-200 shadow-xl
        transition-all duration-300 ease-in-out
        ${isCollapsed ? 'w-20' : 'w-50'}
      `}
    >
      {/* Header */}
      <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
        <h1
          className={`
            text-xl font-bold text-blue-600 tracking-tight transition-all duration-200
            ${isCollapsed ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100'}
          `}
        >
          Admin Panel
        </h1>
        <button
          onClick={toggleCollapse}
          className="p-1 rounded-lg hover:bg-gray-100 transition-colors"
        >
          {isCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </button>
      </div>

      {/* Menu */}
      <nav className="flex-1  pr-2 pl-4 py-4 space-y-1  ">
        {menu.map((item) => {
          const Icon = item.icon;
          const isOpen = openMenu === item.name;

          return (
            <div key={item.name}>
              {item.submenu ? (
                <>
                  {/* Menu có submenu */}
                  <button
                    onClick={() => toggleMenu(item.name)}
                    className={`
                      w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium
                      transition-all duration-200 group
                      ${isOpen ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}
                    `}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-5 h-5 flex-shrink-0" />
                      <span className={`${isCollapsed ? 'opacity-0 w-0' : 'opacity-100'}`}>
                        {item.name}
                      </span>
                    </div>
                    {!isCollapsed && (
                      <span className="ml-auto">
                        {isOpen ? (
                          <ChevronDown className="w-4 h-4 text-blue-600" />
                        ) : (
                          <ChevronRight className="w-4 h-4 text-gray-500 group-hover:text-gray-700" />
                        )}
                      </span>
                    )}
                  </button>

                  {/* Submenu */}
                  {!isCollapsed && (
                    <div
                      className={`
                        overflow-hidden transition-all duration-300 ease-in-out
                        ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}
                      `}
                    >
                      <div className="mt-1 ml-9 space-y-1">
                        {item.submenu.map((sub) => {
                          const SubIcon = sub.icon;
                          return (
                            <NavLink
                              key={sub.path}
                              to={sub.path}
                              className={({ isActive }) =>
                                `
                                  flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium
                                  transition-all duration-200
                                  ${isActive
                                    ? 'bg-blue-600 text-white shadow-sm'
                                    : 'text-gray-600 hover:bg-blue-50 hover:text-blue-700'
                                  }
                                `
                              }
                            >
                              <SubIcon className="w-4 h-4" />
                              <span>{sub.name}</span>
                            </NavLink>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </>
              ) : (
                /* Menu đơn */
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `
                      flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium
                      transition-all duration-200 group
                      ${isActive
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'text-gray-700 hover:bg-gray-100'
                      }
                    `
                  }
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  <span className={`${isCollapsed ? 'opacity-0 w-0' : 'opacity-100'}`}>
                    {item.name}
                  </span>
                </NavLink>
              )}
            </div>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200">
        <p
          className={`
            text-xs text-center text-gray-500 transition-opacity duration-200
            ${isCollapsed ? 'opacity-0' : 'opacity-100'}
          `}
        >
          © 2025 Admin Panel
        </p>
      </div>
    </aside>
  );
};

export default SideBar;