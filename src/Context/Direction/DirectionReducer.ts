import { Direction } from 'interfaces/Interfaces'
import { DirectionState } from './DirectionProvider'

export type DirectionAction =
  | { type: 'GET_USER_DIRECTIONS'; payload: Array<Direction> }
  | { type: 'SELECT_DIRECTION'; payload: Direction }

export const directionReducer = (
  state: DirectionState,
  action: DirectionAction
): DirectionState => {
  switch (action.type) {
    case 'GET_USER_DIRECTIONS':
      return {
        ...state,
        directions: action.payload
      }

    case 'SELECT_DIRECTION':
      return {
        ...state,
        direction: action.payload
      }

    default:
      return state
  }
}
