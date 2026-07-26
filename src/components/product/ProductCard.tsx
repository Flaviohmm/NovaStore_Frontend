import { Link } from 'react-router-dom'
import { ShoppingCart, Star } from 'lucide-react'
import type { Product } from '@/types'
import { formatCurrency, formatDiscount } from '@/lib/format'
import { useCart } from '@/context/CartContext'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart()
  const discount =
    product.originalPrice && product.originalPrice > product.price
      ? formatDiscount(product.price, product.originalPrice)
      : null

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:shadow-black/40">
      <Link to={`/produtos/${product.id}`} className="relative block overflow-hidden">
        <div className="aspect-square overflow-hidden bg-slate-100 dark:bg-slate-800">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
        </div>
        {discount && (
          <Badge variant="danger" className="absolute left-3 top-3">
            -{discount}%
          </Badge>
        )}
        {product.stock < 10 && product.stock > 0 && (
          <Badge variant="warning" className="absolute right-3 top-3">
            Últimas unidades
          </Badge>
        )}
      </Link>

      <div className="flex flex-1 flex-col p-4">
        <p className="mb-1 text-xs font-medium uppercase tracking-wide text-slate-400 dark:text-slate-500">
          {product.category}
        </p>
        <Link to={`/produtos/${product.id}`}>
          <h3 className="mb-2 line-clamp-2 text-sm font-semibold text-slate-900 transition-colors group-hover:text-brand-600 dark:text-slate-100 dark:group-hover:text-brand-400">
            {product.name}
          </h3>
        </Link>

        <div className="mb-3 flex items-center gap-1.5">
          <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
          <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
            {product.rating.toFixed(1)}
          </span>
          <span className="text-xs text-slate-400 dark:text-slate-500">
            ({product.reviewCount})
          </span>
        </div>

        <div className="mt-auto flex items-end justify-between gap-2">
          <div>
            {product.originalPrice && (
              <p className="text-xs text-slate-400 line-through dark:text-slate-500">
                {formatCurrency(product.originalPrice)}
              </p>
            )}
            <p className="text-lg font-bold text-slate-900 dark:text-white">
              {formatCurrency(product.price)}
            </p>
          </div>
          <Button
            size="sm"
            onClick={(e) => {
              e.preventDefault()
              addItem(product)
            }}
            disabled={product.stock === 0}
            aria-label={`Adicionar ${product.name} ao carrinho`}
          >
            <ShoppingCart className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </article>
  )
}
