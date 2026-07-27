import type { CheckoutForm } from '@/types'
import { api } from './api'

export interface CreateOrderPayload extends CheckoutForm {
  items: Array<{ productId: string; quantity: number }>
}

interface CreatedOrder {
  id: string
}

export function createOrder(payload: CreateOrderPayload) {
  return api<CreatedOrder>('/orders', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}
