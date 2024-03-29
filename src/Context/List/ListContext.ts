
import { createContext } from 'react'
import { ILista, IRespuesta } from 'types-yola'
import { ListAction } from './listReducer'

interface ListContextProps {
  lists: Array<ILista>
  ok: boolean
  list: ILista | null
  dispatch: React.Dispatch<ListAction>
  viewList: boolean
  seeCurrentList: (viewList:boolean) => void
  obtenerListaDetallada: (id: string) => Promise<IRespuesta<ILista>>,
  crearLista: (lista: ILista) => Promise<IRespuesta<ILista>>,
  eliminarLista: (id: string) => Promise<IRespuesta<boolean>>,
}

export const ListContext = createContext<ListContextProps>(
  {} as ListContextProps
)
