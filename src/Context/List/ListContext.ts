import { List } from 'interfaces/Interfaces'
import { createContext } from 'react'
import { ListAction } from './listReducer'

interface ListContextProps {
  lists: Array<List>
  ok: boolean
  list: List | null
  dispatch: React.Dispatch<ListAction>
}

export const ListContext = createContext<ListContextProps>(
  {} as ListContextProps
)
