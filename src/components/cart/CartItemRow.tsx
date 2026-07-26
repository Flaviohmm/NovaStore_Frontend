import { Link } from 'react-router-dom'
import { Minus, Plus, Trash2 } from 'lucide-react'
import type { CartItem } from '@/types'
import { formatCurrency } from '@/lib/format'
import { useCart } from '@/context/CartContext'
import { Button } from '@/components/ui/Button'

interface CartItemRowProps {
  item: CartItem
}

export function CartItemRow({ item }: CartItemRowProps) {
  const { updateQuantity, removeItem } = useCart()
  const { product, quantity } = item

  return (
    <div className="flex gap-4 border-b border-slate-100 py-5 last:border-0 dark:border-slate-800">
      <Link
        to={`/produtos/${product.id}`}
        className="h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-800"
      >
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover"
        />
      </Link>

      <div className="flex min-w-0 flex-1 flex-col justify-between sm:flex-row sm:items-center sm:gap-4">
        <div className="min-w-0">
          <Link
            to={`/produtos/${product.id}`}
            className="line-clamp-2 text-sm font-semibold text-slate-900 hover:text-brand-600 dark:text-slate-100 dark:hover:text-brand-400"
          >
            {product.name}
          </Link>
          <p className="mt-0.5 text-sm text-slate-500 dark:text-slate-400">
            {formatCurrency(product.price)} cada
          </p>
        </div>

        <div className="mt-3 flex items-center justify-between gap-4 sm:mt-0 sm:justify-end">
          <div className="flex items-center rounded-xl border border-slate-200 dark:border-slate-700">
            <button
              type="button"
              onClick={() => updateQuantity(product.id, quantity - 1)}
              className="flex h-9 w-9 items-center justify-center text-slate-500 transition hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
              aria-label="Diminuir quantidade"
            >
              <Minus className="h-3.5 w-3.5" />
            </button>
            <span className="w-8 text-center text-sm font-medium tabular-nums">
              {quantity}
            </span>
            <button
              type="button"
              onClick={() => updateQuantity(product.id, quantity + 1)}
              disabled={quantity >= product.stock}
              className="flex h-9 w-9 items-center justify-center text-slate-500 transition hover:text-slate-900 disabled:opacity-40 dark:text-slate-400 dark:hover:text-white"
              aria-label="Aumentar quantidade"
            >
              <Plus className="h-3.5 w-3.5" />
            </button>
          </div>

          <p className="min-w-20 text-right text-sm font-bold text-slate-900 dark:text-white">
            {formatCurrency(product.price * quantity)}
          </p>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => removeItem(product.id)}
            aria-label={`Remover ${product.name}`}
            className="text-slate-400 hover:text-red-600 dark:hover:text-red-400"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
