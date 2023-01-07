
import { createContext } from 'react'
import { IProducto } from 'types-yola'
import { RemoveProductSocket } from './ProductProvider'
import { ProductAction } from './ProductReducer'

interface PropsContext {
  products: Array<IProducto>
  product: IProducto | null
  dispatch: React.Dispatch<ProductAction>
  removeProductOfList: (data:RemoveProductSocket) => void
}

export const ProductContext = createContext<PropsContext>({} as PropsContext)
