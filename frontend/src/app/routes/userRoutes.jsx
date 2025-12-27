

import { Routes, Route } from 'react-router-dom';
import Home from '@/pages/Home';
import AboutUs from '@/pages/AboutUs';
import Contact from '@/pages/Contact';
import Profile from '../../features/profile/Profile';
import CartPage from '../../pages/Cart';
import ProductDetail from '@/features/products/Product/ProductDetail';
import ProductCategoryPage from '@/features/products/Product/ProductCategoryPage';

import { ArticleListPage, ArticleDetail } from '@/features/articles';
import CheckoutPage from '@/pages/Checkout';
import OrderDetailPage from '@/features/profile/ui/OrderPage';

export const UserRoutes = () => {
  return (
    <Routes>
      {/* Trang chủ & trang tĩnh */}
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<AboutUs />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/profile" element={<Profile />} />
      {/* <Route path="/checkout" element={<Checkout />} /> */}

      {/* Giỏ hàng */}
      <Route path="/cart" element={<CartPage />} />
       <Route path="/checkout" element={<CheckoutPage />} />
       <Route path="/orders/:id" element={<OrderDetailPage />} />
      {/* Sản phẩm */}
      <Route path="/product/:id" element={<ProductDetail />} />
      <Route path="/products" element={<ProductCategoryPage />} />
      <Route path="/products/:category" element={<ProductCategoryPage />} />
      <Route path="/danh-muc/:category" element={<ProductCategoryPage />} /> 

      {/* Tin tức / Blog */}
      <Route path="/tin-tuc" element={<ArticleListPage />} />
      <Route path="/tin-tuc/:slug" element={<ArticleDetail />} />
    </Routes>
  );
};