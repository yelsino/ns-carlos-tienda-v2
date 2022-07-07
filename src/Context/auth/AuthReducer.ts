import { User } from 'interfaces/User'
import { AuthState } from './AuthProvider'

export type AuthAction =
  | { type: 'LOGOUT' }
  | { type: 'LOGIN'; payload: User }
  | { type: 'dasdsa'; user: User }
  | { type: '321321'; user: User }

export const authReducer = (
  state: AuthState,
  action: AuthAction
): AuthState => {
  switch (action.type) {
    case 'LOGOUT':
      return {
        ...state,
        uid: '',
        checking: false,
        logged: false,
        user: null
      }
    case 'LOGIN':
      return {
        ...state,
        logged: true,
        user: action.payload
      }

    default:
      return state
  }
}
