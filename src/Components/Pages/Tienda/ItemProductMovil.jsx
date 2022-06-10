import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const ItemProductMovil = ({ product, index }) => {
  const { name, img } = product;

  const itemstyle = {
    visible: i => ({
      scale: 1,
      transition: {
        delay: i * 0.03,
      },
    }),
    scale: 0,
  };

  return (
    <Link to={`/tienda/${name.split(' ')[0]}`} className='block sm:hidden'>
      <motion.div
        transition={{
          duration: 0.5,
        }}
        initial={{ scale: 0 }}
        animate='visible'
        custom={index}
        variants={itemstyle}
        className='flex relative flex-col items-center'
      >
        <div className='bg-emerald-200 rounded-lg w-[88.61px] h-[74.43px] translate-y-2' />
        <div className='bg-white rounded-lg z-10 shadow-md w-[110.76px]  p-2 flex justify-center items-center flex-col text-gray-600'>
          <p className='font-medium font-poppins tracking-tighter'>{name}</p>
          <p>
            und. s/<span className='text-color_green_7 font-medium'>1.5</span>
          </p>
        </div>
        

      <div className='absolute'>
        <div className='rounded-lg translate-y-1'>
          <img src={img} className='mx-auto' />
        </div>
        <div className=' rounded-lg  shadow-lg w-[110.76px]'></div>
      </div> 
      </motion.div>
    </Link>
  );
};

export default ItemProductMovil;

ItemProductMovil.propTypes = {
  product: PropTypes.object.isRequired,
  index: PropTypes.number,
};
