import { products } from '@/data/products'
import type { Product, ProductFilters } from '@/types'

const delay = (ms = 400) => new Promise((resolve) => setTimeout(resolve, ms))

export async function fetchProducts(filters?: ProductFilters): Promise<Product[]> {
  await delay()

  let result = [...products]

  if (filters?.category && filters.category !== 'all') {
    result = result.filter((p) => p.category === filters.category)
  }

  if (filters?.search) {
    const term = filters.search.toLowerCase()
    result = result.filter(
      (p) =>
        p.name.toLowerCase().includes(term) ||
        p.description.toLowerCase().includes(term) ||
        p.tags?.some((t) => t.toLowerCase().includes(term)),
    )
  }

  if (filters?.minPrice !== undefined) {
    result = result.filter((p) => p.price >= filters.minPrice!)
  }

  if (filters?.maxPrice !== undefined) {
    result = result.filter((p) => p.price <= filters.maxPrice!)
  }

  switch (filters?.sortBy) {
    case 'name':
      result.sort((a, b) => a.name.localeCompare(b.name))
      break
    case 'price-asc':
      result.sort((a, b) => a.price - b.price)
      break
    case 'price-desc':
      result.sort((a, b) => b.price - a.price)
      break
    case 'rating':
      result.sort((a, b) => b.rating - a.rating)
      break
  }

  return result
}

export async function fetchProductById(id: string): Promise<Product | null> {
  await delay(300)
  return products.find((p) => p.id === id) ?? null
}

export async function fetchFeaturedProducts(): Promise<Product[]> {
  await delay(300)
  return products.filter((p) => p.featured)
}

export async function fetchRelatedProducts(
  productId: string,
  limit = 4,
): Promise<Product[]> {
  await delay(300)
  const product = products.find((p) => p.id === productId)
  if (!product) return []

  return products
    .filter((p) => p.category === product.category && p.id !== productId)
    .slice(0, limit)
}
