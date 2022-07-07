import { useCallback, useReducer } from 'react'
import { fetchConToken, fetchSinToken } from '../../helpers/fetch'
import PropTypes from 'prop-types'
import { authReducer } from './AuthReducer'
import { User } from 'interfaces/User'
import { AuthContext } from './AuthContext'

export interface AuthState {
  uid: string
  checking: boolean
  logged: boolean
  user: User | null
  directions: []
}

const INITIAL_STATE: AuthState = {
  uid: '',
  checking: true,
  logged: false,
  user: null,
  directions: []
}

interface Props {
  children: JSX.Element | JSX.Element[]
}

export const AuthProvider = ({ children }: Props) => {
  // const { dispatch } = useContext(ChatContext)
  // const navigate = useNavigate();
  const [state, dispatch] = useReducer(authReducer, INITIAL_STATE)

  const userLogin = async (email: string, password: string) => {
    const resp = await fetchSinToken({
      endpoint: 'login/worker',
      body: { email, password },
      method: 'POST'
    })

    if (resp.ok) {
      localStorage.setItem('token', resp.token)
      const { usuario } = resp

      dispatch({
        type: 'LOGIN',
        payload: usuario
      })
      return true
    }
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
        userLogin,
        dispatch,
        verificarToken,
        userLogout
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired
}
