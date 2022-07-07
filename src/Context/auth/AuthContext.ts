import { User } from 'interfaces/User'
import { createContext } from 'react'
import { AuthAction } from './AuthReducer'

interface AuthContextProps {
  uid: string
  checking: boolean
  logged: boolean
  user: User | null
  directions: []
  userLogin: (email: string, password: string) => Promise<boolean>
  verificarToken: () => Promise<boolean>
  userLogout: () => void
  dispatch: React.Dispatch<AuthAction>
}

export const AuthContext = createContext<AuthContextProps>(
  {} as AuthContextProps
)
