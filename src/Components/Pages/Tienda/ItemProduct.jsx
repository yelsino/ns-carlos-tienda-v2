import { motion } from 'framer-motion';
import PropTypes from 'prop-types'

const ItemProduct = ({ product }) => {
  const {
    name,
    img,
  } = product;
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.15 } }}
      transition={{ duration: 0.2, delay: 0.15 }}
      style={{ pointerEvents: 'auto' }}
      className='flex relative'
    >
      <div className='bg-emerald-200 rounded-lg w-[88px] h-[74px]'>
       
      </div>
      <div className='bg-white rounded-lg -translate-x-1 shadow-lg w-[110.76px] p-2 flex justify-center items-center flex-col text-gray-600'>
        <p className='font-medium font-poppins tracking-tighter'>
          {name}
        </p>
        <p>
          und. s/<span className='text-color_green_7 font-medium'>1.5</span>
        </p>
      </div>

      <div className='absolute'>
        <div className='flex items-center rounded-lg w-[88px] h-[74px]'>
          <img src={img} />
        </div>
        <div className='bg-white rounded-lg -translate-x-1 shadow-lg w-[110.76px]'></div>
      </div>
    </motion.div>
  );
};

export default ItemProduct;

ItemProduct.propTypes = {
  product: PropTypes.object.isRequired,
}
