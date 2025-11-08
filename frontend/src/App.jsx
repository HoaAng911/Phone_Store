// App.jsx
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import DashBoard from './pages/DashBoard'
import UserList from './pages/UserList'
import ProductList from './pages/ProductList'
import AddProductForm from './components/FormCreateProduct/AddProductForm'
import ProductDetail from './pages/ProductDetail'
import EditProductForm from './components/FormUpdateProduct/EditProductForm'
import CartTestPage from './pages/adminPage/CartPage'
import OrderList from './pages/OrderList'
import LoginForm from './components/Auth/LoginForm'
import ProtectedRoute from './components/ProtectedRoute'
import RegisterForm from './components/Auth/RegisterForm'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* PUBLIC ROUTE */}
        <Route path="/" element={<LoginForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        {/* PROTECTED ROUTES - có Sidebar */}
        <Route element={<ProtectedRoute />}>
          <Route element={<MainLayout />}>
            <Route path="/dashboard" element={<DashBoard />} />
            <Route path="/users" element={<UserList />} />
            <Route path="/products/list" element={<ProductList />} />
            <Route path="/products/add" element={<AddProductForm />} />
            <Route path="/products/edit/:id" element={<EditProductForm />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/carts" element={<CartTestPage />} />
            <Route path="/order" element={<OrderList />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App