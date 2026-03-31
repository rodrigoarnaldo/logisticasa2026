import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import {
  LayoutDashboard,
  Users,
  Truck,
  ClipboardList,
  Package,
  Map,
  FileText,
  QrCode,
  RefreshCw,
  Calendar,
  Navigation,
  ClipboardCheck,
  BarChart3,
  LogOut,
  Menu,
  X,
  User,
  Shield,
  Stethoscope,
  Car
} from 'lucide-react'

const menusPorPerfil = {
  admin: [
    { to: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/admin/usuarios', icon: Users, label: 'Usuários' },
    { to: '/admin/veiculos', icon: Truck, label: 'Veículos' },
  ],
  gestor: [
    { to: '/gestor/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/gestor/demandas', icon: ClipboardList, label: 'Demandas' },
    { to: '/gestor/rotas', icon: Map, label: 'Rotas' },
    { to: '/gestor/relatorios', icon: FileText, label: 'Relatórios' },
  ],
  operador: [
    { to: '/operador/demandas', icon: ClipboardList, label: 'Demandas' },
    { to: '/operador/montagem', icon: Package, label: 'Montagem' },
    { to: '/operador/rotas', icon: Map, label: 'Rotas' },
    { to: '/operador/devolucao', icon: RefreshCw, label: 'Devolução' },
  ],
  motorista: [
    { to: '/motorista/rotas', icon: Calendar, label: 'Rotas do Dia' },
    { to: '/motorista/carregamento', icon: Package, label: 'Carregamento' },
    { to: '/motorista/entrega', icon: Navigation, label: 'Entrega' },
  ],
  enfermeiro: [
    { to: '/enfermeiro/entregas', icon: ClipboardCheck, label: 'Entregas' },
    { to: '/enfermeiro/baixa-estoque', icon: BarChart3, label: 'Baixa Estoque' },
    { to: '/enfermeiro/historico', icon: FileText, label: 'Histórico' },
  ],
}

const iconePerfil = {
  admin: Shield,
  gestor: User,
  operador: User,
  motorista: Car,
  enfermeiro: Stethoscope,
}

export function MenuLateral() {
  const [menuAberto, setMenuAberto] = useState(false)
  const { usuario, logout } = useAuth()
  const navigate = useNavigate()

  if (!usuario) return null

  const menus = menusPorPerfil[usuario.perfil] || []
  const IconePerfil = iconePerfil[usuario.perfil]

  async function handleLogout() {
    await logout()
    navigate('/login')
  }

  return (
    <>
      {/* Botão hamburguer para mobile */}
      <button
        onClick={() => setMenuAberto(!menuAberto)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-md"
      >
        {menuAberto ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {/* Overlay para mobile */}
      {menuAberto && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setMenuAberto(false)}
        />
      )}

      {/* Menu lateral */}
      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-40
          w-64 bg-white border-r border-gray-200
          transform ${menuAberto ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0 transition-transform duration-200
          flex flex-col h-screen
        `}
      >
        {/* Cabeçalho */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <IconePerfil className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h2 className="font-semibold text-gray-900">{usuario.nome}</h2>
              <p className="text-sm text-gray-600 capitalize">{usuario.perfil}</p>
            </div>
          </div>
        </div>

        {/* Navegação */}
        <nav className="flex-1 p-4 overflow-y-auto">
          <ul className="space-y-2">
            {menus.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  onClick={() => setMenuAberto(false)}
                  className={({ isActive }) => `
                    flex items-center space-x-3 px-4 py-3 rounded-lg
                    transition-colors duration-150
                    ${isActive
                      ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-600'
                      : 'text-gray-700 hover:bg-gray-50'
                    }
                  `}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Rodapé */}
        <div className="p-4 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className="flex items-center justify-center space-x-3 w-full px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
          >
            <LogOut className="h-5 w-5" />
            <span>Sair</span>
          </button>
          
          <div className="mt-4 text-center">
            <p className="text-xs text-gray-500">
              Logística de Vacinas v1.0
            </p>
          </div>
        </div>
      </aside>
    </>
  )
}