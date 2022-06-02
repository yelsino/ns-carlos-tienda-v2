import { createContext, useReducer} from 'react';
import PropTypes from 'prop-types';
import { ProductReducer } from './ProductReducer';

export const ProductContext = createContext(null);

const initialState = {
  products: [],
  product: null
};

export const ProductProvider = ({ children }) => {
  const [productstate, dispatchProduct] = useReducer(ProductReducer, initialState);

  return (
    <ProductContext.Provider
      value={{
        productstate,
        dispatchProduct
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

ProductProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
