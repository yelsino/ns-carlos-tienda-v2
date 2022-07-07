export type ProductAction =
  | { type: 'GET_PRODUCTS'; payload: AuthProps }
  | { type: 'SELECT_PRODUCT'; payload: AuthProps }

export const ProductReducer = (state, action) => {
  switch (action.type) {
    case 'GET_PRODUCTS':
      return {
        ...state,
        products: action.payload,
        ok: true
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
