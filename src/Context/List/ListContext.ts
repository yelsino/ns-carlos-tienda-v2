
import { createContext } from 'react'
import { ILista } from 'types-yola'
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
