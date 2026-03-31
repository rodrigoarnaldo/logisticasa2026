import { ClipboardList, Package, MapPin, AlertCircle } from 'lucide-react'

export function GestorDashboard() {
  const cards = [
    { titulo: 'Demandas Hoje', valor: '8', icone: ClipboardList, cor: 'bg-blue-500', variacao: '+2' },
    { titulo: 'Caixas Montadas', valor: '156', icone: Package, cor: 'bg-green-500', variacao: '+12' },
    { titulo: 'Rotas Ativas', valor: '5', icone: MapPin, cor: 'bg-purple-500', variacao: '+1' },
    { titulo: 'Atrasos', valor: '3', icone: AlertCircle, cor: 'bg-red-500', variacao: '-1' },
  ]

  const entregas = [
    { local: 'UBS Centro', status: 'entregue', horario: '09:30', motorista: 'João Silva' },
    { local: 'Hospital Municipal', status: 'em_transito', horario: '10:45', motorista: 'Maria Santos' },
    { local: 'Posto de Saúde Norte', status: 'pendente', horario: '11:30', motorista: 'Pedro Oliveira' },
    { local: 'Clínica da Família', status: 'entregue', horario: '08:15', motorista: 'Ana Costa' },
  ]

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard Operacional</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {cards.map((card) => (
          <div key={card.titulo} className="bg-white rounded-xl shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{card.titulo}</p>
                <div className="flex items-baseline mt-2">
                  <p className="text-3xl font-bold mr-2">{card.valor}</p>
                  <span className={`text-sm font-medium ${
                    card.variacao.startsWith('+') ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {card.variacao}
                  </span>
                </div>
              </div>
              <div className={`${card.cor} p-3 rounded-lg`}>
                <card.icone className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Entregas do Dia</h2>
          <div className="space-y-4">
            {entregas.map((entrega, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <div className="flex items-center">
                  <div className={`h-3 w-3 rounded-full mr-3 ${
                    entrega.status === 'entregue' ? 'bg-green-500' :
                    entrega.status === 'em_transito' ? 'bg-yellow-500' : 'bg-gray-300'
                  }`}></div>
                  <div>
                    <p className="font-medium">{entrega.local}</p>
                    <p className="text-sm text-gray-600">{entrega.motorista}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">{entrega.horario}</p>
                  <p className="text-sm text-gray-600 capitalize">
                    {entrega.status === 'entregue' ? 'Entregue' :
                     entrega.status === 'em_transito' ? 'Em trânsito' : 'Pendente'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Demandas por Prioridade</h2>
          <div className="space-y-3">
            {[
              { titulo: 'Vacinação Infantil', prioridade: 'alta', progresso: 75 },
              { titulo: 'Campanha Idosos', prioridade: 'media', progresso: 45 },
              { titulo: 'Vacina Influenza', prioridade: 'alta', progresso: 90 },
              { titulo: 'Reforço COVID', prioridade: 'baixa', progresso: 30 },
            ].map((item, idx) => (
              <div key={idx} className="space-y-2">
                <div className="flex justify-between">
                  <span className="font-medium">{item.titulo}</span>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    item.prioridade === 'alta' ? 'bg-red-100 text-red-800' :
                    item.prioridade === 'media' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {item.prioridade === 'alta' ? 'Alta' :
                     item.prioridade === 'media' ? 'Média' : 'Baixa'}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${item.progresso}%` }}
                  ></div>
                </div>
                <div className="text-right text-sm text-gray-600">
                  {item.progresso}% concluído
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-lg font-semibold mb-4">Mapa de Rotas</h2>
        <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">Mapa interativo será exibido aqui</p>
            <p className="text-sm text-gray-500">Integração com React Leaflet</p>
          </div>
        </div>
      </div>
    </div>
  )
}