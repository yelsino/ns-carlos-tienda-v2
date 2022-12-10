import PropTypes from 'prop-types'
import { listReducer } from './listReducer'
import { useReducer } from 'react'
import { ListContext } from './ListContext'
import { ILista } from 'interfaces/lista.interface'

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

  return (
    <ListContext.Provider
      value={{
        ...state,
        dispatch,
        seeCurrentList
      }}
    >
      {children}
    </ListContext.Provider>
  )
}

ListProvider.propTypes = {
  children: PropTypes.node.isRequired
}
