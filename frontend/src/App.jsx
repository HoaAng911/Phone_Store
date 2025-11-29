import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './app/routes/index';
import useAuthStore from './features/auth/store/useAuthStore';
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    useAuthStore.getState().init();
  }, []);

  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;