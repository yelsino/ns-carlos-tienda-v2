import { Product } from 'interfaces/Interfaces'
import { createContext } from 'react'
import { ProductAction } from './ProductReducer'

interface PropsContext {
  products: Array<Product>
  product: Product | null
  dispatch: React.Dispatch<ProductAction>
}

export const ProductContext = createContext<PropsContext>({} as PropsContext)
