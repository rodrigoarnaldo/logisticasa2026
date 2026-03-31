import { Plus, Edit, Trash2, Search } from 'lucide-react'

export function AdminUsuarios() {
  const usuarios = [
    { id: 1, nome: 'João Silva', email: 'joao@saude.gov.br', perfil: 'admin', status: 'ativo' },
    { id: 2, nome: 'Maria Santos', email: 'maria@saude.gov.br', perfil: 'gestor', status: 'ativo' },
    { id: 3, nome: 'Pedro Oliveira', email: 'pedro@saude.gov.br', perfil: 'operador', status: 'ativo' },
    { id: 4, nome: 'Ana Costa', email: 'ana@saude.gov.br', perfil: 'motorista', status: 'inativo' },
    { id: 5, nome: 'Carlos Lima', email: 'carlos@saude.gov.br', perfil: 'enfermeiro', status: 'ativo' },
  ]

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Usuários</h1>
          <p className="text-gray-600">Gerencie os usuários do sistema</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-700">
          <Plus className="h-5 w-5 mr-2" />
          Novo Usuário
        </button>
      </div>

      <div className="bg-white rounded-xl shadow">
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="search"
                placeholder="Buscar por nome, email ou perfil..."
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <select className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500">
              <option value="">Todos os perfis</option>
              <option value="admin">Administrador</option>
              <option value="gestor">Gestor</option>
              <option value="operador">Operador</option>
              <option value="motorista">Motorista</option>
              <option value="enfermeiro">Enfermeiro</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-3 px-6 text-left text-sm font-medium text-gray-700">Nome</th>
                <th className="py-3 px-6 text-left text-sm font-medium text-gray-700">Email</th>
                <th className="py-3 px-6 text-left text-sm font-medium text-gray-700">Perfil</th>
                <th className="py-3 px-6 text-left text-sm font-medium text-gray-700">Status</th>
                <th className="py-3 px-6 text-left text-sm font-medium text-gray-700">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {usuarios.map((usuario) => (
                <tr key={usuario.id} className="hover:bg-gray-50">
                  <td className="py-4 px-6">{usuario.nome}</td>
                  <td className="py-4 px-6 text-gray-600">{usuario.email}</td>
                  <td className="py-4 px-6">
                    <span className="px-3 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800 capitalize">
                      {usuario.perfil}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                      usuario.status === 'ativo'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {usuario.status}
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
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-6 border-t border-gray-200">
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-600">
              Mostrando 5 de 25 usuários
            </div>
            <div className="flex space-x-2">
              <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50">
                Anterior
              </button>
              <button className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700">
                1
              </button>
              <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50">
                2
              </button>
              <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50">
                Próxima
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}