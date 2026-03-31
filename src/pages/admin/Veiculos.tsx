import { Plus, Edit, Trash2, Car, Truck as TruckIcon, Bike } from 'lucide-react'

export function AdminVeiculos() {
  const veiculos = [
    { id: 1, placa: 'ABC-1234', modelo: 'Ford Transit', tipo: 'van', capacidade: 50, status: 'ativo' },
    { id: 2, placa: 'DEF-5678', modelo: 'Volkswagen Polo', tipo: 'carro', capacidade: 20, status: 'ativo' },
    { id: 3, placa: 'GHI-9012', modelo: 'Mercedes-Benz', tipo: 'caminhao', capacidade: 100, status: 'manutencao' },
    { id: 4, placa: 'JKL-3456', modelo: 'Honda CB 500', tipo: 'moto', capacidade: 5, status: 'ativo' },
  ]

  const iconeTipo = {
    carro: Car,
    moto: Bike,
    caminhao: TruckIcon,
    van: Car,
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Veículos</h1>
          <p className="text-gray-600">Gerencie a frota de veículos</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-700">
          <Plus className="h-5 w-5 mr-2" />
          Novo Veículo
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Veículos Ativos</p>
              <p className="text-3xl font-bold mt-2">3</p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <Car className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Em Manutenção</p>
              <p className="text-3xl font-bold mt-2">1</p>
            </div>
            <div className="bg-yellow-100 p-3 rounded-lg">
              <TruckIcon className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Capacidade Total</p>
              <p className="text-3xl font-bold mt-2">175</p>
              <p className="text-sm text-gray-600 mt-1">caixas</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <TruckIcon className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold">Todos os Veículos</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-3 px-6 text-left text-sm font-medium text-gray-700">Placa</th>
                <th className="py-3 px-6 text-left text-sm font-medium text-gray-700">Modelo</th>
                <th className="py-3 px-6 text-left text-sm font-medium text-gray-700">Tipo</th>
                <th className="py-3 px-6 text-left text-sm font-medium text-gray-700">Capacidade</th>
                <th className="py-3 px-6 text-left text-sm font-medium text-gray-700">Status</th>
                <th className="py-3 px-6 text-left text-sm font-medium text-gray-700">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {veiculos.map((veiculo) => {
                const IconeTipo = iconeTipo[veiculo.tipo as keyof typeof iconeTipo] || Car
                return (
                  <tr key={veiculo.id} className="hover:bg-gray-50">
                    <td className="py-4 px-6 font-medium">{veiculo.placa}</td>
                    <td className="py-4 px-6">{veiculo.modelo}</td>
                    <td className="py-4 px-6">
                      <div className="flex items-center">
                        <IconeTipo className="h-5 w-5 mr-2 text-gray-600" />
                        <span className="capitalize">{veiculo.tipo}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">{veiculo.capacidade} caixas</td>
                    <td className="py-4 px-6">
                      <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                        veiculo.status === 'ativo'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {veiculo.status === 'ativo' ? 'Ativo' : 'Manutenção'}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex space-x-2">
                        <button className="p-1 text-blue-600 hover:bg-blue-50 rounded">
                          <Edit className="h-5 w-5" />
                        </button>
                        <button className="p-1 text-red-600 hover:bg-red-50 rounded">
                          <Trash2 className="h-5 w-5" />
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
    </div>
  )
}