import { motion } from 'framer-motion';
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';

const ItemProduct = ({ product, index }) => {
  const {
    name,
    img,
  } = product;

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

    <Link to={`/tienda`} className=''>
    {/* <Link to={`/tienda/${name.split(' ')[0]}`} className=''> */}
     <motion.div
      transition={{
        duration: 0.5,
      }}

      initial={{scale:0}}
      animate='visible'
      custom={index}
      variants={itemstyle}
      className='flex relative'
    >
      <div className='bg-emerald-200 rounded-lg w-[88px] h-[74px] '/>
      <div className='bg-white rounded-lg -translate-x-1 shadow-md w-[110.76px] p-2 flex justify-center items-center flex-col text-gray-600'>
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
    </Link>
   
  );
};

export default ItemProduct;

ItemProduct.propTypes = {
  product: PropTypes.object.isRequired,
  index: PropTypes.number
}
