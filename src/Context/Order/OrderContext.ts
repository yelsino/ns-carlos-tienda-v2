
import { createContext } from 'react'
import { IPedido } from 'types-yola'
import { OrderAction } from './orderReducer'

interface PropsContext {
  orders: Array<IPedido>
  dispatch: React.Dispatch<OrderAction>
}

export const OrderContext = createContext<PropsContext>({} as PropsContext)
