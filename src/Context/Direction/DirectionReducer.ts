
import { LocalStorageService } from 'schemas/LocalStorageService';
import { IDireccion } from 'types-yola';
import { DirectionState } from './DirectionProvider'

export type DirectionAction =
  | { type: 'GET_USER_DIRECTIONS'; payload: Array<IDireccion> }
  | { type: 'SELECT_DIRECTION'; payload: IDireccion }
  | { type: 'ADD_DIRECTION'; payload: IDireccion }

export const directionReducer = (
  state: DirectionState,
  action: DirectionAction
): DirectionState => {

  const lsService = new LocalStorageService() 

  switch (action.type) {
    case 'GET_USER_DIRECTIONS':
      return {
        ...state,
        directions: action.payload
      }

    case 'ADD_DIRECTION':
      return {
        ...state,
        directions: [...state.directions, action.payload]
      }

    case 'SELECT_DIRECTION':
      lsService.setItem('directionSelected',action.payload._id)
      return {
        ...state,
        direction: action.payload
      }

    

    default:
      return state
  }
}
