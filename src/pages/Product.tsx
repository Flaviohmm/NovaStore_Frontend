import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  ArrowLeft,
  Check,
  Minus,
  Plus,
  ShoppingCart,
  Star,
  Truck,
} from 'lucide-react'
import { useProduct, useRelatedProducts } from '@/hooks/useProducts'
import { useCart } from '@/context/CartContext'
import { formatCurrency, formatDiscount } from '@/lib/format'
import { ProductGrid } from '@/components/product/ProductGrid'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Spinner } from '@/components/ui/Spinner'

export function Product() {
  const { id = '' } = useParams()
  const { data: product, isLoading, isError } = useProduct(id)
  const { data: related, isLoading: relatedLoading } = useRelatedProducts(id)
  const { addItem, getItemQuantity } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)

  if (isLoading) {
    return (
      <div className="flex min-h-96 items-center justify-center">
        <Spinner size="lg" />
      </div>
    )
  }

  if (isError || !product) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6">
        <h1 className="mb-2 text-2xl font-bold text-slate-900">
          Produto não encontrado
        </h1>
        <p className="mb-6 text-slate-500">
          O produto que você procura não existe ou foi removido.
        </p>
        <Link to="/produtos">
          <Button>
            <ArrowLeft className="h-4 w-4" />
            Voltar aos produtos
          </Button>
        </Link>
      </div>
    )
  }

  const discount =
    product.originalPrice && product.originalPrice > product.price
      ? formatDiscount(product.price, product.originalPrice)
      : null

  const inCart = getItemQuantity(product.id)

  const handleAdd = () => {
    addItem(product, quantity)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <Link
        to="/produtos"
        className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-brand-600"
      >
        <ArrowLeft className="h-4 w-4" />
        Voltar aos produtos
      </Link>

      <div className="grid gap-10 lg:grid-cols-2">
        <div className="relative overflow-hidden rounded-3xl bg-slate-100">
          <img
            src={product.image}
            alt={product.name}
            className="aspect-square w-full object-cover"
          />
          {discount && (
            <Badge variant="danger" className="absolute left-4 top-4 text-sm">
              -{discount}% OFF
            </Badge>
          )}
        </div>

        <div className="flex flex-col">
          <p className="mb-2 text-sm font-medium uppercase tracking-wide text-brand-600">
            {product.category}
          </p>
          <h1 className="mb-3 text-3xl font-bold text-slate-900 sm:text-4xl">
            {product.name}
          </h1>

          <div className="mb-6 flex items-center gap-2">
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < Math.round(product.rating)
                      ? 'fill-amber-400 text-amber-400'
                      : 'text-slate-200'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm font-medium text-slate-700">
              {product.rating.toFixed(1)}
            </span>
            <span className="text-sm text-slate-400">
              · {product.reviewCount} avaliações
            </span>
          </div>

          <div className="mb-6">
            {product.originalPrice && (
              <p className="text-sm text-slate-400 line-through">
                {formatCurrency(product.originalPrice)}
              </p>
            )}
            <p className="text-3xl font-bold text-slate-900">
              {formatCurrency(product.price)}
            </p>
            <p className="mt-1 text-sm text-slate-500">
              ou 10x de {formatCurrency(product.price / 10)} sem juros
            </p>
          </div>

          <p className="mb-8 leading-relaxed text-slate-600">
            {product.description}
          </p>

          <div className="mb-4 flex items-center gap-2 text-sm text-slate-600">
            <Truck className="h-4 w-4 text-brand-600" />
            Frete grátis acima de R$ 200
          </div>

          <div className="mb-6">
            {product.stock > 0 ? (
              <Badge variant="success">
                Em estoque ({product.stock} unidades)
              </Badge>
            ) : (
              <Badge variant="danger">Esgotado</Badge>
            )}
          </div>

          <div className="mt-auto flex flex-wrap items-center gap-4">
            <div className="flex items-center rounded-xl border border-slate-200 bg-white">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="flex h-12 w-12 items-center justify-center text-slate-500 hover:text-slate-900"
                aria-label="Diminuir"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-10 text-center font-semibold tabular-nums">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() =>
                  setQuantity((q) => Math.min(product.stock, q + 1))
                }
                disabled={quantity >= product.stock}
                className="flex h-12 w-12 items-center justify-center text-slate-500 hover:text-slate-900 disabled:opacity-40"
                aria-label="Aumentar"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>

            <Button
              size="lg"
              onClick={handleAdd}
              disabled={product.stock === 0}
              className="flex-1 sm:flex-none sm:min-w-48"
            >
              {added ? (
                <>
                  <Check className="h-4 w-4" />
                  Adicionado!
                </>
              ) : (
                <>
                  <ShoppingCart className="h-4 w-4" />
                  Adicionar ao carrinho
                </>
              )}
            </Button>
          </div>

          {inCart > 0 && (
            <p className="mt-3 text-sm text-slate-500">
              Você já tem {inCart} no carrinho.{' '}
              <Link
                to="/carrinho"
                className="font-medium text-brand-600 hover:underline"
              >
                Ver carrinho
              </Link>
            </p>
          )}
        </div>
      </div>

      {related && related.length > 0 && (
        <section className="mt-16">
          <h2 className="mb-6 text-2xl font-bold text-slate-900">
            Produtos relacionados
          </h2>
          <ProductGrid products={related} isLoading={relatedLoading} />
        </section>
      )}
    </div>
  )
}
