import { createContext, useReducer } from 'react'
import PropTypes from 'prop-types'
import { orderReducer } from './orderReducer'

export const OrderContext = createContext(null)

const initialState = {
  orders: []
}

export const OrderProvider = ({ children }) => {
  const [stateOrder, setOrder] = useReducer(orderReducer, initialState)

  return (
    <OrderContext.Provider
      value={{
        stateOrder,
        setOrder
      }}
    >
      {children}
    </OrderContext.Provider>
  )
}

OrderProvider.propTypes = {
  children: PropTypes.node.isRequired
}
