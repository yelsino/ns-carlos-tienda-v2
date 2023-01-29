
import { fetchConToken } from 'helpers/fetch'
import { useReducer } from 'react'
import { IDireccion, ILista, IRespuesta } from 'types-yola'
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

  const registrarDireccion = async (direccion: IDireccion):Promise<IRespuesta<IDireccion>> => {

    const respuesta = await fetchConToken<IRespuesta<IDireccion>>({ 
      endpoint: 'direcciones',
      body: direccion,
      method: 'POST',
     });

    if (respuesta.ok) {
      dispatch({
        type: 'SELECT_DIRECTION',
        payload: respuesta.data
      })

      dispatch({
        type: 'ADD_DIRECTION',
        payload: respuesta.data
      })
    }
    return respuesta

  }

  return (
    <DirectionContext.Provider
      value={{
        ...state,
        dispatch,
        registrarDireccion
      }}
    >
      {children}
    </DirectionContext.Provider>
  )
}
