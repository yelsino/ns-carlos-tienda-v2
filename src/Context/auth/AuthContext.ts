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
  userLogin: (email: string, password: string) => Promise<boolean>
  verificarToken: () => Promise<boolean>
  userLogout: () => void
  dispatch: React.Dispatch<AuthAction>
}

export const AuthContext = createContext<AuthContextProps>(
  {} as AuthContextProps
)
