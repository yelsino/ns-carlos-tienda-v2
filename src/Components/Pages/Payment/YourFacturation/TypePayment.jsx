import Select from '../../../Atoms/Select';
import PropTypes from 'prop-types';

const TypePayment = ({typePayment,setTypePayment}) => {
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
            setTypePayment('contra-entrega');
          }}
          text='Deseo pagar ahora con tarjeta'
        />
      </div>
    </>
  );
};

export default TypePayment;

TypePayment.propTypes = {
  typePayment: PropTypes.string,
  setTypePayment: PropTypes.func,
};
