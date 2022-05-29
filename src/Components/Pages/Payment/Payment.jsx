import { Link, Outlet, useLocation } from 'react-router-dom';
import imgDelivery from '../../../Assets/delivery.png';

const Payment = () => {

  // get url with params react-router-dom
  const location = useLocation();

  const { pathname } = location;

  const currentPath = pathname.split('/');
  // const rutas = ['', 'payment', 'your-facturation'];

  // const filterRutes = rutas.filter((tag) => (currentPath.includes(tag) && tag));
  // console.log(filterRutes);

  return (
    <div className='grid grid-cols-2   h-screen  '>
      <div className='hidden sm:flex sm:col-span-1 bg-black row-span-full items-center relative'>
      <div className=' max-w-xs  text-white flex flex-col items-center gap-y-5 fixed  left-1/4  -translate-x-[160px]'>
          <img src={imgDelivery} className='w-10/12' />
          <p className='text-2xl font-bold text-center'>Preparando su pedido</p>

          <p className='text-center text-xl text-gray-200 font-light'>
            Recuerda que todos los envios fuera de Satipo serán rechazados
          </p>
          {
            currentPath.includes('your-list') &&  <Link
            to='/payment/your-facturation'
            className='w-[160px] bg-white text-black font-poppins rounded-full  font-bold py-4 flex justify-center '
          >
            Continuar
          </Link>
          }

{
            currentPath.includes('your-facturation') &&  <Link
            to='/payment/your-payment'
            className='w-[160px] bg-white text-black font-poppins rounded-full  font-bold py-4 flex justify-center '
          >
            Continuar
          </Link>
          }
{
            currentPath.includes('your-payment') &&  <Link
            to='/payment/your-payment'
            className='w-[160px] bg-white text-black font-poppins rounded-full  font-bold py-4 flex justify-center '
          >
            Pagar
          </Link>
          }
         
        </div>
      </div>
      <div className=' col-span-2 sm:col-span-1 bg-white row-span-full '>
        <div className='pt-10   max-w-sm mx-auto flex flex-col items-center gap-y-3 pb-10 px-5'>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Payment;
