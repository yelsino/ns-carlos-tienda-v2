import { useContext, useEffect } from 'react'
import { useSocket } from '../../Hooks/useSocket'
import { ProductContext } from '../Product/ProductContext'
import { ListContext } from '../List/ListContext'
import { AuthContext } from '../auth/AuthContext'
import { SocketContext } from './SocketContext'
import { LocalStorageService } from 'schemas/LocalStorageService'
import { OrderContext } from 'Context/Order/OrderContext'
import { DirectionContext } from 'Context/Direction/DirectionContext'
import { IDireccion, ILista, IPedido, IProducto, IRespuesta } from 'types-yola'
import { exportarProductosForAlgolia } from 'utils/productos'

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
  const { list, dispatch: setList, obtenerListaDetallada } = useContext(ListContext)
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
    socket?.on('USER_ACTIONS', (user) => {
      if (user.ok) {
        auth.dispatch({
          type: 'SET_USER',
          payload: user.user
        })
      }
    })
  }, [socket])

  useEffect(() => {
    
    socket?.on('GET_ALL_PRODUCTS', (respuesta:IRespuesta<Array<IProducto>>) => {
      // console.log(productos);
      
      dispatchProduct({
        type: 'GET_PRODUCTS',
        payload: respuesta.data as Array<IProducto>
      })
       exportarProductosForAlgolia(respuesta.data.splice(0,1))
    })

    socket?.on('GET_USER_LISTS', (respuesta:IRespuesta<Array<ILista>>) => {
      console.log("GET_USER_LISTS", respuesta);
      
      if(respuesta.ok){
        setList( {type: 'GET_USER_LISTS', payload: respuesta.data})
      }
      

      if(respuesta.data) {
        
        obtenerListaDetallada(respuesta.data[0]._id ?? "").then((res)=>{
          setList({
            type: 'SELECT_LIST',
            payload: res.data as ILista
          })
        });
      }
      
    })


    socket?.on('RETORN_LIST_SELECTED', (respuesta:IRespuesta<ILista>) => {
      console.log("RETORN_LIST_SELECTED", respuesta);
      
      if(respuesta.ok){
        setList( {type: 'SELECT_LIST', payload: respuesta.data})
      }
      
    })


    // socket?.on('GET_USER_ORDERS', (orders: Array<IPedido>) => {
      
    //   setOrder({
    //     type: 'GET_USER_ORDERS',
    //     payload: orders
    //   })
    // })

    socket?.on('GET_USER_DIRECTIONS', (respuesta: IRespuesta<Array<IDireccion>>) => {
      setDirection({
        type: 'GET_USER_DIRECTIONS',
        payload: respuesta.data
      })
      
      let searchDirection = respuesta.data.find(d=> d._id === `${lsService.getItem('directionSelected')}`)

      if(searchDirection){
        setDirection({
          type: 'SELECT_DIRECTION',
          payload: searchDirection
        })
      }
      
    })

  }, [socket, dispatchProduct, dispatchProduct, setList,setOrder])

  return (
    <SocketContext.Provider
      value={{ socket, online, connectSocket, disconnectSocket }}
    >
      {children}
    </SocketContext.Provider>
  )
}
