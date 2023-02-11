
import { AuthContext } from 'Context/auth/AuthContext'
import { OrderContext } from 'Context/Order/OrderContext'
import { useContext, useEffect } from 'react'
import { ItemTracking } from './ItemTracking'
import noShopping from 'public/Assets/shopping.png'
import './MyShop.css'
import { formatDate } from 'utils/fechas'

const MyShopping = () => {

  const {  orders, obtenerPedidos } = useContext(OrderContext);
  const { _id } = useContext(AuthContext)

  useEffect(()=>{
    obtenerPedidos(_id)
  },[])

  return (
    <div className="pt-5">
      <h2 className="pb-5 text-center text-2xl font-bold">Mis pedidos</h2>
      {orders.length > 0 ? (
        <div className="layout_shop h-[calc(100vh-100px)] gap-6 overflow-x-hidden overflow-y-scroll  pt-5 pb-24 sm:h-[calc(100vh-180px)]">
          {orders.map((order) => (
            <div
              key={order._id}
              className="flex  h-60 items-center justify-center "
            >
              <div className="flex h-60 w-full max-w-md flex-col items-center gap-y-5 border py-5 text-center ">
                <span className="font-poppins text-2xl font-bold">
                  S/ {order.total.toFixed(2)}
                </span>
                <div className="flex">
                  <ItemTracking 
                    link 
                    estadoPedido={order.estado} 
                    estadoComponente="RECIBIDO" 
                  />
                  <ItemTracking 
                    link 
                    estadoPedido={order.estado} 
                    estadoComponente="PREPARANDO" 
                  />
                  <ItemTracking 
                    link 
                    estadoPedido={order.estado} 
                    estadoComponente="ENVIADO" 
                  />
                  <ItemTracking 
                    estadoPedido={order.estado} 
                    estadoComponente="ENTREGADO" 
                  />
                </div>
                <div className="flex flex-col">
                  <p className="text-xl">{order.lista.nombre}</p>
                  <span className="text-sm text-gray-500">
                    {formatDate(order.createdAt)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <img src={noShopping} className=" mx-auto w-80" />
          <p className="text-center text-xl text-gray-600">No tienes pedidos</p>
        </div>
      )}
    </div>
  )
}

export default MyShopping
