import { ListContext } from 'Context/List/ListContext'
import { LayoutGroup, motion } from 'framer-motion'
import { RouterContext } from 'interfaces/Interfaces'
import { useContext, useEffect, useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import { formatToMoney } from '../../../helpers/formatToMoney'
import { IconListas } from '../../Atoms/Icons'
import PortalComponent from '../../Atoms/Portals/PortalComponent'
import Select from '../../Atoms/Select'
import ItemList from '../Tienda/ViewProduct/ListProduct/ItemList'

const YourList = () => {
  const { list, lists, dispatch: setList } = useContext(ListContext)
  const { setOrderData } = useOutletContext<RouterContext>()
  // const { } = useContext(OrderContext)

  const [modal, setModal] = useState(false)
  const [mountDelivery, setMountDelivery] = useState(0)
  const [subTotal, setSubTotal] = useState(0)

  const mountTotalOfList = () => {
    return list.products.reduce((acc, curr) => {
      const mountPerProduct = curr.quantities.reduce((accq, q) => {
        return accq + q.quantity * q.price
      }, 0)

      return acc + mountPerProduct
    }, 0)
  }

  const costOfDelivery = () => {
    if (subTotal < 30) {
      return 2
    } else {
      return 0
    }
  }
  useEffect(() => {
    if (list) {
      setSubTotal(Number(Number(formatToMoney(mountTotalOfList())).toFixed(1)))
    }
  }, [list])

  useEffect(() => {
    setOrderData((prev) => {
      return { ...prev, listID: list?._id }
    })
  }, [list])

  useEffect(() => {
    if (mountDelivery) {
      setMountDelivery(costOfDelivery())
    }
  }, [mountDelivery])

  useEffect(() => {
    localStorage.setItem('mountTotal', `${(mountDelivery + subTotal)}`)
  }, [subTotal, mountDelivery])

  return (
    <>
      <h2 className="font-poppins text-3xl font-extrabold">Su Lista</h2>
      <p className="font-poppins text-lg">Arroz con pollo a la wachana</p>
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
        <button onClick={()=>{
          console.log(list);
          
        }}>PROBAR</button>
        <motion.ul
          className=" flex h-[calc(100vh-400px)]   w-full flex-col gap-y-1 overflow-y-scroll px-2 pt-1 pb-14 sm:h-[calc(100vh-310px)]"
          layout
          initial={{ borderRadius: 25 }}
        >
          {list?.products?.map((item) => (
            <ItemList key={item._id} item={item} />
          ))}
        </motion.ul>
      </LayoutGroup>

      <div className="w-full px-2  text-lg">
        <p className="flex justify-between">
          <span>Costo de envio</span>
          <span>S/ {mountDelivery}</span>
        </p>
        <p className="flex justify-between">
          <span>Sub total</span>
          <span>S/ {subTotal}</span>
        </p>
        <p className="border-b pt-3"></p>
        <p className="flex justify-between">
          <span>Total</span>
          <span className="font-bold">S/ {subTotal + mountDelivery}</span>
        </p>
      </div>

      {/* <div className='w-full py-5 sm:hidden'>
        <button className='text-white bg-black w-full py-3 '>Continuar</button>
      </div> */}

      <PortalComponent open={modal} setOpen={setModal}>
        <div
          className="relative h-full w-full bg-white   px-10 pb-10 pt-14 sm:h-auto sm:w-[500px] sm:rounded-lg"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="mx-auto flex max-w-sm flex-col gap-y-3 ">
            <button
              onClick={() => setModal(false)}
              className="absolute top-0 right-0 bg-rose-500 px-5 py-2 text-white sm:rounded-tr-lg"
            >
              Cerrar
            </button>
            <h3 className="font-bold">Seleccione una lista</h3>
            <p className="text-gray-500">
              Aquella lista seleccionada será la lista a realizar este pedido,
              asegurese de no olvidarse.
            </p>
            <div className=" flex h-[250px] flex-col gap-y-3 overflow-y-scroll">
              {lists.map((l) => (
                <Select
                  key={l._id}
                  text={l.name}
                  onClick={() => setList({ type: 'SELECT_LIST', payload: l })}
                  checked={l._id === list._id}
                  icon={<IconListas stile={'h-6 w-6'} />}
                />
              ))}
            </div>
          </div>
        </div>
      </PortalComponent>
    </>
  )
}

export default YourList
