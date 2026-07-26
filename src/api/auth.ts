import type { LoginCredentials, User } from '@/types'

const delay = (ms = 600) => new Promise((resolve) => setTimeout(resolve, ms))

const MOCK_USER: User = {
  id: '1',
  name: 'Maria Silva',
  email: 'maria@email.com',
}

export async function login(credentials: LoginCredentials): Promise<User> {
  await delay()

  if (!credentials.email || !credentials.password) {
    throw new Error('E-mail e senha são obrigatórios')
  }

  if (credentials.password.length < 4) {
    throw new Error('Senha inválida. Use qualquer senha com 4+ caracteres.')
  }

  return {
    ...MOCK_USER,
    email: credentials.email,
    name: credentials.email.split('@')[0] || MOCK_USER.name,
  }
}

export async function logout(): Promise<void> {
  await delay(200)
}
