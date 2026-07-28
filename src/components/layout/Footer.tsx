import { Link } from 'react-router-dom'
import { Logo } from './Logo'

export function Footer() {
  return (
    <footer className="mt-auto border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link
              to="/"
              className="mb-3 inline-block rounded-lg transition-opacity hover:opacity-85"
              aria-label="Página inicial da NovaStore"
            >
              <Logo className="h-12 w-40" />
            </Link>
            <p className="text-sm leading-relaxed text-slate-500 dark:text-slate-400">
              Sua loja online com os melhores produtos, frete grátis acima de
              R$ 200 e entrega rápida em todo o Brasil.
            </p>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold text-slate-900 dark:text-white">
              Navegação
            </h3>
            <ul className="space-y-2 text-sm text-slate-500 dark:text-slate-400">
              <li>
                <Link to="/" className="hover:text-brand-600 dark:hover:text-brand-400">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/produtos"
                  className="hover:text-brand-600 dark:hover:text-brand-400"
                >
                  Produtos
                </Link>
              </li>
              <li>
                <Link
                  to="/carrinho"
                  className="hover:text-brand-600 dark:hover:text-brand-400"
                >
                  Carrinho
                </Link>
              </li>
              <li>
                <Link
                  to="/login"
                  className="hover:text-brand-600 dark:hover:text-brand-400"
                >
                  Login
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold text-slate-900 dark:text-white">
              Categorias
            </h3>
            <ul className="space-y-2 text-sm text-slate-500 dark:text-slate-400">
              <li>
                <Link
                  to="/produtos?categoria=eletronicos"
                  className="hover:text-brand-600 dark:hover:text-brand-400"
                >
                  Eletrônicos
                </Link>
              </li>
              <li>
                <Link
                  to="/produtos?categoria=roupas"
                  className="hover:text-brand-600 dark:hover:text-brand-400"
                >
                  Roupas
                </Link>
              </li>
              <li>
                <Link
                  to="/produtos?categoria=casa"
                  className="hover:text-brand-600 dark:hover:text-brand-400"
                >
                  Casa
                </Link>
              </li>
              <li>
                <Link
                  to="/produtos?categoria=esportes"
                  className="hover:text-brand-600 dark:hover:text-brand-400"
                >
                  Esportes
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold text-slate-900 dark:text-white">
              Atendimento
            </h3>
            <ul className="space-y-2 text-sm text-slate-500 dark:text-slate-400">
              <li>contato@novastore.com</li>
              <li>Seg–Sex, 9h–18h</li>
              <li>Frete grátis acima de R$ 200</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-slate-100 pt-6 text-center text-xs text-slate-400 dark:border-slate-800 dark:text-slate-500">
          © {new Date().getFullYear()} NovaStore. Todos os direitos reservados.
          Projeto demo com dados mock.
        </div>
      </div>
    </footer>
  )
}
