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

Para usar o backend Spring Boot, inicie-o em outro terminal:

```bash
cd ecommerce-backend
mvn spring-boot:run
```

O frontend usa `http://localhost:8080/api` por padrão. Para outro endereço, crie um arquivo `.env.local` na raiz com `VITE_API_URL=http://seu-host:porta/api`.

```bash
npm run build   # build de produção
npm run preview # preview do build
```

## Estrutura

```
src/
├── api/           # Cliente HTTP e chamadas à API Spring Boot
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
