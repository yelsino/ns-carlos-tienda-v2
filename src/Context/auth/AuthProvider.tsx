import { useCallback, useReducer } from 'react'
import PropTypes from 'prop-types'
import { authReducer } from './AuthReducer'
import { AuthContext } from './AuthContext'
import { fetchConToken, fetchSinToken } from 'helpers/fetch'
import { IAuth, IAuthFacebook, IAuthGoogle, IAuthRest, IMobile, IRespuesta, IUsuario } from 'types-yola'

export interface AuthState {
  uid: string | null
  checking: boolean
  logged: boolean
  loading: boolean
  user: IUsuario | null
  directions: []
}

const INITIAL_STATE: AuthState = {
  uid: '',
  checking: true,
  logged: false,
  loading: false,
  user: null,
  directions: []
}

interface Props {
  children: JSX.Element | JSX.Element[]
}

export const AuthProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(authReducer, INITIAL_STATE)

  const userLogin = async (data:IAuth): Promise<IRespuesta<IAuthRest>> => {

    dispatch({ type: 'LOADING', payload: true })
    
    const resp = await fetchSinToken<IRespuesta<IAuthRest>>({
      endpoint: 'auth/login',
      body: data,
      method: 'POST'
    }).finally(()=>dispatch({ type: 'LOADING', payload: false }));
    

    if (resp.ok) {
      const { usuario, token } = resp.data;

      localStorage.setItem('token', token)

      dispatch({
        type: 'LOGIN',
        payload: usuario
      })
      return resp
    }

    localStorage.setItem('noPassword', 'true')
    return resp
  }

  const registrarConEmail = async (data: IAuth): Promise<IRespuesta<IAuthRest>> => {
    dispatch({ type: 'LOADING', payload: true })
    console.log(data);
    
    let resp:IRespuesta<IAuthRest> = await fetchSinToken<IRespuesta<IAuthRest>>({
      endpoint: 'auth/registro-correo',
      body: data,
      method: 'POST'
    })
    dispatch({ type: 'LOADING', payload: false })
    if(resp.ok){
      const { data } = resp
      localStorage.setItem('token', data.token)
      dispatch({
        type: 'LOGIN',
        payload: data.usuario
      })
      return resp
    }
    localStorage.setItem('noPassword', 'true');
    return resp

  }

  const googleAutenticacion = async (data: IAuthGoogle): Promise<IRespuesta<IAuthRest>> => {
    console.log(data);
    
    const resp = await fetchSinToken<IRespuesta<IAuthRest>>({
      endpoint: 'auth/login-google',
      body: data,
      method: 'POST'
    })

    if (resp.ok) {
      const { usuario, token } = resp.data

      localStorage.setItem('token', token)

      dispatch({
        type: 'LOGIN',
        payload: usuario
      })
      return resp
    }

    localStorage.setItem('noPassword', 'true')
    return resp

  }

  const facebookAutenticacion = async (data: IAuthFacebook): Promise<IRespuesta<IAuthRest>> => {
    const resp = await fetchSinToken<IRespuesta<IAuthRest>>({
      endpoint: 'auth/login-facebook',
      body: data,
      method: 'POST'
    })

    if (resp.ok) {
      const { usuario, token } = resp.data

      localStorage.setItem('token', token)

      dispatch({
        type: 'LOGIN',
        payload: usuario
      })
      return resp
    }

    localStorage.setItem('noPassword', 'true')
    return resp

  }

  const verificarToken = useCallback(async () => {
    const token = localStorage.getItem('token') || ''
    // si token no existe
    if (!token) {
      dispatch({ type: 'LOGOUT' })

      return false
    }

    const resp = await fetchConToken<IRespuesta<IAuthRest>>({ endpoint: 'auth/re-login' })
    // const { usuario } = resp;

    if (!resp.ok) {
      localStorage.removeItem('token')
      window.location.reload()
      return false
    }

    if (resp.ok) {
      localStorage.setItem('token', resp.data.token)
      dispatch({
        type: 'LOGIN',
        payload: resp.data.usuario
      })
      return true
    } else {
      dispatch({ type: 'LOGOUT' })
      return false
    }
  }, [])

  const userLogout = () => {
    localStorage.removeItem('token')
    dispatch({
      type: 'LOGOUT'
    })
  }

  const verificarExisteMovil = async (celular: string): Promise<IRespuesta<boolean>> => {

    const resp = await fetchSinToken<IRespuesta<boolean>>({
      endpoint: 'auth/verificar-mobile',
      body: { celular },
      method: 'POST'
    })

    return resp
  }
  
  const verificarExisteCorreo = async (correo: string): Promise<IRespuesta<boolean>> => {
    console.log("VERIFICAR EXISTENCIA DE CORREO");
    
    const resp = await fetchSinToken<IRespuesta<boolean>>({
      endpoint: 'auth/verificar-correo',
      body: { correo },
      method: 'POST'
    })

    return resp
  }

  const registrarConMovil = async (data: IMobile): Promise<IRespuesta<IAuthRest>> => {

    return null
  }

  return (
    <AuthContext.Provider
      value={{
        ...state,
        dispatch,
        userLogin,
        verificarToken,
        userLogout,
        registrarConEmail,
        googleAutenticacion,
        facebookAutenticacion,
        registrarConMovil,
        verificarExisteMovil,
        verificarExisteCorreo
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
