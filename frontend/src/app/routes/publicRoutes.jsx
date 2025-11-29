// src/app/routes/publicRoutes.jsx

import { Route } from 'react-router-dom';

// Auth components
import LoginForm from '@/features/auth/components/LoginForm';
import RegisterForm from '@/features/auth/components/RegisterForm';

export const publicRoutes = (
  <>
    <Route path="/login" element={<LoginForm />} />
    <Route path="/register" element={<RegisterForm />} />
    
   
  </>
);