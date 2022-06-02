import { motion } from 'framer-motion';
import { Suspense, useContext, useEffect } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
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
  // const rutas = ['', 'payment', 'your-facturation'];

  // const filterRutes = rutas.filter((tag) => (currentPath.includes(tag) && tag));
  // console.log(filterRutes);

  const [disabled, setDisabled] = useOnClick(1000);
  useEffect(() => {
    setDisabled(true);
  }, []);

  const { socket } = useContext(SocketContext);
  const { auth } = useContext(AuthContext);
  const {
    liststate: { list },
  } = useContext(ListContext);
  const {
    setDirection,
    data,
    data: { direction },
  } = useContext(DirectionContext);

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

  const createOrder = () => {
    socket?.emit('order', {
      type: 'CREATE_ORDER',
      userID: auth.uid,
      directionID: direction?._id,
      listID: list._id,
    });
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
                  <Link
                    to='/payment/your-payment'
                    className='w-[150px] bg-white text-black font-poppins rounded-full  font-bold py-4 flex justify-center mt-7'
                  >
                    Continuar
                  </Link>
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
                <Outlet context={[socket, auth, setDirection, data]} />
              </motion.div>
            </div>
          </motion.div>
        </Suspense>
      )}
    </>
  );
};

export default Payment;
