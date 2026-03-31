import { ClipboardList, Clock, CheckCircle, AlertCircle } from 'lucide-react'

export function OperadorDemandas() {
  const demandas = [
    { id: '2024-001', cliente: 'Secretaria Municipal de Saúde', prazo: 'Hoje, 14:00', status: 'urgente', pontos: 8 },
    { id: '2024-002', cliente: 'Hospital Regional', prazo: 'Amanhã, 10:00', status: 'andamento', pontos: 12 },
    { id: '2024-003', cliente: 'UBS Zona Leste', prazo: '28/03, 16:00', status: 'planejada', pontos: 5 },
    { id: '2024-004', cliente: 'Posto de Saúde Centro', prazo: '27/03, 11:30', status: 'concluida', pontos: 6 },
  ]

  const statusInfo = {
    urgente: { cor: 'bg-red-100 text-red-800', icone: AlertCircle },
    andamento: { cor: 'bg-yellow-100 text-yellow-800', icone: Clock },
    planejada: { cor: 'bg-blue-100 text-blue-800', icone: ClipboardList },
    concluida: { cor: 'bg-green-100 text-green-800', icone: CheckCircle },
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Demandas de Vacinação</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total de Demandas</p>
              <p className="text-3xl font-bold mt-2">24</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <ClipboardList className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Para Hoje</p>
              <p className="text-3xl font-bold mt-2">8</p>
            </div>
            <div className="bg-yellow-100 p-3 rounded-lg">
              <Clock className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Concluídas</p>
              <p className="text-3xl font-bold mt-2">12</p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold">Demandas Recebidas</h2>
          <p className="text-gray-600 mt-1">Lista de demandas para processamento</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-3 px-6 text-left text-sm font-medium text-gray-700">ID Demanda</th>
                <th className="py-3 px-6 text-left text-sm font-medium text-gray-700">Cliente</th>
                <th className="py-3 px-6 text-left text-sm font-medium text-gray-700">Prazo</th>
                <th className="py-3 px-6 text-left text-sm font-medium text-gray-700">Status</th>
                <th className="py-3 px-6 text-left text-sm font-medium text-gray-700">Pontos</th>
                <th className="py-3 px-6 text-left text-sm font-medium text-gray-700">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {demandas.map((demanda) => {
                const status = statusInfo[demanda.status as keyof typeof statusInfo]
                const StatusIcon = status.icone
                return (
                  <tr key={demanda.id} className="hover:bg-gray-50">
                    <td className="py-4 px-6 font-medium">{demanda.id}</td>
                    <td className="py-4 px-6">{demanda.cliente}</td>
                    <td className="py-4 px-6">{demanda.prazo}</td>
                    <td className="py-4 px-6">
                      <div className="flex items-center">
                        <StatusIcon className="h-4 w-4 mr-2" />
                        <span className={`px-3 py-1 text-xs font-medium rounded-full ${status.cor} capitalize`}>
                          {demanda.status}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-6">{demanda.pontos} pontos</td>
                    <td className="py-4 px-6">
                      <div className="flex space-x-2">
                        <button className="px-3 py-1 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700">
                          Processar
                        </button>
                        <button className="px-3 py-1 border border-gray-300 text-sm rounded-lg hover:bg-gray-50">
                          Detalhes
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
        <div className="flex items-start">
          <ClipboardList className="h-6 w-6 text-blue-600 mr-3 mt-1" />
          <div>
            <h3 className="font-semibold text-blue-900">Processo de Demandas</h3>
            <p className="text-blue-800 mt-1">
              1. Selecione uma demanda para processar → 2. Monte as caixas com QR Code → 3. Planeje a rota → 4. Atribua ao motorista
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}