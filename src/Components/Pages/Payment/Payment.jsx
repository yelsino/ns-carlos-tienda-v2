import { motion } from 'framer-motion';
import { Suspense, useContext, useEffect, useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import imgDelivery from '../../../Assets/delivery.png';
import { AuthContext } from '../../../Context/auth/AuthContext';
import { DirectionContext } from '../../../Context/Direction/DirectionContext';
import { ListContext } from '../../../Context/List/ListContext';
import { SocketContext } from '../../../Context/SocketContext';
import { useOnClick } from '../../../Hooks/useOnClick';
import LoadingPage from '../../Plantillas/LoadinPage';

const Payment = () => {
  const location = useLocation();
  const { pathname } = location;
  const currentPath = pathname.split('/');

  const { liststate } = useContext(ListContext);
  const { auth } = useContext(AuthContext);
  const {
    setDirection,
    data,
    data: { direction },
  } = useContext(DirectionContext);

  const [disabled, setDisabled] = useOnClick(1000);
  const navigate = useNavigate();
  const [orderData, setOrderData] = useState({
    typePayment: '',
    directionID: direction?._id,
    userID: auth.uid,
    listID: liststate?.list?._id,
  });
  const { socket } = useContext(SocketContext);

  const {
    liststate: { list },
  } = useContext(ListContext);

  useEffect(() => {
    socket?.on('get-user-directions', directions => {
      setDirection({
        type: 'GET_USER_DIRECTIONS',
        payload: directions,
      });
      setDirection({
        type: 'SELECT_DIRECTION',
        payload: directions[0],
      });
    });
  }, [socket]);

  useEffect(() => {
    setDisabled(true);
  }, []);

  const createOrder = () => {
    if (!orderData.listID || !orderData.typePayment || !orderData.directionID) {
      return alert(
        'Asegurese de haber seleccionado todos los datos requeridos'
      );
    }
    socket?.emit('order', { ...orderData, type: 'CREATE_ORDER' });
  };

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
            className='grid grid-cols-2   h-screen  '
          >
            <div className='hidden sm:flex sm:col-span-1 bg-black row-span-full items-center justify-center relative select-none'>
              <div
                className=' -translate-y-[200px] max-w-xs text-white flex flex-col items-center gap-y-5 fixed left-1/4 top-1/2  -translate-x-[160px]
     '
              >
                <img src={imgDelivery} className='w-9/12' />
                <p className='text-2xl font-bold text-center'>
                  Preparando su pedido
                </p>

                <p className='text-center text-xl text-gray-200 font-light'>
                  Recuerda que todos los envios fuera de Satipo serán rechazados
                </p>
                {currentPath.includes('your-list') && (
                  <Link
                    to='/payment/your-facturation'
                    className='w-[150px] bg-white text-black font-poppins rounded-full  font-bold py-4 flex justify-center mt-10'
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
                        );
                      }
                      navigate('/payment/your-payment');
                    }}
                    className='w-[150px] bg-white text-black font-poppins rounded-full  font-bold py-4 flex justify-center mt-7'
                  >
                    Continuar
                  </button>
                )}

                {currentPath.includes('your-payment') && (
                  <button
                    onClick={createOrder}
                    className='w-[160px] bg-white text-black font-poppins rounded-full  font-bold py-4 flex justify-center '
                  >
                    Pagar
                  </button>
                )}
              </div>
            </div>
            <div className=' col-span-2 sm:col-span-1 bg-white row-span-full overflow-y-scroll h-screen'>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.5 },
                  delay: 0.1,
                }}
                exit={{ opacity: 0 }}
                className='pt-10 max-w-sm mx-auto flex flex-col items-center gap-y-3 pb-10 px-5 '
              >
                <Outlet
                  context={{
                    socket,
                    auth,
                    setDirection,
                    data,
                    setOrderData,
                    liststate,
                    orderData,
                  }}
                />
              </motion.div>
            </div>
          </motion.div>
        </Suspense>
      )}
    </>
  );
};

export default Payment;
