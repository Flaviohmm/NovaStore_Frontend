export type Category =
  | 'eletronicos'
  | 'roupas'
  | 'casa'
  | 'esportes'
  | 'livros'
  | 'beleza'

export interface Product {
  id: string
  name: string
  description: string
  price: number
  originalPrice?: number
  image: string
  category: Category
  rating: number
  reviewCount: number
  stock: number
  featured?: boolean
  tags?: string[]
}

export interface CartItem {
  product: Product
  quantity: number
}

export interface User {
  id: string
  name: string
  email: string
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface CheckoutForm {
  fullName: string
  email: string
  phone: string
  address: string
  city: string
  state: string
  zipCode: string
  paymentMethod: 'credit' | 'pix' | 'boleto'
}

export interface ProductFilters {
  category?: Category | 'all'
  search?: string
  minPrice?: number
  maxPrice?: number
  sortBy?: 'name' | 'price-asc' | 'price-desc' | 'rating'
}
