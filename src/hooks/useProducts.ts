import { useQuery } from '@tanstack/react-query'
import {
  fetchFeaturedProducts,
  fetchProductById,
  fetchProducts,
  fetchRelatedProducts,
} from '@/api/products'
import type { ProductFilters } from '@/types'

export function useProducts(filters?: ProductFilters) {
  return useQuery({
    queryKey: ['products', filters],
    queryFn: () => fetchProducts(filters),
  })
}

export function useProduct(id: string) {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => fetchProductById(id),
    enabled: !!id,
  })
}

export function useFeaturedProducts() {
  return useQuery({
    queryKey: ['products', 'featured'],
    queryFn: fetchFeaturedProducts,
  })
}

export function useRelatedProducts(productId: string) {
  return useQuery({
    queryKey: ['products', 'related', productId],
    queryFn: () => fetchRelatedProducts(productId),
    enabled: !!productId,
  })
}
