import { Link } from 'react-router-dom'
import {
  ArrowRight,
  Package,
  Shield,
  Truck,
  Headphones,
} from 'lucide-react'
import { useFeaturedProducts } from '@/hooks/useProducts'
import { ProductGrid } from '@/components/product/ProductGrid'
import { Button } from '@/components/ui/Button'
import { categories } from '@/data/products'

const benefits = [
  {
    icon: Truck,
    title: 'Frete grátis',
    description: 'Em compras acima de R$ 200 para todo o Brasil',
  },
  {
    icon: Shield,
    title: 'Compra segura',
    description: 'Pagamento protegido e dados criptografados',
  },
  {
    icon: Package,
    title: 'Troca fácil',
    description: 'Até 30 dias para trocar ou devolver',
  },
  {
    icon: Headphones,
    title: 'Suporte 24/7',
    description: 'Atendimento humano quando você precisar',
  },
]

export function Home() {
  const { data: featured, isLoading } = useFeaturedProducts()

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-950 via-brand-900 to-brand-700 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-brand-400/20 via-transparent to-transparent" />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8 lg:py-28">
          <div>
            <p className="mb-4 inline-flex rounded-full bg-white/10 px-3 py-1 text-xs font-medium uppercase tracking-wider text-brand-100 backdrop-blur">
              Nova coleção 2026
            </p>
            <h1 className="mb-5 text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Tudo o que você precisa,{' '}
              <span className="text-brand-300">em um só lugar</span>
            </h1>
            <p className="mb-8 max-w-lg text-lg text-brand-100/90">
              Descubra produtos selecionados com os melhores preços, frete
              grátis e entrega rápida. Qualidade garantida na NovaStore.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/produtos">
                <Button
                  size="lg"
                  className="bg-white text-brand-900 hover:bg-brand-50"
                >
                  Ver produtos
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link to="/produtos?categoria=eletronicos">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/30 bg-transparent text-white hover:bg-white/10 dark:border-white/30 dark:bg-transparent dark:text-white dark:hover:bg-white/10"
                >
                  Eletrônicos
                </Button>
              </Link>
            </div>
          </div>

          <div className="relative hidden lg:block">
            <div className="grid grid-cols-2 gap-4">
              <img
                src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=500&fit=crop"
                alt="Produto em destaque"
                className="h-64 w-full rounded-2xl object-cover shadow-2xl shadow-black/30"
              />
              <img
                src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=500&fit=crop"
                alt="Produto em destaque"
                className="mt-8 h-64 w-full rounded-2xl object-cover shadow-2xl shadow-black/30"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 py-10 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
          {benefits.map((item) => (
            <div key={item.title} className="flex gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-950 dark:text-brand-400">
                <item.icon className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                  {item.title}
                </h3>
                <p className="text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              Categorias
            </h2>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Explore por tipo de produto
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {categories
            .filter((c) => c.id !== 'all')
            .map((cat) => (
              <Link
                key={cat.id}
                to={`/produtos?categoria=${cat.id}`}
                className="rounded-2xl border border-slate-200 bg-white px-4 py-6 text-center text-sm font-medium text-slate-700 shadow-sm transition hover:border-brand-300 hover:bg-brand-50 hover:text-brand-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-brand-700 dark:hover:bg-brand-950 dark:hover:text-brand-300"
              >
                {cat.label}
              </Link>
            ))}
        </div>
      </section>

      {/* Featured */}
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              Destaques da semana
            </h2>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Produtos selecionados com os melhores preços
            </p>
          </div>
          <Link
            to="/produtos"
            className="hidden items-center gap-1 text-sm font-medium text-brand-600 hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300 sm:flex"
          >
            Ver todos
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <ProductGrid products={featured} isLoading={isLoading} />
      </section>
    </div>
  )
}
