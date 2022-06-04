import { IconCheck } from '../../Atoms/Icons';
import imgDelivery1 from '../../../Assets/delivery1.png';
import PropTypes from 'prop-types';

import { useEffect, useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import PaymentSuccess from './PaymentSuccess';

const YourPayment = () => {
  // tarjeta
  const [metodPay, setMetodPay] = useState('contra-entrega');

  const { orderData, liststate, data, auth, socket } = useOutletContext();
  const [orderResult, setOrderResult] = useState(null);
  const mountTotal = JSON.parse(localStorage.getItem('mountTotal'));

  const navigate = useNavigate();

  useEffect(()=>{
    if(!orderData.listID || !orderData.typePayment || !orderData.directionID ){
      navigate('/payment/your-list')
    }

  },[])

  useEffect(()=>{
    socket?.on('order-created', result => {
      console.log(result);
      if(result.ok){
        setOrderResult(result);
      } else {
        alert('ocurrio un error al crear la orden')
      }
    
    })
  },[socket])

  return (
    <>
      {metodPay === 'contra-entrega' ? (
        <PayOnDelivery changePayMetod={setMetodPay} />
      ) : (
        <PayWithCard changePayMetod={setMetodPay} />
      )}

      <div className='w-full gap-y-3 flex flex-col'>
        <p className='font-bold text-lg'>Resumen de pedido</p>
        <span className='text-3xl font-black'>S/ {mountTotal}</span>
        <p className='flex gap-x-3 items-center'>
          <span className='text-emerald-400'>
            <IconCheck />
          </span>{' '}
          {liststate?.list?.name}
        </p>
        <p className='flex gap-x-3 items-center'>
          <span className='text-emerald-400'>
            <IconCheck />
          </span>{' '}
          {liststate?.list?.products?.length} productos en total
        </p>
        <p className='flex gap-x-3 items-center'>
          <span className='text-emerald-400'>
            <IconCheck />
          </span>{' '}
          {data?.direction?.name}
        </p>
        <p className='flex gap-x-3 items-center'>
          <span className='text-emerald-400'>
            <IconCheck />
          </span>{' '}
          {auth?.user.mobile}
        </p>
      </div>

      {orderResult?.ok && <PaymentSuccess orderResult={orderResult} />}
    </>
  );
};

export default YourPayment;

export const PayWithCard = ({ changePayMetod }) => {
  return (
    <>
      <div className='w-full'>
        <div className=' flex justify-between items-center'>
          <p className='font-bold text-lg font-poppins tracking-tight'>
            Tarjetas guardadas
          </p>
          <button className='translate-y-1 bg-purple-500 px-3 py-1 text-white rounded-full'>
            +Añadir
          </button>
        </div>
        <p className='self-start text-gray-500 tracking-tight'>
          Lista de tarjetas que has guardado
        </p>
      </div>

      <div className='w-full flex flex-col gap-y-5 pt-3'>
        <div className='border border-gray-3 rounded-sm flex gap-x-5 justify-between px-2 py-2 relative'>
          <div className='flex gap-x-5'>
            <span className='bg-gray-100 px-3 rounded-md'>
              <img src='https://img.icons8.com/color/48/000000/mastercard-logo.png' />
            </span>
            <div className='flex flex-col'>
              <span className='font-semibold'> visa xxxx xxxx 1234</span>
              <span className='text-gray-500'>Expira en 16/24</span>
            </div>
          </div>
          <span className='font-black text-2xl text-gray-400'>...</span>
          <span className='absolute top-0 right-0 -translate-y-3 -translate-x-5 bg-emerald-50 text-emerald-400 px-3 rounded-full border border-emerald-400'>
            Primaria
          </span>
        </div>

        <div className='border border-gray-3 rounded-sm flex gap-x-5 justify-between px-2 py-2 relative'>
          <div className='flex gap-x-5'>
            <span className='bg-gray-100 px-3 rounded-md'>
              <img src='https://img.icons8.com/color/48/000000/mastercard-logo.png' />
            </span>
            <div className='flex flex-col'>
              <span className='font-semibold'> visa xxxx xxxx 1234</span>
              <span className='text-gray-500'>Expira en 16/24</span>
            </div>
          </div>
          <span className='font-black text-2xl text-gray-400'>...</span>
        </div>
      </div>

      <p className='text-gray-600 pt-3'>
        En el siguiente espacio se muestra el resumen final de tu pedido, al
        precionar pagar realizaremos el cobro de la tarjeta seleccionada como
        primaria. Si desea cambiar el metodo de pago, use el enlace siguiente.{' '}
        <button
          onClick={() => {
            changePayMetod('contra-entrega');
          }}
          className='text-purple-500'
        >
          cambiar
        </button>
      </p>
    </>
  );
};

PayWithCard.propTypes = {
  changePayMetod: PropTypes.func.isRequired,
};

export const PayOnDelivery = ({ changePayMetod }) => {
  return (
    <>
      <div className='w-full'>
        <div className=' flex justify-between items-center'>
          <p className='font-bold text-lg font-poppins tracking-tight'>
            Pago contra entrega
          </p>
        </div>
        <p className='self-start text-gray-500 tracking-tight'>
          Has seleccionado pago contra entrega, usted pagará al momento de
          recibir su pedido, si desea cambiar el metodo de pago, puede hacerlo
          en el siguiente enlace.{' '}
          <button
            onClick={() => {
              changePayMetod('tarjeta');
            }}
            className='text-purple-500'
          >
            cambiar
          </button>
        </p>
      </div>

      <div className='w-full flex flex-col gap-y-5 pt-3'>
        <img src={imgDelivery1} />
      </div>

      <p className='text-gray-600 pt-3'>
        En el siguiente espacio se muestra el resumen final de tu pedido, al
        precionar pagar le contactaremos para confirmar su pedido.{' '}
      </p>
    </>
  );
};

PayOnDelivery.propTypes = {
  changePayMetod: PropTypes.func.isRequired,
};
