import { Bell, Search } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'

export function BarraTopo() {
  const { usuario } = useAuth()

  if (!usuario) return null

  // Simulação de notificações (em produção viria do Supabase Realtime)
  const notificacoes = [
    { id: 1, titulo: 'Nova demanda recebida', tempo: '5 min atrás', lida: false },
    { id: 2, titulo: 'Rota montada com sucesso', tempo: '1 hora atrás', lida: true },
    { id: 3, titulo: 'Caixa entregue ao enfermeiro', tempo: '2 horas atrás', lida: true },
  ]

  const naoLidas = notificacoes.filter(n => !n.lida).length

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-gray-200">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Lado esquerdo: Título e busca */}
          <div className="flex items-center space-x-6">
            <div>
              <h1 className="text-xl font-semibold text-gray-900">Dashboard</h1>
              <p className="text-sm text-gray-600">
                Bem-vindo, <span className="font-medium">{usuario.nome}</span>
              </p>
            </div>

            <div className="hidden lg:block relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="search"
                placeholder="Buscar demandas, caixas, rotas..."
                className="pl-10 pr-4 py-2 w-64 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Lado direito: Notificações e perfil */}
          <div className="flex items-center space-x-4">
            {/* Botão notificações */}
            <button className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg">
              <Bell className="h-6 w-6" />
              {naoLidas > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {naoLidas}
                </span>
              )}
            </button>

            {/* Avatar do usuário */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-semibold">
                  {usuario.nome.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="hidden md:block">
                <p className="text-sm font-medium text-gray-900">{usuario.nome}</p>
                <p className="text-xs text-gray-600 capitalize">{usuario.perfil}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}