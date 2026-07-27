import type { Product, ProductFilters } from '@/types'
import { api } from './api'

function queryString(filters: ProductFilters = {}) {
  const params = new URLSearchParams()
  if (filters.category && filters.category !== 'all') params.set('category', filters.category)
  if (filters.search) params.set('search', filters.search)
  if (filters.minPrice !== undefined) params.set('minPrice', String(filters.minPrice))
  if (filters.maxPrice !== undefined) params.set('maxPrice', String(filters.maxPrice))
  if (filters.sortBy) params.set('sortBy', filters.sortBy)
  const query = params.toString()
  return query ? `?${query}` : ''
}

export async function fetchProducts(filters?: ProductFilters): Promise<Product[]> {
  return api<Product[]>(`/products${queryString(filters)}`)
}

export async function fetchProductById(id: string): Promise<Product | null> {
  try {
    return await api<Product>(`/products/${id}`)
  } catch (error) {
    if (error instanceof Error && error.message === 'Produto não encontrado') return null
    throw error
  }
}

export async function fetchFeaturedProducts(): Promise<Product[]> {
  return api<Product[]>('/products/featured')
}

export async function fetchRelatedProducts(
  productId: string,
  limit = 4,
): Promise<Product[]> {
  return api<Product[]>(`/products/${productId}/related?limit=${limit}`)
}
