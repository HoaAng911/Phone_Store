// src/app/routes/index.jsx

import { Routes, Route } from 'react-router-dom';
import { UserLayout, AdminLayout } from '@/component/layout';
import ProtectedRoute from '@/features/admin-products/ProtectedRoute';

// Route groups
import { publicRoutes } from './publicRoutes';
import { UserRoutes } from './userRoutes';
import { AdminRoutes } from './adminRoutes';
import DashBoard from '@/features/admin-dashboard/DashBoard';
import UserList from '@/features/admin-users/UserList';
import ProductList from '@/features/admin-products/ProductList';
import AddProductForm from '@/features/admin-products/FormCreateProduct/AddProductForm';
import EditProductForm from '@/features/admin-products/FormUpdateProduct/EditProductForm';
import ProductDetail from '@/features/products/Product/ProductDetail';
import OrderList from '@/features/admin-orders/OrderList';
import CartTestPage from '@/features/cart/CartPage';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<UserLayout />}>
       {publicRoutes}
        <Route path="/*" element={<UserRoutes />} />
      </Route>

    
      <Route element={<AdminLayout />}>
      {AdminRoutes}
      <Route path="/admin/dashboard" element={<DashBoard />} />
      <Route path="/admin/users" element={<UserList />} />
      <Route path="/admin/products/list" element={<ProductList />} />
      <Route path="/admin/products/add" element={<AddProductForm />} />
      <Route path="/admin/products/edit/:id" element={<EditProductForm />} />
      <Route path="/admin/products/:id" element={<ProductDetail />} />
      <Route path="/admin/order" element={<OrderList />} />
      <Route path="/admin/carts" element={<CartTestPage />} />
       </Route>
     
    </Routes>
  );
};