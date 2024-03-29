import { ListContext } from 'Context/List/ListContext'
import { LayoutGroup, motion } from 'framer-motion'
import { useOrder } from 'Hooks/useOrder'
import { useContext, useEffect, useState } from 'react'
import { Link, useOutletContext } from 'react-router-dom'
import { IconListas, IconStore,  } from '../../Atoms/Icons'
import PortalComponent from '../../Atoms/Portals/PortalComponent'
import Select from '../../Atoms/Select'
import ItemList from '../Tienda/ViewProduct/ListProduct/ItemList'
import { IRouterContext } from 'interfaces/routerContext.interface';

const YourList = () => {
  const { list, lists, dispatch: setList } = useContext(ListContext)
  const { setOrderData } = useOutletContext<IRouterContext>()
  const [modal, setModal] = useState(false)

  const {subTotal, delivery, total } = useOrder({list})

  useEffect(() => {
    setOrderData((prev) => {
      return { ...prev, listID: list?._id }
    })
  }, [list])

  return (
    <>
      <h2 className="font-poppins text-3xl font-extrabold pt-10">Su Lista</h2>
      <p className="font-poppins text-lg">{list.nombre}</p>
      <p
        className={`flex  w-full px-2 ${
          lists.length > 1 ? 'justify-between' : 'justify-center'
        }`}
      >
        <span className="font-poppins text-lg font-semibold">Productos</span>
        {lists.length > 1 && (
          <button onClick={() => setModal(true)} className="text-purple-500">
            Cambiar lista
          </button>
        )}
      </p>

      <LayoutGroup>
        <motion.ul
          className=" flex h-[calc(100vh-450px)]   w-full flex-col gap-y-1 overflow-y-scroll px-2 pt-1 pb-14 sm:h-[calc(100vh-310px)]"
          layout
          initial={{ borderRadius: 25 }}
        >
          {list?.itemsLista?.map((item) => (
            <ItemList key={item.producto._id} item={item} />
          ))}
        </motion.ul>
      </LayoutGroup>

      <div className="w-full px-2  text-lg">
        <p className="flex justify-between">
          <span>Costo de envío</span>
          <span>S/ {delivery}</span>
        </p>
        <p className="flex justify-between">
          <span>Sub total</span>
          <span>S/ {subTotal}</span>
        </p>
        <p className="border-b pt-3"></p>
        <p className="flex justify-between">
          <span>Total</span>
          <span className="font-bold">S/ {total}</span>
        </p>
      </div>

      <PortalComponent open={modal} setOpen={setModal}>
        <div
          className="relative h-full w-full bg-white   px-5 pb-10 pt-14 sm:h-auto sm:w-[500px] sm:rounded-lg"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="mx-auto flex max-w-sm flex-col gap-y-3 ">
            <button
              onClick={() => setModal(false)}
              className="absolute top-0 right-0 bg-rose-500 px-5 py-2 text-white sm:rounded-tr-lg"
            >
              Cerrar
            </button>
            <h3 className="text-xl font-bold">Seleccione una lista</h3>
            <p className="text-gray-500">
              Aquella lista seleccionada será el pedido a realizar.
            </p>
            <div className=" flex h-[250px] flex-col gap-y-3 overflow-y-scroll">
              {lists.map((lista) => {
                if (lista.itemsLista.length >= 1) {
                  return (
                    <Select
                      key={lista._id}
                      text={lista.nombre}
                      onClick={() =>
                        setList({ type: 'SELECT_LIST', payload: lista })
                      }
                      checked={lista._id === list._id}
                      icon={<IconListas stile={'h-6 w-6'} />}
                    />
                  )
                }
              })}
            </div>
          </div>
        </div>
      </PortalComponent>

     
    </>
  )
}

export default YourList
