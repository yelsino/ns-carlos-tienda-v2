import { motion } from 'framer-motion';
import { PropTypes } from 'prop-types';

const ItemReceta = ({ index }) => {
  return (
    <motion.div
      custom={index}
      variants={variants}
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
  index: PropTypes.number,
  // animation: PropTypes.object.isRequired,
};

const variants = {
  visible: i => ({
    scale: 1,
    transition: {
      delay: i * 0.1,
    },
  }),
  hidden: { scale: 0 },
};
