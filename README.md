# Sistema de Logística de Vacinas

Sistema completo para gestão e rastreamento de vacinas com controle de temperatura e cadeia de frio.

## 🚀 Funcionalidades Principais

- **Autenticação por Perfil**: 5 perfis distintos (Admin, Gestor, Operador, Motorista, Enfermeiro)
- **Rastreamento por QR Code**: Monitoramento completo do ciclo de vida das caixas
- **Geolocalização**: Mapas interativos para planejamento e acompanhamento de rotas
- **Controle de Estoque**: Baixa de doses aplicadas e residuais
- **Auditoria Completa**: Histórico de todas as movimentações de caixas
- **Notificações em Tempo Real**: Via Supabase Realtime

## 🏗️ Arquitetura

- **Frontend**: React 18 + TypeScript + Vite + Tailwind CSS
- **Backend**: Supabase (PostgreSQL + Auth + Storage + Realtime)
- **Bibliotecas Principais**:
  - React Router DOM 7 para navegação
  - Zustand para gerenciamento de estado
  - React Leaflet para mapas
  - Recharts para gráficos
  - HTML5 QR Code para leitura de QR Codes

## 📁 Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
│   ├── layout/         # MenuLateral, BarraTopo, LayoutPrincipal
│   ├── ui/             # Componentes de UI
│   ├── mapa/           # Componentes de mapa
│   ├── qrcode/         # Leitor de QR Code
│   └── graficos/       # Componentes de gráficos
├── pages/              # Páginas por perfil
│   ├── admin/          # Dashboard, Usuários, Veículos
│   ├── gestor/         # Demandas, Rotas, Relatórios
│   ├── operador/       # Montagem, Rotas, Devolução
│   ├── motorista/      # Rotas do dia, Carregamento, Entrega
│   └── enfermeiro/     # Recebimento, Baixa de estoque, Histórico
├── context/            # Contextos React (AuthContext)
├── hooks/              # Hooks customizados
├── services/           # Integrações (supabase.ts)
└── utils/              # Funções utilitárias
```

## 🗄️ Banco de Dados (Supabase)

11 tabelas relacionais com Row Level Security:
- `usuarios` - Perfis de usuário
- `veiculos` - Frota de veículos
- `demandas` - Demandas de vacinação
- `pontos_entrega` - Locais de entrega
- `caixas` - Caixas de vacinas com QR Code
- `caixas_vacinas` - Tipos e quantidades de vacinas
- `rotas` - Rotas de entrega
- `rotas_pontos` - Pontos ordenados na rota
- `entregas` - Registros de entrega
- `baixas_estoque` - Baixa de doses aplicadas
- `historico_caixas` - Auditoria de movimentações

## 🔧 Configuração

1. **Variáveis de Ambiente**:
   ```env
   VITE_SUPABASE_URL=https://bwkwhyfwwgzstcdhkowm.supabase.co
   VITE_SUPABASE_ANON_KEY=sb_publishable_3t-OrCtjvfWe43taX4_jPA_G9UpwQO6
   ```

2. **Instalação**:
   ```bash
   npm install
   ```

3. **Desenvolvimento**:
   ```bash
   npm run dev
   ```

4. **Build**:
   ```bash
   npm run build
   ```

## 📱 Perfis de Usuário

| Perfil | Permissões | Dashboard |
|--------|------------|-----------|
| **Administrador** | Gerenciar usuários e veículos, configurações do sistema | `/admin/dashboard` |
| **Gestor** | Criar demandas, visualizar rotas, gerar relatórios | `/gestor/dashboard` |
| **Operador** | Montar caixas, planejar rotas, registrar devoluções | `/operador/demandas` |
| **Motorista** | Visualizar rotas, registrar carregamento e entrega | `/motorista/rotas` |
| **Enfermeiro** | Confirmar recebimento, registrar baixa de estoque | `/enfermeiro/entregas` |

## 🔐 Autenticação

- Autenticação via Supabase Auth (email/senha)
- Row Level Security (RLS) no PostgreSQL
- Redirecionamento automático por perfil
- Proteção de rotas com componente `RotaProtegida`

## 🌐 Deploy

O sistema está configurado para deploy na **Vercel**:

### ✅ Repositório GitHub
O código já está disponível em:  
**https://github.com/rodrigoarnaldo/logisticasa2026.git**

### 🚀 Deploy Manual no Vercel

1. **Acesse a Vercel**:
   - Entre em [vercel.com](https://vercel.com)
   - Faça login com sua conta (GitHub, GitLab, ou email)

2. **Importar Projeto**:
   - Clique em **"Add New Project"** → **"Import Git Repository"**
   - Conecte sua conta GitHub (se ainda não conectada)
   - Selecione o repositório: **`rodrigoarnaldo/logisticasa2026`**

3. **Configurar Projeto**:
   - O Vercel detectará automaticamente as configurações do `vercel.json`
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

4. **Variáveis de Ambiente** (já configuradas no `vercel.json`):
   - `VITE_SUPABASE_URL`: `https://bwkwhyfwwgzstcdhkowm.supabase.co`
   - `VITE_SUPABASE_ANON_KEY`: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ3a3doeWZ3d2d6c3RjZGhrb3dtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ5MTM1NjEsImV4cCI6MjA5MDQ4OTU2MX0.4a9ghDCS7w_7LBImCmWr1Pc5yxG9LoQRFXmV3bH58TU`

5. **Deploy**:
   - Clique em **"Deploy"**
   - Aguarde o build (aproximadamente 2-3 minutos)
   - Acesse a URL fornecida (ex: `https://logisticasa2026.vercel.app`)

### 🔄 Deploy Automático
- Cada push para a branch `master` no GitHub dispara um novo deploy
- Rollback automático em caso de falha no build
- Preview deployments para pull requests

### ⚙️ Configuração Avançada
- **Domínio Customizado**: Configure seu próprio domínio nas settings do projeto
- **Environment Variables**: Adicione novas variáveis no painel da Vercel
- **Analytics**: Monitoramento de performance e erros integrado

## 📊 Funcionalidades Futuras

- [ ] Integração com APIs de previsão do tempo
- [ ] Dashboard mobile para motoristas
- [ ] Relatórios analíticos avançados
- [ ] Notificações push para dispositivos móveis
- [ ] Integração com sistemas de saúde pública

## 📄 Licença

Sistema desenvolvido para gestão de logística de vacinas - Uso interno.

---

**Versão**: 1.0.0  
**Última Atualização**: Março 2026  
**Equipe**: Logística de Vacinas