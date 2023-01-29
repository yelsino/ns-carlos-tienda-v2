
import { createContext } from 'react'
import { IDireccion, IRespuesta } from 'types-yola'
import { DirectionAction } from './DirectionReducer'

interface PropsContext {
  directions: Array<IDireccion>
  direction: IDireccion | null
  dispatch: React.Dispatch<DirectionAction>
  registrarDireccion: (direccion: IDireccion) => Promise<IRespuesta<IDireccion>>
}

export const DirectionContext = createContext<PropsContext>({} as PropsContext)
