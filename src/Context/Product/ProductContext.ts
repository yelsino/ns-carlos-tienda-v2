import { Product } from 'interfaces/Interfaces'
import { createContext } from 'react'
import { RemoveProductSocket } from './ProductProvider'
import { ProductAction } from './ProductReducer'

interface PropsContext {
  products: Array<Product>
  product: Product | null
  dispatch: React.Dispatch<ProductAction>
  removeProductOfList: (data:RemoveProductSocket) => void
}

export const ProductContext = createContext<PropsContext>({} as PropsContext)
