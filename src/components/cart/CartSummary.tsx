import { Link } from 'react-router-dom'
import { formatCurrency } from '@/lib/format'
import { useCart } from '@/context/CartContext'
import { Button } from '@/components/ui/Button'

interface CartSummaryProps {
  showCheckoutButton?: boolean
}

export function CartSummary({ showCheckoutButton = true }: CartSummaryProps) {
  const { subtotal, itemCount } = useCart()
  const shipping = subtotal >= 200 || subtotal === 0 ? 0 : 19.9
  const total = subtotal + shipping

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <h2 className="mb-4 text-lg font-semibold text-slate-900 dark:text-white">
        Resumo do pedido
      </h2>

      <dl className="space-y-3 text-sm">
        <div className="flex justify-between">
          <dt className="text-slate-500 dark:text-slate-400">
            Subtotal ({itemCount} {itemCount === 1 ? 'item' : 'itens'})
          </dt>
          <dd className="font-medium text-slate-900 dark:text-slate-100">
            {formatCurrency(subtotal)}
          </dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-slate-500 dark:text-slate-400">Frete</dt>
          <dd className="font-medium text-slate-900 dark:text-slate-100">
            {shipping === 0 ? (
              <span className="text-emerald-600 dark:text-emerald-400">Grátis</span>
            ) : (
              formatCurrency(shipping)
            )}
          </dd>
        </div>
        {subtotal > 0 && subtotal < 200 && (
          <p className="rounded-lg bg-brand-50 px-3 py-2 text-xs text-brand-700 dark:bg-brand-950 dark:text-brand-300">
            Faltam {formatCurrency(200 - subtotal)} para frete grátis!
          </p>
        )}
        <div className="flex justify-between border-t border-slate-100 pt-3 dark:border-slate-800">
          <dt className="text-base font-semibold text-slate-900 dark:text-white">
            Total
          </dt>
          <dd className="text-base font-bold text-slate-900 dark:text-white">
            {formatCurrency(total)}
          </dd>
        </div>
      </dl>

      {showCheckoutButton && (
        <div className="mt-6 space-y-2">
          <Link to="/checkout" className="block">
            <Button fullWidth size="lg" disabled={itemCount === 0}>
              Finalizar compra
            </Button>
          </Link>
          <Link to="/produtos" className="block">
            <Button fullWidth variant="outline">
              Continuar comprando
            </Button>
          </Link>
        </div>
      )}
    </div>
  )
}
