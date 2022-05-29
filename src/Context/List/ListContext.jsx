import { createContext,  useReducer } from 'react';
import PropTypes from 'prop-types';
import { listReducer } from './listReducer';

export const ListContext = createContext(null);

const initialState = {
  lists: [],
  ok:false,
  list: null,
};

export const ListProvider = ({ children }) => {
  const [liststate, setList] = useReducer(listReducer, initialState);


  return (
    <ListContext.Provider
      value={{
        liststate,
        setList,
      }}
    >
      {children}
    </ListContext.Provider>
  );
};


ListProvider.propTypes = {
    children: PropTypes.node.isRequired,
}