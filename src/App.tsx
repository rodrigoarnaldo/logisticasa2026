import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { RotaProtegida } from './components/RotaProtegida'
import { LayoutPrincipal } from './components/layout/LayoutPrincipal'

// Páginas de Autenticação
import { Login } from './pages/Login'
import { AcessoNegado } from './pages/AcessoNegado'

// Páginas Admin
import { AdminDashboard } from './pages/admin/Dashboard'
import { AdminUsuarios } from './pages/admin/Usuarios'
import { AdminVeiculos } from './pages/admin/Veiculos'

// Páginas Gestor
import { GestorDashboard } from './pages/gestor/Dashboard'

// Páginas Operador
import { OperadorDemandas } from './pages/operador/Demandas'

// Componentes placeholder para páginas não implementadas ainda
const PlaceholderPage = ({ title }: { title: string }) => (
  <div className="p-8">
    <h1 className="text-2xl font-bold mb-4">{title}</h1>
    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
      <p className="text-yellow-800">
        Esta página está em desenvolvimento. Em breve estará disponível com todas as funcionalidades.
      </p>
    </div>
  </div>
)

// Exportando componentes placeholder
const GestorDemandas = () => <PlaceholderPage title="Gestor - Demandas" />
const GestorRotas = () => <PlaceholderPage title="Gestor - Rotas" />
const GestorRelatorios = () => <PlaceholderPage title="Gestor - Relatórios" />
const OperadorMontagem = () => <PlaceholderPage title="Operador - Montagem de Caixas" />
const OperadorRotas = () => <PlaceholderPage title="Operador - Rotas" />
const OperadorDevolucao = () => <PlaceholderPage title="Operador - Devolução" />
const MotoristaRotas = () => <PlaceholderPage title="Motorista - Rotas do Dia" />
const MotoristaRotaDetalhe = () => <PlaceholderPage title="Motorista - Detalhe da Rota" />
const MotoristaCarregamento = () => <PlaceholderPage title="Motorista - Carregamento" />
const MotoristaEntrega = () => <PlaceholderPage title="Motorista - Entrega" />
const EnfermeiroEntregas = () => <PlaceholderPage title="Enfermeiro - Entregas" />
const EnfermeiroRecebimento = () => <PlaceholderPage title="Enfermeiro - Recebimento" />
const EnfermeiroBaixaEstoque = () => <PlaceholderPage title="Enfermeiro - Baixa de Estoque" />
const EnfermeiroHistorico = () => <PlaceholderPage title="Enfermeiro - Histórico" />

function AppRoutes() {
  return (
    <Router>
      <Routes>
        {/* Rota raiz - redireciona baseado na autenticação */}
        <Route path="/" element={
          <RotaProtegida>
            {({ usuario }) => {
              if (!usuario) return <Navigate to="/login" />
              // Redireciona baseado no perfil
              switch (usuario.perfil) {
                case 'admin': return <Navigate to="/admin/dashboard" />
                case 'gestor': return <Navigate to="/gestor/dashboard" />
                case 'operador': return <Navigate to="/operador/demandas" />
                case 'motorista': return <Navigate to="/motorista/rotas" />
                case 'enfermeiro': return <Navigate to="/enfermeiro/entregas" />
                default: return <Navigate to="/login" />
              }
            }}
          </RotaProtegida>
        } />

        {/* Rotas públicas */}
        <Route path="/login" element={<Login />} />
        <Route path="/acesso-negado" element={<AcessoNegado />} />

        {/* Rotas Admin */}
        <Route path="/admin/dashboard" element={
          <RotaProtegida perfisPermitidos={['admin']}>
            <LayoutPrincipal>
              <AdminDashboard />
            </LayoutPrincipal>
          </RotaProtegida>
        } />
        <Route path="/admin/usuarios" element={
          <RotaProtegida perfisPermitidos={['admin']}>
            <LayoutPrincipal>
              <AdminUsuarios />
            </LayoutPrincipal>
          </RotaProtegida>
        } />
        <Route path="/admin/veiculos" element={
          <RotaProtegida perfisPermitidos={['admin']}>
            <LayoutPrincipal>
              <AdminVeiculos />
            </LayoutPrincipal>
          </RotaProtegida>
        } />

        {/* Rotas Gestor */}
        <Route path="/gestor/dashboard" element={
          <RotaProtegida perfisPermitidos={['gestor']}>
            <LayoutPrincipal>
              <GestorDashboard />
            </LayoutPrincipal>
          </RotaProtegida>
        } />
        <Route path="/gestor/demandas" element={
          <RotaProtegida perfisPermitidos={['gestor']}>
            <LayoutPrincipal>
              <GestorDemandas />
            </LayoutPrincipal>
          </RotaProtegida>
        } />
        <Route path="/gestor/rotas" element={
          <RotaProtegida perfisPermitidos={['gestor']}>
            <LayoutPrincipal>
              <GestorRotas />
            </LayoutPrincipal>
          </RotaProtegida>
        } />
        <Route path="/gestor/relatorios" element={
          <RotaProtegida perfisPermitidos={['gestor']}>
            <LayoutPrincipal>
              <GestorRelatorios />
            </LayoutPrincipal>
          </RotaProtegida>
        } />

        {/* Rotas Operador */}
        <Route path="/operador/demandas" element={
          <RotaProtegida perfisPermitidos={['operador']}>
            <LayoutPrincipal>
              <OperadorDemandas />
            </LayoutPrincipal>
          </RotaProtegida>
        } />
        <Route path="/operador/montagem" element={
          <RotaProtegida perfisPermitidos={['operador']}>
            <LayoutPrincipal>
              <OperadorMontagem />
            </LayoutPrincipal>
          </RotaProtegida>
        } />
        <Route path="/operador/rotas" element={
          <RotaProtegida perfisPermitidos={['operador']}>
            <LayoutPrincipal>
              <OperadorRotas />
            </LayoutPrincipal>
          </RotaProtegida>
        } />
        <Route path="/operador/devolucao" element={
          <RotaProtegida perfisPermitidos={['operador']}>
            <LayoutPrincipal>
              <OperadorDevolucao />
            </LayoutPrincipal>
          </RotaProtegida>
        } />

        {/* Rotas Motorista */}
        <Route path="/motorista/rotas" element={
          <RotaProtegida perfisPermitidos={['motorista']}>
            <LayoutPrincipal>
              <MotoristaRotas />
            </LayoutPrincipal>
          </RotaProtegida>
        } />
        <Route path="/motorista/rota/:id" element={
          <RotaProtegida perfisPermitidos={['motorista']}>
            <LayoutPrincipal>
              <MotoristaRotaDetalhe />
            </LayoutPrincipal>
          </RotaProtegida>
        } />
        <Route path="/motorista/carregamento" element={
          <RotaProtegida perfisPermitidos={['motorista']}>
            <LayoutPrincipal>
              <MotoristaCarregamento />
            </LayoutPrincipal>
          </RotaProtegida>
        } />
        <Route path="/motorista/entrega" element={
          <RotaProtegida perfisPermitidos={['motorista']}>
            <LayoutPrincipal>
              <MotoristaEntrega />
            </LayoutPrincipal>
          </RotaProtegida>
        } />

        {/* Rotas Enfermeiro */}
        <Route path="/enfermeiro/entregas" element={
          <RotaProtegida perfisPermitidos={['enfermeiro']}>
            <LayoutPrincipal>
              <EnfermeiroEntregas />
            </LayoutPrincipal>
          </RotaProtegida>
        } />
        <Route path="/enfermeiro/recebimento" element={
          <RotaProtegida perfisPermitidos={['enfermeiro']}>
            <LayoutPrincipal>
              <EnfermeiroRecebimento />
            </LayoutPrincipal>
          </RotaProtegida>
        } />
        <Route path="/enfermeiro/baixa-estoque" element={
          <RotaProtegida perfisPermitidos={['enfermeiro']}>
            <LayoutPrincipal>
              <EnfermeiroBaixaEstoque />
            </LayoutPrincipal>
          </RotaProtegida>
        } />
        <Route path="/enfermeiro/historico" element={
          <RotaProtegida perfisPermitidos={['enfermeiro']}>
            <LayoutPrincipal>
              <EnfermeiroHistorico />
            </LayoutPrincipal>
          </RotaProtegida>
        } />
      </Routes>
    </Router>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  )
}