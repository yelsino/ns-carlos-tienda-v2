
import { IPedido } from 'types-yola';
import { OrderState } from './OrderProvider'

export type OrderAction = { type: 'GET_USER_ORDERS'; payload: Array<IPedido> }

export const orderReducer = (
  state: OrderState,
  action: OrderAction
): OrderState => {
  switch (action.type) {
    case 'GET_USER_ORDERS':
      return {
        ...state,
        orders: action.payload
      }

    default:
      return state
  }
}
