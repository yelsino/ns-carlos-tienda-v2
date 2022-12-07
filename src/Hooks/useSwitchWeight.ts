import { AuthContext } from 'Context/auth/AuthContext'
import { ListContext } from 'Context/List/ListContext'
import { NotificacionContext } from 'Context/Notificaciones/NotificacionContext'
import { SocketContext } from 'Context/Socket/SocketContext'
import { formatToMoney } from 'helpers/formatToMoney'
import { useContext, useEffect, useState } from 'react'
import { ProductModel } from 'schemas/Product.model'


interface Props {
  product: ProductModel
  setAdding: React.Dispatch<React.SetStateAction<boolean>>
}

export const useSwitchWeight = ({ product, setAdding }: Props) => {

const { uid } = useContext(AuthContext)
const { socket } = useContext(SocketContext)
const { list: listOfProducts } = useContext(ListContext)
const [modProduct, setModProduct] = useState<ProductModel>(null)
const [weight, setWeight] = useState('');
const { setNotificacion } = useContext(NotificacionContext)


// transforma el producto
const transformWeight = () => {
  const { pricePerWeight, typeOfsale } = product
  switch (typeOfsale) {
    case 'KILOGRAMOS':
      // necesitamos tranformar la data
      return setModProduct({
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

    case 'LITROS':
      return setModProduct({
        ...modProduct,
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
      })

    case 'FRACCIONES':
      return setModProduct({
        ...modProduct,
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
      })

    case 'UNIDADES':
      return setModProduct({
        ...modProduct,
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
      })
  }
}

const addProductToList = () => {
  
  setAdding(true)
  socket?.emit('update-list', {
    type: 'ADD_PRODUCT_TO_LIST',
    userID: uid,
    listID: listOfProducts._id,
    productID: product.id,
    mountID: weight
  })
}

const removeProductOfList = () => {
 
  socket?.emit('update-list', {
    type: 'REMOVE_PRODUCT_OF_LIST',
    userID: uid,
    listID: listOfProducts._id,
    productID: product.id,
    mountID: weight
  })
  setNotificacion({message:`Quitó ${product.name} de lista`, type: 1})
}

const getPriceWeightSelected = (): number => {
  const price = modProduct.pricePerWeight.find((v) => v.id === weight)
  return Number(formatToMoney(price.price))
}
const [priceSelected, setPriceSelected] = useState(0)
const [quantitySelected, setQuantitySelected] = useState(0)
const [totalProduct, setTotalProduct] = useState('')
useEffect(() => {
  if (modProduct) {
    setPriceSelected(getPriceWeightSelected())
    setQuantitySelected(getQuantityWeightSelected())
    setTotalProduct(getTotalQuantityAndPrice())
    setTotalWeight(getTotalWeight())
  }
}, [modProduct])

// obtener cantidad del producto en la lista seleccionada
const getQuantityWeightSelected = (): number => {
  
  const productOfList = listOfProducts.products.find(
    (p) => p.product._id === product.id)
  
  if(!productOfList) return 0
  const quantity = productOfList.quantities.find(
    (v) => v._id === weight
  )
  
  if(!quantity) return 0

  return quantity.quantity
}

const getTotalQuantityAndPrice = () => {
  const { typeOfsale } = product
  const productOfList = listOfProducts?.products.find(
    (p) => p.product._id === product.id
  )

  if (productOfList) {
    const weight = productOfList?.quantities.reduce((acc, cur) => {
      return acc + cur.weight * cur.quantity
    }, 0)
    const price = productOfList?.quantities.reduce((acc, cur) => {
      return acc + cur.quantity * cur.price
    }, 0)

    const quantity = productOfList?.quantities.reduce((acc, cur) => {
      return acc + cur.quantity
    }, 0)

    switch (typeOfsale) {
      case 'KILOGRAMOS':
        return ` ${weight < 1000 ? 'gr' : 'kg'} = S/ ${formatToMoney(price)}`
      // return ` ${weight / 1000} ${
      //   weight < 1000 ? 'gr' : 'kg'
      // } = S/ ${formatToMoney(price)}`;

      case 'LITROS':
        return ` ${weight < 1000 ? 'ml' : 'lt'} = S/ ${formatToMoney(price)}`
      // return ` ${weight / 1000} ${
      //   weight < 1000 ? 'ml' : 'lt'
      // } = S/ ${formatToMoney(price)}`;

      // # falta trabajar
      case 'FRACCIONES':
        return ` ${weight < 1000 ? 'ml' : 'lt'} = S/ ${formatToMoney(price)}`

      case 'UNIDADES':
        return ` ${quantity <= 1 ? 'und' : 'unds'} = S/ ${formatToMoney(
          price
        )}`
      // return ` ${quantity} ${
      //   quantity <= 1 ? 'und' : 'unds'
      // } = S/ ${formatToMoney(price)}`;
    }

    return ` ${weight < 1000 ? 'gr' : 'kg'} = S/ ${formatToMoney(price)}`
    // return ` ${weight / 1000} ${
    //   weight < 1000 ? 'gr' : 'kg'
    // } = S/ ${formatToMoney(price)}`;
  } else {
    return ' = S/ 0.00'
  }
}

const [totalWeight, setTotalWeight] = useState(0)

const getTotalWeight = () => {
  const { typeOfsale } = product
  const productOfList = listOfProducts?.products.find(
    (p) => p.product._id === product.id
  )

  if (productOfList) {
    const weight = productOfList?.quantities.reduce((acc, cur) => {
      return acc + cur.weight * cur.quantity
    }, 0)

    const quantity = productOfList?.quantities.reduce((acc, cur) => {
      return acc + cur.quantity
    }, 0)
    switch (typeOfsale) {
      case 'KILOGRAMOS':
      case 'LITROS':
      case 'FRACCIONES':
        return weight / 1000
      case 'UNIDADES':
        return quantity
      default:
        return 0
    }
  } else {
    return 0
  }
}

useEffect(() => {
  transformWeight()
  const position = JSON.parse(localStorage.getItem("position")) ? Number(JSON.parse(localStorage.getItem("position"))) : 0
  setWeight(product.pricePerWeight[position].id)
}, [product])

useEffect(() => {
  if (weight) {
    setPriceSelected(getPriceWeightSelected())
    setQuantitySelected(getQuantityWeightSelected())
  }
}, [weight])

useEffect(() => {
  if (modProduct) {
    setQuantitySelected(getQuantityWeightSelected())
    setTotalProduct(getTotalQuantityAndPrice())
    setTotalWeight(getTotalWeight())
  }
}, [listOfProducts])

  return {
    weight,
    setWeight,
    alterproduct: modProduct,
    priceSelected,
    quantitySelected,
    totalProduct,
    totalWeight,
    removeProductOfList,
    addProductToList
  } as const
}
