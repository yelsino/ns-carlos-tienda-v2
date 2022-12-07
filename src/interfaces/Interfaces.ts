import { OrderData } from 'Components/Pages/Payment/Payment'


export interface User {
  uid: string | null
  email: string
  names: string
  surnames: string
  mobile?: string
}

export interface Category {
  name: string
}

export interface Claim {
  subject: string
  description: string
  user: string
  status: boolean
  order: string
  code: string
  photos: string[]
}

export interface Credit {
  client: string
  nomber_credit: string
  code: string
  amount: number
  payments: number[]
  evidence: string[]
}

export interface Direction {
  _id?: string
  reference: string
  name: string
  user: string
}

export interface Product {
  _id: string
  name: string
  keywords: [string]
  img: string
  description: string
  typeOfsale: string
  pricePerWeight: [{ weight: number; price: number, _id:string }]
  quantityPerUnits: number
  unitPrice: number
  units: number
  stock: number
  category: Category
}

export interface ProductsList {
  quantities: ItemQuantity[]
  product: Product
  _id: string
}

interface ItemQuantity {
  weight: number
  price: number
  quantity: number
  _id?: string
}

export interface List {
  _id?: string
  name: string
  products: Array<ProductsList>
}

export interface Message {
  de: User
  para: User
  message: string
}

export interface Order {
  _id: string
  client: User
  list: List
  direction: Direction
  state: string
  code: string
  numberOrder: number
  amount: number
}

export interface OrdeDetail {
  order: Order
  listDetail: object
}

export interface Role {
  name: string
}

export interface RouterContext {
  orderData: OrderData
  setOrderData: React.Dispatch<React.SetStateAction<OrderData>>
}


export interface Quantity {
  quantity: number
  price: number
  weight: number
  _id?: string
  weighttextmd?: string
  weighttextlg?: string
}