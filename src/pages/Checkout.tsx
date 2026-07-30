import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CheckCircle, CreditCard, QrCode, FileText } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import { useAuth } from '@/context/AuthContext'
import { formatCurrency } from '@/lib/format'
import { applyPhoneMask, applyCepMask } from '@/lib/masks'
import { CartSummary } from '@/components/cart/CartSummary'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { createOrder } from '@/api/orders'
import type { CheckoutForm } from '@/types'

const initialForm: CheckoutForm = {
  fullName: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  state: '',
  zipCode: '',
  paymentMethod: 'credit',
}

export function Checkout() {
  const { items, itemCount, subtotal, clearCart } = useCart()
  const { user, isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState<CheckoutForm>({
    ...initialForm,
    fullName: user?.name ?? '',
    email: user?.email ?? '',
  })
  const [errors, setErrors] = useState<Partial<Record<keyof CheckoutForm, string>>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [orderComplete, setOrderComplete] = useState(false)
  const [orderId, setOrderId] = useState('')
  const [submitError, setSubmitError] = useState('')

  if (itemCount === 0 && !orderComplete) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-20 text-center sm:px-6">
        <h1 className="mb-2 text-2xl font-bold text-slate-900 dark:text-white">
          Nenhum item no carrinho
        </h1>
        <p className="mb-8 text-slate-500 dark:text-slate-400">
          Adicione produtos antes de finalizar a compra.
        </p>
        <Link to="/produtos">
          <Button size="lg">Ver produtos</Button>
        </Link>
      </div>
    )
  }

  if (orderComplete) {
    return (
      <div className="mx-auto max-w-lg px-4 py-20 text-center sm:px-6">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-950">
          <CheckCircle className="h-10 w-10 text-emerald-600 dark:text-emerald-400" />
        </div>
        <h1 className="mb-2 text-2xl font-bold text-slate-900 dark:text-white">
          Pedido confirmado!
        </h1>
        <p className="mb-2 text-slate-500 dark:text-slate-400">
          Obrigado pela compra. Seu pedido foi recebido com sucesso.
        </p>
        <p className="mb-8 font-mono text-sm text-slate-400 dark:text-slate-500">
          Código: {orderId}
        </p>
        <div className="flex flex-col gap-2 sm:flex-row sm:justify-center">
          <Link to="/produtos">
            <Button size="lg">Continuar comprando</Button>
          </Link>
          <Link to="/">
            <Button size="lg" variant="outline">
              Ir para home
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  const update = (field: keyof CheckoutForm, value: string) => {
    const masked =
      field === 'phone'
        ? applyPhoneMask(value)
        : field === 'zipCode'
          ? applyCepMask(value)
          : value
    setForm((prev) => ({ ...prev, [field]: masked }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  const validate = (): boolean => {
    const next: typeof errors = {}
    if (!form.fullName.trim()) next.fullName = 'Nome obrigatório'
    if (!form.email.trim() || !form.email.includes('@'))
      next.email = 'E-mail inválido'
    if (!form.phone.trim()) next.phone = 'Telefone obrigatório'
    if (!form.address.trim()) next.address = 'Endereço obrigatório'
    if (!form.city.trim()) next.city = 'Cidade obrigatória'
    if (!form.state.trim()) next.state = 'Estado obrigatório'
    if (!form.zipCode.trim()) next.zipCode = 'CEP obrigatório'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    setIsSubmitting(true)
    setSubmitError('')
    try {
      const order = await createOrder({
        ...form,
        items: items.map((item) => ({
          productId: item.product.id,
          quantity: item.quantity,
        })),
      })
      setOrderId(order.id)
      clearCart()
      setOrderComplete(true)
    } catch (error) {
      setSubmitError(
        error instanceof Error ? error.message : 'Não foi possível finalizar o pedido.',
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  const shipping = subtotal >= 200 ? 0 : 19.9

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="mb-2 text-3xl font-bold text-slate-900 dark:text-white">
        Checkout
      </h1>
      <p className="mb-8 text-slate-500 dark:text-slate-400">
        Preencha seus dados para finalizar o pedido
      </p>

      {!isAuthenticated && (
        <div className="mb-6 rounded-xl border border-brand-200 bg-brand-50 px-4 py-3 text-sm text-brand-800 dark:border-brand-800 dark:bg-brand-950 dark:text-brand-200">
          Já tem conta?{' '}
          <button
            type="button"
            onClick={() => navigate('/login', { state: { from: '/checkout' } })}
            className="font-semibold underline hover:no-underline"
          >
            Faça login
          </button>{' '}
          para preencher automaticamente.
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {submitError && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-300">
            {submitError}
          </div>
        )}
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <h2 className="mb-4 text-lg font-semibold text-slate-900 dark:text-white">
                Dados de contato
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <Input
                    label="Nome completo"
                    value={form.fullName}
                    onChange={(e) => update('fullName', e.target.value)}
                    error={errors.fullName}
                    placeholder="Seu nome"
                  />
                </div>
                <Input
                  label="E-mail"
                  type="email"
                  value={form.email}
                  onChange={(e) => update('email', e.target.value)}
                  error={errors.email}
                  placeholder="voce@email.com"
                />
                <Input
                  label="Telefone"
                  value={form.phone}
                  onChange={(e) => update('phone', e.target.value)}
                  error={errors.phone}
                  placeholder="(11) 99999-9999"
                />
              </div>
            </section>

            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <h2 className="mb-4 text-lg font-semibold text-slate-900 dark:text-white">
                Endereço de entrega
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <Input
                    label="Endereço"
                    value={form.address}
                    onChange={(e) => update('address', e.target.value)}
                    error={errors.address}
                    placeholder="Rua, número, complemento"
                  />
                </div>
                <Input
                  label="Cidade"
                  value={form.city}
                  onChange={(e) => update('city', e.target.value)}
                  error={errors.city}
                />
                <Input
                  label="Estado"
                  value={form.state}
                  onChange={(e) => update('state', e.target.value)}
                  error={errors.state}
                  placeholder="SP"
                />
                <Input
                  label="CEP"
                  value={form.zipCode}
                  onChange={(e) => update('zipCode', e.target.value)}
                  error={errors.zipCode}
                  placeholder="00000-000"
                />
              </div>
            </section>

            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <h2 className="mb-4 text-lg font-semibold text-slate-900 dark:text-white">
                Forma de pagamento
              </h2>
              <div className="grid gap-3 sm:grid-cols-3">
                {(
                  [
                    {
                      value: 'credit',
                      label: 'Cartão',
                      icon: CreditCard,
                    },
                    { value: 'pix', label: 'Pix', icon: QrCode },
                    { value: 'boleto', label: 'Boleto', icon: FileText },
                  ] as const
                ).map((method) => (
                  <button
                    key={method.value}
                    type="button"
                    onClick={() => update('paymentMethod', method.value)}
                    className={`flex flex-col items-center gap-2 rounded-xl border-2 px-4 py-4 text-sm font-medium transition ${
                      form.paymentMethod === method.value
                        ? 'border-brand-600 bg-brand-50 text-brand-700 dark:border-brand-500 dark:bg-brand-950 dark:text-brand-300'
                        : 'border-slate-200 text-slate-600 hover:border-slate-300 dark:border-slate-700 dark:text-slate-300 dark:hover:border-slate-600'
                    }`}
                  >
                    <method.icon className="h-5 w-5" />
                    {method.label}
                  </button>
                ))}
              </div>
            </section>

            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 lg:hidden">
              <h2 className="mb-4 text-lg font-semibold text-slate-900 dark:text-white">
                Itens do pedido
              </h2>
              <ul className="space-y-3">
                {items.map((item) => (
                  <li
                    key={item.product.id}
                    className="flex justify-between text-sm"
                  >
                    <span className="text-slate-600 dark:text-slate-300">
                      {item.quantity}x {item.product.name}
                    </span>
                    <span className="font-medium dark:text-slate-100">
                      {formatCurrency(item.product.price * item.quantity)}
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <div className="space-y-4 lg:sticky lg:top-24 lg:self-start">
            <CartSummary showCheckoutButton={false} />

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <ul className="mb-4 hidden space-y-2 text-sm lg:block">
                {items.map((item) => (
                  <li
                    key={item.product.id}
                    className="flex justify-between gap-2"
                  >
                    <span className="truncate text-slate-500 dark:text-slate-400">
                      {item.quantity}x {item.product.name}
                    </span>
                    <span className="shrink-0 font-medium dark:text-slate-100">
                      {formatCurrency(item.product.price * item.quantity)}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mb-4 text-xs text-slate-400 dark:text-slate-500">
                Total com frete: {formatCurrency(subtotal + shipping)}
              </p>
              <Button
                type="submit"
                fullWidth
                size="lg"
                loading={isSubmitting}
              >
                Confirmar pedido
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
