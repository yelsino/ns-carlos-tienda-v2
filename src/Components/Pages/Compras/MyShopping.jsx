import { useContext, useEffect } from 'react';
import { AuthContext } from '../../../Context/auth/AuthContext';
import { OrderContext } from '../../../Context/Order/OrderContext';
import { SocketContext } from '../../../Context/SocketContext';
import './MyShop.css'

export const MyShopping = () => {
  const { socket } = useContext(SocketContext);

  const { setOrder } = useContext(OrderContext);

  useEffect(() => {
    socket?.on('get-user-orders', orders => {
      setOrder({
        type: 'GET_USER_ORDERS',
        payload: orders,
      });
    });
  }, [socket]);

  return (
    <div className='pt-5'>
      <h2 className='text-2xl font-bold pb-5 text-center'>Mis pedidos</h2>
      <div className='layout_shop gap-6 pt-5 sm:h-[calc(100vh-180px)] h-[calc(100vh-100px)]  overflow-y-scroll pb-24 overflow-x-hidden'>
        {[1, 2, 3, 4, 5, 6].map(item => (
          <div key={item} className='h-60  flex justify-center items-center '>
            <div className='text-center border flex flex-col items-center py-5 gap-y-5 max-w-md h-60 w-full '>
              <span className='text-2xl font-bold font-poppins'>S/ 84.50</span>
              <div className='flex'>
                <ItemTracking title='recibido' link status={true} />
                <ItemTracking title='preparando' link />
                <ItemTracking title='enviado' link />
                <ItemTracking title='entregado' link={false} />
              </div>
              <div className='flex flex-col'>
                <p className='text-xl'>Mi receta favortia lacosta</p>
                <span className='text-gray-500 text-sm'>
                  Lunes 24 de noviembre 2022
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// eslint-disable-next-line react/prop-types
const ItemTracking = ({ title, status, link }) => {
  return (
    <div className='flex justify-center'>
      <div className='flex justify-center flex-col  items-center w-20'>
        <span className='text-gray-400 text-sm pb-5'>{title}</span>
        <div className='flex items-center relative '>
          <span
            className={`block w-5 h-5 rounded-full ${
              status ? 'bg-emerald-400' : 'bg-gray-300'
            }`}
          />
          {link && (
            <span className='h-1 w-20 block bg-gray-200 absolute translate-x-5' />
          )}
        </div>
      </div>
    </div>
  );
};
