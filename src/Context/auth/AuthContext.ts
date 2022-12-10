import { Authentication } from 'interfaces/Auth.interface'
import { User } from 'interfaces/Interfaces'
import { createContext } from 'react'
import { AuthAction } from './AuthReducer'

interface AuthContextProps {
  uid: string | null
  checking: boolean
  logged: boolean
  user: User | null
  directions: []
  loading: boolean
  userLogin: (correo: string, password: string) => Promise<boolean>
  userRegister: (data:Authentication) => Promise<boolean>
  verificarToken: () => Promise<boolean>
  userLogout: () => void
  dispatch: React.Dispatch<AuthAction>
}

export const AuthContext = createContext<AuthContextProps>(
  {} as AuthContextProps
)
