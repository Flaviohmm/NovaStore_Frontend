import { Link } from 'react-router-dom'
import { Store } from 'lucide-react'

export function Footer() {
  return (
    <footer className="mt-auto border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="mb-3 flex items-center gap-2 font-bold text-slate-900">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600 text-white">
                <Store className="h-4 w-4" />
              </span>
              NovaStore
            </div>
            <p className="text-sm leading-relaxed text-slate-500">
              Sua loja online com os melhores produtos, frete grátis acima de
              R$ 200 e entrega rápida em todo o Brasil.
            </p>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold text-slate-900">
              Navegação
            </h3>
            <ul className="space-y-2 text-sm text-slate-500">
              <li>
                <Link to="/" className="hover:text-brand-600">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/produtos" className="hover:text-brand-600">
                  Produtos
                </Link>
              </li>
              <li>
                <Link to="/carrinho" className="hover:text-brand-600">
                  Carrinho
                </Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-brand-600">
                  Login
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold text-slate-900">
              Categorias
            </h3>
            <ul className="space-y-2 text-sm text-slate-500">
              <li>
                <Link
                  to="/produtos?categoria=eletronicos"
                  className="hover:text-brand-600"
                >
                  Eletrônicos
                </Link>
              </li>
              <li>
                <Link
                  to="/produtos?categoria=roupas"
                  className="hover:text-brand-600"
                >
                  Roupas
                </Link>
              </li>
              <li>
                <Link
                  to="/produtos?categoria=casa"
                  className="hover:text-brand-600"
                >
                  Casa
                </Link>
              </li>
              <li>
                <Link
                  to="/produtos?categoria=esportes"
                  className="hover:text-brand-600"
                >
                  Esportes
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold text-slate-900">
              Atendimento
            </h3>
            <ul className="space-y-2 text-sm text-slate-500">
              <li>contato@novastore.com</li>
              <li>Seg–Sex, 9h–18h</li>
              <li>Frete grátis acima de R$ 200</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-slate-100 pt-6 text-center text-xs text-slate-400">
          © {new Date().getFullYear()} NovaStore. Todos os direitos reservados.
          Projeto demo com dados mock.
        </div>
      </div>
    </footer>
  )
}
