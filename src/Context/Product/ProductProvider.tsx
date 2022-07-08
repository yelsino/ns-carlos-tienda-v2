import { useReducer } from 'react'
import PropTypes from 'prop-types'
import { ProductReducer } from './ProductReducer'
import { Product } from 'interfaces/Interfaces'
import { ProductContext } from './ProductContext'

export interface ProductState {
  products: Array<Product>
  product: Product | null
}
interface Props {
  children: JSX.Element | JSX.Element[]
}

const INITIAL_STATE: ProductState = {
  products: [],
  product: null
}

export const ProductProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(ProductReducer, INITIAL_STATE)

  return (
    <ProductContext.Provider
      value={{
        ...state,
        dispatch
      }}
    >
      {children}
    </ProductContext.Provider>
  )
}

ProductProvider.propTypes = {
  children: PropTypes.node.isRequired
}
