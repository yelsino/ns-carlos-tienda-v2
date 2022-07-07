import { List } from 'interfaces/Interfaces'
import { ListState } from './ListProvider'

export type ListAction =
  | { type: 'GET_USER_LISTS'; payload: Array<List> }
  | { type: 'SELECT_LIST'; payload: List }

export const listReducer = (
  state: ListState,
  action: ListAction
): ListState => {
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
