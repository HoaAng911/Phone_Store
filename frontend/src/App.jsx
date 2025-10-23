import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import UserList from './pages/UserList'
import DashBoard from './pages/DashBoard'
import ProductList from './pages/ProductList'
import AddProductForm from './components/AddProductForm'
function App() {


  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<DashBoard />} />
          <Route path="/users" element={<UserList />} />
          <Route path="/products/list" element={<ProductList />} />
          <Route path="/products/add" element={<AddProductForm />} />
        </Routes>
      </MainLayout>

    </BrowserRouter>
  )
}

export default App
