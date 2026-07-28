import { useEffect, useState, type FormEvent } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Lock, Mail, Store, UserRound } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { useAuth } from '@/context/AuthContext'

interface RegisterForm {
  name: string
  email: string
  password: string
  confirmPassword: string
}

const initialForm: RegisterForm = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
}

export function Register() {
  const { register, isLoading, isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = (location.state as { from?: string } | null)?.from ?? '/'
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState<Partial<Record<keyof RegisterForm, string>>>({})
  const [submitError, setSubmitError] = useState('')

  useEffect(() => {
    if (isAuthenticated) navigate(from, { replace: true })
  }, [from, isAuthenticated, navigate])

  const update = (field: keyof RegisterForm, value: string) => {
    setForm((current) => ({ ...current, [field]: value }))
    if (errors[field]) setErrors((current) => ({ ...current, [field]: undefined }))
  }

  const validate = () => {
    const next: typeof errors = {}
    if (form.name.trim().length < 3) next.name = 'Informe seu nome completo'
    if (!form.email.includes('@')) next.email = 'Informe um e-mail válido'
    if (form.password.length < 4) next.password = 'A senha deve ter pelo menos 4 caracteres'
    if (form.password !== form.confirmPassword) next.confirmPassword = 'As senhas não coincidem'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    if (!validate()) return

    setSubmitError('')
    try {
      await register({ name: form.name.trim(), email: form.email.trim(), password: form.password })
      navigate(from, { replace: true })
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'Não foi possível criar sua conta.')
    }
  }

  return (
    <div className="flex min-h-[calc(100vh-8rem)] items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-600 text-white shadow-lg shadow-brand-600/30">
            <Store className="h-7 w-7" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Crie sua conta</h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Cadastre-se para comprar na NovaStore</p>
        </div>

        <form onSubmit={handleSubmit} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 dark:border-slate-800 dark:bg-slate-900">
          <div className="space-y-4">
            <Input label="Nome completo" name="name" autoComplete="name" value={form.name} onChange={(event) => update('name', event.target.value)} error={errors.name} placeholder="Seu nome" leftIcon={<UserRound className="h-4 w-4" />} required />
            <Input label="E-mail" type="email" name="email" autoComplete="email" value={form.email} onChange={(event) => update('email', event.target.value)} error={errors.email} placeholder="voce@email.com" leftIcon={<Mail className="h-4 w-4" />} required />
            <Input label="Senha" type="password" name="password" autoComplete="new-password" value={form.password} onChange={(event) => update('password', event.target.value)} error={errors.password} hint="Use pelo menos 4 caracteres" placeholder="••••••••" leftIcon={<Lock className="h-4 w-4" />} required />
            <Input label="Confirmar senha" type="password" name="confirmPassword" autoComplete="new-password" value={form.confirmPassword} onChange={(event) => update('confirmPassword', event.target.value)} error={errors.confirmPassword} placeholder="••••••••" leftIcon={<Lock className="h-4 w-4" />} required />
          </div>

          {submitError && <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-300">{submitError}</div>}

          <Button type="submit" fullWidth size="lg" loading={isLoading} className="mt-6">Criar conta</Button>

          <p className="mt-6 text-center text-sm text-slate-500 dark:text-slate-400">
            Já tem uma conta? <Link to="/login" className="font-medium text-brand-600 hover:underline dark:text-brand-400">Entrar</Link>
          </p>
        </form>
      </div>
    </div>
  )
}
