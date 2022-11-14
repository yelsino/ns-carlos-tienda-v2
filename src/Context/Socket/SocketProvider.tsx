import { useContext, useEffect } from 'react'
import { useSocket } from '../../Hooks/useSocket'
import { ProductContext } from '../Product/ProductContext'
import { ListContext } from '../List/ListContext'
import { AuthContext } from '../auth/AuthContext'
import { SocketContext } from './SocketContext'
import { LocalStorageService } from 'schemas/LocalStorageService'
import { Direction, List, Order } from 'interfaces/Interfaces'
import { OrderContext } from 'Context/Order/OrderContext'
import { DirectionContext } from 'Context/Direction/DirectionContext'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const baseUrl = import.meta.env.VITE_SOME_KEY

interface Props {
  children: JSX.Element | JSX.Element[]
}
export const SocketProvider = ({ children }: Props) => {
  const { socket, online, connectSocket, disconnectSocket } = useSocket(baseUrl)
  const lsService = new LocalStorageService()

  const { dispatch: dispatchProduct } = useContext(ProductContext)
  const { list, dispatch: setList } = useContext(ListContext)
  const { dispatch: setOrder } = useContext(OrderContext)
  const { dispatch: setDirection, direction } = useContext(DirectionContext)
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
    console.log("data");
    
    socket?.on('get-products', (products) => {
      dispatchProduct({
        type: 'GET_PRODUCTS',
        payload: products.products
      })
    })

    socket?.on('get-user-lists', (lists:Array<List>) => {
      setList({
        type: 'GET_USER_LISTS',
        payload: lists
      })

      let searchList = lists.find(
        (l) => l._id === `${lsService.getItem('listSelected')}`
      )
      
      if (!list) {
        setList({
          type: 'SELECT_LIST',
          payload: searchList ? searchList._id : lists[0]._id
        })
      }
    })

    socket?.on('get-user-orders', (orders: Array<Order>) => {
      console.log(orders);
      
      setOrder({
        type: 'GET_USER_ORDERS',
        payload: orders
      })
    })

    socket?.on('get-user-directions', (directions: Array<Direction>) => {
      setDirection({
        type: 'GET_USER_DIRECTIONS',
        payload: directions
      })
      
      let searchDirection = directions.find(d=> d._id === `${lsService.getItem('directionSelected')}`)

      setDirection({
        type: 'SELECT_DIRECTION',
        payload: searchDirection ? searchDirection._id : directions[0]._id
      })
    })

  }, [socket, dispatchProduct, dispatchProduct, setList,setOrder])

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
