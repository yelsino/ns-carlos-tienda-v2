export const listReducer = (state, action) => {
  switch (action.type) {
    case 'GET_USER_LISTS':
      return {
        ...state,
        lists: action.payload,
        ok: true
      }

    case 'SELECT_LIST':
      return {
        ...state,
        list: action.payload
      }

    default:
      return state
  }
}
