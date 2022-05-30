import { useContext, useEffect } from 'react';
import { AuthContext } from '../../../Context/auth/AuthContext';
import { OrderContext } from '../../../Context/Order/OrderContext';
import { SocketContext } from '../../../Context/SocketContext';

export const Compras = () => {
  const { socket } = useContext(SocketContext);
  const { auth } = useContext(AuthContext);

  const { setOrder } = useContext(OrderContext)


  useEffect(() => {
    socket?.on('get-user-orders', orders => {
        setOrder({
            type: 'GET_USER_ORDERS',
            payload: orders,
        })
    });
  }, [socket]);


  return (
    <>
        <div className='max-w-5xl mx-auto pt-10 px-10'>
          <h2 className='font-poppins text-2xl font-bold border-b'>
            MIS COMPRAS
          </h2>

          <div className='flex  pt-10'>

          </div>
        </div>
    </>
  );
};
