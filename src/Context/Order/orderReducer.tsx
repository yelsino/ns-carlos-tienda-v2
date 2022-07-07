export const orderReducer = (state, action) => {
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
