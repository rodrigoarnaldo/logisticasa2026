# Instruções para Testar o Sistema

## 📋 Pré-requisitos

1. **Node.js** instalado (versão 18+)
2. **NPM** ou **PNPM** disponível
3. **Git** instalado (opcional)

## 🚀 Inicialização do Projeto

```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev
```

O sistema estará disponível em: `http://localhost:5173`

## 🔐 Credenciais de Teste (Simuladas)

> **Nota**: O sistema usa Supabase Auth. Você precisará criar usuários manualmente através do painel do Supabase ou usar as credenciais de desenvolvimento.

### 1. Criando Usuários de Teste no Supabase

Acesse o painel do Supabase: `https://bwkwhyfwwgzstcdhkowm.supabase.co`

1. **Authentication → Users**
2. Clique em **"Add User"**
3. Crie usuários com os seguintes perfis:

| Email | Senha | Perfil |
|-------|-------|--------|
| `admin@saude.gov.br` | `senha123` | admin |
| `gestor@saude.gov.br` | `senha123` | gestor |
| `operador@saude.gov.br` | `senha123` | operador |
| `motorista@saude.gov.br` | `senha123` | motorista |
| `enfermeiro@saude.gov.br` | `senha123` | enfermeiro |

### 2. Configurando Perfis no Banco de Dados

Após criar os usuários no Auth, insira seus perfis na tabela `usuarios`:

```sql
-- Obtenha os auth_id dos usuários criados
-- Em seguida, insira na tabela usuarios:

INSERT INTO usuarios (auth_id, nome, email, perfil, ativo) VALUES
('auth_id_do_admin', 'Administrador Sistema', 'admin@saude.gov.br', 'admin', true),
('auth_id_do_gestor', 'Gestor Operacional', 'gestor@saude.gov.br', 'gestor', true),
('auth_id_do_operador', 'Operador Logístico', 'operador@saude.gov.br', 'operador', true),
('auth_id_do_motorista', 'Motorista Entregas', 'motorista@saude.gov.br', 'motorista', true),
('auth_id_do_enfermeiro', 'Enfermeira Recebimento', 'enfermeiro@saude.gov.br', 'enfermeiro', true);
```

## 🧪 Testando Cada Perfil

### 👑 **Administrador**
- **Login**: `admin@saude.gov.br` / `senha123`
- **Funcionalidades**:
  - Dashboard com métricas do sistema
  - Gerenciamento de usuários (CRUD)
  - Gerenciamento de veículos da frota
  - Monitoramento geral do sistema

### 📊 **Gestor**
- **Login**: `gestor@saude.gov.br` / `senha123`
- **Funcionalidades**:
  - Dashboard operacional
  - Criação de novas demandas
  - Visualização de rotas em tempo real
  - Geração de relatórios

### 🏭 **Operador**
- **Login**: `operador@saude.gov.br` / `senha123`
- **Funcionalidades**:
  - Listagem de demandas recebidas
  - Montagem de caixas com QR Code
  - Planejamento de rotas
  - Registro de devoluções

### 🚚 **Motorista**
- **Login**: `motorista@saude.gov.br` / `senha123`
- **Funcionalidades**:
  - Visualização de rotas do dia
  - Detalhe da rota com mapa interativo
  - Registro de carregamento de caixas
  - Registro de entrega com geolocalização

### ⚕️ **Enfermeiro**
- **Login**: `enfermeiro@saude.gov.br` / `senha123`
- **Funcionalidades**:
  - Lista de entregas recebidas
  - Confirmação de recebimento
  - Registro de baixa de estoque
  - Histórico pessoal de entregas

## 🔄 Fluxo de Teste Completo

Siga este fluxo para testar todo o ciclo:

1. **Admin** → Cria usuários e veículos
2. **Gestor** → Cria uma demanda com pontos de entrega
3. **Operador** → 
   - Processa a demanda
   - Monta caixas com QR Code
   - Planeja rota com motorista e veículo
4. **Motorista** → 
   - Visualiza rota atribuída
   - Registra carregamento das caixas
   - Registra entrega ao enfermeiro
5. **Enfermeiro** → 
   - Confirma recebimento
   - Registra baixa de estoque (doses aplicadas)
6. **Operador** → Registra devolução da caixa vazia

## 🐛 Solução de Problemas Comuns

### "Usuário não tem perfil"
- Verifique se o usuário foi inserido na tabela `usuarios`
- Confirme se o `auth_id` corresponde ao usuário do Supabase Auth

### "Permissão negada para tabela X"
- Execute no SQL Editor do Supabase:
```sql
GRANT ALL PRIVILEGES ON [nome_tabela] TO authenticated;
GRANT SELECT ON [nome_tabela] TO anon;
```

### "Erro de conexão com Supabase"
- Verifique as variáveis de ambiente no `.env`
- Confirme se a URL e ANON_KEY estão corretas

### "Página não encontrada"
- Verifique se está acessando a rota correta para seu perfil
- Confirme se o redirecionamento automático está funcionando

## 📊 Dados de Exemplo

Para popular o banco com dados de teste:

```sql
-- Inserir veículos
INSERT INTO veiculos (placa, modelo, tipo, capacidade_caixas) VALUES
('ABC-1234', 'Ford Transit', 'van', 50),
('DEF-5678', 'Volkswagen Polo', 'carro', 20);

-- Inserir demanda de exemplo
INSERT INTO demandas (id_demanda_origem, cliente, data_entrega, prazo_limite, status) VALUES
('DEM-2024-001', 'Secretaria Municipal de Saúde', '2024-03-30', '2024-03-30 18:00:00', 'recebida');
```

## 🚀 Deploy em Produção

O sistema já está configurado para deploy na Vercel:

1. **Arquivo de configuração**: `vercel.json`
2. **Variáveis de ambiente**: Pré-configuradas
3. **Build command**: `npm run build`
4. **Output directory**: `dist`

Para fazer deploy manual:
```bash
npx vercel --prod --yes
```

## 📞 Suporte

Em caso de problemas:
1. Verifique os logs do console do navegador
2. Consulte a documentação técnica em `.trae/documents/`
3. Revise as configurações do Supabase
4. Teste as conexões de banco de dados

---

**Sistema de Logística de Vacinas v1.0.0**  
Pronto para produção! 🚀