import { useContext, useEffect } from 'react'
import { useSocket } from '../../Hooks/useSocket'
import { ProductContext } from '../Product/ProductContext'
import { ListContext } from '../List/ListContext'
import { AuthContext } from '../auth/AuthContext'
import { SocketContext } from './SocketContext'
import { List } from 'interfaces/Interfaces'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const baseUrl = import.meta.env.VITE_SOME_KEY

interface Props {
  children: JSX.Element | JSX.Element[]
}
export const SocketProvider = ({ children }: Props) => {
  const { socket, online, connectSocket, disconnectSocket } = useSocket(baseUrl)

  const { dispatch: dispatchProduct } = useContext(ProductContext)
  const { list, dispatch: setList } = useContext(ListContext)
  const auth = useContext(AuthContext)

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
        auth.dispatch({
          type: 'SET_USER',
          payload: user.user
        })
      }
    })
  }, [socket])

  useEffect(() => {
    socket?.on('get-products', (products) => {
      dispatchProduct({
        type: 'GET_PRODUCTS',
        payload: products.products
      })
    })

    socket?.on('get-user-lists', (lists) => {
      setList({
        type: 'GET_USER_LISTS',
        payload: lists
      })

      if (list) {
        console.log('hay lista')
        setList({
          type: 'SELECT_LIST',
          payload: lists.find((list: List) => list._id === list._id)
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
  }, [socket, dispatchProduct, dispatchProduct, setList])

  return (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    <SocketContext.Provider
      value={{ socket, online, connectSocket, disconnectSocket }}
    >
      {children}
    </SocketContext.Provider>
  )
}
