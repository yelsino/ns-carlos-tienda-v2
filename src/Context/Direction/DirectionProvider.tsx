
import { IDireccion } from 'interfaces/direccion.interface'
import { useReducer } from 'react'
import { DirectionContext } from './DirectionContext'
import { directionReducer } from './DirectionReducer'

export interface DirectionState {
  directions: Array<IDireccion>
  direction: IDireccion | null
}

interface Props {
  children: JSX.Element | JSX.Element[]
}

const INITIAL_STATE: DirectionState = {
  directions: [],
  direction: null
}

export const DirectionProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(directionReducer, INITIAL_STATE)

  return (
    <DirectionContext.Provider
      value={{
        ...state,
        dispatch
      }}
    >
      {children}
    </DirectionContext.Provider>
  )
}
