import { useContext, useReducer } from 'react'
import { ProductReducer } from './ProductReducer'
import { ProductContext } from './ProductContext'
import { SocketContext } from 'Context/Socket/SocketContext'
import { IProducto } from './../../interfaces/Producto.interface';

export interface ProductState {
  products: Array<IProducto>
  product: IProducto | null
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

  const removeProductOfList = (data:RemoveProductSocket) => socket?.emit('update-list', data)

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


