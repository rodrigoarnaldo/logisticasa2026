import { AlertTriangle, Home } from 'lucide-react'
import { Link } from 'react-router-dom'

export function AcessoNegado() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-red-100 rounded-full mb-6">
            <AlertTriangle className="h-10 w-10 text-red-600" />
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Acesso Negado</h1>
          <p className="text-gray-600 mb-6">
            Você não tem permissão para acessar esta página com seu perfil atual.
            <br />
            Contate o administrador do sistema se precisar de acesso.
          </p>
          
          <div className="space-y-4">
            <Link
              to="/"
              className="inline-flex items-center justify-center w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition"
            >
              <Home className="h-5 w-5 mr-2" />
              Voltar para a página inicial
            </Link>
            
            <button
              onClick={() => window.history.back()}
              className="w-full py-3 px-4 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition"
            >
              Voltar para a página anterior
            </button>
          </div>
          
          <div className="mt-8 pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              Sistema de Logística de Vacinas • Controle de acesso por perfil
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}