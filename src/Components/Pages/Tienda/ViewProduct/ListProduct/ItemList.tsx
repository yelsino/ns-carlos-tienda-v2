import { IconDelete } from 'Components/Atoms/Icons'
import { AuthContext } from 'Context/auth/AuthContext'
import { ListContext } from 'Context/List/ListContext'
import { ProductContext } from 'Context/Product/ProductContext'
import { SocketContext } from 'Context/Socket/SocketContext'
import { AnimatePresence, motion } from 'framer-motion'
import { formatToMoney } from 'helpers/formatToMoney'
import { useOnClick } from 'Hooks/useOnClick'

import { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ItemLista } from 'types-yola'


interface Props {
  item: ItemLista
}




const ItemList = ({ item }: Props) => {
  const { _id, producto, cantidades, cantidadTotal, montoTotal, unidadMedida } = item


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
        // value={item as ItemLista}
        id={_id}
        style={{}}
        className={`flex   cursor-pointer items-center justify-between  rounded-lg  bg-white px-5 py-3 shadow-md  ${isOpen ? ' rounded-none border-b shadow-none' : ''
          }`}
      >
        <p
          className={`truncate font-semibold transition-all duration-300 ease-in-out  ${isOpen ? 'font-bold text-gray-900 ' : 'text-gray-500'
            }`}
        >
          {producto.nombre}
        </p>

        <div className="flex">
          <div className="flex w-20 items-center ">{cantidadTotal} {unidadMedida}</div> 
          <div className="flex w-16 items-center ">
            <span className="text-[12px] ">S/.</span>
            <span className="font-semibold text-color_green_7">
               {montoTotal} 
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


  const removeWeightOfProduct = (weightID: string) => {
    setDisabled(true)
    socket?.emit('update-list', {
      type: 'REMOVE_WEIGHT_OF_PRODUCT',
      listID: list!._id,
      productID: item.producto._id,
      userID: uid,
      weightID
    })
  }

  const removeProductOfList = () => {
    setDisabled(true)
    socket?.emit('update-list', {
      type: 'REMOVE_PRODUCT_OF_LIST',
      listID: list!._id,
      productID: item.producto._id,
      userID: uid
      // mountID: weight,
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
      {item.cantidades.map(
        (cantidad) =>
          cantidad.cantidad > 0 && (
            <div key={cantidad._id} className="flex justify-between text-gray-600">
              <span>{cantidad.textoPesoB}</span>
              <div className="flex ">
                <span className="w-20">{cantidad.cantidad} und</span>
                <div className="flex w-16 items-center justify-between relative ">
                  <span className="text-[12px] ">S/.</span>
                  <span className="font-semibold text-color_green_7">
                    {formatToMoney(cantidad.precio * cantidad.cantidad)}
                  </span>
                  <button
                    disabled={disabled}
                    onClick={() => removeWeightOfProduct(cantidad._id)}
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
              payload: item.producto
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





  // const tranformQuantities = (
  //   dataquantities: Array<Quantity>,
  //   typeOfsale: string
  // ) => {
  //   return dataquantities.map((v) => {
  //     switch (typeOfsale) {
  //       case PRODUCTO_VENTA.UNIDADES: {
  //         if (v.weight === 250) {
  //           v.weighttextmd = 'chico'
  //           v.weighttextlg = 'pequeño'
  //           return v
  //         }
  //         if (v.weight === 500) {
  //           v.weighttextmd = 'medio'
  //           v.weighttextlg = 'mediano'
  //           return v
  //         }
  //         if (v.weight === 1000) {
  //           v.weighttextmd = 'grande'
  //           v.weighttextlg = 'grande'
  //           return v
  //         }
  //         return v
  //       }

  //       case PRODUCTO_VENTA.KILOGRAMOS: {
  //         if (v.weight === 250) {
  //           v.weighttextmd = '1/4'
  //           v.weighttextlg = `${v.weight} gramos`
  //           return v
  //         }
  //         if (v.weight === 500) {
  //           v.weighttextmd = '1/2'
  //           v.weighttextlg = `${v.weight} gramos`
  //           return v
  //         }
  //         if (v.weight === 1000) {
  //           v.weighttextmd = '1 kg'
  //           v.weighttextlg = `1 kilogramo`
  //           return v
  //         } else {
  //           v.weighttextmd = `${v.weight} gr`
  //           v.weighttextlg = `${v.weight} gramos`
  //           return v
  //         }
  //       }

  //       case PRODUCTO_VENTA.LITROS: {
  //         if (v.weight === 500) {
  //           v.weighttextmd = '1/2'
  //           v.weighttextlg = '1/2 litro'
  //           return v
  //         }
  //         if (v.weight === 1000) {
  //           v.weighttextmd = '1 lt'
  //           v.weighttextlg = '1 litro'
  //           return v
  //         } else {
  //           v.weighttextmd = `${v.weight} ml`
  //           v.weighttextlg = `${v.weight} mililitros`
  //           return v
  //         }
  //       }

  //       case PRODUCTO_VENTA.FRACCIONES: {
  //         if (v.weight === 250) {
  //           v.weighttextmd = '1/4'
  //           v.weighttextlg = 'un cuarto'
  //           return v
  //         }
  //         if (v.weight === 500) {
  //           v.weighttextmd = '1/2'
  //           v.weighttextlg = 'la mitad'
  //           return v
  //         }
  //         if (v.weight === 1000) {
  //           v.weighttextmd = '1'
  //           v.weighttextlg = 'entero'
  //           return v
  //         }
  //         return v
  //       }
  //     }
  //     return v
  //   })
  // }
