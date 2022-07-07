import { useReducer } from 'react'
import PropTypes from 'prop-types'
import { orderReducer } from './orderReducer'
import { OrderContext } from './OrderContext'
import { Order } from 'interfaces/Interfaces'

export interface OrderState {
  orders: Array<Order>
}
interface Props {
  children: JSX.Element | JSX.Element[]
}

const INITIAL_STATE: OrderState = {
  orders: []
}

export const OrderProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(orderReducer, INITIAL_STATE)

  return (
    <OrderContext.Provider
      value={{
        ...state,
        dispatch
      }}
    >
      {children}
    </OrderContext.Provider>
  )
}

OrderProvider.propTypes = {
  children: PropTypes.node.isRequired
}
