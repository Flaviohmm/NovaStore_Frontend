# NovaStore — Frontend de E-commerce

Frontend de e-commerce construído com React, Vite, TypeScript, Tailwind CSS, React Router e TanStack Query.

## Stack

- **React 19** + **TypeScript**
- **Vite 8** — build e dev server
- **Tailwind CSS 4** — estilização
- **React Router 7** — rotas
- **TanStack Query** — cache e fetching de dados
- **Lucide React** — ícones

## Páginas

| Rota | Página |
|------|--------|
| `/` | Home com hero, categorias e destaques |
| `/produtos` | Listagem com busca, filtros e ordenação |
| `/produtos/:id` | Detalhe do produto |
| `/carrinho` | Carrinho de compras |
| `/checkout` | Finalização do pedido |
| `/login` | Autenticação (mock) |

## Como rodar

```bash
npm install
npm run dev
```

```bash
npm run build   # build de produção
npm run preview # preview do build
```

## Estrutura

```
src/
├── api/           # Camada de dados mock (produtos, auth)
├── components/    # UI, layout, produto, carrinho
├── context/       # CartContext e AuthContext
├── data/          # Catálogo mock
├── hooks/         # Hooks TanStack Query
├── lib/           # Utilitários (formatação)
├── pages/         # Páginas da aplicação
└── types/         # Tipos TypeScript
```

## Dados mock

- 12 produtos em 6 categorias
- Login aceita qualquer e-mail e senha com 4+ caracteres
- Carrinho e sessão persistem no estado da app (auth no localStorage)
- Frete grátis em pedidos acima de R$ 200
