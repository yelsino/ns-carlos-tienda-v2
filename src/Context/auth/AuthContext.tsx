import { createContext, useState, useCallback } from 'react'
import { fetchConToken, fetchSinToken } from '../../helpers/fetch'
// import { chatTypes } from '../../types/chatTypes';
// import { ChatContext } from '../chat/ChatContext';
import PropTypes from 'prop-types'

export const AuthContext = createContext(null)

const initialState = {
  uid: null,
  checking: true,
  logged: false,
  user: null,
  directions: []
}

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(initialState)
  // const { dispatch } = useContext(ChatContext)
  // const navigate = useNavigate();

  const login = async (email, password) => {
    const resp = await fetchSinToken(
      'login/worker',
      { email, password },
      'POST'
    )

    if (resp.ok) {
      localStorage.setItem('token', resp.token)
      const { usuario } = resp

      setAuth({
        uid: usuario?.uid,
        checking: false,
        logged: true,
        user: usuario
      })
    }

    return resp
  }

  const verificarToken = useCallback(async () => {
    const token = localStorage.getItem('token') || ''
    console.log('token', token)
    // si token no existe
    if (!token) {
      setAuth({
        uid: null,
        checking: false,
        logged: false,
        user: null
      })

      // todo redirect a login
      return false
    }

    const resp = await fetchConToken('login/renew')
    console.log(resp)
    if (resp.usuario === null || resp.usuario === 'null') {
      localStorage.removeItem('token')
      // refresh page

      return window.location.reload()
      // return navigate('/auth/login');
    }
    if (resp.ok) {
      localStorage.setItem('token', resp.token)
      const { usuario } = resp

      setAuth({
        uid: usuario?.uid,
        checking: false,
        logged: true,
        user: usuario
      })
      return true
    } else {
      setAuth({
        uid: null,
        checking: false,
        logged: false,
        user: null
      })
      return false
    }
  }, [])

  const logout = () => {
    localStorage.removeItem('token')

    setAuth({
      uid: null,
      checking: false,
      logged: false,
      user: null
    })
  }

  return (
    <AuthContext.Provider
      value={{
        auth,
        login,
        setAuth,
        // register,
        verificarToken,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired
}
