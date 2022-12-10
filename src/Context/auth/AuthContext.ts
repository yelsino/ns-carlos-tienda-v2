
import { createContext } from 'react'
import { AuthAction } from './AuthReducer'
import { IUsuario } from 'interfaces/usuario.interface';
import { IAuth } from 'interfaces/auth.interface';

interface AuthContextProps {
  uid: string | null
  checking: boolean
  logged: boolean
  user: IUsuario | null
  directions: []
  loading: boolean
  userLogin: (correo: string, password: string) => Promise<boolean>
  userRegister: (data:IAuth) => Promise<boolean>
  verificarToken: () => Promise<boolean>
  userLogout: () => void
  dispatch: React.Dispatch<AuthAction>
}

export const AuthContext = createContext<AuthContextProps>(
  {} as AuthContextProps
)
