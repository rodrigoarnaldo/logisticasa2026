import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'

interface RotaProtegidaProps {
  children: React.ReactNode
  perfisPermitidos?: Array<'admin' | 'gestor' | 'operador' | 'motorista' | 'enfermeiro'>
}

export function RotaProtegida({ children, perfisPermitidos }: RotaProtegidaProps) {
  const { usuario, carregando } = useAuth()
  const location = useLocation()

  if (carregando) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando...</p>
        </div>
      </div>
    )
  }

  if (!usuario) {
    // Redirecionar para login se não estiver autenticado
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  if (perfisPermitidos && !perfisPermitidos.includes(usuario.perfil)) {
    // Redirecionar para acesso negado se não tiver permissão
    return <Navigate to="/acesso-negado" replace />
  }

  return <>{children}</>
}