const API_URL = (import.meta.env.VITE_API_URL ?? 'http://localhost:8080/api').replace(
  /\/$/,
  '',
)

interface ApiErrorBody {
  detail?: string
  message?: string
}

export async function api<T>(path: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  })

  if (response.status === 204) return undefined as T

  if (!response.ok) {
    const body = (await response.json().catch(() => ({}))) as ApiErrorBody
    throw new Error(body.detail ?? body.message ?? 'Não foi possível concluir a solicitação.')
  }

  return response.json() as Promise<T>
}
