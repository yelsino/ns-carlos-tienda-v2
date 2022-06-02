import { useState } from 'react';
import Select from '../../../Atoms/Select';

const TypePayment = () => {
  const [typePayment, setTypePayment] = useState('contra-entrega');

  return (
    <>
      <p className='flex justify-between w-full pt-3 font-bold'>
        ¿Como desea pagar?
      </p>

      <div className='w-full font-poppins flex flex-col gap-y-3'>
        <Select
          checked={typePayment === 'contra-entrega'}
          onClick={() => {
            setTypePayment('contra-entrega');
          }}
          text='Pagaré al recibir mi pedido'
        />
        <Select
          checked={typePayment === 'tarjeta'}
          onClick={() => {
            setTypePayment('tarjeta');
          }}
          text='Deseo pagar ahora con tarjeta'
        />
      </div>
    </>
  );
};

export default TypePayment;
