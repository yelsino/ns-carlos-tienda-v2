

export const ProductReducer = (state, action) => {
  switch (action.type) {
    case 'GET_PRODUCTS':
      return {
        ...state,
        products: action.payload,
        ok: true,
      };

    default:
      return state;
  }
}