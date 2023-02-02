import { listReducer } from './listReducer'
import { useReducer } from 'react'
import { ListContext } from './ListContext'
import { ILista, IRespuesta } from 'types-yola'
import { fetchConToken } from 'helpers/fetch'

export interface ListState {
  lists: Array<ILista>
  ok: boolean
  list: ILista | null
  viewList: boolean
}

interface Props {
  children: JSX.Element | JSX.Element[]
}

const INITIAL_STATE: ListState = {
  lists: [],
  ok: false,
  list: null,
  viewList: false
}

export const ListProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(listReducer, INITIAL_STATE)

  const seeCurrentList = (viewList: boolean) => {
    dispatch({
      type: 'VIEW_LIST',
      payload: viewList
    })
  }
  // /lista/obtener-lista/63af5f3c62e57a14c64d0c74
  const obtenerListaDetallada = async (listaId: string) => {
    const respuesta = await fetchConToken<IRespuesta<ILista>>({ endpoint: `lista/obtener-lista/${listaId}` });
    if (respuesta.ok) {
      dispatch({
        type: 'SELECT_LIST',
        payload: respuesta.data
      })
    }

    return respuesta

  }

  const eliminarLista = async (listaId: string) => {
    const respuesta = await fetchConToken<IRespuesta<boolean>>({ 
      endpoint: `lista/eliminar-lista/${listaId}`,
      method: 'DELETE'
     });
    if (respuesta.ok) {
      dispatch({
        type: 'DELETE_LIST',
        payload: listaId
      })
    }

    return respuesta
  }

  const crearLista = async (lista: ILista) => {
    console.log(lista);
    
    const respuesta = await fetchConToken<IRespuesta<ILista>>({ 
      endpoint: `lista/crear-lista`,
      body: lista,
      method: 'POST',
     });
    if (respuesta.ok) {
      dispatch({
        type: 'CREATE_LIST',
        payload: respuesta.data
      })
    }

    return respuesta
  }

  return (
    <ListContext.Provider
      value={{
        ...state,
        dispatch,
        seeCurrentList,
        obtenerListaDetallada,
        eliminarLista,
        crearLista
      }}
    >
      {children}
    </ListContext.Provider>
  )
}


