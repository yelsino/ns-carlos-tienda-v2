import { Direction } from 'interfaces/Interfaces'
import { createContext } from 'react'
import { DirectionAction } from './DirectionReducer'

interface PropsContext {
  directions: Array<Direction>
  direction: Direction | null
  dispatch: React.Dispatch<DirectionAction>
}

export const DirectionContext = createContext<PropsContext>({} as PropsContext)
