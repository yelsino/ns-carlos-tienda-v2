import { useReducer } from 'react'
import PropTypes from 'prop-types'
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
      endpoint: 'pedido/generar-pedido',
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
      endpoint: `pedido/usuario/${usuario}`,
      method: 'GET',
    });

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

OrderProvider.propTypes = {
  children: PropTypes.node.isRequired
}
