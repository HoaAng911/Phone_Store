// src/app/routes/adminRoutes.jsx
import { Routes, Route } from 'react-router-dom';
import DashBoard from '../../features/admin-dashboard/DashBoard';
import ProductList from '@/features/admin-products/ProductList';
import AddProductForm from '@/features/admin-products/FormCreateProduct/AddProductForm';
import EditProductForm from '@/features/admin-products/FormUpdateProduct/EditProductForm';
import ProductDetail from '@/features/admin-products/ProductDetail';
import UserList from '@/features/admin-users/UserList';
import OrderList from '@/features/admin-orders/OrderList';
import CartTestPage from '@/features/cart/CartPage'; 


export const AdminRoutes = () => {
  return (
    <Routes>
      {/* Dashboard */}
      <Route path="/admin/dashboard" element={<DashBoard />} />

      {/* Users */}
      <Route path="/admin/users" element={<UserList />} />

      {/* Products */}
      <Route path="/admin/products/list" element={<ProductList />} />
      <Route path="/admin/products/add" element={<AddProductForm />} />
      <Route path="/admin/products/edit/:id" element={<EditProductForm />} />
      <Route path="/admin/products/:id" element={<ProductDetail />} />

      {/* Orders */}
      <Route path="/admin/order" element={<OrderList />} />

      {/* Carts (test hoặc admin view) */}
      <Route path="/admin/carts" element={<CartTestPage />} />
    </Routes>
  );
};