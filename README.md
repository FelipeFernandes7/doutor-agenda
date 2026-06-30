# Doutor Agenda

Aplicação full-stack para gestão de clínicas, com agenda, cadastro de pacientes e médicos, painel analítico e assinatura via Stripe.

## Visão Geral

O Doutor Agenda é uma plataforma SaaS orientada a pequenas clínicas e profissionais de saúde que precisam organizar agendamentos, manter um cadastro estruturado de pacientes e médicos, e acompanhar indicadores operacionais do consultório.

A solução foi construída com Next.js App Router, Better Auth para autenticação, Drizzle ORM com PostgreSQL e Stripe para pagamentos recorrentes.

## Principais Funcionalidades

- Autenticação com e-mail/senha e login social via Google
- Criação e gerenciamento de clínicas vinculadas ao usuário
- Cadastro de médicos com especialidade, disponibilidade e preço de consulta
- Cadastro de pacientes com dados básicos de contato e sexo
- Agendamento de consultas com validação de horários disponíveis
- Dashboard com KPIs financeiros e operacionais
- Plano Essentials com checkout e portal de gerenciamento via Stripe
- Webhook para sincronizar status de assinatura e ativar/desativar acesso conforme assinatura

## Stack Tecnológica

| Categoria                        | Tecnologia                                         |
| -------------------------------- | -------------------------------------------------- |
| Framework                        | Next.js 16.2.9                                     |
| Linguagem                        | TypeScript                                         |
| UI                               | React 19, Tailwind CSS, shadcn-style UI primitives |
| Backend                          | Next.js Server Components, Server Actions          |
| ORM                              | Drizzle ORM                                        |
| Banco de Dados                   | PostgreSQL                                         |
| Autenticação                     | Better Auth                                        |
| Pagamentos                       | Stripe                                             |
| Requisições assíncronas          | TanStack Query                                     |
| Validação                        | Zod                                                |
| Formulários                      | React Hook Form + @hookform/resolvers              |
| Gerenciamento de estado de query | Nuqs                                               |

## Arquitetura da Aplicação

A aplicação segue um modelo monolito modular com separação clara entre:

- Camada de apresentação: rotas e componentes no diretório `src/app`
- Camada de domínio e integração: server actions em `src/actions`
- Camada de dados: schemas e conexão com PostgreSQL em `src/db`
- Camada de autenticação e sessão: `src/lib/auth.ts`
- Camada compartilhada: utilidades, helpers e providers

### Fluxo principal

1. O usuário acessa a aplicação e realiza login.
2. O sistema verifica se a conta já possui uma clínica vinculada.
3. Caso não haja clínica, o usuário é direcionado ao fluxo de cadastro da clínica.
4. Caso o plano não esteja ativo, a rota de assinatura é exibida.
5. Após ativação, o usuário pode gerenciar médicos, pacientes e agendamentos.
6. O dashboard exibe indicadores e agenda do dia.
7. O webhook do Stripe atualiza o status do usuário e o plano após pagamento ou cancelamento.

## Estrutura de Pastas

```text
src/
├── actions/                  # Server actions com regras de negócio
│   ├── create-appointment/
│   ├── create-clinic/
│   ├── create-stripe-checkout/
│   ├── delete-appointment/
│   ├── delete-doctor/
│   ├── delete-patient/
│   ├── get-available-times/
│   ├── upsert-doctor/
│   └── upsert-patient/
├── app/                      # Rotas App Router do Next.js
│   ├── (protected)/          # Rotas privadas
│   ├── api/                  # Endpoints da API
│   ├── authentication/      # Login e registro
│   ├── new-subscription/    # Fluxo de assinatura
│   └── layout.tsx            # Layout global
├── components/               # Componentes de UI reutilizáveis
│   └── ui/
├── data/                     # Consultas de leitura para dashboard
├── db/                       # Configuração do banco e schemas do Drizzle
├── helpers/                  # Funções utilitárias e cálculos
├── hooks/                    # Hooks reutilizáveis
├── lib/                      # Configuração de bibliotecas externas
└── providers/                # Providers globais como React Query
```

## Pré-requisitos

Antes de iniciar o projeto, certifique-se de que você possui:

- Node.js 20+ LTS
- npm 10+ ou outro gerenciador compatível
- PostgreSQL 14+ disponível localmente ou em nuvem
- Conta no Stripe com chaves de teste ou produção
- Credenciais OAuth do Google para login social
- Um domínio público para produção, caso queira testar webhooks com HTTPS

## Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto com as seguintes variáveis:

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DB_NAME?sslmode=require"

BETTER_AUTH_SECRET="seu-segredo-aleatorio"
BETTER_AUTH_URL="http://localhost:3000"

GOOGLE_CLIENT_ID="seu-google-client-id"
GOOGLE_CLIENT_SECRET="sua-google-client-secret"

NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_ESSENTIAL_PLAN_PRICE_ID="price_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

NEXT_PUBLIC_APP_URL="http://localhost:3000"
NEXT_PUBLIC_STRIPE_CUSTOMER_PORTAL_URL="https://billing.stripe.com/..."
```

### Descrição das variáveis

- `DATABASE_URL`: conexão com o PostgreSQL utilizado pelo Drizzle.
- `BETTER_AUTH_SECRET`: segredo para assinatura dos tokens de sessão.
- `BETTER_AUTH_URL`: URL base da aplicação para autenticação.
- `GOOGLE_CLIENT_ID` e `GOOGLE_CLIENT_SECRET`: credenciais OAuth do Google.
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`: chave pública do Stripe para o frontend.
- `STRIPE_SECRET_KEY`: chave privada do Stripe para criação de checkout e webhooks.
- `STRIPE_ESSENTIAL_PLAN_PRICE_ID`: ID do preço do plano Essentials do Stripe.
- `STRIPE_WEBHOOK_SECRET`: segredo do endpoint de webhook para validação de eventos.
- `NEXT_PUBLIC_APP_URL`: URL pública da aplicação para redirects e success URLs.
- `NEXT_PUBLIC_STRIPE_CUSTOMER_PORTAL_URL`: link do portal de cobrança do Stripe.

## Instalação

```bash
git clone https://github.com/FelipeFernandes7/doutor-agenda.git
cd doutor-agenda
npm install
```

## Configuração do Banco de Dados

O projeto utiliza Drizzle para modelagem e migrations.

```bash
npx drizzle-kit generate
npx drizzle-kit migrate
```

Se você preferir abrir o studio visual do banco:

```bash
npx drizzle-kit studio
```

## Execução Local

```bash
npm run dev
```

A aplicação ficará disponível em:

```text
http://localhost:3000
```

## Scripts Disponíveis

| Script          | Descrição                                       |
| --------------- | ----------------------------------------------- |
| `npm run dev`   | Inicia o servidor de desenvolvimento do Next.js |
| `npm run build` | Gera a build de produção                        |
| `npm run start` | Inicia a aplicação em modo produção             |
| `npm run lint`  | Executa análise estática com Next.js ESLint     |

## Fluxo da Aplicação

### 1. Cadastro e acesso

- O usuário cria conta ou faz login com Google.
- O sistema cria a sessão com Better Auth.
- Se o usuário ainda não possui clínica, é levado para a tela de criação da clínica.

### 2. Gestão da clínica

- Após definir a clínica, o usuário pode cadastrar médicos e pacientes.
- Cada médico possui disponibilidade semanal e faixa horária.
- Cada paciente possui dados básicos para organização dos atendimentos.

### 3. Agendamento

- O usuário seleciona paciente, médico e data.
- O backend valida se o horário está dentro da disponibilidade do médico.
- O sistema impede duplicidade de agendamento para um mesmo horário.

### 4. Assinatura e cobranças

- O plano Essential é acessado pelo fluxo de assinatura.
- O usuário é redirecionado para o Checkout do Stripe.
- O webhook recebe eventos como `invoice.paid` e `customer.subscription.deleted`.
- O status da assinatura é persistido no usuário no banco.

## Decisões Técnicas e Padrões

- Uso de App Router para estruturação modular e roteamento baseado em arquivos.
- Server Actions para operações sensíveis e mutations com autenticação já integrada.
- Zod para validação de entrada e segurança nas ações do servidor.
- Drizzle ORM para evitar SQL manual e manter schema versionado.
- Separação entre leitura e escrita em `src/data`, `src/actions` e `src/db`.
- `next-safe-action` para padronizar respostas e erros nas actions.
- Rotas privadas organizadas em um grupo `(protected)` para facilitar controle de acesso.

## Boas Práticas Adotadas

- Autenticação centralizada em um único ponto (`src/lib/auth.ts`)
- Sessão validada em rotas administrativas antes de acessar dados sensíveis
- Redirecionamentos automáticos para onboarding de clínica e assinatura
- Revalidação de cache após criação de agendamentos para manter a UI consistente
- Uso de tipos fortes com TypeScript e schemas compartilhados
- Configuração sensível mantida em variáveis de ambiente, nunca hardcoded
- Componentes reutilizáveis e focados em responsabilidade única

## Deploy em Produção

### Recomendação: Vercel

1. Crie um projeto no Vercel vinculando este repositório.
2. Configure as variáveis de ambiente listadas acima no painel do Vercel.
3. Defina `NEXT_PUBLIC_APP_URL` com a URL pública da aplicação.
4. Configure o webhook do Stripe para o endpoint:

```text
https://SEU-DOMINIO/api/stripe/webhook
```

5. Execute as migrations antes do primeiro deploy ou em um pipeline de deploy:

```bash
npx drizzle-kit migrate
```

6. Faça o deploy da aplicação.

### Exemplo de deploy com Vercel

```bash
npm run build
```

O Vercel cuidará do deploy automático após o push para o repositório, desde que as variáveis estejam configuradas.

## Melhorias Futuras

- Implementação de testes unitários e de integração
- Sistema de lembretes por e-mail/SMS para consultas
- Controle de permissões por perfil (administrador, recepcionista, médico)
- Importação/exportação de pacientes e médicos em CSV
- Auditoria e logs de ações sensíveis
- Suporte a múltiplas clínicas por usuário com seleção dinâmica de contexto
- Painel de faturamento e relatórios avançados

## Contribuição

Contribuições são bem-vindas.

1. Faça um fork do projeto.
2. Crie uma branch para sua feature:

```bash
git checkout -b feature/minha-melhoria
```

3. Faça as alterações e valide com:

```bash
npm run build
npm run lint
```

4. Abra um Pull Request com descrição clara do problema resolvido e do valor entregue.

## Observações Importantes

- O projeto não inclui uma suíte de testes automatizados dedicada no momento, então a validação principal deve ser feita com build e lint.
- O fluxo de assinatura depende de um webhook do Stripe configurado corretamente para refletir o status da assinatura no banco.
- Para ambientes de desenvolvimento, recomenda-se usar PostgreSQL local ou uma instância gerenciada como Neon, Supabase ou Railway.

## Licença

Este projeto não define uma licença explícita no momento. Caso queira reutilizar ou redistribuir o código, confirme os termos antes de publicar.
