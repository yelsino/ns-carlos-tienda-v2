
import { IPedido } from 'interfaces/pedido.interface'
import { createContext } from 'react'
import { OrderAction } from './orderReducer'

interface PropsContext {
  orders: Array<IPedido>
  dispatch: React.Dispatch<OrderAction>
}

export const OrderContext = createContext<PropsContext>({} as PropsContext)
