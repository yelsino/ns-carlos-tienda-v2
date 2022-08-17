import { AuthContext } from 'Context/auth/AuthContext'
import { DirectionContext } from 'Context/Direction/DirectionContext'
import { ListContext } from 'Context/List/ListContext'
import { motion } from 'framer-motion'
import { Direction } from 'interfaces/Interfaces'
import { Suspense, useContext, useEffect, useState } from 'react'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import imgDelivery from '../../../Assets/delivery.png'
import { SocketContext } from '../../../Context/Socket/SocketContext'
import { useOnClick } from '../../../Hooks/useOnClick'
import { IconArrow } from '../../Atoms/Icons'
import LoadingPage from '../../Plantillas/LoadinPage'

export interface OrderData {
  typePayment: string
  directionID: string
  userID: string
  listID: string
}

const Payment = () => {
  const token = localStorage.getItem('token')
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
  const { dispatch: setDirection, direction } = useContext(DirectionContext)

  const [disabled, setDisabled] = useOnClick(1000)
  const [orderData, setOrderData] = useState<OrderData>({
    typePayment: '',
    directionID: direction?._id as string,
    userID: uid as string,
    listID: list?._id as string
  })
  const { socket } = useContext(SocketContext)

  useEffect(() => {
    socket?.on('get-user-directions', (directions: Array<Direction>) => {
      setDirection({
        type: 'GET_USER_DIRECTIONS',
        payload: directions
      })
      setDirection({
        type: 'SELECT_DIRECTION',
        payload: directions[0]
      })
    })
  }, [socket])

  useEffect(() => {
    setDisabled(true)
  }, [])

  const createOrder = () => {
    console.log(orderData)
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
            <div className="relative row-span-full hidden select-none items-center justify-center bg-black sm:col-span-1 sm:flex">
              <div
                className=" fixed left-1/4 top-1/2 flex max-w-xs -translate-y-52 -translate-x-40 flex-col items-center gap-y-5  text-white
     "
              >
                <img src={imgDelivery} className="w-9/12" />
                <p className="text-center text-2xl font-bold">
                  Preparando su pedido
                </p>

                <p className="text-center text-xl font-light text-gray-200">
                  Recuerda que todos los envios fuera de Satipo serán rechazados
                </p>
                {currentPath.includes('your-list') && (
                  <Link
                    to="/payment/your-facturation"
                    className="mt-10 flex w-[150px] justify-center rounded-full  bg-white py-4 font-poppins font-bold text-black"
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
                    className="mt-7 flex w-[150px] justify-center rounded-full  bg-white py-4 font-poppins font-bold text-black"
                  >
                    Continuar
                  </button>
                )}

                {currentPath.includes('your-payment') && (
                  <button
                    onClick={createOrder}
                    className="flex w-[160px] justify-center rounded-full bg-white  py-4 font-poppins font-bold text-black "
                  >
                    Pagar
                  </button>
                )}
              </div>
            </div>
            {/* contendio */}
            <div className=" col-span-2 row-span-full h-screen overflow-y-scroll bg-white sm:col-span-1">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.5 }
                }}
                exit={{ opacity: 0 }}
                className="mx-auto flex max-w-sm flex-col items-center gap-y-3 px-5 py-10"
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
                      className="w-full bg-black py-4 text-center text-white "
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
                      className="w-full bg-black py-4 text-center text-white"
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
                  <Link to="/tienda" className="text-center text-rose-500">
                    Cancelar proceso
                  </Link>
                </div>
              </motion.div>

              {!currentPath.includes('your-list') && (
                <button
                  className=" absolute top-0 right-0 bg-rose-500 px-4 py-2 text-rose-100 sm:hidden"
                  onClick={() => navigate(-1)}
                >
                  <IconArrow />
                </button>
              )}
            </div>
          </motion.div>
        </Suspense>
      )}
    </>
  )
}

export default Payment
