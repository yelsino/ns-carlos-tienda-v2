import PropTypes from 'prop-types'
import { listReducer } from './listReducer'
import { List } from 'interfaces/Interfaces'
import { useReducer } from 'react'
import { ListContext } from './ListContext'

export interface ListState {
  lists: Array<List>
  ok: boolean
  list: List | null
}

interface Props {
  children: JSX.Element | JSX.Element[]
}

const INITIAL_STATE: ListState = {
  lists: [],
  ok: false,
  list: null
}

export const ListProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(listReducer, INITIAL_STATE)

  return (
    <ListContext.Provider
      value={{
        ...state,
        dispatch
      }}
    >
      {children}
    </ListContext.Provider>
  )
}

ListProvider.propTypes = {
  children: PropTypes.node.isRequired
}
