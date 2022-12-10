import { IconDelete } from 'Components/Atoms/Icons'
import { AuthContext } from 'Context/auth/AuthContext'
import { ListContext } from 'Context/List/ListContext'
import { ProductContext } from 'Context/Product/ProductContext'
import { SocketContext } from 'Context/Socket/SocketContext'
import { AnimatePresence, motion } from 'framer-motion'
import { formatToMoney } from 'helpers/formatToMoney'
import { useOnClick } from 'Hooks/useOnClick'
import {  ProductsList, Quantity } from 'interfaces/Interfaces'
import { PRODUCTO_VENTA } from 'interfaces/producto.interface'
import { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ProductModel } from 'schemas/Product.model'


interface Props {
  item: ProductsList
}




const ItemList = ({ item }: Props) => {
  const {
    _id,
    product: { name, typeOfsale },
    quantities
  } = item


  const totalQuantity = () => {
    const quantity = [...quantities].reduce((acc, curr) => {
      switch (typeOfsale) {
        case 'UNIDADES':
          return acc + curr?.quantity

        case 'KILOGRAMOS':
        case 'LITROS':
        case 'FRACCIONES':
          return acc + (curr?.quantity * curr?.weight) / 1000

        default:
          return 0
      }
    }, 0)

    switch (typeOfsale) {
      case 'UNIDADES':
        return `${quantity} und`
      case 'KILOGRAMOS':
        return `${number.isInteger(quantity) ? quantity : quantity.toFixed(2)
          } kg`
      case 'LITROS':
        return `${number.isInteger(quantity) ? quantity : quantity.toFixed(2)
          } lt`
      case 'FRACCIONES':
        return `${number.isInteger(quantity) ? quantity : quantity.toFixed(2)
          } ft`
      default:
        return null
    }
  }

  const totalAmount = () => {
    const amountOfProduct = quantities.reduce(
      (acc, curr) => acc + curr?.quantity * curr?.price,
      0
    )
    return formatToMoney(amountOfProduct) 
  }

  const [isOpen, setIsOpen] = useState(false)
  const toggleOpen = () => setIsOpen(!isOpen)

  return (
    <div
      className={`  ${isOpen ? ' rounded-lg border border-gray-100 shadow-sm px-2' : ''
        }`}
    >
      <motion.li
        layout
        onClick={toggleOpen}
        // value={item as Item}
        id={_id}
        style={{}}
        className={`flex   cursor-pointer items-center justify-between  rounded-lg  bg-white px-5 py-3 shadow-md  ${isOpen ? ' rounded-none border-b shadow-none' : ''
          }`}
      >
        <p
          className={`truncate font-semibold transition-all duration-300 ease-in-out  ${isOpen ? 'font-bold text-gray-900 ' : 'text-gray-500'
            }`}
        >
          {name}
        </p>

        <div className="flex">
          <div className="flex w-20 items-center ">{totalQuantity()}</div>
          <div className="flex w-16 items-center ">
            <span className="text-[12px] ">S/.</span>
            <span className="font-semibold text-color_green_7">
              {totalAmount()}
            </span>
          </div>
        </div>
      </motion.li>
      <AnimatePresence>{isOpen && <Content item={item} />}</AnimatePresence>
    </div>
  )
}



const Content = ({ item }: Props) => {
  const [disabled, setDisabled] = useOnClick(300)
  const { socket } = useContext(SocketContext)

  const { dispatch: dispatchProduct } = useContext(ProductContext)

  const { list } = useContext(ListContext)
  const { uid } = useContext(AuthContext)

  const [stateQuantities, setStateQuantities] = useState([])

  useEffect(() => {
    setStateQuantities(() => {
      return tranformQuantities(item.quantities, item.product.typeOfsale)
    })
  }, [item])

  const removeWeightOfProduct = (weightID: string) => {
    setDisabled(true)
    socket?.emit('update-list', {
      type: 'REMOVE_WEIGHT_OF_PRODUCT',
      listID: list!._id,
      productID: item.product._id,
      userID: uid,
      weightID
    })
  }

  const removeProductOfList = () => {
    setDisabled(true)
    socket?.emit('update-list', {
      type: 'REMOVE_PRODUCT_OF_LIST',
      listID: list!._id,
      productID: item.product._id,
      userID: uid
      // mountID: weight,
    })
  }

  const tranformQuantities = (
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
            v.weighttextlg = 'grande'
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

  return (
    <motion.div
      className="bg-white p-4 px-5  "
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <p className=" pb-1 font-semibold text-gray-700">Resumen</p>
      {stateQuantities.map(
        (item) =>
          item.quantity > 0 && (
            <div key={item._id} className="flex justify-between text-gray-600">
              <span>{item.weighttextlg}</span>
              <div className="flex ">
                <span className="w-20">{item.quantity} und</span>
                <div className="flex w-16 items-center justify-between relative ">
                  <span className="text-[12px] ">S/.</span>
                  <span className="font-semibold text-color_green_7">
                    {formatToMoney(item.price * item.quantity)}
                  </span>
                  <button
                    disabled={disabled}
                    onClick={() => removeWeightOfProduct(item._id)}
                    className="  text-gray-400 absolute  -right-5 hover:text-orange-600 ease-in duration-400"
                  >
                    <IconDelete stile={'w-4 h-4'} />
                  </button>
                </div>
              </div>
            </div>
          )
      )}

      <div className="mt-5 flex  justify-end gap-x-5 border-t pt-3">
        <Link
          to={`/tienda`}
          // to={`/tienda/${name.split(' ')[0]}`}
          onClick={() => {
            dispatchProduct({
              type: 'SELECT_PRODUCT',
              payload: item.product
            })
          }}
          className=" font-normal text-color_green_7"
        >
          Agregar
        </Link>
        <button
          disabled={disabled}
          onClick={removeProductOfList}
          className="font-normal text-rose-500"
        >
          Quitar
        </button>
      </div>
    </motion.div>
  )
}

export default ItemList

