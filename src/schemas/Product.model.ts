import { Product, Quantity } from "interfaces/Interfaces"
import { PRODUCTO_VENTA } from "interfaces/Producto.interface"

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

  tranformQuantities = (
    dataquantities: Array<Quantity>,
    typeOfsale: string
  ) => {
    return dataquantities.map((v) => {
      switch (typeOfsale) {
        case PRODUCTO_VENTA.UNIDADES: {
          if (v.weight === 250) {
            v.weighttextmd = 'chico'
            v.weighttextlg = 'pequeño'
            return v
          }
          if (v.weight === 500) {
            v.weighttextmd = 'medio'
            v.weighttextlg = 'mediano'
            return v
          }
          if (v.weight === 1000) {
            v.weighttextmd = 'grande'
            v.weighttextlg = 'el grande'
            return v
          }
          return v
        }
  
        case PRODUCTO_VENTA.KILOGRAMOS: {
          if (v.weight === 250) {
            v.weighttextmd = '1/4'
            v.weighttextlg = `${v.weight} gramos`
            return v
          }
          if (v.weight === 500) {
            v.weighttextmd = '1/2'
            v.weighttextlg = `${v.weight} gramos`
            return v
          }
          if (v.weight === 1000) {
            v.weighttextmd = '1 kg'
            v.weighttextlg = `1 kilogramo`
            return v
          } else {
            v.weighttextmd = `${v.weight} gr`
            v.weighttextlg = `${v.weight} gramos`
            return v
          }
        }
  
        case PRODUCTO_VENTA.LITROS: {
          if (v.weight === 500) {
            v.weighttextmd = '1/2'
            v.weighttextlg = '1/2 litro'
            return v
          }
          if (v.weight === 1000) {
            v.weighttextmd = '1 lt'
            v.weighttextlg = '1 litro'
            return v
          } else {
            v.weighttextmd = `${v.weight} ml`
            v.weighttextlg = `${v.weight} mililitros`
            return v
          }
        }
  
        case PRODUCTO_VENTA.FRACCIONES: {
          if (v.weight === 250) {
            v.weighttextmd = '1/4'
            v.weighttextlg = 'un cuarto'
            return v
          }
          if (v.weight === 500) {
            v.weighttextmd = '1/2'
            v.weighttextlg = 'la mitad'
            return v
          }
          if (v.weight === 1000) {
            v.weighttextmd = '1'
            v.weighttextlg = 'entero'
            return v
          }
          return v
        }
      }
      return v
    })
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

// transforma el producto
export const transformWeight = (product) => {
  const { pricePerWeight, typeOfsale } = product
  switch (typeOfsale) {
    case PRODUCTO_VENTA.UNIDADES:
      return {
        ...product,
        pricePerWeight: pricePerWeight.map((v) => {
          if (v.weight === 250) {
            v.weighttextmd = 'chico'
            v.weighttextlg = 'pequeño'
            return v
          }
          if (v.weight === 500) {
            v.weighttextmd = 'medio'
            v.weighttextlg = 'mediano'
            return v
          }
          if (v.weight === 1000) {
            v.weighttextmd = 'grande'
            v.weighttextlg = 'el grande'
            return v
          }
          return v
        })
      }

    case PRODUCTO_VENTA.KILOGRAMOS:
      // necesitamos tranformar la data
      return ({
        ...product,
        pricePerWeight: pricePerWeight.map((v) => {
          if (v.weight === 250) {
            v.weighttextmd = '1/4'
            v.weighttextlg = `250 gramos`
            return v
          }
          if (v.weight === 500) {
            v.weighttextmd = '1/2'
            v.weighttextlg = `500 gramos`
            return v
          }
          if (v.weight === 1000) {
            v.weighttextmd = '1 kg'
            v.weighttextlg = `1 kilogramo`
            return v
          }
          if (v.weight !== 250 || v.weight !== 500 || v.weight !== 1000) {
            v.weighttextmd = `${v.weight} gr`
            v.weighttextlg = `${v.weight} gramos`
            return v
          }
          return v
        })
      })

    case PRODUCTO_VENTA.LITROS:
      return {
        ...product,
        pricePerWeight: pricePerWeight.map((v) => {
          if (v.weight === 500) {
            v.weighttextmd = '500 ml'
            v.weighttextlg = 'medio litro'
            return v
          }
          if (v.weight === 1000) {
            v.weighttextmd = '1 lt'
            v.weighttextlg = '1 litro'
            return v
          }

          if (v.weight !== 500 || v.weight !== 1000) {
            v.weighttextmd = `${v.weight} ml`
            v.weighttextlg = `${v.weight} mililitros`
            return v
          }
          return v
        })
      }

    case PRODUCTO_VENTA.FRACCIONES:
      return {
        ...product,
        pricePerWeight: pricePerWeight.map((v) => {
          if (v.weight === 250) {
            v.weighttextmd = '1/4'
            v.weighttextlg = 'cuarta parte'
            return v
          }
          if (v.weight === 500) {
            v.weighttextmd = '1/2'
            v.weighttextlg = 'la mitad'
            return v
          }
          if (v.weight === 1000) {
            v.weighttextmd = '1'
            v.weighttextlg = 'entero'
            return v
          }
          return v
        })
      }


  }
}

