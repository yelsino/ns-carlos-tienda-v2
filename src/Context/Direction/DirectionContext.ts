
import { createContext } from 'react'
import { IDireccion } from 'types-yola'
import { DirectionAction } from './DirectionReducer'

interface PropsContext {
  directions: Array<IDireccion>
  direction: IDireccion | null
  dispatch: React.Dispatch<DirectionAction>
}

export const DirectionContext = createContext<PropsContext>({} as PropsContext)
