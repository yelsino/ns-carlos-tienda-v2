import { useContext, useEffect, useState } from 'react'
import { RadioGroup } from '@headlessui/react'
import './cssViewProduct.css'
import { useOnClick } from '../../../../Hooks/useOnClick'
import { SocketContext } from '../../../../Context/Socket/SocketContext'
import { motion } from 'framer-motion'
import { IconDelete } from '../../../Atoms/Icons'
import { formatToMoney } from '../../../../helpers/formatToMoney'
import { AuthContext } from 'Context/auth/AuthContext'
import { ListContext } from 'Context/List/ListContext'


const SwitchWeight = ({ product }) => {
  const [disabled, setDisabled] = useOnClick(300)
  const { uid } = useContext(AuthContext)
  const { socket } = useContext(SocketContext)
  const { list: listOfProducts } = useContext(ListContext)
  const [alterproduct, setAlterProduct] = useState(null)
  const [weight, setWeight] = useState('')



  const transformWeight = () => {
    const { pricePerWeight, typeOfsale } = product
    // const { pricePerWeight, typeOfsale } = alterproduct;
    switch (typeOfsale) {
      case 'KILOGRAMOS':
        return setAlterProduct({
          ...alterproduct,
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

  const addProductToList = () => {
    setDisabled(true)
    console.log(weight)
    socket?.emit('update-list', {
      type: 'ADD_PRODUCT_TO_LIST',
      userID: uid,
      listID: listOfProducts._id,
      productID: product._id,
      mountID: weight
    })
  }

  const removeProductOfList = (e) => {
    e.stopPropagation()
    console.log("eliminando");
    
    setDisabled(true)

    socket?.emit('update-list', {
      type: 'REMOVE_PRODUCT_OF_LIST',
      userID: uid,
      listID: listOfProducts._id,
      productID: product._id,
      mountID: weight
    })
  }

 

  const getPriceWeightSelected = ():number => {
    const { pricePerWeight } = alterproduct
    const price = pricePerWeight.find((v) => v._id === weight)
    return Number(formatToMoney(price.price))
  }
  const [priceSelected, setPriceSelected] = useState(0)
  const [quantitySelected, setQuantitySelected] = useState(0)
  const [totalProduct, setTotalProduct] = useState('')
  useEffect(() => {
    if (alterproduct) {
      setPriceSelected(getPriceWeightSelected())
      setQuantitySelected(getQuantityWeightSelected())
      setTotalProduct(getTotalQuantityAndPrice())
      setTotalWeight(getTotalWeight())
    }
  }, [alterproduct])

  const getQuantityWeightSelected = () => {
    // const { pricePerWeight } = alterproduct;
    const productOfList = listOfProducts.products.find(
      (p) => p.product._id === product._id
    )

    if (productOfList) {
      const quantity = productOfList?.quantities.find(
        (v) => v._id === weight
      ).quantity
      return quantity
    } else {
      return 0
    }
  }

  const getTotalQuantityAndPrice = () => {
    const { typeOfsale } = product
    const productOfList = listOfProducts?.products.find(
      (p) => p.product._id === product._id
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
      (p) => p.product._id === product._id
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
    setWeight(product.pricePerWeight[0]._id)
  }, [])

  useEffect(() => {
    if (weight) {
      setPriceSelected(getPriceWeightSelected())
      setQuantitySelected(getQuantityWeightSelected())
    }
  }, [weight])

  useEffect(() => {
    if (alterproduct) {
      console.log(alterproduct)
      setQuantitySelected(getQuantityWeightSelected())
      setTotalProduct(getTotalQuantityAndPrice())
      setTotalWeight(getTotalWeight())
    }
  }, [listOfProducts])

  return (
    <>
      {weight && (
        <>
          <RadioGroup
            value={weight}
            onChange={(e) => {
              console.log(e)
              setWeight(e)
            }}
            className="flex w-full justify-between"
          >
            {alterproduct.pricePerWeight.map(
              ({ _id, weighttextlg, weighttextmd }) => (
                <RadioGroup.Option
                  key={_id}
                  value={_id}
                  className="flex w-full justify-between gap-x-3"
                >
                  {({ checked }) => (
                    <button
                      className={`overflow-hidden truncate rounded-sm border border-black px-6 py-4 tracking-tight transition duration-300 ease-in-out ${
                        checked
                          ? 'width-active1 bg-black text-white  '
                          : 'width-inactive1 bg-white'
                      }`}
                    >
                      {checked ? weighttextlg : weighttextmd}
                    </button>
                  )}
                </RadioGroup.Option>
              )
            )}
          </RadioGroup>

          <div className="flex w-full flex-col gap-y-1">
            <p className="flex w-full justify-between">
              <span>Precio</span>
              <span>{priceSelected}</span>
            </p>

            <p className="flex w-full justify-between">
              <span>En lista</span>

              <span className="text-color_green_7">{quantitySelected} und</span>
            </p>
            <p className="flex w-full justify-between">
              <span>Total</span>
              <span className="text-color_green_7">
                <motion.span
                  initial={{ scale: 1.5 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3 }}
                  exit={{ scaleY: 0 }}
                  key={totalProduct}
                  className="inline-block font-bold"
                >
                  {totalWeight}
                </motion.span>
                {totalProduct}
              </span>
            </p>
          </div>

          <div className="flex w-full items-center justify-between">
            <motion.button
              animate={disabled ? { scale: 0.95 } : { scale: 1 }}
              transition={{ duration: 0.2 }}
              onClick={addProductToList}
              disabled={disabled}
              className={`w-48 bg-orange-600 py-3 font-poppins font-semibold text-white ${
                disabled ? 'cursor-wait' : 'cursor-pointer'
              }`}
            >
              Añadir
            </motion.button>

            <button
              onClick={removeProductOfList}
              className="flex h-full w-14 items-center justify-center text-2xl hover:text-green-400"
            >
              <IconDelete />
            </button>
          </div>
        </>
      )}
    </>
  )
}

export default SwitchWeight
