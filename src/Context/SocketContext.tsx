import { createContext, useContext, useEffect } from 'react'
import { useSocket } from '../Hooks/useSocket'
import PropTypes from 'prop-types'
import { ProductContext } from './Product/ProductContext'
import { ListContext } from './List/ListContext'
import { AuthContext } from './auth/AuthContext'
// import algoliasearch from 'algoliasearch';
const baseUrl = import.meta.env.VITE_SOME_KEY

export const SocketContext = createContext(null)

export const SocketProvider = ({ children }) => {
  const { socket, online, connectSocket, disconnectSocket } = useSocket(baseUrl)

  const { dispatchProduct } = useContext(ProductContext)
  const { liststate, setList } = useContext(ListContext)
  const { auth, setAuth } = useContext(AuthContext)

  useEffect(() => {
    if (auth.logged) {
      connectSocket()
    }
  }, [auth, connectSocket])

  useEffect(() => {
    if (!auth.logged) {
      disconnectSocket()
    }
  }, [auth, disconnectSocket])

  useEffect(() => {
    socket?.on('user-actions', (user) => {
      if (user.ok) {
        setAuth((prev) => {
          console.log(prev)
          return { ...prev, user: user.user }
        })
      }
    })
  }, [socket])

  useEffect(() => {
    socket?.on('get-products', (products) => {
      dispatchProduct({
        type: 'GET_PRODUCTS',
        payload: products
      })
    })

    socket?.on('get-user-lists', (lists) => {
      setList({
        type: 'GET_USER_LISTS',
        payload: lists
      })

      if (liststate.list) {
        console.log('hay lista')
        setList({
          type: 'SELECT_LIST',
          payload: lists.find((list) => list._id === liststate.list._id)
        })
      }

      if (!liststate.list) {
        console.log('no hay lista')
        setList({
          type: 'SELECT_LIST',
          payload: lists[0]
        })
      }
    })
  }, [socket, dispatchProduct, liststate, setList])

  return (
    <SocketContext.Provider
      value={{ socket, online, connectSocket, disconnectSocket }}
    >
      {children}
    </SocketContext.Provider>
  )
}

SocketProvider.propTypes = {
  children: PropTypes.node.isRequired
}
