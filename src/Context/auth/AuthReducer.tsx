export const authReducer = (state, action) => {
  switch (action.type) {
    case 'USER_UPDATE':
      return {
        ...state,
        user: action.payload
      }

    default:
      return state
  }
}
