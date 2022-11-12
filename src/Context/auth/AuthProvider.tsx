import { useCallback, useReducer } from 'react'
import { fetchConToken, fetchSinToken } from '../../helpers/fetch'
import PropTypes from 'prop-types'
import { authReducer } from './AuthReducer'
import { AuthContext } from './AuthContext'
import { User } from 'interfaces/Interfaces'
import { Authentication } from 'interfaces/Auth.interface'

export interface AuthState {
  uid: string | null
  checking: boolean
  logged: boolean
  loading: boolean
  user: User | null
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

  const userLogin = async (email: string, password: string): Promise<boolean> => {
    dispatch({ type: 'LOADING', payload: true })
    const resp = await fetchSinToken({
      endpoint: 'login/client',
      body: { email, password },
      method: 'POST'
    }).finally(()=>dispatch({ type: 'LOADING', payload: false }));
    
    if (resp.ok) {
      localStorage.setItem('token', resp.token)
      const { usuario } = resp

      dispatch({
        type: 'LOGIN',
        payload: usuario
      })
      return true
    }

    localStorage.setItem('noPassword', 'true')
    return false
  }

  const userRegister = async (data: Authentication): Promise<boolean> => {
    dispatch({ type: 'LOADING', payload: true })
    let resp = null;
    if(data.type === "email"){
      resp = await fetchSinToken({
        endpoint: 'login/new',
        body: data,
        method: 'POST'
      })
    }
    dispatch({ type: 'LOADING', payload: false })
    if(resp.ok){
      localStorage.setItem('token', resp.token)
      const { usuario } = resp
      dispatch({
        type: 'LOGIN',
        payload: usuario
      })
      return true
    }
    localStorage.setItem('noPassword', 'true');
    return false

  }

  const verificarToken = useCallback(async () => {
    const token = localStorage.getItem('token') || ''
    // si token no existe
    if (!token) {
      dispatch({ type: 'LOGOUT' })

      return false
    }

    const resp = await fetchConToken({ endpoint: 'login/renew' })
    const { usuario } = resp

    if (resp.usuario === null || resp.usuario === 'null') {
      localStorage.removeItem('token')
      window.location.reload()
      return false
    }

    if (resp.ok) {
      localStorage.setItem('token', resp.token)
      dispatch({
        type: 'LOGIN',
        payload: usuario
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

  return (
    <AuthContext.Provider
      value={{
        ...state,
        dispatch,
        userLogin,
        verificarToken,
        userLogout,
        userRegister
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired
}
