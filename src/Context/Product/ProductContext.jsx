import { createContext, useReducer} from 'react';
import PropTypes from 'prop-types';
import { ProductReducer } from './ProductReducer';

export const ProductContext = createContext(null);

const initialState = {
  products: [],
};

export const ProductProvider = ({ children }) => {
  const [productstate, dispatch] = useReducer(ProductReducer, initialState);

  return (
    <ProductContext.Provider
      value={{
        productstate,
        dispatch,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

ProductProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
