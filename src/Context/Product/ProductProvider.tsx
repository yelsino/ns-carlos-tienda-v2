import { useContext, useReducer } from 'react'
import PropTypes from 'prop-types'
import { ProductReducer } from './ProductReducer'
import { Product } from 'interfaces/Interfaces'
import { ProductContext } from './ProductContext'
import { SocketContext } from 'Context/Socket/SocketContext'

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

export interface RemoveProductSocket {
  type: string
  userID: string,
  listID: string
  productID: string
  mountID: string

}

export const ProductProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(ProductReducer, INITIAL_STATE)
  const { socket } = useContext(SocketContext)

  const removeProductOfList = (data:RemoveProductSocket) => {
    console.log(data);
    
    socket?.emit('update-list', data)
  }

  return (
    <ProductContext.Provider
      value={{
        ...state,
        removeProductOfList,
        dispatch
      }}
    >
      {children}
    </ProductContext.Provider>
  )
}


