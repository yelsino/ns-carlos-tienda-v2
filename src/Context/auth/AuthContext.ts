
import { createContext } from 'react'
import { IAuth, IAuthFacebook, IAuthGoogle, IAuthRest, IMobile, IRespuesta, IUsuario } from 'types-yola'
import { AuthState } from './AuthProvider'
import { AuthAction } from './AuthReducer'

interface AuthContextProps extends AuthState  {
  verificarExisteMovil: (celular: string) => Promise<IRespuesta<boolean>>
  verificarExisteCorreo: (correo: string) => Promise<IRespuesta<boolean>>
  userLogin: (data:IAuth) => Promise<IRespuesta<IAuthRest>>
  registrarConEmail: (data:IAuth) =>Promise<IRespuesta<IAuthRest>>
  registrarConMovil: (data:IMobile) =>Promise<IRespuesta<IAuthRest>>
  googleAutenticacion: (data: IAuthGoogle) => Promise<IRespuesta<IAuthRest>>
  facebookAutenticacion: (data: IAuthFacebook) => Promise<IRespuesta<IAuthRest>>
  verificarToken: () => Promise<boolean>
  userLogout: () => void
  dispatch: React.Dispatch<AuthAction>
}

export const AuthContext = createContext<AuthContextProps>(
  {} as AuthContextProps
)
