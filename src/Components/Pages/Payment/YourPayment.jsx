import { IconCheck } from '../../Atoms/Icons';
import PaymentSuccess from './PaymentSuccess';

const YourPayment = () => {
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
          {/* <span className='absolute top-0 right-0 -translate-y-3 -translate-x-5 bg-emerald-50 text-emerald-400 px-3 rounded-full border border-emerald-400'>
            Primaria
          </span> */}
        </div>
      </div>

      <p className='text-gray-600 pt-3'>
        En el siguiente espacio se muestra el resumen final de tu pedido, al
        precionar pagar realizaremos el cobro de la tarjeta seleccionada como
        primaria
      </p>

      <div className='w-full gap-y-3 flex flex-col'>
          <p className='font-bold text-lg'>Resumen de pedido</p>
        <span className='text-3xl font-black'>S/ 199</span>
        <p className='flex gap-x-3 items-center'>
          <span className='text-emerald-400'><IconCheck /></span> Mi primera lista
        </p>
        <p className='flex gap-x-3 items-center'>
          <span className='text-emerald-400'><IconCheck /></span> 13 productos en total
        </p>
        <p className='flex gap-x-3 items-center'>
          <span className='text-emerald-400'><IconCheck /></span> Jr 1° de noviembre 1550
        </p>
        <p className='flex gap-x-3 items-center'>
          <span className='text-emerald-400'><IconCheck /></span> 939 616 350
        </p>
      </div>

      <PaymentSuccess/>
    </>
  );
};

export default YourPayment;
