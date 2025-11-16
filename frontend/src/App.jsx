// App.jsx
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainLayout from './layouts/AdminLayout'
import DashBoard from './pages/adminPage/DashBoard'
import UserList from './pages/adminPage/UserList'
import ProductList from './pages/adminPage/ProductList'
import AddProductForm from './components/admin/FormCreateProduct/AddProductForm'
import ProductDetail from './pages/adminPage/ProductDetail'
import EditProductForm from './components/admin/FormUpdateProduct/EditProductForm'
import CartTestPage from './pages/adminPage/CartPage'
import OrderList from './pages/adminPage/OrderList'
import LoginForm from './components/Auth/LoginForm'
import ProtectedRoute from './components/admin/ProtectedRoute'
import RegisterForm from './components/Auth/RegisterForm'
import AdminLayout from './layouts/AdminLayout'
import UserLayout from './layouts/UserLayout'
import Home from './pages/userPage/Home'
import AboutUs from './pages/userPage/AboutUs'
import Contact from './pages/userPage/Contact'
import ProductDetailUser from './pages/userPage/ProductDetail'
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* PUBLIC ROUTE */}
        
        
       
        <Route element={< UserLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
         <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<Contact />} />
           <Route path="/product/:id" element={<ProductDetailUser />} />
         </Route>
      
        {/* ADMIN ROUTES */}
        <Route element={<ProtectedRoute />}>
          <Route element={<AdminLayout />}>
            <Route path="/admin/dashboard" element={<DashBoard />} />
            <Route path="/admin/users" element={<UserList />} />
            <Route path="/admin/products/list" element={<ProductList />} />
            <Route path="/admin/products/add" element={<AddProductForm />} />
            <Route path="/admin/products/edit/:id" element={<EditProductForm />} />
            <Route path="/admin/products/:id" element={<ProductDetail />} />
            <Route path="/admin/carts" element={<CartTestPage />} />
            <Route path="/admin/order" element={<OrderList />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App