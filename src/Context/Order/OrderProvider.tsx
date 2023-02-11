import { useReducer } from 'react'
import { orderReducer } from './orderReducer'
import { OrderContext } from './OrderContext'
import { IPedido, IRespuesta } from 'types-yola'
import { fetchConToken } from 'helpers/fetch'


export interface OrderState {
  orderSuccess: IPedido
  orders: Array<IPedido>
}
interface Props {
  children: JSX.Element | JSX.Element[]
}

const INITIAL_STATE: OrderState = {
  orderSuccess: null,
  orders: []
}

export const OrderProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(orderReducer, INITIAL_STATE)

  const generarPedido = async (pedido: IPedido): Promise<IRespuesta<IPedido>> => {

    const respuesta = await fetchConToken<IRespuesta<IPedido>>({
      endpoint: 'pedidos/generar-pedido',
      method: 'POST',
      body: pedido,
    });

    if (respuesta.ok) {
      dispatch({
        type: 'ADD_ORDER',
        payload: respuesta.data
      })
    }

    return respuesta

  }

  const obtenerPedidos = async (usuario: string):Promise<IRespuesta<Array<IPedido>>>  => {
    const respuesta = await fetchConToken<IRespuesta<Array<IPedido>>>({
      endpoint: `pedidos/usuario/${usuario}`,
      method: 'GET',
    });

    console.log(respuesta);
    

    if (respuesta.ok) {
      dispatch({
        type: 'GET_USER_ORDERS',
        payload: respuesta.data
      })
    }

    return respuesta
  }

  return (
    <OrderContext.Provider
      value={{
        ...state,
        dispatch,
        generarPedido,
        obtenerPedidos,
      }}
    >
      {children}
    </OrderContext.Provider>
  )
}

