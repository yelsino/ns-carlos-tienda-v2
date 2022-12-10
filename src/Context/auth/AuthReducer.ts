import { User } from 'interfaces/Interfaces'
import { AuthState } from './AuthProvider'

export type AuthAction =
  | { type: 'LOGOUT' }
  | { type: 'LOGIN'; payload: User }
  | { type: 'REGISTER'; payload: User }
  | { type: 'SET_USER'; payload: User }
  | { type: 'LOADING'; payload: boolean }

export const authReducer = (
  state: AuthState,
  action: AuthAction
): AuthState => {
  switch (action.type) {
    case 'LOGOUT':
      return {
        ...state,
        uid: null,
        checking: false,
        logged: false,
        user: null
      }
    case 'REGISTER':
    case 'LOGIN':
      return {
        ...state,
        logged: true,
        uid: action.payload.id,
        checking: false,
        user: action.payload
      }
    case 'LOADING':
      return {
        ...state,
        loading: action.payload
      }
    case 'SET_USER':
      return {
        ...state,
        user: action.payload
      }

    default:
      return state
  }
}
