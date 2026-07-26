import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useProducts } from '@/hooks/useProducts'
import { ProductGrid } from '@/components/product/ProductGrid'
import { ProductFiltersBar } from '@/components/product/ProductFilters'
import type { Category, ProductFilters } from '@/types'

function filtersFromParams(searchParams: URLSearchParams): ProductFilters {
  return {
    search: searchParams.get('q') ?? '',
    category: (searchParams.get('categoria') as Category) || 'all',
    sortBy: undefined,
  }
}

export function Products() {
  const [searchParams] = useSearchParams()
  const [filters, setFilters] = useState<ProductFilters>(() =>
    filtersFromParams(searchParams),
  )

  useEffect(() => {
    setFilters(filtersFromParams(searchParams))
  }, [searchParams])

  const { data: products, isLoading, isError } = useProducts(filters)

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
          Produtos
        </h1>
        <p className="mt-1 text-slate-500 dark:text-slate-400">
          {isLoading
            ? 'Carregando catálogo...'
            : `${products?.length ?? 0} produtos encontrados`}
        </p>
      </div>

      <div className="mb-8">
        <ProductFiltersBar filters={filters} onChange={setFilters} />
      </div>

      {isError ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-300">
          Erro ao carregar produtos. Tente novamente.
        </div>
      ) : (
        <ProductGrid products={products} isLoading={isLoading} />
      )}
    </div>
  )
}
