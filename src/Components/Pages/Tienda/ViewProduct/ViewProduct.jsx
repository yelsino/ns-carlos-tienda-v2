import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import SwitchWeight from './SwitchWeight';
import FoodRecipes from './FoodRecipes';


const ViewProduct = ({ product, setModal,setItem }) => {

  const {  name, img, description } = product;

  return (
    <motion.div
      initial={{ scale: 0.5 }}
      animate={{ scale: 1 }}
      exit={{ scale: 0 }}
      transition={{ duration: 0.3 }}
      className={`bg-white p-10   relative
      w-full   sm:rounded-2xl sm:w-auto sm:h-auto overflow-y-scroll h-screen  sm:max-h-[600px] `}
      onClick={e => e.stopPropagation()}
    >
      <button
        onClick={() => {
          setItem(null)
          setModal(false)
        }}
        className='absolute top-0 right-0 bg-red-500 px-5 py-3  text-white font-semibold font-poppins sm:rounded-tr-2xl focus:outline-none -translate-y-[1px] translate-x-[1px]'
      >
        Cerrar
      </button>
      {/* contenido */}
      <motion.div className='gap-10  flex flex-col sm:flex-row max-w-xs mx-auto sm:max-w-none'>
        <motion.div
      
          className='flex flex-col items-center gap-7 max-w-xs sm:px-5 '
        >
          <p className='font-semibold font-poppins text-xl '>{name}</p>
          <div className='w-[140px] h-[130px] rounded-tl-[50px] rounded-tr-[10px] rounded-bl-[20px] rounded-br-[50px] bg-emerald-300 bg-opacity-50 mb-3 flex justify-center items-center '>
            <img src={img} className=' scale-125 mb-3' />
          </div>

          <SwitchWeight product={product} />

          <div className='w-full  break-all '>
            <p>{description}</p>
          </div>
        </motion.div>
        <FoodRecipes />
      </motion.div>
    </motion.div>
  );
};

export default ViewProduct;

ViewProduct.propTypes = {
  product: PropTypes.object,
  setModal: PropTypes.func,
  setItem: PropTypes.func,
  upLista: PropTypes.func,
};

