import { IProducto } from 'types-yola';
import { ProductState } from './ProductProvider'

export type ProductAction =
  | { type: 'GET_PRODUCTS'; payload: Array<IProducto> }
  | { type: 'SELECT_PRODUCT'; payload: IProducto }

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
