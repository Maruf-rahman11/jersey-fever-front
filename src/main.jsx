import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RouterProvider } from "react-router/dom";
import router from './router/router.jsx'
import AuthProvider from './Context/AuthProvider.jsx'
import CartProvider from './Context/CartProvider.jsx'


const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <CartProvider>
         <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
      </CartProvider>
    </QueryClientProvider>
  </StrictMode>
)
