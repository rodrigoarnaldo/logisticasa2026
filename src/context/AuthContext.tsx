import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { supabase } from '@/services/supabase'
import type { User, Session } from '@supabase/supabase-js'

type Perfil = 'admin' | 'gestor' | 'operador' | 'motorista' | 'enfermeiro'

interface Usuario {
  id: string
  auth_id: string
  nome: string
  email: string
  perfil: Perfil
  telefone: string | null
  ativo: boolean
}

interface AuthContextType {
  usuario: Usuario | null
  sessao: Session | null
  carregando: boolean
  login: (email: string, senha: string) => Promise<{ error: any }>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [usuario, setUsuario] = useState<Usuario | null>(null)
  const [sessao, setSessao] = useState<Session | null>(null)
  const [carregando, setCarregando] = useState(true)

  useEffect(() => {
    // Verificar sessão ativa
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSessao(session)
      if (session) {
        buscarPerfilUsuario(session.user.id)
      } else {
        setCarregando(false)
      }
    })

    // Listener para mudanças de autenticação
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setSessao(session)
        if (session) {
          await buscarPerfilUsuario(session.user.id)
        } else {
          setUsuario(null)
          setCarregando(false)
        }
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  async function buscarPerfilUsuario(authId: string) {
    try {
      const { data, error } = await supabase
        .from('usuarios')
        .select('*')
        .eq('auth_id', authId)
        .single()

      if (error) throw error

      setUsuario(data as Usuario)
    } catch (error) {
      console.error('Erro ao buscar perfil:', error)
      setUsuario(null)
    } finally {
      setCarregando(false)
    }
  }

  async function login(email: string, senha: string) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password: senha,
      })

      if (error) throw error

      if (data.session) {
        await buscarPerfilUsuario(data.user.id)
      }

      return { error: null }
    } catch (error: any) {
      console.error('Erro no login:', error)
      return { error }
    }
  }

  async function logout() {
    try {
      await supabase.auth.signOut()
      setUsuario(null)
      setSessao(null)
    } catch (error) {
      console.error('Erro no logout:', error)
    }
  }

  return (
    <AuthContext.Provider value={{ usuario, sessao, carregando, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de AuthProvider')
  }
  return context
}