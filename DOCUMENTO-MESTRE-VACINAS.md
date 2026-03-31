# 🚀 DOCUMENTO MESTRE — Sistema de Logística de Vacinas
## Para uso com Trae AI + DeepSeek Reasoner

> **Framework:** React + Vite  
> **Backend:** Supabase  
> **Deploy:** Vercel  
> **Versão:** 1.0.0 | 30/03/2026

---

# PARTE 1 — SETUP INICIAL

## Dependências

```bash
npm install @supabase/supabase-js react-router-dom recharts react-leaflet leaflet html5-qrcode
```

## Variáveis de ambiente (.env)

```bash
VITE_SUPABASE_URL=https://[SEU-PROJETO].supabase.co
VITE_SUPABASE_ANON_KEY=[SUA-CHAVE-ANONIMA]
```

## services/supabase.js

```javascript
import { createClient } from '@supabase/supabase-js'
export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
)
```

---

# PARTE 2 — BANCO DE DADOS (Supabase SQL)

> Execute no SQL Editor do Supabase na ordem abaixo.

```sql
-- 1. USUÁRIOS
CREATE TABLE usuarios (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  auth_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  nome TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  perfil TEXT NOT NULL CHECK (perfil IN ('admin','gestor','operador','motorista','enfermeiro')),
  telefone TEXT,
  ativo BOOLEAN DEFAULT TRUE,
  criado_em TIMESTAMPTZ DEFAULT NOW(),
  atualizado_em TIMESTAMPTZ DEFAULT NOW()
);

-- 2. VEÍCULOS
CREATE TABLE veiculos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  placa TEXT UNIQUE NOT NULL,
  modelo TEXT NOT NULL,
  tipo TEXT NOT NULL CHECK (tipo IN ('carro','moto','caminhao','van')),
  capacidade_caixas INT NOT NULL DEFAULT 1,
  ativo BOOLEAN DEFAULT TRUE,
  criado_em TIMESTAMPTZ DEFAULT NOW()
);

-- 3. DEMANDAS
CREATE TABLE demandas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  id_demanda_origem TEXT UNIQUE NOT NULL,
  cliente TEXT NOT NULL,
  data_entrega DATE NOT NULL,
  prazo_limite TIMESTAMPTZ NOT NULL,
  status TEXT NOT NULL DEFAULT 'recebida' CHECK (status IN ('recebida','em_andamento','concluida','atrasada')),
  total_pontos INT DEFAULT 0,
  total_doses INT DEFAULT 0,
  observacao TEXT,
  recebida_em TIMESTAMPTZ DEFAULT NOW(),
  concluida_em TIMESTAMPTZ,
  criado_em TIMESTAMPTZ DEFAULT NOW(),
  atualizado_em TIMESTAMPTZ DEFAULT NOW()
);

-- 4. PONTOS DE ENTREGA
CREATE TABLE pontos_entrega (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  demanda_id UUID NOT NULL REFERENCES demandas(id) ON DELETE CASCADE,
  local TEXT NOT NULL,
  endereco TEXT NOT NULL,
  cidade TEXT NOT NULL,
  estado TEXT NOT NULL,
  cep TEXT,
  lat DECIMAL(10,7),
  lng DECIMAL(10,7),
  enfermeiro_id UUID REFERENCES usuarios(id),
  horario_previsto TIMESTAMPTZ,
  status TEXT NOT NULL DEFAULT 'pendente' CHECK (status IN ('pendente','entregue','cancelado')),
  criado_em TIMESTAMPTZ DEFAULT NOW()
);

-- 5. CAIXAS
CREATE TABLE caixas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  qr_code TEXT UNIQUE NOT NULL,
  status TEXT NOT NULL DEFAULT 'disponivel' CHECK (status IN ('disponivel','montada','carregada','entregue','devolvida')),
  demanda_id UUID REFERENCES demandas(id),
  ponto_entrega_id UUID REFERENCES pontos_entrega(id),
  rota_id UUID,
  operador_id UUID REFERENCES usuarios(id),
  motorista_id UUID REFERENCES usuarios(id),
  enfermeiro_id UUID REFERENCES usuarios(id),
  montada_em TIMESTAMPTZ,
  carregada_em TIMESTAMPTZ,
  entregue_em TIMESTAMPTZ,
  devolvida_em TIMESTAMPTZ,
  observacao TEXT,
  criado_em TIMESTAMPTZ DEFAULT NOW(),
  atualizado_em TIMESTAMPTZ DEFAULT NOW()
);

-- 6. CAIXAS VACINAS
CREATE TABLE caixas_vacinas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  caixa_id UUID NOT NULL REFERENCES caixas(id) ON DELETE CASCADE,
  tipo_vacina TEXT NOT NULL,
  doses_enviadas INT NOT NULL DEFAULT 0,
  criado_em TIMESTAMPTZ DEFAULT NOW()
);

-- 7. ROTAS
CREATE TABLE rotas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  demanda_id UUID NOT NULL REFERENCES demandas(id),
  motorista_id UUID NOT NULL REFERENCES usuarios(id),
  veiculo_id UUID NOT NULL REFERENCES veiculos(id),
  operador_id UUID NOT NULL REFERENCES usuarios(id),
  status TEXT NOT NULL DEFAULT 'planejada' CHECK (status IN ('planejada','em_andamento','concluida','cancelada')),
  data_saida TIMESTAMPTZ NOT NULL,
  saida_real TIMESTAMPTZ,
  conclusao_real TIMESTAMPTZ,
  total_pontos INT DEFAULT 0,
  total_caixas INT DEFAULT 0,
  observacao TEXT,
  criado_em TIMESTAMPTZ DEFAULT NOW(),
  atualizado_em TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE caixas ADD CONSTRAINT fk_caixas_rota FOREIGN KEY (rota_id) REFERENCES rotas(id);

-- 8. ROTAS PONTOS
CREATE TABLE rotas_pontos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  rota_id UUID NOT NULL REFERENCES rotas(id) ON DELETE CASCADE,
  ponto_entrega_id UUID NOT NULL REFERENCES pontos_entrega(id),
  ordem INT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pendente' CHECK (status IN ('pendente','entregue','pulado')),
  chegada_prevista TIMESTAMPTZ,
  chegada_real TIMESTAMPTZ,
  criado_em TIMESTAMPTZ DEFAULT NOW()
);

-- 9. ENTREGAS
CREATE TABLE entregas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  caixa_id UUID NOT NULL REFERENCES caixas(id),
  rota_id UUID NOT NULL REFERENCES rotas(id),
  ponto_entrega_id UUID NOT NULL REFERENCES pontos_entrega(id),
  motorista_id UUID NOT NULL REFERENCES usuarios(id),
  enfermeiro_id UUID NOT NULL REFERENCES usuarios(id),
  entregue_em TIMESTAMPTZ DEFAULT NOW(),
  confirmado_em TIMESTAMPTZ,
  lat_entrega DECIMAL(10,7),
  lng_entrega DECIMAL(10,7),
  observacao TEXT,
  criado_em TIMESTAMPTZ DEFAULT NOW()
);

-- 10. BAIXAS DE ESTOQUE
CREATE TABLE baixas_estoque (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  caixa_id UUID NOT NULL REFERENCES caixas(id),
  enfermeiro_id UUID NOT NULL REFERENCES usuarios(id),
  tipo_vacina TEXT NOT NULL,
  doses_enviadas INT NOT NULL DEFAULT 0,
  doses_aplicadas INT NOT NULL DEFAULT 0,
  doses_residual INT NOT NULL DEFAULT 0,
  diferenca INT GENERATED ALWAYS AS (doses_enviadas - doses_aplicadas - doses_residual) STORED,
  observacao TEXT,
  registrado_em TIMESTAMPTZ DEFAULT NOW(),
  criado_em TIMESTAMPTZ DEFAULT NOW()
);

-- 11. HISTÓRICO DE CAIXAS
CREATE TABLE historico_caixas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  caixa_id UUID NOT NULL REFERENCES caixas(id),
  status_anterior TEXT,
  status_novo TEXT NOT NULL,
  usuario_id UUID NOT NULL REFERENCES usuarios(id),
  acao TEXT NOT NULL CHECK (acao IN ('montagem','carregamento','entrega','confirmacao','baixa','devolucao')),
  lat DECIMAL(10,7),
  lng DECIMAL(10,7),
  observacao TEXT,
  criado_em TIMESTAMPTZ DEFAULT NOW()
);

-- ÍNDICES
CREATE INDEX idx_caixas_qr_code ON caixas(qr_code);
CREATE INDEX idx_caixas_status ON caixas(status);
CREATE INDEX idx_caixas_demanda ON caixas(demanda_id);
CREATE INDEX idx_demandas_status ON demandas(status);
CREATE INDEX idx_demandas_data ON demandas(data_entrega);
CREATE INDEX idx_rotas_motorista ON rotas(motorista_id);
CREATE INDEX idx_rotas_status ON rotas(status);
CREATE INDEX idx_entregas_caixa ON entregas(caixa_id);
CREATE INDEX idx_historico_caixa ON historico_caixas(caixa_id);

-- RLS
ALTER TABLE usuarios ENABLE ROW LEVEL SECURITY;
ALTER TABLE veiculos ENABLE ROW LEVEL SECURITY;
ALTER TABLE demandas ENABLE ROW LEVEL SECURITY;
ALTER TABLE pontos_entrega ENABLE ROW LEVEL SECURITY;
ALTER TABLE caixas ENABLE ROW LEVEL SECURITY;
ALTER TABLE caixas_vacinas ENABLE ROW LEVEL SECURITY;
ALTER TABLE rotas ENABLE ROW LEVEL SECURITY;
ALTER TABLE rotas_pontos ENABLE ROW LEVEL SECURITY;
ALTER TABLE entregas ENABLE ROW LEVEL SECURITY;
ALTER TABLE baixas_estoque ENABLE ROW LEVEL SECURITY;
ALTER TABLE historico_caixas ENABLE ROW LEVEL SECURITY;

CREATE POLICY "acesso_autenticado" ON usuarios FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "acesso_autenticado" ON veiculos FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "acesso_autenticado" ON demandas FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "acesso_autenticado" ON pontos_entrega FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "acesso_autenticado" ON caixas FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "acesso_autenticado" ON caixas_vacinas FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "acesso_autenticado" ON rotas FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "acesso_autenticado" ON rotas_pontos FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "acesso_autenticado" ON entregas FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "acesso_autenticado" ON baixas_estoque FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "acesso_autenticado" ON historico_caixas FOR ALL USING (auth.role() = 'authenticated');
```

---

# PARTE 3 — PERFIS E PERMISSÕES

| Perfil | Rota base | Tela inicial |
|---|---|---|
| `admin` | `/admin` | `/admin/dashboard` |
| `gestor` | `/gestor` | `/gestor/dashboard` |
| `operador` | `/operador` | `/operador/demandas` |
| `motorista` | `/motorista` | `/motorista/rotas` |
| `enfermeiro` | `/enfermeiro` | `/enfermeiro/entregas` |

---

# PARTE 4 — ESTRUTURA DE PASTAS

```
src/
├── components/
│   ├── layout/
│   │   ├── MenuLateral.jsx
│   │   ├── BarraTopo.jsx
│   │   └── LayoutPrincipal.jsx
│   ├── ui/
│   │   ├── Botao.jsx
│   │   ├── Card.jsx
│   │   ├── Tabela.jsx
│   │   ├── Modal.jsx
│   │   ├── Badge.jsx
│   │   ├── Alerta.jsx
│   │   └── Carregando.jsx
│   ├── qrcode/
│   │   └── LeitorQR.jsx
│   ├── mapa/
│   │   └── MapaRotas.jsx
│   └── graficos/
│       ├── GraficoBarras.jsx
│       ├── GraficoPizza.jsx
│       └── GraficoLinha.jsx
├── pages/
│   ├── Login.jsx
│   ├── AcessoNegado.jsx
│   ├── admin/
│   │   ├── Dashboard.jsx
│   │   ├── Usuarios.jsx
│   │   └── Veiculos.jsx
│   ├── gestor/
│   │   ├── Dashboard.jsx
│   │   ├── Rotas.jsx
│   │   ├── Demandas.jsx
│   │   └── Relatorios.jsx
│   ├── operador/
│   │   ├── Demandas.jsx
│   │   ├── Montagem.jsx
│   │   ├── Rotas.jsx
│   │   └── Devolucao.jsx
│   ├── motorista/
│   │   ├── Rotas.jsx
│   │   ├── DetalheRota.jsx
│   │   ├── Carregamento.jsx
│   │   └── Entrega.jsx
│   └── enfermeiro/
│       ├── Entregas.jsx
│       ├── Recebimento.jsx
│       ├── BaixaEstoque.jsx
│       └── Historico.jsx
├── hooks/
│   ├── useAuth.js
│   └── useNotificacoes.js
├── services/
│   └── supabase.js
├── context/
│   └── AuthContext.jsx
├── utils/
│   └── formatadores.js
└── App.jsx
```

---

# PARTE 5 — AUTENTICAÇÃO

## context/AuthContext.jsx
- Contexto global com: `usuario`, `perfil`, `carregando`, `login()`, `logout()`
- `login(email, senha)` → chama `supabase.auth.signInWithPassword`
- Após login buscar perfil na tabela `usuarios` onde `auth_id = user.id`
- Listener em `supabase.auth.onAuthStateChange` para manter sessão ativa
- Salvar sessão no localStorage via Supabase (automático)

## hooks/useAuth.js
- Retorna `{ usuario, perfil, carregando, login, logout }` consumindo o AuthContext

## Proteção de rotas (RotaProtegida.jsx)
- Verifica se há usuário logado → redireciona para `/login` se não
- Verifica se o perfil tem acesso à rota → redireciona para `/acesso-negado` se não

---

# PARTE 6 — RECURSOS ESPECIAIS

## 📷 Leitura de QR Code (LeitorQR.jsx)
- Biblioteca: `html5-qrcode`
- Modal fullscreen com câmera ao ser ativado
- Área de foco no centro
- Feedback visual verde ao detectar QR Code
- Callback `onLeitura(codigo)` com o código lido
- Botão cancelar
- Campo texto como fallback manual
- Funciona em mobile e desktop

```jsx
<LeitorQR
  ativo={mostrarLeitor}
  onLeitura={(codigo) => handleQRCode(codigo)}
  onFechar={() => setMostrarLeitor(false)}
/>
```

## 🔔 Notificações em Tempo Real (useNotificacoes.js)
- Usar Supabase Realtime — assinar mudanças nas tabelas `caixas`, `rotas`, `demandas`
- Notificar conforme perfil:
  - Nova demanda → operador e gestor
  - Rota montada → motorista
  - Caixa carregada → enfermeiro
  - Prazo vencendo → gestor
- Ícone de sino na BarraTopo com contador de não lidas

## 🗺️ Mapa de Rotas (MapaRotas.jsx)
- Biblioteca: `react-leaflet` + OpenStreetMap (sem chave de API)
- Recebe array de pontos `{ lat, lng, local, status, ordem }`
- Marcadores numerados por ordem
- Cores: `pendente` azul / `entregue` verde / `atrasado` vermelho
- Linha conectando os pontos
- Popup com nome do local, enfermeiro, status

## 📊 Gráficos (Recharts)
- `GraficoBarras`: doses enviadas vs aplicadas por campanha
- `GraficoPizza`: status das caixas (montadas/carregadas/entregues/devolvidas)
- `GraficoLinha`: evolução de entregas ao longo do dia

---

# PARTE 7 — TELAS E QUERIES SUPABASE

## LOGIN
```javascript
const { data, error } = await supabase.auth.signInWithPassword({ email, password })
const { data: usuario } = await supabase.from('usuarios').select('*').eq('auth_id', data.user.id).single()
```

## ADMIN — USUÁRIOS
```javascript
// Listar
await supabase.from('usuarios').select('*').order('nome')
// Criar
await supabase.from('usuarios').insert({ nome, email, perfil, telefone })
// Editar
await supabase.from('usuarios').update({ perfil, ativo }).eq('id', id)
```

## ADMIN — VEÍCULOS
```javascript
await supabase.from('veiculos').select('*').order('placa')
await supabase.from('veiculos').insert({ placa, modelo, tipo, capacidade_caixas })
await supabase.from('veiculos').update({ modelo, ativo }).eq('id', id)
```

## GESTOR — DASHBOARD
```javascript
// Cards do dia
const hoje = new Date().toISOString().split('T')[0]
await supabase.from('demandas').select('status').eq('data_entrega', hoje)
await supabase.from('caixas').select('status').gte('criado_em', hoje)
await supabase.from('rotas').select('*, usuarios!motorista_id(nome), veiculos(placa)').eq('status', 'em_andamento')
```

## GESTOR — ROTAS (mapa tempo real)
```javascript
await supabase.from('rotas').select(`
  *, usuarios!motorista_id(nome), veiculos(placa),
  rotas_pontos(*, pontos_entrega(local, lat, lng, status, usuarios!enfermeiro_id(nome)))
`).gte('data_saida', hoje)
```

## GESTOR — RELATÓRIOS
```javascript
await supabase.from('baixas_estoque')
  .select('*, usuarios!enfermeiro_id(nome)')
  .gte('registrado_em', dataInicio)
  .lte('registrado_em', dataFim)
```

## OPERADOR — DEMANDAS
```javascript
await supabase.from('demandas')
  .select('*')
  .in('status', ['recebida', 'em_andamento'])
  .order('prazo_limite', { ascending: true })
```

## OPERADOR — MONTAGEM DE CAIXAS
```javascript
// Consultar caixa pelo QR
await supabase.from('caixas').select('*').eq('qr_code', qrCode).single()
// Montar caixa
await supabase.from('caixas').update({
  status: 'montada', demanda_id, ponto_entrega_id,
  operador_id: usuarioId, montada_em: new Date()
}).eq('qr_code', qrCode)
// Inserir vacinas
await supabase.from('caixas_vacinas').insert(
  vacinas.map(v => ({ caixa_id: caixa.id, tipo_vacina: v.tipo, doses_enviadas: v.doses }))
)
// Histórico
await supabase.from('historico_caixas').insert({
  caixa_id: caixa.id, status_anterior: 'disponivel',
  status_novo: 'montada', usuario_id: usuarioId, acao: 'montagem'
})
```

## OPERADOR — MONTAGEM DE ROTAS
```javascript
// Pontos da demanda
await supabase.from('pontos_entrega')
  .select('*, usuarios!enfermeiro_id(nome)')
  .eq('demanda_id', demandaId)
// Criar rota
const { data: rota } = await supabase.from('rotas')
  .insert({ motorista_id, veiculo_id, demanda_id, operador_id: usuarioId, data_saida, total_pontos: pontos.length })
  .select().single()
// Inserir pontos com ordem
await supabase.from('rotas_pontos').insert(
  pontosOrdenados.map((p, i) => ({ rota_id: rota.id, ponto_entrega_id: p.id, ordem: i + 1 }))
)
```

## OPERADOR — DEVOLUÇÃO
```javascript
await supabase.from('caixas').update({ status: 'devolvida', devolvida_em: new Date() }).eq('qr_code', qrCode)
await supabase.from('historico_caixas').insert({
  caixa_id: caixa.id, status_anterior: 'entregue',
  status_novo: 'devolvida', usuario_id: usuarioId, acao: 'devolucao'
})
```

## MOTORISTA — ROTAS DO DIA
```javascript
await supabase.from('rotas')
  .select('*, veiculos(placa, modelo), demandas(cliente)')
  .eq('motorista_id', usuarioId)
  .gte('data_saida', hoje)
```

## MOTORISTA — DETALHE DA ROTA
```javascript
await supabase.from('rotas').select(`
  *, rotas_pontos(
    ordem, status, chegada_prevista,
    pontos_entrega(local, endereco, lat, lng, usuarios!enfermeiro_id(nome))
  )
`).eq('id', rotaId).single()
```

## MOTORISTA — CARREGAMENTO
```javascript
await supabase.from('caixas').update({
  status: 'carregada', motorista_id: usuarioId, rota_id: rotaId, carregada_em: new Date()
}).eq('qr_code', qrCode)
await supabase.from('historico_caixas').insert({
  caixa_id: caixa.id, status_anterior: 'montada',
  status_novo: 'carregada', usuario_id: usuarioId, acao: 'carregamento'
})
```

## MOTORISTA — REGISTRAR ENTREGA
```javascript
await supabase.from('caixas').update({
  status: 'entregue', enfermeiro_id: enfermeiroId, entregue_em: new Date()
}).eq('qr_code', qrCode)
await supabase.from('entregas').insert({
  caixa_id: caixa.id, rota_id: rotaId, ponto_entrega_id: caixa.ponto_entrega_id,
  motorista_id: usuarioId, enfermeiro_id: enfermeiroId,
  entregue_em: new Date(), lat_entrega: lat, lng_entrega: lng
})
```

## ENFERMEIRO — CONFIRMAR RECEBIMENTO
```javascript
await supabase.from('entregas').update({ confirmado_em: new Date() }).eq('caixa_id', caixa.id)
await supabase.from('historico_caixas').insert({
  caixa_id: caixa.id, status_anterior: 'entregue',
  status_novo: 'entregue', usuario_id: usuarioId, acao: 'confirmacao'
})
```

## ENFERMEIRO — BAIXA DE ESTOQUE
```javascript
// Buscar vacinas da caixa
await supabase.from('caixas_vacinas').select('*').eq('caixa_id', caixa.id)
// Registrar baixas
await supabase.from('baixas_estoque').insert(
  aplicacoes.map(a => ({
    caixa_id: caixa.id, enfermeiro_id: usuarioId,
    tipo_vacina: a.tipo, doses_enviadas: a.dosesEnviadas,
    doses_aplicadas: a.dosesAplicadas, doses_residual: a.dosesResidual
  }))
)
// Atualizar status da caixa
await supabase.from('caixas').update({ status: 'devolvida' }).eq('id', caixa.id)
await supabase.from('historico_caixas').insert({
  caixa_id: caixa.id, status_anterior: 'entregue',
  status_novo: 'devolvida', usuario_id: usuarioId, acao: 'baixa'
})
```

## ENFERMEIRO — MINHAS ENTREGAS
```javascript
await supabase.from('entregas')
  .select('*, caixas(qr_code, status, caixas_vacinas(tipo_vacina, doses_enviadas))')
  .eq('enfermeiro_id', usuarioId)
  .order('entregue_em', { ascending: false })
```

---

# PARTE 8 — COMPONENTES GLOBAIS

## Badge — Status das Caixas
| Status | Cor |
|---|---|
| `disponivel` | Cinza |
| `montada` | Azul |
| `carregada` | Laranja |
| `entregue` | Verde |
| `devolvida` | Roxo |
| `atrasada` | Vermelho |

## MenuLateral
- Itens por perfil (exibir apenas os do perfil logado)
- Item ativo destacado
- Avatar + nome do usuário no topo
- Botão sair no rodapé
- Em mobile: gaveta deslizante

## BarraTopo
- Título da tela atual
- Sino de notificações com contador
- Avatar do usuário

---

# PARTE 9 — FLUXO COMPLETO DE UMA CAIXA

```
[Operador]   Lê QR → monta caixa com vacinas e ponto destino
                              ↓
[Operador]   Seleciona pontos → monta rota → vincula motorista
                              ↓
[Motorista]  Lê QR → registra carregamento no veículo
                              ↓
[Motorista]  Lê QR → registra entrega ao enfermeiro
                              ↓
[Enfermeiro] Lê QR → confirma recebimento
                              ↓
[Enfermeiro] Lê QR → registra doses aplicadas + residual
                              ↓
[Operador]   Lê QR → confirma devolução da caixa à base ✅
```

---

*Sistema de Logística de Vacinas v1.0.0 — Documento Mestre*
