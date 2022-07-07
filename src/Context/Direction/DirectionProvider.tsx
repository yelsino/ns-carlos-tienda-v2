import { Direction } from 'interfaces/Interfaces'
import { useReducer } from 'react'
import { DirectionContext } from './DirectionContext'
import { directionReducer } from './DirectionReducer'

export interface DirectionState {
  directions: Array<Direction>
  direction: Direction | null
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
