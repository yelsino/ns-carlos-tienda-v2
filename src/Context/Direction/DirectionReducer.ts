
import { LocalStorageService } from 'schemas/LocalStorageService';
import { IDireccion } from 'types-yola';
import { DirectionState } from './DirectionProvider'

export type DirectionAction =
  | { type: 'GET_USER_DIRECTIONS'; payload: Array<IDireccion> }
  | { type: 'SELECT_DIRECTION'; payload: string }

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

    case 'SELECT_DIRECTION':
      lsService.setItem('directionSelected',action.payload)
      const getDirection = state.directions.find((d)=>d._id === action.payload)

      return {
        ...state,
        direction: getDirection ? getDirection : null
      }

    

    default:
      return state
  }
}
