import { createContext, useReducer } from 'react';
import PropTypes from 'prop-types';
import { directionReducer } from './directionReducer';

export const DirectionContext = createContext(null);

const initialState = {
  directions: [],
  direction: null,
};

export const DirectionProvider = ({ children }) => {
  const [data, setDirection] = useReducer(directionReducer, initialState);

  return (
    <DirectionContext.Provider
      value={{
        data,
        setDirection,
      }}
    >
      {children}
    </DirectionContext.Provider>
  );
};

DirectionProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
