import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { CartProvider } from '@/context/CartContext'
import { AuthProvider } from '@/context/AuthContext'
import { Layout } from '@/components/layout/Layout'
import { Home } from '@/pages/Home'
import { Products } from '@/pages/Products'
import { Product } from '@/pages/Product'
import { Cart } from '@/pages/Cart'
import { Checkout } from '@/pages/Checkout'
import { Login } from '@/pages/Login'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
})

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <CartProvider>
          <BrowserRouter>
            <Routes>
              <Route element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="produtos" element={<Products />} />
                <Route path="produtos/:id" element={<Product />} />
                <Route path="carrinho" element={<Cart />} />
                <Route path="checkout" element={<Checkout />} />
                <Route path="login" element={<Login />} />
                <Route
                  path="*"
                  element={
                    <div className="mx-auto max-w-7xl px-4 py-20 text-center">
                      <h1 className="mb-2 text-2xl font-bold text-slate-900">
                        Página não encontrada
                      </h1>
                      <p className="text-slate-500">
                        A página que você procura não existe.
                      </p>
                    </div>
                  }
                />
              </Route>
            </Routes>
          </BrowserRouter>
        </CartProvider>
      </AuthProvider>
    </QueryClientProvider>
  )
}
