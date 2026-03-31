import { Users, Truck, Package, BarChart3 } from 'lucide-react'

export function AdminDashboard() {
  const cards = [
    { titulo: 'Usuários Ativos', valor: '24', icone: Users, cor: 'bg-blue-500' },
    { titulo: 'Veículos', valor: '12', icone: Truck, cor: 'bg-green-500' },
    { titulo: 'Caixas Hoje', valor: '156', icone: Package, cor: 'bg-purple-500' },
    { titulo: 'Demandas Ativas', valor: '8', icone: BarChart3, cor: 'bg-orange-500' },
  ]

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard Administrativo</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {cards.map((card) => (
          <div key={card.titulo} className="bg-white rounded-xl shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{card.titulo}</p>
                <p className="text-3xl font-bold mt-2">{card.valor}</p>
              </div>
              <div className={`${card.cor} p-3 rounded-lg`}>
                <card.icone className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Atividade Recente</h2>
          <div className="space-y-4">
            {[
              'Novo usuário cadastrado: Enfermeira Maria',
              'Veículo placa ABC-1234 adicionado',
              'Demanda #2024-001 concluída',
              'Relatório mensal gerado',
            ].map((item, idx) => (
              <div key={idx} className="flex items-center text-sm">
                <div className="h-2 w-2 bg-blue-500 rounded-full mr-3"></div>
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Sistema</h2>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Versão</span>
              <span className="font-medium">1.0.0</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Banco de Dados</span>
              <span className="font-medium text-green-600">Online</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Último Backup</span>
              <span className="font-medium">Hoje, 02:00</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}