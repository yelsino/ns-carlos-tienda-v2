import { Order } from 'interfaces/Interfaces'
import { createContext } from 'react'
import { OrderAction } from './orderReducer'

interface PropsContext {
  orders: Array<Order>
  dispatch: React.Dispatch<OrderAction>
}

export const OrderContext = createContext<PropsContext>({} as PropsContext)
