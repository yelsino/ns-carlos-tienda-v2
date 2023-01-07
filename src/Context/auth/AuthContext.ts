
import { createContext } from 'react'
import { IAuth, IAuthFacebook, IAuthGoogle, IAuthRest, IRespuesta, IUsuario } from 'types-yola'
import { AuthAction } from './AuthReducer'

interface AuthContextProps {
  uid: string | null
  checking: boolean
  logged: boolean
  user: IUsuario | null
  directions: []
  loading: boolean
  userLogin: (correo: string, password: string) => Promise<IRespuesta<IAuthRest>>
  userRegister: (data:IAuth) =>Promise<IRespuesta<IAuthRest>>
  googleAutenticacion: (data: IAuthGoogle) => Promise<IRespuesta<IAuthRest>>
  facebookAutenticacion: (data: IAuthFacebook) => Promise<IRespuesta<IAuthRest>>
  verificarToken: () => Promise<boolean>
  userLogout: () => void
  dispatch: React.Dispatch<AuthAction>
}

export const AuthContext = createContext<AuthContextProps>(
  {} as AuthContextProps
)
