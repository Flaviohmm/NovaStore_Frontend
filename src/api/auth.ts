import type { LoginCredentials, User } from '@/types'
import { api } from './api'

export async function login(credentials: LoginCredentials): Promise<User> {
  return api<User>('/auth/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  })
}

export async function logout(): Promise<void> {
  await api<void>('/auth/logout', { method: 'POST' })
}
