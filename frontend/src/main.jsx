// src/main.jsx
import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Toaster } from 'sonner'

// Cách đúng nhất cho JavaScript (file .jsx)
const root = document.getElementById('root')

if (root) {
  createRoot(root).render(
    <>
      <App />
      <Toaster
        position="top-right"
        richColors
        closeButton
        expand={true}
        toastOptions={{
          duration: 4000,
        }}
      />
    </>
  )
}