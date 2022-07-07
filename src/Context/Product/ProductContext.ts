import { Product } from 'interfaces/Interfaces'
import { createContext } from 'react'
import { ProductAction } from './ProductReducer'

interface PropsContext {
  orders: Array<Product>
  dispatch: React.Dispatch<ProductAction>
}

export const OrderContext = createContext<PropsContext>({} as PropsContext)
