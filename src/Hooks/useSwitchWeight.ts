import { useEffect, useState } from 'react'
import { ProductModel } from 'schemas/Product.model'

export const useSwitchWeight = ({ product }) => {
const [weight, setWeight] = useState('')

const transformWeight = () => {
  const { pricePerWeight, typeOfsale } = product
  const [alterproduct, setAlterProduct] = useState<ProductModel>(null)
  switch (typeOfsale) {
    case 'KILOGRAMOS':
      // necesitamos tranformar la data
      return setAlterProduct({
        ...product,
        pricePerWeight: pricePerWeight.map((v) => {
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
          }
          if (v.weight !== 250 || v.weight !== 500 || v.weight !== 1000) {
            v.weighttextmd = `${v.weight} gr`
            v.weighttextlg = `${v.weight} gramos`
            return v
          }
          return v
        })
      })

    case 'LITROS':
      return setAlterProduct({
        ...alterproduct,
        pricePerWeight: pricePerWeight.map((v) => {
          if (v.weight === 500) {
            v.weighttextmd = '1/2'
            v.weighttextlg = '1/2 litro'
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
      })

    case 'FRACCIONES':
      return setAlterProduct({
        ...alterproduct,
        pricePerWeight: pricePerWeight.map((v) => {
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
        })
      })

    case 'UNIDADES':
      return setAlterProduct({
        ...alterproduct,
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
            v.weighttextmd = 'extra'
            v.weighttextlg = 'grande'
            return v
          }
          return v
        })
      })
  }
}

useEffect(() => {
  transformWeight()
  setWeight(product.pricePerWeight[0].id)
}, [])

  return {
    weight,
  } as const
}
