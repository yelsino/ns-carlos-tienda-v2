import { motion } from 'framer-motion';
import { IconDelete } from '../../../Atoms/Icons';
import PropTypes from 'prop-types';
import SwitchWeight from './SwitchWeight';
import FoodRecipes from './FoodRecipes';
import { useOnClick } from '../../../../Hooks/useOnClick';
import { useRef } from 'react';

const ViewProduct = ({ product, setClose, upLista }) => {
  const { _id, name, img } = product;

  const [disabled, setDisabled] = useOnClick(200);

  const container = useRef();

  const agregarProducto = () => {
    setDisabled(true);
    upLista((prev) => [...prev, product]);
  };

  return (
    <motion.div
      key={_id}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className={`bg-white p-10   relative
      w-full   sm:rounded-2xl sm:w-auto sm:h-auto overflow-y-scroll h-screen  sm:max-h-[600px] `}
      ref={container}
      onClick={e => e.stopPropagation()}
    >
      <button
        onClick={() => setClose(null)}
        className='absolute top-0 right-0 bg-red-500 px-5 py-3  text-white font-semibold font-poppins sm:rounded-tr-2xl focus:outline-none -translate-y-[1px] translate-x-[1px]'
      >
        Cerrar
      </button>
      {/* contenido */}
      <motion.div className='gap-10  flex flex-col sm:flex-row max-w-xs mx-auto sm:max-w-none'>
        <motion.div
          transition={{
            duration: 1,
          }}
          initial='hidden'
          animate='visible'
          variants={list}
          className='flex flex-col items-center gap-7 max-w-xs sm:px-5 '
        >
          <p className='font-semibold font-poppins text-xl '>{name}</p>
          <div className='w-[140px] h-[130px] rounded-tl-[50px] rounded-tr-[10px] rounded-bl-[20px] rounded-br-[50px] bg-emerald-300 bg-opacity-50 mb-3 flex justify-center items-center '>
            <img src={img} className=' scale-125 mb-3' />
          </div>

          <SwitchWeight />

          <div className='w-full flex flex-col gap-y-2'>
            <p className='flex justify-between w-full'>
              <span>Precio</span>
              <span>5.90 /kg</span>
            </p>

            <p className='flex justify-between w-full'>
              <span>Precio</span>
              <span>5.90 /kg</span>
            </p>
          </div>
          <div className='flex items-center justify-between w-full'>
            <motion.button
              animate={disabled ? { scale: 0.95 } : { scale: 1 }}
              transition={{ duration: 0.2 }}
              onClick={agregarProducto}
              disabled={disabled}
              className={`bg-orange-600 text-white w-48 py-3 font-semibold font-poppins ${
                disabled ? 'cursor-wait' : 'cursor-pointer'
              }`}
            >
              Añadir
            </motion.button>

            <button className='text-2xl w-14 h-full flex items-center justify-center'>
              <IconDelete />
            </button>
          </div>

          <div className='w-full  break-all '>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Inventore, eos.
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Inventore, eos.
            </p>
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
  setClose: PropTypes.func,
  upLista: PropTypes.func,
};

const list = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};
