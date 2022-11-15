import { AuthContext } from 'Context/auth/AuthContext'
import { DirectionContext } from 'Context/Direction/DirectionContext'
import { ListContext } from 'Context/List/ListContext'
import { motion } from 'framer-motion'
import { Suspense, useContext, useEffect, useState } from 'react'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { LocalStorageService } from 'schemas/LocalStorageService'
import imgDelivery from '../../../Assets/delivery.png'
import { SocketContext } from '../../../Context/Socket/SocketContext'
import { useOnClick } from '../../../Hooks/useOnClick'
import { IconArrow, IconStore } from '../../Atoms/Icons'
import LoadingPage from '../../Plantillas/LoadinPage'

export interface OrderData {
  typePayment: string
  directionID: string
  userID: string
  listID: string
}

const Payment = () => {
  const token = localStorage.getItem('token')
  const lsService = new LocalStorageService()

  const navigate = useNavigate()
  if (!token) {
    navigate('/auth/login')
  }

  // para condicionar la navegacion a responsivo
  const location = useLocation()
  const { pathname } = location
  const currentPath = pathname.split('/')

  const { list } = useContext(ListContext)
  const { uid } = useContext(AuthContext)
  const { direction } = useContext(DirectionContext)

  const [disabled, setDisabled] = useOnClick(500)
  const [orderData, setOrderData] = useState<OrderData>({
    typePayment: lsService.getItem('tipoPago') ? lsService.getItem('tipoPago'): '',
    directionID: '',
    userID: uid,
    listID: ''
  })
  const { socket } = useContext(SocketContext)


  useEffect(() => {
    setDisabled(true)
  }, [])

  useEffect(()=>{
    setOrderData({
      typePayment: lsService.getItem('tipoPago') ? lsService.getItem('tipoPago'): '',
      directionID: direction?._id,
      listID: list?._id ,
      userID: uid
    })
  },[list,direction])

  const createOrder = () => {
    if (!orderData.listID || !orderData.typePayment || !orderData.directionID) {
      return alert('Asegurese de haber seleccionado todos los datos requeridos')
    }
    socket?.emit('order', { ...orderData, type: 'CREATE_ORDER' })
  }

  return (
    <>
      {disabled ? (
        <LoadingPage />
      ) : (
        <Suspense fallback={<LoadingPage />}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.5 } }}
            exit={{ opacity: 0 }}
            className="grid h-screen   grid-cols-2  "
          >
            <div className="relative row-span-full hidden  items-center justify-center  sm:col-span-1 sm:flex border">
              <div
                className=" fixed left-1/4 top-1/2 flex max-w-xs -translate-y-52 -translate-x-40 flex-col items-center gap-y-5  
     "
              >
                <img src={imgDelivery} className="w-9/12 select-none" />
                <p className="text-center text-2xl font-bold">
                  Preparando su pedido
                </p>

                <p className="text-center text-xl font-light ">
                  Recuerda que todos los envios fuera de Satipo serán rechazados
                </p>
                {currentPath.includes('your-list') && (
                  <Link
                    to="/payment/your-facturation"
                    className="mt-10 flex w-[150px] justify-center rounded-full  bg-black py-4 font-poppins font-bold text-white "
                  >
                    Continuar
                  </Link>
                )}

                {currentPath.includes('your-facturation') && (
                  <button
                    onClick={() => {
                      if (!orderData.directionID || !orderData.typePayment) {
                        return alert(
                          'Por favor selecciona una dirección y el tipo de pago'
                        )
                      }
                      navigate('/payment/your-payment')
                    }}
                    className="mt-10 flex w-[150px] justify-center rounded-full  bg-black py-4 font-poppins font-bold text-white "
                  >
                    Continuar
                  </button>
                )}

                {currentPath.includes('your-payment') && (
                  <button
                    onClick={createOrder}
                    className="flex w-[160px] justify-center rounded-full bg-black  py-4 font-poppins font-bold text-white "
                  >
                    Pagar
                  </button>
                )}
              </div>
             
            
            </div>
            {/* contendio */}
            <div className=" col-span-2 row-span-full  bg-white sm:col-span-1 border pb-7">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.5 }
                }}
                exit={{ opacity: 0 }}
                className="mx-auto flex max-w-sm flex-col items-center gap-y-3 px-5 "
              >
                <Outlet
                  context={{
                    setOrderData,
                    orderData
                  }}
                />
                <div className="flex w-full flex-col  gap-y-5 py-5 sm:hidden">
                  {currentPath.includes('your-list') && (
                    <Link
                      to="/payment/your-facturation"
                      className="w-full bg-black py-4 text-center text-lg font-poppins text-white "
                    >
                      Continuar
                    </Link>
                  )}

                  {currentPath.includes('your-facturation') && (
                    <button
                      onClick={() => {
                        if (!orderData.directionID || !orderData.typePayment) {
                          return alert(
                            'Por favor selecciona una dirección y el tipo de pago'
                          )
                        }
                        navigate('/payment/your-payment')
                      }}
                      className="w-full bg-black py-4 text-center text-lg font-poppins text-white "
                    >
                      Continuar
                    </button>
                  )}

                  {currentPath.includes('your-payment') && (
                    <button
                      onClick={createOrder}
                      className="w-full bg-black py-4 text-center text-white "
                    >
                      Pagar
                    </button>
                  )}
                  
                </div>
              </motion.div>

              
            </div>
            {!currentPath.includes('your-list') && (
                <button
                  className=" fixed top-0 right-0 bg-rose-500 px-4 py-2 text-rose-100 "
                  onClick={() => navigate(-1)}
                >
                  <IconArrow />
                </button>
              )}
            <Link
                to="/tienda"
                className="  fixed bottom-0 left-0 bg-rose-500 p-2 text-rose-50  rounded-tr-3xl "
              >
                <IconStore stile="h-10 w-10 pr-2" />
              </Link>
          </motion.div>
        </Suspense>
      )}
    </>
  )
}

export default Payment
