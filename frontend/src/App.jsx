
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import UserList from './pages/UserList'
import DashBoard from './pages/DashBoard'
import ProductList from './pages/ProductList'
import AddProductForm from './components/FormCreateProduct/AddProductForm'
import ProductDetail from './pages/ProductDetail'
import EditProductForm from './components/FormUpdateProduct/EditProductForm'
import CartTestPage from './pages/CartPage'
function App() {


  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<DashBoard />} />
          <Route path="/users" element={<UserList />} />
          <Route path="/products/list" element={<ProductList />} />
          <Route path="/products/add" element={<AddProductForm />} />
           <Route path="/products/edit/:id" element={<EditProductForm />} />
          <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/carts" element={<CartTestPage />} />
        </Routes>
      </MainLayout>

    </BrowserRouter>
  )
}

export default App
