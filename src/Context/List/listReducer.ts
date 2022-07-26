import { List } from 'interfaces/Interfaces'
import { ListState } from './ListProvider'

export type ListAction =
  | { type: 'GET_USER_LISTS'; payload: Array<List> }
  | { type: 'SELECT_LIST'; payload: List }
  | { type: 'VIEW_LIST'; payload: boolean }

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
    case 'VIEW_LIST': return { ...state, viewList: action.payload }

    default:
      return state
  }
}
