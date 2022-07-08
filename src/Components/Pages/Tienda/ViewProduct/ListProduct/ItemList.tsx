import { AuthContext } from 'Context/auth/AuthContext'
import { AnimatePresence, motion } from 'framer-motion'
import PropTypes from 'prop-types'
import { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ListContext } from '../../../../../Context/List/ListProvider'
import { ProductContext } from '../../../../../Context/Product/ProductProvider'
import { SocketContext } from '../../../../../Context/SocketContext'
import { useOnClick } from '../../../../../Hooks/useOnClick'
import { IconDelete } from '../../../../Atoms/Icons'

const ItemList = ({ item }) => {
  // const y = useMotionValue(0);
  // const boxShadow = useRaisedShadow(y);

  const {
    _id,
    product: { name, typeOfsale },
    quantities
  } = item

  const totalQuantity = () => {
    const quantity = quantities.reduce((acc, curr) => {
      switch (typeOfsale) {
        case 'UNIDADES':
          return acc + curr?.quantity

        case 'KILOGRAMOS':
        case 'LITROS':
        case 'FRACCIONES':
          return acc + (curr?.quantity * curr?.weight) / 1000

        default:
          return console.log('no ocurrio nada')
      }
    }, 0)

    switch (typeOfsale) {
      case 'UNIDADES':
        return `${quantity} und`
      case 'KILOGRAMOS':
        return `${
          Number.isInteger(quantity) ? quantity : quantity.toFixed(2)
        } kg`
      case 'LITROS':
        return `${
          Number.isInteger(quantity) ? quantity : quantity.toFixed(2)
        } lt`
      case 'FRACCIONES':
        return `${
          Number.isInteger(quantity) ? quantity : quantity.toFixed(2)
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
    return (
      (Math.round(((Math.round(amountOfProduct * 100) / 5) * 5) / 5) * 5) /
      100
    ).toFixed(2)
  }

  const [isOpen, setIsOpen] = useState(false)
  const toggleOpen = () => setIsOpen(!isOpen)

  return (
    <div
      className={`  ${
        isOpen ? ' rounded-lg border border-gray-100 shadow-sm' : ''
      }`}
    >
      <motion.li
        layout
        onClick={toggleOpen}
        value={item}
        id={_id}
        style={{}}
        className={`flex   cursor-pointer items-center justify-between  rounded-lg  bg-white px-5 py-3 shadow-md  ${
          isOpen ? ' rounded-none border-b shadow-none' : ''
        }`}
      >
        <p
          className={`truncate font-semibold transition-all duration-300 ease-in-out  ${
            isOpen ? 'font-bold text-gray-900 ' : 'text-gray-500'
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
      <AnimatePresence>{isOpen && <Content data={item} />}</AnimatePresence>
    </div>
  )
}

const Content = ({ data }) => {
  const [disabled, setDisabled] = useOnClick(300)
  const { socket } = useContext(SocketContext)

  const { dispatchProduct } = useContext(ProductContext)

  const {
    liststate: { list }
  } = useContext(ListContext)
  const { uid } = useContext(AuthContext)

  const [stateQuantities, setStateQuantities] = useState([])

  useEffect(() => {
    setStateQuantities(() => {
      return tranformQuantities(data.quantities, data.product.typeOfsale)
    })
  }, [data])

  const removeWeightOfProduct = (weightID) => {
    setDisabled(true)
    socket?.emit('update-list', {
      type: 'REMOVE_WEIGHT_OF_PRODUCT',
      listID: list._id,
      productID: data.product._id,
      userID: uid,
      weightID
    })
  }

  const removeProductOfList = () => {
    setDisabled(true)
    socket?.emit('update-list', {
      type: 'REMOVE_PRODUCT_OF_LIST',
      listID: list._id,
      productID: data.product._id,
      userID: uid
      // mountID: weight,
    })
  }

  const tranformQuantities = (dataquantities, typeOfsale) => {
    return dataquantities.map((v) => {
      switch (typeOfsale) {
        case 'UNIDADES': {
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
        }

        case 'KILOGRAMOS': {
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
        }

        case 'LITROS': {
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
        }

        case 'FRACCIONES': {
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
              <div className="flex  ">
                <span className="w-20">{item.quantity} und</span>
                <div className="flex w-16 items-center justify-between ">
                  <span className="text-[12px] ">S/.</span>
                  <span className="font-semibold text-color_green_7">
                    {item.price * item.quantity}
                  </span>
                  <button
                    disabled={disabled}
                    onClick={() => removeWeightOfProduct(item._id)}
                    className=" pl-3 text-gray-400"
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
              payload: data.product
            })
          }}
          className=" font-extralight text-color_green_7"
        >
          Agregar
        </Link>
        <button
          disabled={disabled}
          onClick={removeProductOfList}
          className="font-light text-rose-500"
        >
          Eliminar
        </button>
      </div>
    </motion.div>
  )
}

Content.propTypes = {
  data: PropTypes.object.isRequired
}

export default ItemList

ItemList.propTypes = {
  item: PropTypes.object,
  selectProduct: PropTypes.func
}
