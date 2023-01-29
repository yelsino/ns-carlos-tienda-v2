import { LocalStorageService } from 'schemas/LocalStorageService';
import { ILista } from 'types-yola';
import { ListState } from './ListProvider'

export type ListAction =
  | { type: 'GET_USER_LISTS'; payload: Array<ILista> }
  | { type: 'SELECT_LIST'; payload: ILista }
  | { type: 'VIEW_LIST'; payload: boolean }
  | { type: 'DELETE_LIST'; payload: string }
  | { type: 'CREATE_LIST'; payload: ILista }

export const listReducer = (
  state: ListState,
  action: ListAction
): ListState => {
  const lsService = new LocalStorageService() 
  switch (action.type) {
    case 'GET_USER_LISTS':
      return {
        ...state,
        lists: action.payload,
        ok: true
      }

    case 'SELECT_LIST':
      lsService.setItem("listSelected",action.payload._id)
      return {
        ...state,
        list: action.payload
      }
    case 'VIEW_LIST': return { ...state, viewList: action.payload }

    case 'DELETE_LIST': 
      return {
        ...state,
        lists: state.lists.filter((list) => list._id !== action.  payload)
      }
    case 'CREATE_LIST':
      return {
        ...state,
        lists: [...state.lists, action.payload],
        list: action.payload
      }

    default:
      return state
  }
}
