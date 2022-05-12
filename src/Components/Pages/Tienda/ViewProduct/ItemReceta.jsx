import { motion } from 'framer-motion';
import { PropTypes } from 'prop-types';

const ItemReceta = ({ animation, item }) => {
  return (
    <motion.div
      transition={{
        duration: 1,
      }}
      initial='hidden'
      animate='visible'
      custom={item}
      variants={animation}
      className='
        w-36 h-44 p-2 break-all  rounded-lg shadow-lg
        '
    >
      <img src='https://content21.sabervivirtv.com/medio/2021/10/05/ensalada-de-naranja-y-bacalao_f9c0d282_1200x709.jpg' />
      <p className='mt-1'>Lorem ipsum dolor sit amet consectetur </p>
    </motion.div>
  );
};

export default ItemReceta;

ItemReceta.propTypes = {
  item: PropTypes.number,
  animation: PropTypes.object.isRequired,
};
