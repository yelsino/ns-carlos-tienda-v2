import { AuthContext } from 'Context/auth/AuthContext'
import { ListContext } from 'Context/List/ListContext'
import { NotificacionContext } from 'Context/Notificaciones/NotificacionContext'
import { SocketContext } from 'Context/Socket/SocketContext'
import { formatToMoney } from 'helpers/formatToMoney'
import { useContext, useEffect, useState } from 'react'
import { IProducto } from 'types-yola'

interface Props {
  producto: IProducto
  setAdding: React.Dispatch<React.SetStateAction<boolean>>
}

export const useSwitchWeight = ({ producto, setAdding }: Props) => {
  const { uid } = useContext(AuthContext)
  const { socket } = useContext(SocketContext)
  const { list: listOfProducts } = useContext(ListContext)
  // const [productoModificado, modificarProducto] = useState<IProducto>(null)
  const [pesoSeleccionado, seleccionarPeso] = useState('')
  const [precioSeleccionado, seleccionarPrecio] = useState(0)
  const [precioTotalSeleccionado, seleccionarPrecioTotal] = useState(0)
  const { setNotificacion } = useContext(NotificacionContext)

  // transforma el producto

  const addProductToList = () => {
    setAdding(true)
    socket?.emit('update-list', {
      type: 'ADD_PRODUCT_TO_LIST',
      userID: uid,
      listID: listOfProducts._id,
      productID: producto._id,
      mountID: pesoSeleccionado
    })
  }

  const removeProductOfList = () => {
    socket?.emit('update-list', {
      type: 'REMOVE_PRODUCT_OF_LIST',
      userID: uid,
      listID: listOfProducts._id,
      productID: producto._id,
      mountID: pesoSeleccionado
    })
    setNotificacion({ message: `Quitó ${producto.nombre} de lista`, type: 1 })
  }

  const [pesoTotal, setPesoTotal] = useState(0)

  useEffect(() => {
    const position = JSON.parse(localStorage.getItem("position")) ? Number(JSON.parse(localStorage.getItem("position"))) : 0
    seleccionarPeso(producto.precios[position]._id)
  }, [producto])

  useEffect(() => {
    if (pesoSeleccionado) {
      const mount = producto.precios.find((mount) => mount._id === pesoSeleccionado)
      if (mount) {
        seleccionarPrecio(mount.precio)
      }

      const pesoTotal = producto.precios.reduce((acc, mount) => {
        return acc + mount.peso
      }, 0)
      
      if(pesoTotal){
        setPesoTotal(pesoTotal)
      }

      const precioTotal = producto.precios.reduce((acc, mount) => {
        return acc + mount.precio
      }, 0);

      seleccionarPrecioTotal(precioTotal)

    }
  }, [pesoSeleccionado])

  return {
    pesoSeleccionado,
    seleccionarPeso,
    precioSeleccionado,
    seleccionarPrecio, 
    precioTotalSeleccionado,
    pesoTotal,
    removeProductOfList,
    addProductToList
  } as const
}
