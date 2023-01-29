
import { AuthContext } from 'Context/auth/AuthContext'
import { OrderContext } from 'Context/Order/OrderContext'
import { useContext, useEffect } from 'react'
import { ItemTracking } from './ItemTracking'
import './MyShop.css'

const MyShopping = () => {

  const { dispatch: setOrders, orders, obtenerPedidos } = useContext(OrderContext);
  const { _id } = useContext(AuthContext)

  useEffect(()=>{
    obtenerPedidos(_id)
  },[])

  return (
    <div className="pt-5">
      <h2 className="pb-5 text-center text-2xl font-bold">Mis pedidos</h2>
      <div className="layout_shop h-[calc(100vh-100px)] gap-6 overflow-x-hidden overflow-y-scroll  pt-5 pb-24 sm:h-[calc(100vh-180px)]">
        {orders.map((order) => (
          <div key={order._id} className="flex  h-60 items-center justify-center ">
            <div className="flex h-60 w-full max-w-md flex-col items-center gap-y-5 border py-5 text-center ">
              <span className="font-poppins text-2xl font-bold">S/ {order.lista.itemsLista.reduce((acc,curr)=> (acc + curr.montoTotal), 0)}</span>
              <div className="flex">
                <ItemTracking title="recibido" link status={true} />
                <ItemTracking title="preparando" link />
                <ItemTracking title="enviado" link />
                <ItemTracking title="entregado" link={false} />
              </div>
              <div className="flex flex-col">
                <p className="text-xl">{order.lista.nombre}</p>
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

export default MyShopping
