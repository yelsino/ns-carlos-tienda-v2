import { createContext, useContext, useEffect } from 'react'
import { useSocket } from '../Hooks/useSocket'
import PropTypes from 'prop-types'
import { ProductContext } from './Product/ProductContext'
import { ListContext } from './List/ListContext'
import { AuthContext } from './auth/AuthContext'
import { List, Product, User } from 'interfaces/Interfaces'
// import algoliasearch from 'algoliasearch';
const baseUrl = import.meta.env.VITE_SOME_KEY

export const SocketContext = createContext(null)

interface Props {
  children: JSX.Element | JSX.Element[]
}

export const SocketProvider = ({ children }: Props) => {
  const { socket, online, connectSocket, disconnectSocket } = useSocket(baseUrl)

  const { dispatch: dispatchProduct } = useContext(ProductContext)
  const { list, dispatch: setList } = useContext(ListContext)
  const { logged } = useContext(AuthContext)

  useEffect(() => {
    if (logged) {
      connectSocket()
    }
  }, [connectSocket])

  useEffect(() => {
    if (!logged) {
      disconnectSocket()
    }
  }, [logged, disconnectSocket])

  useEffect(() => {
    socket?.on('user-actions', (user: { user: User; ok: boolean }) => {
      if (user.ok) {
        setAuth((prev) => {
          console.log(prev)
          return { ...prev, user: user.user }
        })
      }
    })
  }, [socket])

  useEffect(() => {
    socket?.on('get-products', (products: Array<Product>) => {
      dispatchProduct({
        type: 'GET_PRODUCTS',
        payload: products
      })
    })

    socket?.on('get-user-lists', (lists: Array<List>) => {
      setList({
        type: 'GET_USER_LISTS',
        payload: lists
      })

      if (list) {
        console.log('hay lista')
        setList({
          type: 'SELECT_LIST',
          payload: lists.find((list) => list._id === list._id) as List
        })
      }

      if (!list) {
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
