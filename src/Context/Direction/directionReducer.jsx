export const directionReducer = (state, action) => {
  switch (action.type) {
    case 'GET_USER_DIRECTIONS':
      return {
        ...state,
        directions: action.payload,
      };

    case 'SELECT_DIRECTION':
      return {
        ...state,
        direction: action.payload,
      };

    default:
      return state;
  }
};
