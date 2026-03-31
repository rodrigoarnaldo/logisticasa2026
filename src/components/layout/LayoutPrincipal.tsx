import { MenuLateral } from './MenuLateral'
import { BarraTopo } from './BarraTopo'
import { useAuth } from '@/context/AuthContext'

interface LayoutPrincipalProps {
  children: React.ReactNode
}

export function LayoutPrincipal({ children }: LayoutPrincipalProps) {
  const { usuario } = useAuth()

  if (!usuario) {
    return <>{children}</>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <MenuLateral />
      <div className="lg:ml-64">
        <BarraTopo />
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  )
}