import { OrderContext } from 'Context/Order/OrderContext'
import { Order } from 'interfaces/Interfaces'
import { useContext, useEffect } from 'react'
import { SocketContext } from '../../../Context/Socket/SocketContext'
import './MyShop.css'

export const MyShopping = () => {
  const { socket } = useContext(SocketContext)

  const { dispatch: setOrder } = useContext(OrderContext)

  useEffect(() => {
    socket?.on('get-user-orders', (orders: Array<Order>) => {
      setOrder({
        type: 'GET_USER_ORDERS',
        payload: orders
      })
    })
  }, [socket])

  return (
    <div className="pt-5">
      <h2 className="pb-5 text-center text-2xl font-bold">Mis pedidos</h2>
      <div className="layout_shop h-[calc(100vh-100px)] gap-6 overflow-x-hidden overflow-y-scroll  pt-5 pb-24 sm:h-[calc(100vh-180px)]">
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <div key={item} className="flex  h-60 items-center justify-center ">
            <div className="flex h-60 w-full max-w-md flex-col items-center gap-y-5 border py-5 text-center ">
              <span className="font-poppins text-2xl font-bold">S/ 84.50</span>
              <div className="flex">
                <ItemTracking title="recibido" link status={true} />
                <ItemTracking title="preparando" link />
                <ItemTracking title="enviado" link />
                <ItemTracking title="entregado" link={false} />
              </div>
              <div className="flex flex-col">
                <p className="text-xl">Mi receta favortia lacosta</p>
                <span className="text-sm text-gray-500">
                  Lunes 24 de noviembre 2022
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// eslint-disable-next-line react/prop-types
interface ItemTracking {
  title: string
  link?: boolean
  status?: boolean
}
const ItemTracking = ({ title, status, link }: ItemTracking) => {
  return (
    <div className="flex justify-center">
      <div className="flex w-20 flex-col  items-center justify-center">
        <span className="pb-5 text-sm text-gray-400">{title}</span>
        <div className="relative flex items-center ">
          <span
            className={`block h-5 w-5 rounded-full ${
              status ? 'bg-emerald-400' : 'bg-gray-300'
            }`}
          />
          {link && (
            <span className="absolute block h-1 w-20 translate-x-5 bg-gray-200" />
          )}
        </div>
      </div>
    </div>
  )
}
