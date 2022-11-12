import { Product } from "interfaces/Interfaces"

export class ProductModel {
  id: string
  name: string
  keywords: [string]
  img: string
  description: string
  typeOfsale: string
  pricePerWeight: PricePerWeight[]
  quantityPerUnits: number
  unitPrice: number
  units: number
  stock: number
  //   category: Category

  constructor(product:Product) {

    
    let prices = new Array<PricePerWeight>();
    product.pricePerWeight.forEach((e)=>{
      let price = new PricePerWeight();
      price.adapter(e)
      prices.push(price)
    })

    this.id = product._id
    this.name = product.name
    this.keywords = product.keywords
    this.img = product.img
    this.description = product.description
    this.typeOfsale = product.typeOfsale
    this.pricePerWeight = prices
    this.quantityPerUnits = product.quantityPerUnits
    this.unitPrice = product.unitPrice
    this.units = product.units
    this.stock = product.stock
  }



  adapter?(object: any) {
    this.id = object._id
    this.name = object.name
    this.keywords = object.keywords
    this.img = object.img
    this.typeOfsale = object.typeOfsale
    this.pricePerWeight = object.pricePerWeight
    this.unitPrice = object.unitPrice
    this.units = object.units
    this.stock = object.stock
  }
}

export class PricePerWeight {
    weight
    price: number
    weighttextmd: string
    weighttextlg: string
    id: string

    adapter?(object: any ) {
      this.id = object._id
      this.weight = object.weight
      this.price = object.price
      this.weighttextmd = object.weighttextmd
      this.weighttextlg = object.weighttextlg
    }
}
