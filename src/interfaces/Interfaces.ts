export interface User {
  uid: string
  email: string
  names: string
  surnames: string
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
  reference: string
  name: string
  user: string
}

export interface Product {
  name: string
  keywords: [string]
  img: string
  description: string
  typeOfsale: string
  pricePerWeight: [{ weight: number; price: number }]
  quantityPerUnits: number
  unitPrice: number
  units: number
  stock: number
  category: Category
}

interface ProductsList {
  quantities: ItemList[]
  product: Product
}

interface ItemList {
  weight: number
  price: number
  quantity: number
}

export interface List {
  name: string
  products: ProductsList[]
}

export interface Message {
  de: User
  para: User
  message: string
}

export interface Order {
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
