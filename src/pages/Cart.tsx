import { Link } from 'react-router-dom'
import { ShoppingBag } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import { CartItemRow } from '@/components/cart/CartItemRow'
import { CartSummary } from '@/components/cart/CartSummary'
import { Button } from '@/components/ui/Button'

export function Cart() {
  const { items, itemCount, clearCart } = useCart()

  if (itemCount === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-20 text-center sm:px-6">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-slate-100">
          <ShoppingBag className="h-10 w-10 text-slate-400" />
        </div>
        <h1 className="mb-2 text-2xl font-bold text-slate-900">
          Seu carrinho está vazio
        </h1>
        <p className="mb-8 text-slate-500">
          Adicione produtos para continuar a compra.
        </p>
        <Link to="/produtos">
          <Button size="lg">Explorar produtos</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Carrinho</h1>
          <p className="mt-1 text-slate-500">
            {itemCount} {itemCount === 1 ? 'item' : 'itens'} no carrinho
          </p>
        </div>
        <Button variant="ghost" size="sm" onClick={clearCart}>
          Limpar carrinho
        </Button>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white px-5 shadow-sm lg:col-span-2">
          {items.map((item) => (
            <CartItemRow key={item.product.id} item={item} />
          ))}
        </div>

        <div className="lg:sticky lg:top-24 lg:self-start">
          <CartSummary />
        </div>
      </div>
    </div>
  )
}
