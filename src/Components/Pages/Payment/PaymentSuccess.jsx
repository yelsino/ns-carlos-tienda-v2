import { Link } from 'react-router-dom';
import imgDelivery from '../../../Assets/delivery.png';
import PropTypes from 'prop-types';

const PaymentSuccess = ({orderResult}) => {
  return (
    <div className='fixed z-50  bg-white w-full h-full top-0 left-0 font-poppins flex items-center '>
      <div className=' max-w-xs mx-auto  flex flex-col items-center gap-y-5  '>
        <img src={imgDelivery} className='w-10/12' />
        <p className='text-3xl font-black text-center  '>PAGO EXITOSO</p>

        <div className='text-2xl font-medium bg-color_green_2 px-10 py-4 text-color_green_7'>
            <span># {orderResult.codeOrder} </span>
        </div>

        <p className='text-center text-xl text-gray-700 font-light'>
          Su pago ha sido registrado exitosamente, en breve recibirá un correo con los detalles de su pedido.
        </p>

        <Link
          to='/tienda'
          className='w-[130px] bg-black text-white font-poppins rounded-full  font-bold py-4 flex justify-center '
        >
          Ok
        </Link>
      </div>
    </div>
  );
};

export default PaymentSuccess;


PaymentSuccess.propTypes = {
  orderResult: PropTypes.object.isRequired,
}