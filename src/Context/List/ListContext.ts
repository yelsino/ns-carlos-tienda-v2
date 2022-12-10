
import { ILista } from 'interfaces/lista.interface'
import { createContext } from 'react'
import { ListAction } from './listReducer'

interface ListContextProps {
  lists: Array<ILista>
  ok: boolean
  list: ILista | null
  dispatch: React.Dispatch<ListAction>
  viewList: boolean
  seeCurrentList: (viewList:boolean) => void
}

export const ListContext = createContext<ListContextProps>(
  {} as ListContextProps
)
