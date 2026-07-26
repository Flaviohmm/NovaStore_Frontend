import type { Product } from '@/types'
import { ProductCard } from './ProductCard'
import { Spinner } from '@/components/ui/Spinner'

interface ProductGridProps {
  products?: Product[]
  isLoading?: boolean
  emptyMessage?: string
}

export function ProductGrid({
  products,
  isLoading,
  emptyMessage = 'Nenhum produto encontrado.',
}: ProductGridProps) {
  if (isLoading) {
    return (
      <div className="flex min-h-64 items-center justify-center">
        <Spinner size="lg" />
      </div>
    )
  }

  if (!products?.length) {
    return (
      <div className="flex min-h-64 flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center dark:border-slate-700 dark:bg-slate-900">
        <p className="text-slate-500 dark:text-slate-400">{emptyMessage}</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
