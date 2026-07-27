# Digital Wallet - Front End

Aplicação front-end de uma carteira digital. Permite que usuários se registrem, façam login, visualizem saldos, realizem depósitos, transferências e reversões de transações.

## Stack Tecnológica

| Categoria | Tecnologia | Versão |
|---|---|---|
| Framework | Next.js (App Router) | 16.2.12 |
| Linguagem | TypeScript | ^5 |
| UI Library | React | 19.2.4 |
| Estilo | Tailwind CSS v4 + PostCSS | ^4 |
| Componentes | shadcn/ui (base-nova) | ^4.15.0 |
| Formulários | React Hook Form + Zod | ^7.83.0 / ^4.4.3 |
| State/Data Fetching | TanStack React Query | ^5.101.4 |
| HTTP Client | Axios | ^1.18.1 |
| Ícones | Lucide React | ^1.27.0 |
| Toast Notifications | Sonner | ^2.0.7 |
| Cookie Management | js-cookie | ^3.0.8 |
| Tema | next-themes | ^0.4.6 |
| Fonte | Manrope (Google Fonts) | — |

## Estrutura do Projeto

```
digital-wallet-front-end/
├── .env.local                         # Variáveis de ambiente (NEXT_PUBLIC_API_URL)
├── components.json                    # Configuração shadcn/ui
├── next.config.ts                     # Configuração Next.js (React Compiler habilitado)
├── tsconfig.json                      # Configuração TypeScript
│
└── src/
    ├── middleware.ts                   # Middleware de rotas (auth guard)
    │
    ├── app/                           # Next.js App Router
    │   ├── layout.tsx                 # Layout raiz (Manrope, pt-BR)
    │   ├── page.tsx                   # Home (redireciona para /login ou /dashboard)
    │   ├── globals.css                # Tailwind + tema shadcn
    │   │
    │   ├── (auth)/                    # Rotas públicas de autenticação
    │   │   ├── layout.tsx             # Auth guard (client-side)
    │   │   ├── login/page.tsx         # Página de login
    │   │   └── register/page.tsx      # Página de registro
    │   │
    │   └── (private)/                 # Rotas protegidas
    │       ├── layout.tsx             # Auth guard (client-side)
    │       └── dashboard/page.tsx     # Dashboard principal (SSR)
    │
    ├── actions/                       # Server Actions
    │   ├── login.ts                   # Login (POST /auth/login)
    │   ├── register.ts               # Registro (POST /auth/register)
    │   ├── logout.ts                  # Logout (deleta cookie)
    │   ├── deposit.ts                 # Depósito (POST /transactions/deposit)
    │   ├── transfer.ts               # Transferência (POST /transactions/transfer)
    │   └── reverse.ts                 # Reversão (POST /transactions/:id/reverse)
    │
    ├── components/
    │   ├── cards/                     # BalanceCard, SummaryCards
    │   ├── dashboard/                 # DepositCard
    │   ├── forms/                     # LoginForm, RegisterForm, TransferForm
    │   ├── layout/                    # Header
    │   ├── tables/                    # HistoryTable, ReverseButton
    │   └── ui/                        # Componentes shadcn/ui (11 arquivos)
    │
    ├── hooks/
    │   └── use-auth.ts               # Hook de autenticação (AuthContext)
    │
    ├── lib/
    │   ├── api-server.ts              # Axios server-side (sem interceptor)
    │   ├── formatters.ts             # Formatação de moeda (BRL) e datas (pt-BR)
    │   ├── login-schema.ts           # Schema Zod para login
    │   ├── register-schema.ts        # Schema Zod para registro
    │   ├── transfer-schema.ts        # Schema Zod para transferências
    │   ├── react-query.tsx           # React Query provider
    │   └── utils.ts                  # Utilitário cn() (clsx + tailwind-merge)
    │
    ├── services/                      # Camada de serviço (Axios)
    │   ├── api.ts                     # Axios client-side (com interceptor de token)
    │   ├── auth.ts                    # Funções de autenticação
    │   ├── transaction.ts            # Funções de transação
    │   └── user.ts                    # Funções de usuário
    │
    └── types/
        └── dashboard.ts              # Interfaces TypeScript
```

## Funcionalidades

### 1. Sistema de Autenticação
- **Registro:** Nome, email e senha com validação Zod (mín. 3 caracteres nome, email válido, mín. 6 caracteres senha)
- **Login:** Autenticação por email e senha
- **Logout:** Deleta o cookie httpOnly com o token JWT e redireciona para `/login`
- **Auth Guards:** Verificação server-side (middleware) e client-side (layouts)

### 2. Dashboard (Protegido)
Renderizado no servidor (SSR), busca em paralelo via `Promise.all`:
- **Perfil do usuário** (`/users/me`)
- **Resumo de transações** (`/transactions/summary`)
- **Histórico de transações** (`/transactions`)

#### Componentes do Dashboard:
- **BalanceCard:** Card com gradiente escuro exibindo saldo e número da conta em BRL
- **SummaryCards:** Três cards com totais recebido, enviado e depositado
- **TransferForm:** Formulário para enviar dinheiro para outra conta
- **DepositCard:** Formulário para depositar fundos
- **HistoryTable:** Tabela de histórico com ícones por tipo, badges de direção (Entrada/Saída) e status (Concluída/Revertida)
- **ReverseButton:** Botão para reverter transferências concluídas

### 3. Server Actions (6 actions)
Todas as mutações são executadas via Next.js Server Actions:
- `loginAction` / `registerAction` — Configuram cookies httpOnly com JWT
- `logoutAction` — Deleta o cookie
- `depositAction` / `transferAction` / `reverseAction` — Chamam a API backend com Bearer token e invalidam cache via `revalidatePath('/dashboard')`

### 4. UI/UX
- Tema claro/escuro via oklch CSS custom properties
- Componentes shadcn/ui com estilo base-nova (primitivas @base-ui/react)
- Ícones Lucide React
- Toast notifications via Sonner
- Fonte Manrope (Google Fonts)
- React Compiler habilitado para memoização automática

## Endpoints da API Backend

A aplicação espera um backend rodando na URL definida em `NEXT_PUBLIC_API_URL`.

| Endpoint | Método | Descrição |
|---|---|---|
| `/auth/login` | POST | Autenticar usuário |
| `/auth/register` | POST | Registrar novo usuário |
| `/users/me` | GET | Obter perfil do usuário atual |
| `/transactions` | GET | Obter histórico de transações |
| `/transactions/summary` | GET | Obter resumo de transações |
| `/transactions/deposit` | POST | Realizar depósito |
| `/transactions/transfer` | POST | Realizar transferência |
| `/transactions/:id/reverse` | POST | Reverter transferência |

### Formato das Respostas (inferido do frontend)

**Auth Response:**
```json
{
  "accessToken": "string",
  "user": { "id": "string", "name": "string", "email": "string", "accountNumber": "string" }
}
```

**User Profile:**
```json
{
  "id": "string",
  "name": "string",
  "email": "string",
  "accountNumber": "string",
  "balance": "number"
}
```

**Transaction Summary:**
```json
{
  "balance": "number",
  "totalReceived": "number",
  "totalSent": "number",
  "totalDeposited": "number",
  "totalTransferred": "number",
  "totalTransactions": "number"
}
```

**Transaction History:**
```json
[
  {
    "id": "string",
    "type": "string",
    "direction": "IN | OUT",
    "amount": "number",
    "status": "string",
    "user": { "id": "string", "name": "string" },
    "accountNumber": "string",
    "createdAt": "string (ISO date)"
  }
]
```

## Pré-requisitos

- Node.js v20+ (baseado na versão de `@types/node`)
- npm ou outro gerenciador de pacotes
- Backend API rodando

## Instalação e Configuração

1. **Clonar o repositório:**
   ```bash
   git clone <url-do-repositorio>
   cd digital-wallet-front-end
   ```

2. **Instalar dependências:**
   ```bash
   npm install
   ```

3. **Configurar variáveis de ambiente:**
   Crie o arquivo `.env.local` na raiz do projeto:
   ```
   NEXT_PUBLIC_API_URL=http://localhost:3000
   ```
   > Ajuste a URL conforme a porta do seu backend.

4. **Iniciar o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```

5. Acesse [http://localhost:3001](http://localhost:3001)

> **Nota:** A porta padrão do Next.js (3000) pode conflitar com o backend. Se necessário, inicie com `npm run dev -- -p 3001`.

## Scripts Disponíveis

| Script | Comando | Descrição |
|---|---|---|
| `dev` | `next dev` | Servidor de desenvolvimento (Turbopack) |
| `build` | `next build` | Build de produção |
| `start` | `next start` | Iniciar servidor de produção |
| `lint` | `eslint` | Executar ESLint |

## Arquitetura

### Camadas de API
- **Client-side** (`src/services/api.ts`): Axios com interceptor que lê token de cookies via `js-cookie`
- **Server-side** (`src/lib/api-server.ts`): Axios sem interceptor, token passado manualmente (padrão correto para Next.js App Router)

### Validação
- Schemas Zod para formulários de login, registro e transferência
- Integração com React Hook Form via `@hookform/resolvers`


