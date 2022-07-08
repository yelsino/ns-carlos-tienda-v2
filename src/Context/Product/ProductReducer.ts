import { Product } from 'interfaces/Interfaces'
import { ProductState } from './ProductProvider'

export type ProductAction =
  | { type: 'GET_PRODUCTS'; payload: Array<Product> }
  | { type: 'SELECT_PRODUCT'; payload: Product }

export const ProductReducer = (
  state: ProductState,
  action: ProductAction
): ProductState => {
  switch (action.type) {
    case 'GET_PRODUCTS':
      return {
        ...state,
        products: action.payload
      }

    case 'SELECT_PRODUCT':
      return {
        ...state,
        product: action.payload
      }
    default:
      return state
  }
}
